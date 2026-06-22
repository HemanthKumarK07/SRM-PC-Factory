import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      builds: 'Builds',
      contact: 'Contact'
    },
    hero: {
      badge: 'Custom PC Manufacturer · Salem',
      h1_1: 'Your Machine.',
      h1_2: 'Your Rules.',
      p: 'SRM PC Factory assembles every build from scratch — no filler parts, no compromises. Configured for the way you actually use it.',
      btn_browse: 'Browse Builds →',
      btn_how: 'How It Works',
      stat_built: 'Machines Built',
      stat_time: 'Avg Build Time',
      stat_exp: 'Experience'
    },
    about: {
      label: 'About SRM',
      title: 'Built on Craft.\nDriven by Precision.',
      desc: 'SRM PC Factory was built on a frustration with generic, off-the-shelf machines that never quite deliver. We source premium components, assemble in-house, and rigorously test every build before it leaves our facility.',
      feat1_title: 'Assembled In-House',
      feat1_desc: 'Every machine hand-built in our Salem facility.',
      feat2_title: '24-Hour Stress Test',
      feat2_desc: 'Full-load testing before every shipment — guaranteed.',
      feat3_title: 'Ready Out of the Box',
      feat3_desc: 'OS installed, drivers updated, fully configured.',
      feat4_title: 'Direct Support',
      feat4_desc: 'Talk to the engineers who built your machine.'
    },
    products: {
      label: 'Our Builds',
      title: 'Four Tiers.\nOne Standard.',
      desc: 'Assembled in-house, stress-tested for 24 hours, and shipped configured out of the box.',
      popular: 'Popular',
      build: 'Build This →',
      stat_delivered: 'Machines Delivered',
      stat_satisfied: 'Customer Satisfaction',
      stat_build_time: 'Average Build Time',
      stat_exp_title: 'Industry Experience',
      tiers: {
        entry: {
          tier: 'Entry Level',
          name: 'Everyday Performer',
          tagline: 'Clean, reliable machine for study, work, and light gaming.',
          specs: ['Intel Core i5 / Ryzen 5', '16 GB DDR4 RAM', '512 GB NVMe SSD', 'GTX 1650 / Integrated', 'Mid-Tower Chassis']
        },
        core: {
          tier: 'Core Gaming',
          name: 'Core Gaming Rig',
          tagline: 'Smooth 1080p–1440p gaming, built for consistent frames.',
          specs: ['Intel Core i7 / Ryzen 7', '32 GB DDR5 RAM', '1 TB NVMe Gen4', 'RTX 4060 Ti / RX 7700 XT', 'Tempered Glass Build']
        },
        performance: {
          tier: 'Performance Series',
          name: 'Performance Beast',
          tagline: 'High-refresh 1440p gaming and demanding creative work.',
          specs: ['Intel Core i9 / Ryzen 9', '64 GB DDR5 6000 MHz', '2 TB NVMe + 2 TB HDD', 'RTX 4070 Ti Super', 'Premium Airflow Case']
        },
        elite: {
          tier: 'Elite Series',
          name: 'Elite Powerhouse',
          tagline: '4K gaming meets professional content creation — no ceiling.',
          specs: ['Intel Core i9-14900K', '128 GB DDR5 ECC', '4 TB NVMe Gen5 SSD', 'RTX 4090 24 GB', 'Custom Liquid Cooling']
        }
      }
    },
    contact: {
      label: 'Contact',
      title: "Let's Talk Builds.",
      desc: "Questions before committing? We're happy to walk you through the options.",
      lbl_address: 'Address',
      val_address: '123 Tech Park, Salem, Tamil Nadu — 636001',
      lbl_phone: 'Phone',
      lbl_email: 'Email',
      lbl_whatsapp: 'WhatsApp',
      hours_title: 'Business Hours',
      hours_week: 'Mon – Sat',
      hours_sun: 'Sunday'
    },
    footer: {
      desc: 'Hand-crafted custom PCs from Salem, Tamil Nadu. Built right, delivered fast.',
      nav: 'Navigate',
      builds: 'Builds',
      contact: 'Contact',
      rights: '© {year} SRM PC Factory. All rights reserved.',
      made: 'Made in Salem, Tamil Nadu 🇮🇳',
      powered: 'Website powered by Code Nitter',
      privacy: 'Privacy Policy'
    },
    payment: {
      booking: 'Booking',
      confirm: 'Confirm Your Build',
      read_before: 'Read Before Proceeding',
      disclaimer_text: 'A one-time refundable advance of ₹{amount} is collected via UPI to confirm genuine interest and prevent spam inquiries. This amount is fully refunded once you receive your PC. This is not the build price — your final quote follows after consultation.',
      disclaimer_chk: 'I understand ₹{amount} is a refundable booking fee, not the PC price.',
      advance_lbl: 'Booking Advance (via UPI)',
      advance_note: 'Fully refundable on PC delivery',
      your_details: 'Your Details',
      lbl_name: 'Full Name',
      lbl_email: 'Email',
      lbl_phone: 'Phone',
      btn_continue: 'Continue to Payment →',
      sec_payment: 'UPI payment · Fully refundable on delivery',
      step_2: 'Step 2 of 2 · UPI Payment',
      pay_via: 'Pay ₹{amount} via UPI',
      scan_with: 'Scan with any UPI app',
      or_pay: 'or pay directly',
      send_exactly: 'Send exactly ₹{amount} — ',
      enter_utr: 'Enter UPI Transaction ID / UTR Number',
      find_utr: 'Find this in your UPI app → Transaction history → Reference / UTR',
      btn_confirm: "✓ I've Paid — Confirm Booking",
      back: '← Back to details',
      confirmed: 'Booking Confirmed!',
      thank_you: 'Thank you, {name}! Our team will contact you at {email} within 24 hours to discuss your build and share the final quote.',
      receipt: 'Booking Receipt',
      r_build: 'Build',
      r_tier: 'Tier',
      r_name: 'Name',
      r_email: 'Email',
      r_phone: 'Phone',
      r_utr: 'UTR / Ref',
      r_amount: 'Amount Paid',
      btn_form: 'Fill Order Details Form →',
      btn_later: "I'll fill it later",
      verifying: 'Verifying Transaction...'
    },
    privacy: {
      title: 'Privacy Policy',
      last_updated: 'Last updated: June 2026',
      sec1_title: '1. Information We Collect',
      sec1_desc: 'We collect your name, email, phone number, and UPI Transaction Reference ID (UTR) when you make a booking. This details are used strictly to verify your transaction and communicate regarding your custom PC build.',
      sec2_title: '2. Refund Policy',
      sec2_desc: 'The booking advance fee of ₹2 (or ₹129) is collected to filter out spam inquiries and is 100% fully refundable upon final PC delivery or build cancellation.',
      sec3_title: '3. Data Security',
      sec3_desc: 'Your transaction details are stored locally and securely. We do not sell, trade, or share your personal data with any third-party marketing services.',
      btn_close: 'Close'
    }
  },
  ta: {
    nav: {
      home: 'முகப்பு',
      about: 'எங்களைப் பற்றி',
      builds: 'கணினிகள்',
      contact: 'தொடர்பு'
    },
    hero: {
      badge: 'தனிப்பயன் பிசி உற்பத்தியாளர் · சேலம்',
      h1_1: 'உங்களுடைய மெஷின்.',
      h1_2: 'உங்களுடைய விதிகள்.',
      p: 'எஸ்.ஆர்.எம் பிசி பேக்டரி அனைத்து கணினிகளையும் ஆரம்பத்திலிருந்து கூட்டுகிறது — எந்தவொரு குறைவான பாகங்களும் இல்லை, சமரசமும் இல்லை. நீங்கள் பயன்படுத்தும் முறைக்கு ஏற்ப வடிவமைக்கப்பட்டது.',
      btn_browse: 'கணினிகளைக் காண்க →',
      btn_how: 'இது எவ்வாறு செயல்படுகிறது',
      stat_built: 'தயாரிக்கப்பட்ட கணினிகள்',
      stat_time: 'சராசரி தயாரிப்பு நேரம்',
      stat_exp: 'அனுபவம்'
    },
    about: {
      label: 'எஸ்.ஆர்.எம் பற்றி',
      title: 'கைவினைத்திறனில் உருவானது.\nதுல்லியத்தால் இயக்கப்படுகிறது.',
      desc: 'வழக்கமான, பொதுவான கணினிகள் ஒருபோதும் முழுமையாக செயல்படாத ஏமாற்றத்தினால் எஸ்.ஆர்.எம் பிசி பேக்டரி தொடங்கப்பட்டது. நாங்கள் பிரீமியம் பாகங்களை பெற்று, உள்நாட்டிலேயே இணைத்து, ஒவ்வொரு கணினியையும் அனுப்புவதற்கு முன் முழுமையாக சோதிக்கிறோம்.',
      feat1_title: 'உள்ளேயே இணைக்கப்படுகிறது',
      feat1_desc: 'ஒவ்வொரு மெஷினும் சேலத்தில் உள்ள எங்கள் வசதியில் கைமுறையாக உருவாக்கப்படுகிறது.',
      feat2_title: '24 மணிநேர அழுத்த சோதனை',
      feat2_desc: 'ஒவ்வொரு ஏற்றுமதிக்கும் முன் முழு-சுமை சோதனை - உத்தரவாதம்.',
      feat3_title: 'பெட்டியிலிருந்து எடுக்கும்போதே தயார்',
      feat3_desc: 'இயக்க முறைமை (OS) நிறுவப்பட்டு, டிரைவர்கள் புதுப்பிக்கப்பட்டு, கட்டமைக்கப்பட்டுள்ளது.',
      feat4_title: 'நேரடி ஆதரவு',
      feat4_desc: 'உங்கள் மெஷினை உருவாக்கிய பொறியாளர்களிடம் நேரடியாகப் பேசுங்கள்.'
    },
    products: {
      label: 'எங்கள் தயாரிப்புகள்',
      title: 'நான்கு அடுக்குகள்.\nஒரே தரம்.',
      desc: 'உள்ளேயே இணைக்கப்பட்டு, 24 மணிநேரம் அழுத்த சோதனை செய்யப்பட்டு, பெட்டியிலிருந்து நேரடியாக இயக்கும் வகையில் அனுப்பப்படுகிறது.',
      popular: 'பிரபலம்',
      build: 'இதை உருவாக்கு →',
      stat_delivered: 'விநியோகிக்கப்பட்ட கணினிகள்',
      stat_satisfied: 'வாடிக்கையாளர் திருப்தி',
      stat_build_time: 'சராசரி தயாரிப்பு நேரம்',
      stat_exp_title: 'தொழில்துறை அனுபவம்',
      tiers: {
        entry: {
          tier: 'தொடக்க நிலை',
          name: 'தினசரி செயல்திறன்',
          tagline: 'படிப்பிற்கும், வேலைக்கும் மற்றும் எளிய கேமிங்கிற்கும் சுத்தமான, நம்பகமான மெஷின்.',
          specs: ['Intel Core i5 / Ryzen 5', '16 GB DDR4 RAM', '512 GB NVMe SSD', 'GTX 1650 / ஒருங்கிணைந்தது', 'மிட்-டவர் கேஸ்']
        },
        core: {
          tier: 'கோர் கேமிங்',
          name: 'கோர் கேமிங் ரிக்',
          tagline: 'நிலையான பிரேம்களுக்காக கட்டமைக்கப்பட்ட, மென்மையான 1080p-1440p கேமிங்.',
          specs: ['Intel Core i7 / Ryzen 7', '32 GB DDR5 RAM', '1 TB NVMe Gen4', 'RTX 4060 Ti / RX 7700 XT', 'டெம்பர்டு கிளாஸ் பில்ட்']
        },
        performance: {
          tier: 'செயல்திறன் தொடர்',
          name: 'செயல்திறன் மிருகம்',
          tagline: 'உயர்-புதுப்பிப்பு 1440p கேமிங் மற்றும் கடினமான படைப்பு வேலை.',
          specs: ['Intel Core i9 / Ryzen 9', '64 GB DDR5 6000 MHz', '2 TB NVMe + 2 TB HDD', 'RTX 4070 Ti Super', 'பிரೀமியம் ஏர்ஃபுளோ கேஸ்']
        },
        elite: {
          tier: 'எலைட் தொடர்',
          name: 'எலைட் பவர்ஹவுஸ்',
          tagline: '4K கேமிங் மற்றும் தொழில்முறை உள்ளடக்க உருவாக்கம் - எல்லைகள் இல்லை.',
          specs: ['Intel Core i9-14900K', '128 GB DDR5 ECC', '4 TB NVMe Gen5 SSD', 'RTX 4090 24 GB', 'தனிப்பயன் லிக்விட் கூலிங்']
        }
      }
    },
    contact: {
      label: 'தொடர்பு',
      title: 'கணினிகளைப் பற்றி பேசுவோம்.',
      desc: 'முடிவெடுப்பதற்கு முன் கேள்விகள் உள்ளதா? உங்களுக்கு உதவ நாங்கள் மகிழ்ச்சியடைகிறோம்.',
      lbl_address: 'முகவரி',
      val_address: '123 டெக் பார்க், சேலம், தமிழ்நாடு — 636001',
      lbl_phone: 'தொலைபேசி',
      lbl_email: 'மின்னஞ்சல்',
      lbl_whatsapp: 'வாட்ஸ்அப்',
      hours_title: 'வணிக நேரம்',
      hours_week: 'திங்கள் – சனி',
      hours_sun: 'ஞாயிறு'
    },
    footer: {
      desc: 'சேலம், தமிழ்நாட்டிலிருந்து கைவினைத்திறனுடன் கூடிய பிரத்தியேக கணினிகள். சரியாக உருவாக்கப்பட்டு, விரைவாக விநியோகிக்கப்படுகிறது.',
      nav: 'வழிசெலுத்தல்',
      builds: 'கணினிகள்',
      contact: 'தொடர்பு',
      rights: '© {year} SRM PC Factory. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      made: 'சேலம், தமிழ்நாட்டில் தயாரிக்கப்பட்டது 🇮🇳',
      powered: 'வலைத்தளம்: Code Nitter',
      privacy: 'தனியுரிமைக் கொள்கை'
    },
    payment: {
      booking: 'முன்பதிவு',
      confirm: 'உங்கள் கணினியை உறுதிப்படுத்தவும்',
      read_before: 'தொடர்வதற்கு முன் படிக்கவும்',
      disclaimer_text: 'முறையான ஆர்வத்தை உறுதிப்படுத்தவும் ஸ்பேம் விசாரணைகளைத் தடுக்கவும் ₹{amount} ஒரு முறை திரும்பப் பெறத்தக்க முன்பணமாக UPI மூலம் வசூலிக்கப்படுகிறது. கணினி விநியோகிக்கப்பட்டதும் இந்தத் தொகை முழுமையாகத் திருப்பித் தரப்படும். இது கணினியின் இறுதி விலை அல்ல - ஆலோசனையின் பின் இறுதி விலை கணக்கிடப்படும்.',
      disclaimer_chk: '₹{amount} என்பது திரும்பப் பெறத்தக்க முன்பதிவு கட்டணம் மட்டுமே, கணினியின் இறுதி விலை அல்ல என்பதை நான் புரிந்துகொள்கிறேன்.',
      advance_lbl: 'முன்பதிவு முன்பணம் (UPI வழி)',
      advance_note: 'கணினி விநியோகிக்கப்படும் போது முழுமையாக திருப்பித் தரப்படும்',
      your_details: 'உங்கள் விவரங்கள்',
      lbl_name: 'முழு பெயர்',
      lbl_email: 'மின்னஞ்சல்',
      lbl_phone: 'தொலைபேசி எண்',
      btn_continue: 'பணப் பரிவர்த்தனைக்குத் தொடரவும் →',
      sec_payment: 'UPI கட்டணம் · டெலிவரியின் போது முழுமையாக திருப்பித் தரப்படும்',
      step_2: 'படி 2 · UPI கட்டணம்',
      pay_via: 'UPI மூலம் ₹{amount} செலுத்தவும்',
      scan_with: 'எந்தவொரு UPI செயலி மூலமும் ஸ்கேன் செய்யவும்',
      or_pay: 'அல்லது நேரடியாக செலுத்தவும்',
      send_exactly: 'சரியாக ₹{amount} செலுத்தவும் — ',
      enter_utr: 'UPI பரிவர்த்தனை ஐடி / UTR எண்ணை உள்ளிடவும்',
      find_utr: 'இதை உங்கள் UPI செயலியில் பார்க்கலாம் → பரிவர்த்தனை வரலாறு → Reference / UTR',
      btn_confirm: '✓ நான் பணம் செலுத்திவிட்டேன் — முன்பதிவை உறுதிசெய்',
      back: '← விவரங்களுக்குத் திரும்பவும்',
      confirmed: 'முன்பதிவு உறுதிசெய்யப்பட்டது!',
      thank_you: 'நன்றி, {name}! உங்களின் மின்னஞ்சல் முகவரிக்கு ({email}) 24 மணிநேரத்திற்குள் எங்கள் குழு தொடர்பு கொண்டு ஆலோசனையையும் இறுதி விலையையும் பகிர்ந்து கொள்ளும்.',
      receipt: 'முன்பதிவு ரசீது',
      r_build: 'கணினி',
      r_tier: 'அடுக்கு',
      r_name: 'பெயர்',
      r_email: 'மின்னஞ்சல்',
      r_phone: 'தொலைபேசி',
      r_utr: 'UTR / குறிப்பு',
      r_amount: 'செலுத்திய தொகை',
      btn_form: 'ஆர்டர் விவரங்கள் படிவத்தை நிரப்பவும் →',
      btn_later: 'பிறகு நிரப்புகிறேன்',
      verifying: 'பரிவர்த்தனை சரிபார்க்கப்படுகிறது...'
    },
    privacy: {
      title: 'தனியுரிமைக் கொள்கை',
      last_updated: 'கடைசியாக புதுப்பிக்கப்பட்டது: ஜூன் 2026',
      sec1_title: '1. நாங்கள் சேகரிக்கும் தகவல்கள்',
      sec1_desc: 'நீங்கள் முன்பதிவு செய்யும் போது உங்கள் பெயர், மின்னஞ்சல், தொலைபேசி எண் மற்றும் UPI பரிவர்த்தனை குறிப்பு ஐடி (UTR) ஆகியவற்றை நாங்கள் சேகரிக்கிறோம். இந்த விவரங்கள் உங்களின் பணப் பரிவர்த்தனையைச் சரிபார்க்கவும் உங்களோடு தொடர்பு கொள்ளவும் மட்டுமே பயன்படுத்தப்படும்.',
      sec2_title: '2. பணத்தைத் திரும்பப் பெறுதல் கொள்கை',
      sec2_desc: 'முன்பதிவு முன்பணக் கட்டணமான ₹2 (அல்லது ₹129) தேவையற்ற விசாரணைகளைத் தவிர்க்க வசூலிக்கப்படுகிறது. கணினி முழுமையாக விநியோகிக்கப்படும் போதோ அல்லது ஆர்டர் ரத்து செய்யப்படும் போதோ இந்தத் தொகை 100% முழுமையாகத் திருப்பித் தரப்படும்.',
      sec3_title: '3. தரவு பாதுகாப்பு',
      sec3_desc: 'உங்கள் பரிவர்த்தனை விவரங்கள் உள்ளூரிலேயே மிகவும் பாதுகாப்பாகச் சேமிக்கப்படுகின்றன. உங்களின் தனிப்பட்ட தரவுகளை எந்தவொரு மூன்றாம் தரப்பு விளம்பர நிறுவனங்களுக்கும் நாங்கள் விற்கவோ அல்லது பகிரவோ மாட்டோம்.',
      btn_close: 'மூடு'
    }
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en') // en | ta

  const toggleLanguage = () => setLang(l => (l === 'en' ? 'ta' : 'en'))

  const t = TRANSLATIONS[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
