import { Command } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  return (
    <footer className="bg-[#050507] border-t border-white/[0.06] mt-20">
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center" style={{background: settings.appearance.primaryColor}}><span className="font-bold text-black text-[12px]">{settings.general.siteLogo}</span></div>
            <span className="font-bold text-[14px] display text-white" style={{fontFamily: settings.appearance.fontHeading}}>{settings.general.siteName}</span>
            <span className="bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">v6 DARK</span>
          </div>
          <p className="text-[13px] text-white/40 mt-4 leading-relaxed max-w-sm">{settings.footer.description}</p>
          <div className="mt-6 flex gap-2 flex-wrap">
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full text-white/40">XAMPP</span>
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full text-white/40">React</span>
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full text-white/40">MySQL</span>
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full text-white/40">Razorpay</span>
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full text-white/40">Hostinger</span>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-4 tracking-wide">Product</h4>
          <ul className="space-y-2.5 text-[13px] text-white/40">
            <li><Link to="/courses" className="hover:text-white transition flex items-center gap-2">📚 Courses</Link></li>
            <li><Link to="/notes" className="hover:text-white transition flex items-center gap-2">📄 Notes</Link></li>
            <li><Link to="/playground" className="hover:text-white transition flex items-center gap-2">💻 Playground</Link></li>
            <li><Link to="/deployments" className="hover:text-white transition flex items-center gap-2">🚀 Deployments</Link></li>
            <li><Link to="/quizzes" className="hover:text-white transition flex items-center gap-2">🧠 Quizzes</Link></li>
            <li><Link to="/roadmaps" className="hover:text-white transition flex items-center gap-2">🗺️ Roadmaps</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-4 tracking-wide">Earn</h4>
          <ul className="space-y-2.5 text-[13px] text-white/40">
            <li><Link to="/membership" className="hover:text-white transition flex items-center gap-2">👑 Pro Membership</Link></li>
            <li><Link to="/jobs" className="hover:text-white transition flex items-center gap-2">💼 Job Board</Link></li>
            <li><Link to="/affiliate" className="hover:text-white transition flex items-center gap-2">💰 Affiliate <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold">30%</span></Link></li>
            <li><Link to="/instructor" className="hover:text-white transition flex items-center gap-2">🎓 Instructor</Link></li>
            <li><Link to="/live" className="hover:text-white transition flex items-center gap-2">🔴 Live Classes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-4 tracking-wide">Company</h4>
          <ul className="space-y-2.5 text-[13px] text-white/40">
            <li><Link to="/leaderboard" className="hover:text-white transition flex items-center gap-2">🏆 Leaderboard <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold">NEW</span></Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
            <li><Link to="/analytics" className="hover:text-white transition">Analytics</Link></li>
            <li className="pt-2 border-t border-white/[0.06] mt-3">
              <span className="text-white/60">{settings.footer.location}</span><br/>
              <span className="text-white/20 text-[11px]">Built for Indian colleges</span><br/>
              <span className="text-white/60 text-[12px] mt-1 block">{settings.footer.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/20 max-w-[1400px] mx-auto">
        <span>{settings.footer.copyright} 50k+ students, 1200+ hired.</span>
        <span className="flex gap-4">
          <Link to="/privacy" className="hover:text-white/40 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-white/40 transition">Terms</Link>
          <Link to="/about" className="hover:text-white/40 transition">About</Link>
          <span className="bg-white text-black px-2 py-0.5 rounded-full font-bold text-[9px]">v6 DARK</span>
        </span>
      </div>
    </footer>
  )
}
