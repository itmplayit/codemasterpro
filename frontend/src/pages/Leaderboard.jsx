import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Trophy, Crown, Flame, Zap, Target, Medal, Command, TrendingUp, Award, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Leaderboard() {
  const { API, user } = useAuth()
  const [activeTab, setActiveTab] = useState('weekly')
  const [category, setCategory] = useState('overall')
  const [leaderboard, setLeaderboard] = useState([
    { id:1, name:'Aarav Sharma', xp: 4850, level: 15, streak_days: 42, membership:'premium', courses_completed: 12, quizzes_taken: 89, avg_score: 94, avatar:'AS' },
    { id:2, name:'Priya Patel', xp: 4120, level: 13, streak_days: 38, membership:'pro', courses_completed: 9, quizzes_taken: 67, avg_score: 91, avatar:'PP' },
    { id:3, name:'Rohan Gupta', xp: 3890, level: 12, streak_days: 31, membership:'pro', courses_completed: 8, quizzes_taken: 72, avg_score: 88, avatar:'RG' },
    { id:4, name:'Anjali Singh', xp: 3240, level: 11, streak_days: 28, membership:'premium', courses_completed: 7, quizzes_taken: 54, avg_score: 92, avatar:'AS' },
    { id:5, name:'Vikram Mehta', xp: 2980, level: 10, streak_days: 24, membership:'free', courses_completed: 6, quizzes_taken: 48, avg_score: 85, avatar:'VM' },
    { id:6, name:'Sneha Reddy', xp: 2760, level: 9, streak_days: 22, membership:'pro', courses_completed: 5, quizzes_taken: 61, avg_score: 89, avatar:'SR' },
    { id:7, name:'Arjun Kumar', xp: 2450, level: 8, streak_days: 18, membership:'free', courses_completed: 4, quizzes_taken: 39, avg_score: 82, avatar:'AK' },
    { id:8, name:'You', xp: 1240, level: 8, streak_days: 12, membership:'free', courses_completed: 4, quizzes_taken: 18, avg_score: 82, avatar:'YO', isYou: true },
  ])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    axios.get(`${API}/api/analytics/leaderboard?period=${activeTab}&category=${category}`, { headers })
      .then(r=>{ if(r.data?.length) setLeaderboard(r.data) })
      .catch(()=>{})
  }, [activeTab, category])

  const top3 = leaderboard.slice(0,3)
  const rest = leaderboard.slice(3)

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> LEADERBOARD / GLOBAL</div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="display text-[48px] font-bold tracking-tight leading-[0.9]">Leaderboard that<br/><span className="text-white/20">rewards you.</span></h1>
            <p className="text-white/40 mt-4 max-w-xl text-[14px]">Compete with 50k+ developers. Earn XP, keep streak, win prizes — Top 10 get Pro free + referrals.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#12121a] border border-white/[0.06] p-1 rounded-full">
              {[
                {k:'weekly', l:'Weekly'},
                {k:'monthly', l:'Monthly'},
                {k:'all', l:'All Time'},
              ].map(t=>(
                <button key={t.k} onClick={()=>setActiveTab(t.k)} className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${activeTab===t.k ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>{t.l}</button>
              ))}
            </div>
            <span className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-bold flex items-center gap-1"><Crown className="w-3 h-3"/> Season 6</span>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {[
            {k:'overall', l:'Overall', icon: Trophy},
            {k:'courses', l:'Courses', icon: Award},
            {k:'quizzes', l:'Quizzes', icon: Target},
            {k:'streak', l:'Streaks', icon: Flame},
          ].map(c=>(
            <button key={c.k} onClick={()=>setCategory(c.k)} className={`px-4 py-2 rounded-full text-[12px] font-medium border flex items-center gap-1.5 transition-all ${category===c.k ? 'bg-white text-black border-white' : 'bg-[#12121a] border-white/[0.06] text-white/40 hover:text-white hover:border-white/10'}`}>
              <c.icon className="w-3.5 h-3.5"/> {c.l}
            </button>
          ))}
        </div>

        {/* Podium - Top 3 */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
          {/* 2nd */}
          <div className="order-2 md:order-1 card-dark p-6 text-center border-white/[0.08] hover:border-white/10 transition-all md:mb-8">
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-black font-bold text-xl">{top3[1]?.avatar}</div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold text-[11px]">2</div>
            </div>
            <p className="font-bold text-[15px] mt-4 display">{top3[1]?.name}</p>
            <p className="text-[11px] text-white/30 mt-1">{top3[1]?.membership} • {top3[1]?.streak_days}🔥</p>
            <div className="mt-4 bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[20px] font-bold display">{top3[1]?.xp} XP</p>
              <p className="text-[10px] text-white/30 uppercase">Level {top3[1]?.level}</p>
            </div>
          </div>

          {/* 1st */}
          <div className="order-1 md:order-2 bg-white text-black rounded-[20px] p-7 text-center relative overflow-hidden border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"/>
            <Crown className="w-8 h-8 text-amber-500 mx-auto animate-pulse"/>
            <div className="relative mx-auto w-24 h-24 mt-3">
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center font-bold text-2xl">{top3[0]?.avatar}</div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xs">1</div>
            </div>
            <p className="font-bold text-[18px] mt-4 display">{top3[0]?.name}</p>
            <p className="text-[11px] text-black/50 mt-1">{top3[0]?.membership} • {top3[0]?.streak_days}🔥 • {top3[0]?.courses_completed} courses</p>
            <div className="mt-5 bg-black text-white rounded-xl p-3">
              <p className="text-[24px] font-bold display flex items-center justify-center gap-2"><Zap className="w-5 h-5 text-amber-400"/> {top3[0]?.xp} XP</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wide">Level {top3[0]?.level} • {top3[0]?.avg_score}% avg</p>
            </div>
            <p className="text-[10px] font-bold bg-amber-400 text-black px-3 py-1 rounded-full mt-4 inline-block">🏆 WINS PRO FREE 1 YEAR</p>
          </div>

          {/* 3rd */}
          <div className="order-3 card-dark p-6 text-center border-amber-700/20 hover:border-amber-700/30 transition-all md:mb-8">
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-white font-bold text-xl">{top3[2]?.avatar}</div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-[11px]">3</div>
            </div>
            <p className="font-bold text-[15px] mt-4 display">{top3[2]?.name}</p>
            <p className="text-[11px] text-white/30 mt-1">{top3[2]?.membership} • {top3[2]?.streak_days}🔥</p>
            <div className="mt-4 bg-[#0a0a0f] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[20px] font-bold display">{top3[2]?.xp} XP</p>
              <p className="text-[10px] text-white/30 uppercase">Level {top3[2]?.level}</p>
            </div>
          </div>
        </div>

        {/* Rest of leaderboard */}
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card-dark p-0 overflow-hidden">
              <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
                <h3 className="font-bold text-[14px] display flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-400"/> Global Rankings • {activeTab}</h3>
                <span className="text-[11px] text-white/20 flex items-center gap-1"><Users className="w-3 h-3"/> {leaderboard.length} learners</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {rest.map((u, idx)=>{
                  const rank = idx + 4
                  return (
                    <div key={u.id} className={`flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors ${u.isYou ? 'bg-white text-black' : ''}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${u.isYou ? 'bg-black text-white' : 'bg-white/[0.06] text-white/40'}`}>{rank}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] ${u.isYou ? 'bg-black text-white' : 'bg-[#12121a] border border-white/[0.06] text-white'}`}>{u.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold text-[13px] truncate ${u.isYou ? 'text-black' : 'text-white'}`}>{u.name} {u.isYou && <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1">YOU</span>}</p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${u.membership==='premium' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : u.membership==='pro' ? 'bg-violet-500/10 border border-violet-500/20 text-violet-400' : 'bg-white/[0.06] border border-white/[0.06] text-white/30'}`}>{u.membership}</span>
                        </div>
                        <div className="flex gap-3 mt-1 text-[11px]">
                          <span className={`${u.isYou ? 'text-black/50' : 'text-white/30'} flex items-center gap-1`}><Flame className="w-3 h-3"/> {u.streak_days} days</span>
                          <span className={`${u.isYou ? 'text-black/50' : 'text-white/30'}`}>{u.courses_completed} courses</span>
                          <span className={`${u.isYou ? 'text-black/50' : 'text-white/30'}`}>{u.quizzes_taken} quizzes</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-[14px] display ${u.isYou ? 'text-black' : 'text-white'}`}>{u.xp} XP</p>
                        <p className={`text-[10px] ${u.isYou ? 'text-black/50' : 'text-white/30'}`}>Lvl {u.level} • {u.avg_score}%</p>
                      </div>
                      <div className={`hidden md:flex w-20 h-1.5 rounded-full overflow-hidden ${u.isYou ? 'bg-black/10' : 'bg-white/[0.06]'}`}>
                        <div className={`h-full ${u.isYou ? 'bg-black' : 'bg-white'}`} style={{width: `${Math.min((u.xp/5000)*100,100)}%`}}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="bg-white/[0.06] border border-white/[0.06] px-6 py-2.5 rounded-full text-[12px] font-medium hover:bg-white/[0.08]">Load more • Top 100</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-dark p-6">
              <h4 className="font-bold text-[13px] display flex items-center gap-2"><Star className="w-4 h-4 text-amber-400"/> Rewards</h4>
              <div className="mt-5 space-y-3">
                <div className="flex gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                  <Trophy className="w-8 h-8 text-amber-400 shrink-0"/>
                  <div><p className="font-bold text-[12px]">Top 1 • Pro Free 1 Year</p><p className="text-[11px] text-white/40">Worth ₹5,988 + certificate + referral bonus</p></div>
                </div>
                <div className="flex gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                  <Medal className="w-8 h-8 text-gray-300 shrink-0"/>
                  <div><p className="font-bold text-[12px]">Top 2-3 • Pro Free 6 Months</p><p className="text-[11px] text-white/40">Worth ₹2,994 + LinkedIn shoutout</p></div>
                </div>
                <div className="flex gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                  <Award className="w-8 h-8 text-amber-700 shrink-0"/>
                  <div><p className="font-bold text-[12px]">Top 4-10 • Pro Free 1 Month</p><p className="text-[11px] text-white/40">Worth ₹499 + early access</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white text-black rounded-2xl p-6">
              <h4 className="font-bold text-[13px] display flex items-center gap-2"><Zap className="w-4 h-4"/> How to earn XP?</h4>
              <div className="mt-4 space-y-2.5 text-[12px]">
                <div className="flex justify-between"><span className="text-black/60">Complete lesson</span><span className="font-bold bg-black text-white px-2 py-0.5 rounded-full text-[10px]">+10 XP</span></div>
                <div className="flex justify-between"><span className="text-black/60">Quiz perfect (100%)</span><span className="font-bold bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px]">+25 XP</span></div>
                <div className="flex justify-between"><span className="text-black/60">Daily streak</span><span className="font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px]">+15 XP</span></div>
                <div className="flex justify-between"><span className="text-black/60">Course complete</span><span className="font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full text-[10px]">+100 XP</span></div>
                <div className="flex justify-between"><span className="text-black/60">AI tutor question</span><span className="font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px]">+5 XP</span></div>
              </div>
              <Link to="/courses" className="mt-5 bg-black text-white w-full py-2.5 rounded-full font-bold text-[12px] flex items-center justify-center gap-2">Start Earning XP <TrendingUp className="w-3.5 h-3.5"/></Link>
            </div>

            <div className="card-dark p-6 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20">
              <h4 className="font-bold text-[13px] display">Your Rank</h4>
              <div className="mt-4 text-center">
                <p className="text-[36px] font-bold display">#42</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wide">Global • Top 15%</p>
                <div className="mt-4 w-full bg-white/[0.06] h-2 rounded-full"><div className="bg-white h-2 rounded-full w-[65%]"/></div>
                <p className="text-[11px] text-white/30 mt-2">320 XP to Top 25 • Keep shipping!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
