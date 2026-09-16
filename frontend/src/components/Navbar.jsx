import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSiteSettings } from '../context/SiteSettingsContext'
import { Code2, Search, Menu, X, Crown, LogOut, BookOpen, Trophy, Rocket, LayoutDashboard, Command, FileText, Briefcase, BarChart3, Radio, Heart, Award, Map, Medal, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { settings } = useSiteSettings()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return ()=>window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#050507] border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between h-[64px] items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500" style={{background: settings.appearance.primaryColor}}>
              <span className="font-bold text-black text-[14px]">{settings.general.siteLogo}</span>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white" style={{fontFamily: settings.appearance.fontHeading}}>{settings.general.siteName.split('.')[0]}<span className="text-white/40">.{settings.general.siteName.split('.')[1]||'pro'}</span></span>
            <span className="hidden md:flex bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">v6 DARK</span>
          </Link>

          <div className="hidden xl:flex items-center gap-1 bg-[#12121a] border border-white/[0.06] p-1 rounded-full">
            <Link to="/courses" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><BookOpen className="w-3.5 h-3.5"/> Courses</Link>
            <Link to="/notes" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><FileText className="w-3.5 h-3.5"/> Notes</Link>
            <Link to="/playground" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Code2 className="w-3.5 h-3.5"/> Playground</Link>
            <Link to="/deployments" className="text-[13px] font-bold text-white bg-white/[0.08] hover:bg-white/[0.12] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Rocket className="w-3.5 h-3.5"/> Deploy</Link>
            <Link to="/quizzes" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Trophy className="w-3.5 h-3.5"/> Quizzes</Link>
            <Link to="/jobs" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Briefcase className="w-3.5 h-3.5"/> Jobs</Link>
            <Link to="/leaderboard" className="text-[13px] font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Medal className="w-3.5 h-3.5"/> Leaderboard</Link>
            <Link to="/roadmaps" className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"><Map className="w-3.5 h-3.5"/> Roadmaps</Link>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <button onClick={()=>navigate('/search')} className="w-9 h-9 bg-[#12121a] border border-white/[0.06] hover:border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-all">
              <Search className="w-4 h-4"/>
            </button>
            <Link to="/wishlist" className="w-9 h-9 bg-[#12121a] border border-white/[0.06] hover:border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-red-400 transition-all">
              <Heart className="w-4 h-4"/>
            </Link>
            <Link to="/analytics" className="w-9 h-9 bg-[#12121a] border border-white/[0.06] hover:border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all">
              <BarChart3 className="w-4 h-4"/>
            </Link>
            <Link to="/live" className="w-9 h-9 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-full flex items-center justify-center text-red-400 transition-all">
              <Radio className="w-4 h-4 animate-pulse"/>
            </Link>
            <Link to="/membership" className="flex items-center gap-1.5 text-[13px] font-bold bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-black px-4 py-2 rounded-full transition-all hover:scale-105 ml-1">
              <Crown className="w-3.5 h-3.5"/> Pro
            </Link>
            {user?.role==='admin' && <Link to="/admin" className="text-[11px] font-bold bg-red-500 text-white px-3 py-1.5 rounded-full">ADMIN</Link>}
            
            {user ? (
              <>
                <div className="flex items-center gap-2 pl-2 border-l border-white/10 ml-1">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">{user.name[0]}</div>
                  <div className="hidden xl:block text-left">
                    <p className="text-[13px] font-semibold leading-none text-white">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">{user.membership}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="w-9 h-9 bg-[#12121a] border border-white/[0.06] hover:border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all">
                  <LayoutDashboard className="w-4 h-4"/>
                </Link>
                <button onClick={handleLogout} className="w-9 h-9 bg-[#12121a] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 rounded-full flex items-center justify-center text-white/40 transition-all">
                  <LogOut className="w-4 h-4"/>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[13px] font-medium text-white/60 hover:text-white px-4 py-2 transition-colors">Log in</Link>
                <Link to="/register" className="text-[13px] font-bold bg-white text-black hover:bg-white/90 px-5 py-2 rounded-full transition-all hover:scale-105">Sign up</Link>
              </>
            )}
          </div>

          <button className="xl:hidden w-9 h-9 bg-[#12121a] border border-white/[0.06] rounded-full flex items-center justify-center text-white" onClick={()=>setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-4 h-4"/> : <Menu className="w-4 h-4"/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-white/[0.06] bg-[#050507] p-4 grid grid-cols-2 gap-2">
          <Link to="/courses" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><BookOpen className="w-4 h-4"/> Courses</Link>
          <Link to="/notes" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><FileText className="w-4 h-4"/> Notes</Link>
          <Link to="/playground" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Code2 className="w-4 h-4"/> Playground</Link>
          <Link to="/deployments" className="flex items-center gap-2 py-3 px-3 bg-white text-black rounded-xl text-[13px] font-bold"><Rocket className="w-4 h-4"/> Deploy</Link>
          <Link to="/quizzes" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Trophy className="w-4 h-4"/> Quizzes</Link>
          <Link to="/jobs" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Briefcase className="w-4 h-4"/> Jobs</Link>
          <Link to="/leaderboard" className="flex items-center gap-2 py-3 px-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-[13px] font-bold"><Medal className="w-4 h-4"/> Leaderboard</Link>
          <Link to="/roadmaps" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Map className="w-4 h-4"/> Roadmaps</Link>
          <Link to="/affiliate" className="flex items-center gap-2 py-3 px-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-[13px]"><DollarSign className="w-4 h-4"/> Affiliate</Link>
          <Link to="/live" className="flex items-center gap-2 py-3 px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px]"><Radio className="w-4 h-4"/> Live</Link>
          <Link to="/wishlist" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Heart className="w-4 h-4"/> Wishlist</Link>
          <Link to="/analytics" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><BarChart3 className="w-4 h-4"/> Analytics</Link>
          <Link to="/certificates" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Award className="w-4 h-4"/> Certificates</Link>
          <Link to="/search" className="flex items-center gap-2 py-3 px-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl text-[13px] text-white"><Search className="w-4 h-4"/> Search</Link>
          <Link to="/membership" className="col-span-2 flex items-center justify-center gap-2 py-3 bg-[#f59e0b] text-black rounded-xl text-[13px] font-bold"><Crown className="w-4 h-4"/> Pro Membership</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="col-span-2 flex items-center justify-center gap-2 py-3 bg-white/[0.06] rounded-xl text-[13px] text-white">📊 Dashboard</Link>
              {user.role==='admin' && <Link to="/admin" className="col-span-2 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl text-[13px] font-bold">🔴 Admin Dashboard</Link>}
              <button onClick={handleLogout} className="col-span-2 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px]">Logout</button>
            </>
          ) : (
            <div className="col-span-2 flex gap-2 pt-2">
              <Link to="/login" className="flex-1 text-center py-3 border border-white/10 rounded-full text-[13px] text-white">Log in</Link>
              <Link to="/register" className="flex-1 text-center py-3 bg-white text-black rounded-full text-[13px] font-bold">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
