import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useSiteSettings } from '../context/SiteSettingsContext'
import CourseCard from '../components/CourseCard'
import { ArrowRight, Check, Command, Zap, Globe, Layers, Cpu, Database, Github, Terminal, Sparkles } from 'lucide-react'

export default function Home() {
  const { API } = useAuth()
  const { settings } = useSiteSettings()
  const [courses, setCourses] = useState([
    { id:1, title:'Complete JavaScript Mastery 2025', slug:'complete-javascript-mastery-2025', short_desc:'Become a JS expert with hands-on projects, ES6+, async, DOM', thumbnail:'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600', category_name:'JavaScript', level:'beginner', duration_hours:24.5, total_students:1240, rating:4.8, price:499, original_price:1999, is_free:false, is_featured:true, membership_required:'free' },
    { id:2, title:'ReactJS - The Complete Guide', slug:'reactjs-complete-guide', short_desc:'Learn ReactJS with hooks, context, redux, router and build 5 real projects', thumbnail:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', category_name:'ReactJS', level:'intermediate', duration_hours:32, total_students:980, rating:4.9, price:799, original_price:2999, is_free:false, is_featured:true, membership_required:'pro' },
    { id:3, title:'Python for Data Structures', slug:'python-dsa', short_desc:'Crack FAANG interviews with Python DSA. 200+ problems', thumbnail:'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600', category_name:'DSA', level:'intermediate', duration_hours:40, total_students:2100, rating:4.7, price:0, original_price:0, is_free:true, is_featured:true, membership_required:'free' }
  ])

  useEffect(() => {
    axios.get(`${API}/api/courses?featured=true`).then(r=>{
      if (r.data?.length) setCourses(r.data.slice(0,6))
    }).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Hero - New Dark Premium */}
      <section className="relative">
        <div className="absolute inset-0 grid-dark"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050507]"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-blue-600/20 via-violet-600/10 to-transparent rounded-full blur-3xl"/>
        
        <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] backdrop-blur px-3 py-1 rounded-full text-[11px] font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
              <span className="text-white/60">New:</span> <span className="text-white">{settings.homepage.heroBadge}</span>
              <ArrowRight className="w-3 h-3 text-white/40"/>
            </div>

            <h1 className="display text-[48px] md:text-[84px] font-bold leading-[0.9] tracking-[-0.04em] mt-8" style={{fontFamily: settings.appearance.fontHeading}}>
              {settings.homepage.heroTitle}
              <br/>
              <span className="text-white/20">{settings.homepage.heroHighlight}</span> {settings.homepage.heroSuffix}
            </h1>

            <p className="text-[18px] leading-[1.6] text-white/40 max-w-2xl mt-6">
              {settings.homepage.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/register" className="bg-white text-black px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-white/90 transition-all hover:scale-[1.02] flex items-center gap-2" style={{background: settings.appearance.primaryColor, color: '#000'}}>
                {settings.homepage.ctaPrimary} <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/playground" className="bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.08] text-white px-6 py-3 rounded-full font-medium text-[14px] transition-all flex items-center gap-2">
                <Terminal className="w-4 h-4"/> {settings.homepage.ctaSecondary}
              </Link>
              <div className="flex items-center gap-2 text-[12px] text-white/30 ml-2">
                <span className="flex items-center gap-1"><Check className="w-3 h-3"/> Free</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3"/> No CC</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3"/> Deploy 1 free</span>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-8 text-[12px] text-white/20">
              <span>{settings.homepage.trustedTitle}</span>
              <div className="flex items-center gap-6 font-bold tracking-widest text-white/40">
                {settings.homepage.trustedLogos.map((logo,i)=><span key={i}>{logo}</span>)}
              </div>
            </div>
          </div>

          {/* Code Preview - New Design */}
          <div className="mt-16 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 card-dark p-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-white/10"/><div className="w-3 h-3 rounded-full bg-white/10"/><div className="w-3 h-3 rounded-full bg-white/10"/></div>
                  <span className="ml-3 text-[11px] text-white/30 mono">App.jsx • CodeMaster Pro</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> Live • XAMPP MySQL Connected
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <pre className="mono text-[12px] leading-[1.7] text-white/60">
{`// One-Click Deploy in 10s
import { deploy } from '@codemaster/pro'

function MyApp() {
  const project = useProject({
    code: playground.code,
    mysql: true
  })

  const handleDeploy = async () => {
    const url = await deploy({
      subdomain: 'my-app',
      host: 'hostinger'
    })
    // Live: https://my-app.codemasterpro.in
    return url
  }

  return <Button onClick={handleDeploy}>
    🚀 Deploy
  </Button>
}`}
                </pre>
                <div className="space-y-3">
                  <div className="bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[11px] text-white/40"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> Build Logs</div>
                    <div className="mono text-[10px] text-white/30 mt-3 space-y-1">
                      <div>✓ Creating subdomain</div>
                      <div>✓ Installing deps</div>
                      <div>✓ Building React</div>
                      <div>✓ Uploading to Hostinger</div>
                      <div className="text-green-400">✓ Live in 8.2s → https://my-app.codemasterpro.in</div>
                    </div>
                  </div>
                  <div className="bg-white text-black rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">J</div>
                      <div><p className="font-bold text-[13px] leading-none">John deployed</p><p className="text-[11px] text-black/50 mt-1">Todo App • 2 min ago • 42 visits</p></div>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white"/></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="card-dark p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-4"><Layers className="w-3 h-3"/> STACK</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"><div className="w-8 h-8 bg-[#61DAFB] rounded-lg flex items-center justify-center text-black font-bold text-xs">⚛️</div><p className="font-semibold text-[12px] mt-2">React 18</p><p className="text-[10px] text-white/30">Vite + Router</p></div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"><div className="w-8 h-8 bg-[#4479A1] rounded-lg flex items-center justify-center text-white font-bold text-xs">My</div><p className="font-semibold text-[12px] mt-2">MySQL</p><p className="text-[10px] text-white/30">XAMPP Ready</p></div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"><div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">Rz</div><p className="font-semibold text-[12px] mt-2">Razorpay</p><p className="text-[10px] text-white/30">UPI + Cards</p></div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"><div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center text-white font-bold text-xs">H</div><p className="font-semibold text-[12px] mt-2">Hostinger</p><p className="text-[10px] text-white/30">One-Click Deploy</p></div>
                </div>
              </div>

              <div className="card-dark p-5 bg-gradient-to-br from-violet-600/20 to-blue-600/20 border-violet-500/20">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-violet-300 mb-3"><Sparkles className="w-3 h-3"/> AI TUTOR</div>
                <p className="text-[13px] leading-[1.5] text-white/80">"Explain closures in Hinglish"</p>
                <p className="text-[12px] text-white/40 mt-2 leading-relaxed">Arre bhai closure matlab function ke andar function, bahar wala variable yaad rakhta hai... 💡</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">Hinglish</span>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">Voice</span>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+5 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - New Minimal */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4"><Zap className="w-5 h-5 text-black"/></div>
            <h3 className="font-semibold text-[14px] display">One-Click Deploy</h3>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">Playground se live website in 10s. Hostinger powered, SSL auto, subdomain. Free 1, Pro 10 projects.</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-[#12121a] border border-white/[0.06] rounded-xl flex items-center justify-center mb-4"><Cpu className="w-5 h-5 text-white/60"/></div>
            <h3 className="font-semibold text-[14px] display">AI Tutor</h3>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">GPT-4 tutor + XAMPP error solver. Hinglish + voice. Paste error, get solution in 5 sec.</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-[#12121a] border border-white/[0.06] rounded-xl flex items-center justify-center mb-4"><Database className="w-5 h-5 text-white/60"/></div>
            <h3 className="font-semibold text-[14px] display">XAMPP MySQL</h3>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">Built for Indian colleges. Schema + seed + Docker + deploy.sh. Hostinger VPS ready.</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-[#12121a] border border-white/[0.06] rounded-xl flex items-center justify-center mb-4"><Github className="w-5 h-5 text-white/60"/></div>
            <h3 className="font-semibold text-[14px] display">Earn ₹50k/mo</h3>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">Memberships ₹499 + AdSense + Jobs ₹1999/post + Affiliate. 10k visitors = ₹62k/month.</p>
          </div>
        </div>
      </section>

      {/* Courses - New */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="display text-[28px] font-bold tracking-tight">Featured courses</h2>
          <Link to="/courses" className="text-[13px] text-white/40 hover:text-white flex items-center gap-1">View all <ArrowRight className="w-3 h-3"/></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {courses.map(c=> <CourseCard key={c.id} course={c}/>)}
        </div>
      </section>

      {/* CTA - New */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="card-dark border-white/[0.08] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent"/>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 rounded-full blur-3xl"/>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] px-3 py-1 rounded-full text-[11px] font-medium mb-6"><Globe className="w-3 h-3"/> Bhopal, MP → Worldwide</div>
            <h2 className="display text-[36px] md:text-[48px] font-bold tracking-tight leading-[0.9]">Build in Bhopal.<br/><span className="text-white/20">Ship worldwide.</span></h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto text-[14px]">Join 50k+ developers. React + MySQL (XAMPP) + Razorpay + One-Click Deploy. Free forever, deploy 1 project free.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/register" className="bg-white text-black px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-white/90">Start building</Link>
              <Link to="/about" className="bg-white/[0.06] border border-white/[0.08] text-white px-6 py-3 rounded-full font-medium text-[14px] hover:bg-white/[0.08]">Our story</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
