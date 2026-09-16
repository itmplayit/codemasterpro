import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const defaultSettings = {
  general: {
    siteName: 'codemaster.pro',
    siteLogo: '⌘',
    tagline: 'Code that actually ships.',
    description: 'Professional coding platform for developers who want to learn, build, and deploy.',
    favicon: '',
  },
  appearance: {
    primaryColor: '#ffffff',
    secondaryColor: '#f59e0b',
    backgroundColor: '#050507',
    cardColor: '#12121a',
    borderColor: 'rgba(255,255,255,0.06)',
    theme: 'dark',
    fontHeading: 'Space Grotesk',
    fontBody: 'Inter',
    borderRadius: '16px',
  },
  homepage: {
    heroTitle: 'Code that',
    heroHighlight: 'actually',
    heroSuffix: 'ships.',
    heroSubtitle: 'Professional coding platform for developers who want to learn, build, and deploy. Courses, notes, AI tutor, playground, one-click deploy to Hostinger — all in React + MySQL (XAMPP).',
    heroBadge: 'One-Click Deploy to Hostinger • Live now',
    ctaPrimary: 'Start building',
    ctaSecondary: 'Open Playground',
    trustedTitle: 'Trusted by developers at',
    trustedLogos: ['GOOGLE', 'RAZORPAY', 'AMAZON', 'HOSTINGER'],
    features: [
      { title:'One-Click Deploy', desc:'Playground se live website in 10s. Hostinger powered, SSL auto, subdomain. Free 1, Pro 10 projects.', icon:'Zap' },
      { title:'AI Tutor', desc:'GPT-4 tutor + XAMPP error solver. Hinglish + voice.', icon:'Cpu' },
      { title:'XAMPP MySQL', desc:'Built for Indian colleges. Schema + seed + Docker + deploy.sh.', icon:'Database' },
      { title:'Earn ₹50k/mo', desc:'Memberships ₹499 + AdSense + Jobs ₹1999/post + Affiliate.', icon:'Github' },
    ]
  },
  footer: {
    description: 'Professional coding education. Learn, build, deploy, get hired. Built with React + MySQL (XAMPP) in Bhopal, for India.',
    email: 'admin@codemaster.pro',
    location: 'Bhopal, MP 🇮🇳',
    copyright: '© 2026 codemaster.pro — Built in Bhopal, for India. React + XAMPP MySQL + Razorpay.',
    social: { twitter:'', github:'', youtube:'', linkedin:'' }
  },
  seo: {
    metaTitle: 'CodeMaster Pro - Learn, Build, Deploy, Get Hired',
    metaDescription: 'Professional coding platform for developers. React + MySQL XAMPP + Razorpay + One-Click Deploy to Hostinger. 50k+ students.',
    keywords: 'coding, react, mysql, xampp, razorpay, hostinger, javascript, dsa, bhopal',
    ogImage: '',
  },
  monetization: {
    razorpayKey: 'rzp_test_••••••••',
    razorpaySecret: '••••••••',
    hostingerApi: 'hst_••••••••',
    adsenseId: 'ca-pub-••••••••',
    proPrice: 499,
    premiumPrice: 999,
    affiliateCommission: 30,
  },
  advanced: {
    customCss: '',
    customJs: '',
    maintenanceMode: false,
    maintenanceMessage: 'We are upgrading — back in 10 mins 🚀',
  }
}

const SiteSettingsContext = createContext()
const API = import.meta.env.VITE_API_URL || ''

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [isMySQL, setIsMySQL] = useState(false)

  // Fetch from MySQL on load
  useEffect(()=>{
    const fetchSettings = async () => {
      try {
        // Try MySQL first
        const res = await axios.get(`${API}/api/settings`)
        if (res.data && Object.keys(res.data).length > 0) {
          setSettings(prev=>{
            const merged = { ...defaultSettings }
            for (const key of Object.keys(defaultSettings)) {
              if (res.data[key]) {
                merged[key] = { ...defaultSettings[key], ...res.data[key] }
              }
            }
            return merged
          })
          setIsMySQL(true)
          localStorage.setItem('siteSettings_mysql', JSON.stringify(res.data))
          console.log('✅ Settings loaded from MySQL')
        } else {
          throw new Error('Empty MySQL')
        }
      } catch (err) {
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem('siteSettings')
          if (saved) {
            const parsed = JSON.parse(saved)
            setSettings(prev=>{
              const merged = { ...defaultSettings }
              for (const key of Object.keys(defaultSettings)) {
                if (parsed[key]) merged[key] = { ...defaultSettings[key], ...parsed[key] }
              }
              return merged
            })
            console.log('⚠️ Settings loaded from localStorage (MySQL not available)')
          }
        } catch {}
        setIsMySQL(false)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  useEffect(()=>{
    // Apply CSS variables
    document.documentElement.style.setProperty('--bg-primary', settings.appearance.backgroundColor)
    document.documentElement.style.setProperty('--bg-tertiary', settings.appearance.cardColor)
    // Save to localStorage always as backup
    localStorage.setItem('siteSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (section, key, value) => {
    setSettings(prev=>({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }

  const updateNested = (section, key, subKey, value) => {
    setSettings(prev=>({
      ...prev,
      [section]: { ...prev[section], [key]: { ...prev[section][key], [subKey]: value } }
    }))
  }

  const saveToMySQL = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.put(`${API}/api/settings`, settings, { headers })
      setIsMySQL(true)
      return { success: true, source: 'MySQL' }
    } catch (err) {
      // Save to localStorage if MySQL fails (no admin token or no XAMPP)
      localStorage.setItem('siteSettings', JSON.stringify(settings))
      return { success: true, source: 'localStorage', error: err.response?.data?.message || err.message }
    }
  }

  const resetSettings = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.post(`${API}/api/settings/reset`, {}, { headers })
    } catch {}
    setSettings(defaultSettings)
    localStorage.removeItem('siteSettings')
    localStorage.removeItem('siteSettings_mysql')
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, setSettings, updateSettings, updateNested, saveToMySQL, resetSettings, loading, isMySQL }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => useContext(SiteSettingsContext)
