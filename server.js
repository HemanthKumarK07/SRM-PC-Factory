import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const app        = express()
const PORT       = 3001
const RECORDS_FILE = path.join(__dirname, 'utr-records.json')
const MAX_USES   = 2   // max times a UTR can be submitted

// ── Allow Vite dev proxy ───────────────────────────────────────────────────
app.use(cors({ origin: /^http:\/\/localhost(:\d+)?$/ }))
app.use(express.json())

// ── Helpers ────────────────────────────────────────────────────────────────
const RECEIVED_FILE = path.join(__dirname, 'received-payments.json')

function loadRecords() {
  try {
    if (!fs.existsSync(RECORDS_FILE)) return {}
    return JSON.parse(fs.readFileSync(RECORDS_FILE, 'utf8'))
  } catch { return {} }
}

function saveRecords(data) {
  fs.writeFileSync(RECORDS_FILE, JSON.stringify(data, null, 2))
}

function loadReceivedPayments() {
  try {
    if (!fs.existsSync(RECEIVED_FILE)) return []
    return JSON.parse(fs.readFileSync(RECEIVED_FILE, 'utf8'))
  } catch { return [] }
}

function saveReceivedPayments(data) {
  fs.writeFileSync(RECEIVED_FILE, JSON.stringify(data, null, 2))
}

function normaliseUtr(utr) {
  // strip spaces/dashes, uppercase for consistent storage
  return utr.replace(/[\s\-]/g, '').toUpperCase()
}

// ── Health check ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }))

// ── SMS Webhook receiver (For live payment detection on owner's phone) ────
app.post('/sms-webhook', (req, res) => {
  const { message, sender } = req.body
  if (!message) {
    return res.status(400).json({ ok: false, error: 'Message body required' })
  }

  console.log(`💬 Received SMS from ${sender || 'Unknown'}: "${message}"`)

  // Match 12-digit UTR
  const utrMatch = message.match(/\b\d{12}\b/)
  // Match amount (e.g. Rs 2.00, INR 129, etc)
  const amountMatch = message.match(/(?:Rs\.?|INR)\s*(\d+(?:\.\d{2})?)/i)

  if (utrMatch) {
    const utr = utrMatch[0]
    const amount = amountMatch ? parseFloat(amountMatch[1]) : null

    const payments = loadReceivedPayments()
    if (!payments.some(p => p.utr === utr)) {
      payments.push({
        utr,
        amount,
        sender,
        receivedAt: new Date().toISOString(),
        rawSms: message
      })
      saveReceivedPayments(payments)
      console.log(`💰 Added payment from SMS: UTR ${utr} | Amount ₹${amount || 'unknown'}`)
    }
    return res.json({ ok: true, matchedUtr: utr, amount })
  }

  return res.json({ ok: false, message: 'No UTR found in SMS' })
})

// ── Validate + Record UTR ─────────────────────────────────────────────────
// Rules:
//   1. UTR tied to first email used — cannot be reused with a different email
//   2. Max 2 submissions per UTR (across any session)
app.post('/validate-utr', (req, res) => {
  const { utr, email, name, buildName, buildTier } = req.body

  if (!utr || !email) {
    return res.status(400).json({ ok: false, error: 'UTR and email are required.' })
  }

  const key     = normaliseUtr(utr)

  // Enforce 12-digit UPI transaction reference (UTR) format
  if (!/^\d{12}$/.test(key)) {
    return res.status(400).json({
      ok: false,
      error: 'Please enter a valid 12-digit UPI transaction ID / UTR number.'
    })
  }

  // ── Rule: Verify against live received payments (SMS webhook record check) ─
  const enforceLiveCheck = process.env.ENFORCE_PAYMENT_CHECK === 'true'
  if (enforceLiveCheck) {
    const received = loadReceivedPayments()
    const found = received.find(p => p.utr === key)
    if (!found) {
      console.warn(`❌ Verification failed: UTR ${key} not found in bank SMS records`)
      return res.status(402).json({
        ok: false,
        error: 'Transaction not found in our bank records. Please ensure you paid to the correct UPI and double-check your transaction ID.',
      })
    }
  }

  const records = loadRecords()
  const existing = records[key]

  // ── Rule 1: Different email ───────────────────────────────────────────────
  if (existing && existing.email.toLowerCase() !== email.toLowerCase()) {
    console.warn(`❌ UTR reuse attempt with diff email: ${key} | original: ${existing.email} | tried: ${email}`)
    return res.status(409).json({
      ok: false,
      error: 'This transaction ID was submitted using a different email address. Each UTR can only be linked to one email.',
    })
  }

  // ── Rule 2: Max uses exceeded ─────────────────────────────────────────────
  if (existing && existing.count >= MAX_USES) {
    console.warn(`❌ UTR max uses exceeded: ${key} (${existing.count} uses, email: ${existing.email})`)
    return res.status(409).json({
      ok: false,
      error: `This transaction ID has already been used ${MAX_USES} times and cannot be submitted again.`,
    })
  }

  // ── Allow: record / update ────────────────────────────────────────────────
  if (existing) {
    // Same email, under the limit — increment count
    records[key].count++
    records[key].lastUsed = new Date().toISOString()
    records[key].submissions.push({ name, buildName, buildTier, timestamp: new Date().toISOString() })
    console.log(`✅ UTR re-used (count ${records[key].count}): ${key} | email: ${email}`)
  } else {
    // First time — create record
    records[key] = {
      utr:        key,
      email:      email.toLowerCase(),
      count:      1,
      firstUsed:  new Date().toISOString(),
      lastUsed:   new Date().toISOString(),
      submissions: [{ name, buildName, buildTier, timestamp: new Date().toISOString() }],
    }
    console.log(`✅ New UTR recorded: ${key} | email: ${email}`)
  }

  saveRecords(records)

  return res.json({
    ok:         true,
    usesLeft:   MAX_USES - records[key].count,
    totalUses:  records[key].count,
  })
})

// ── Admin: view all UTR records (protect this in production!) ─────────────
app.get('/admin/records', (_req, res) => {
  res.json(loadRecords())
})

app.listen(PORT, () => {
  console.log(`\n🚀 SRM PC Factory API → http://localhost:${PORT}`)
  console.log(`   UTR records file: ${RECORDS_FILE}`)
  console.log(`   Max UTR uses: ${MAX_USES}\n`)
})
