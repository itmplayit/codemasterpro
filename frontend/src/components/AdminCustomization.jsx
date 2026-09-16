import { useState } from 'react'
import { useSiteSettings } from '../context/SiteSettingsContext'
import { Save, RotateCcw, Eye, Palette, Type, Globe, DollarSign, Code, Monitor, Image as ImageIcon, Sparkles } from 'lucide-react'

export default function AdminCustomization() {
  const { settings, updateSettings, setSettings, resetSettings, saveToMySQL, isMySQL } = useSiteSettings()
  const [activeSub, setActiveSub] = useState('general')
  const [saved, setSaved] = useState(false)
  const [saveSource, setSaveSource] = useState('')

  const handleSave = async () => {
    const result = await saveToMySQL()
    setSaveSource(result.source)
    setSaved(true)
    setTimeout(()=>setSaved(false), 3000)
  }

  const subTabs = [
    { id:'general', label:'General', icon: Globe },
    { id:'appearance', label:'Appearance', icon: Palette },
    { id:'homepage', label:'Homepage', icon: Monitor },
    { id:'footer', label:'Footer', icon: Type },
    { id:'seo', label:'SEO', icon: Sparkles },
    { id:'monetization', label:'Monetization', icon: DollarSign },
    { id:'advanced', label:'Advanced', icon: Code },
  ]

  return (
    <div className="mt-6 grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="card-dark p-2 space-y-1 sticky top-20">
          {subTabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveSub(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium text-left transition-all ${activeSub===t.id?'bg-white text-black':'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
              <t.icon className="w-4 h-4"/> {t.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/[0.06] mt-4 space-y-2">
            <button onClick={handleSave} className="w-full bg-white text-black py-3 rounded-full font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-white/90">
              <Save className="w-4 h-4"/> {saved ? `Saved to ${saveSource}! ✓` : `Save to ${isMySQL ? 'MySQL' : 'MySQL + localStorage'}`}
            </button>
            <button onClick={resetSettings} className="w-full bg-white/[0.06] border border-white/[0.06] py-2.5 rounded-full text-[12px] flex items-center justify-center gap-2 hover:bg-white/[0.08]">
              <RotateCcw className="w-3.5 h-3.5"/> Reset to Default (MySQL)
            </button>
            <p className="text-[10px] text-white/20 text-center mt-2">{isMySQL ? '✅ Connected to MySQL • XAMPP' : '⚠️ MySQL not connected • Using localStorage'} • Live preview instantly</p>
          </div>
        </div>

        <div className="card-dark p-5 mt-4 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20">
          <h4 className="font-bold text-[12px] flex items-center gap-2"><Eye className="w-4 h-4 text-violet-400"/> Live Preview</h4>
          <p className="text-[11px] text-white/40 mt-2">Open homepage in new tab to see changes live. No deploy needed.</p>
          <a href="/" target="_blank" className="mt-3 bg-white text-black px-4 py-2 rounded-full font-bold text-[11px] flex items-center justify-center gap-1">Preview Site <Eye className="w-3 h-3"/></a>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        {activeSub==='general' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display flex items-center gap-2"><Globe className="w-5 h-5"/> General Settings</h3>
            <p className="text-[12px] text-white/40 mt-1">Site identity — name, logo, tagline</p>
            
            <div className="mt-8 space-y-6">
              <div>
                <label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Site Name</label>
                <input value={settings.general.siteName} onChange={e=>updateSettings('general','siteName', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20"/>
                <p className="text-[10px] text-white/20 mt-1.5">Used in navbar, footer, SEO title</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Logo Icon</label>
                  <input value={settings.general.siteLogo} onChange={e=>updateSettings('general','siteLogo', e.target.value)} placeholder="⌘ or URL" className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/>
                </div>
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Tagline</label>
                  <input value={settings.general.tagline} onChange={e=>updateSettings('general','tagline', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Site Description</label>
                <textarea value={settings.general.description} onChange={e=>updateSettings('general','description', e.target.value)} rows={3} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[13px] focus:outline-none"/>
              </div>
              <div className="bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-4">
                <p className="text-[11px] font-bold text-white/20">PREVIEW</p>
                <div className="mt-3 flex items-center gap-3"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold">{settings.general.siteLogo}</div><span className="font-bold">{settings.general.siteName}</span><span className="text-white/40">.pro</span></div>
                <p className="text-[12px] text-white/40 mt-2">{settings.general.description}</p>
              </div>
            </div>
          </div>
        )}

        {activeSub==='appearance' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display flex items-center gap-2"><Palette className="w-5 h-5"/> Appearance • Colors & Theme</h3>
            <div className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Primary Color (Buttons)</label><div className="mt-2 flex gap-2"><input type="color" value={settings.appearance.primaryColor} onChange={e=>updateSettings('appearance','primaryColor', e.target.value)} className="w-12 h-10 rounded-xl bg-transparent"/><input value={settings.appearance.primaryColor} onChange={e=>updateSettings('appearance','primaryColor', e.target.value)} className="flex-1 px-4 py-2.5 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] font-mono"/></div></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Secondary (Pro Badge)</label><div className="mt-2 flex gap-2"><input type="color" value={settings.appearance.secondaryColor} onChange={e=>updateSettings('appearance','secondaryColor', e.target.value)} className="w-12 h-10 rounded-xl bg-transparent"/><input value={settings.appearance.secondaryColor} onChange={e=>updateSettings('appearance','secondaryColor', e.target.value)} className="flex-1 px-4 py-2.5 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] font-mono"/></div></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Background</label><div className="mt-2 flex gap-2"><input type="color" value={settings.appearance.backgroundColor} onChange={e=>updateSettings('appearance','backgroundColor', e.target.value)} className="w-12 h-10 rounded-xl bg-transparent"/><input value={settings.appearance.backgroundColor} onChange={e=>updateSettings('appearance','backgroundColor', e.target.value)} className="flex-1 px-4 py-2.5 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] font-mono"/></div></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Card Color</label><div className="mt-2 flex gap-2"><input type="color" value={settings.appearance.cardColor} onChange={e=>updateSettings('appearance','cardColor', e.target.value)} className="w-12 h-10 rounded-xl bg-transparent"/><input value={settings.appearance.cardColor} onChange={e=>updateSettings('appearance','cardColor', e.target.value)} className="flex-1 px-4 py-2.5 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] font-mono"/></div></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Heading Font</label><select value={settings.appearance.fontHeading} onChange={e=>updateSettings('appearance','fontHeading', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"><option>Space Grotesk</option><option>Inter</option><option>JetBrains Mono</option><option>Poppins</option></select></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Border Radius</label><select value={settings.appearance.borderRadius} onChange={e=>updateSettings('appearance','borderRadius', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"><option value="8px">Small 8px</option><option value="16px">Medium 16px</option><option value="24px">Large 24px</option><option value="9999px">Full Rounded</option></select></div>
              </div>
              <div className="bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[11px] font-bold text-white/20">COLOR PREVIEW</p>
                <div className="mt-4 flex gap-3"><div className="w-20 h-20 rounded-xl flex items-center justify-center text-black font-bold" style={{background: settings.appearance.primaryColor}}>Primary</div><div className="w-20 h-20 rounded-xl flex items-center justify-center text-black font-bold" style={{background: settings.appearance.secondaryColor}}>Secondary</div><div className="w-20 h-20 rounded-xl border flex items-center justify-center" style={{background: settings.appearance.cardColor, borderColor: settings.appearance.borderColor}}>Card</div></div>
              </div>
            </div>
          </div>
        )}

        {activeSub==='homepage' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display flex items-center gap-2"><Monitor className="w-5 h-5"/> Homepage • Hero & Features</h3>
            <div className="mt-8 space-y-6">
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Hero Badge</label><input value={settings.homepage.heroBadge} onChange={e=>updateSettings('homepage','heroBadge', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              <div className="grid md:grid-cols-3 gap-3">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Hero Title</label><input value={settings.homepage.heroTitle} onChange={e=>updateSettings('homepage','heroTitle', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Highlight (gray)</label><input value={settings.homepage.heroHighlight} onChange={e=>updateSettings('homepage','heroHighlight', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Suffix</label><input value={settings.homepage.heroSuffix} onChange={e=>updateSettings('homepage','heroSuffix', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              </div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Hero Subtitle</label><textarea value={settings.homepage.heroSubtitle} onChange={e=>updateSettings('homepage','heroSubtitle', e.target.value)} rows={3} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[13px]"/></div>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">CTA Primary</label><input value={settings.homepage.ctaPrimary} onChange={e=>updateSettings('homepage','ctaPrimary', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">CTA Secondary</label><input value={settings.homepage.ctaSecondary} onChange={e=>updateSettings('homepage','ctaSecondary', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              </div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Trusted Logos (comma separated)</label><input value={settings.homepage.trustedLogos.join(', ')} onChange={e=>updateSettings('homepage','trustedLogos', e.target.value.split(',').map(s=>s.trim()))} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              <div className="bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[11px] font-bold text-white/20">HERO PREVIEW</p>
                <div className="mt-4"><div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] px-3 py-1 rounded-full text-[11px]"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>{settings.homepage.heroBadge}</div><h2 className="display text-[32px] font-bold leading-[0.9] mt-4">{settings.homepage.heroTitle} <span className="text-white/20">{settings.homepage.heroHighlight}</span> {settings.homepage.heroSuffix}</h2><p className="text-[13px] text-white/40 mt-3 max-w-xl">{settings.homepage.heroSubtitle}</p><div className="mt-4 flex gap-2"><span className="bg-white text-black px-4 py-2 rounded-full text-[12px] font-bold">{settings.homepage.ctaPrimary}</span><span className="bg-white/[0.06] border border-white/[0.08] px-4 py-2 rounded-full text-[12px]">{settings.homepage.ctaSecondary}</span></div></div>
              </div>
            </div>
          </div>
        )}

        {activeSub==='footer' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display">Footer Settings</h3>
            <div className="mt-6 space-y-4">
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Footer Description</label><textarea value={settings.footer.description} onChange={e=>updateSettings('footer','description', e.target.value)} rows={3} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[13px]"/></div>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Email</label><input value={settings.footer.email} onChange={e=>updateSettings('footer','email', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Location</label><input value={settings.footer.location} onChange={e=>updateSettings('footer','location', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              </div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Copyright</label><input value={settings.footer.copyright} onChange={e=>updateSettings('footer','copyright', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
            </div>
          </div>
        )}

        {activeSub==='seo' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display">SEO Settings</h3>
            <div className="mt-6 space-y-4">
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Meta Title (60 chars)</label><input value={settings.seo.metaTitle} onChange={e=>updateSettings('seo','metaTitle', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/><p className="text-[10px] text-white/20 mt-1">{settings.seo.metaTitle.length}/60</p></div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Meta Description (160 chars)</label><textarea value={settings.seo.metaDescription} onChange={e=>updateSettings('seo','metaDescription', e.target.value)} rows={3} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[13px]"/><p className="text-[10px] text-white/20 mt-1">{settings.seo.metaDescription.length}/160</p></div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Keywords (comma separated)</label><input value={settings.seo.keywords} onChange={e=>updateSettings('seo','keywords', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              <div className="bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-4"><p className="text-[11px] font-bold text-white/20">GOOGLE PREVIEW</p><div className="mt-3"><p className="text-[#8ab4f8] text-[14px]">{settings.seo.metaTitle}</p><p className="text-[#4d9c3a] text-[11px]">https://{settings.general.siteName} › home</p><p className="text-[12px] text-white/60 mt-1">{settings.seo.metaDescription}</p></div></div>
            </div>
          </div>
        )}

        {activeSub==='monetization' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display flex items-center gap-2"><DollarSign className="w-5 h-5"/> Monetization & Pricing</h3>
            <div className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Razorpay Key ID</label><input value={settings.monetization.razorpayKey} onChange={e=>updateSettings('monetization','razorpayKey', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px] font-mono"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Razorpay Secret</label><input value={settings.monetization.razorpaySecret} onChange={e=>updateSettings('monetization','razorpaySecret', e.target.value)} type="password" className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px] font-mono"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Hostinger API</label><input value={settings.monetization.hostingerApi} onChange={e=>updateSettings('monetization','hostingerApi', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px] font-mono"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">AdSense ID</label><input value={settings.monetization.adsenseId} onChange={e=>updateSettings('monetization','adsenseId', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px] font-mono"/></div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Pro Price (₹)</label><input value={settings.monetization.proPrice} onChange={e=>updateSettings('monetization','proPrice', Number(e.target.value))} type="number" className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Premium Price (₹)</label><input value={settings.monetization.premiumPrice} onChange={e=>updateSettings('monetization','premiumPrice', Number(e.target.value))} type="number" className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
                <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Affiliate %</label><input value={settings.monetization.affiliateCommission} onChange={e=>updateSettings('monetization','affiliateCommission', Number(e.target.value))} type="number" className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>
              </div>
            </div>
          </div>
        )}

        {activeSub==='advanced' && (
          <div className="card-dark p-8">
            <h3 className="font-bold text-[16px] display flex items-center gap-2"><Code className="w-5 h-5"/> Advanced • Custom Code & Maintenance</h3>
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#0a0a0f] border border-white/[0.06] rounded-xl">
                <div><p className="font-bold text-[13px]">Maintenance Mode</p><p className="text-[11px] text-white/40">Show maintenance page to users</p></div>
                <button onClick={()=>updateSettings('advanced','maintenanceMode', !settings.advanced.maintenanceMode)} className={`w-12 h-6 rounded-full p-1 transition-all ${settings.advanced.maintenanceMode?'bg-green-500':'bg-white/10'}`}><div className={`w-4 h-4 bg-white rounded-full transition-all ${settings.advanced.maintenanceMode?'translate-x-6':'translate-x-0'}`}/></button>
              </div>
              {settings.advanced.maintenanceMode && <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Maintenance Message</label><input value={settings.advanced.maintenanceMessage} onChange={e=>updateSettings('advanced','maintenanceMessage', e.target.value)} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px]"/></div>}
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Custom CSS (global)</label><textarea value={settings.advanced.customCss} onChange={e=>updateSettings('advanced','customCss', e.target.value)} placeholder="/* Add custom CSS */&#10;.hero { background: red; }" rows={5} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[12px] font-mono"/></div>
              <div><label className="text-[11px] font-bold tracking-widest text-white/20 uppercase">Custom JS (footer)</label><textarea value={settings.advanced.customJs} onChange={e=>updateSettings('advanced','customJs', e.target.value)} placeholder="// Add custom JS&#10;console.log('Hello')" rows={5} className="mt-2 w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[12px] font-mono"/></div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"><p className="text-[11px] font-bold text-amber-400">⚠️ Warning</p><p className="text-[11px] text-white/40 mt-1">Custom code can break site. Test in preview first. Only admin can edit.</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
