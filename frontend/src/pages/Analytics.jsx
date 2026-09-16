import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { TrendingUp, Award, Target, Zap, Flame, Trophy, Command, BarChart3, Clock, BookOpen } from 'lucide-react'
import { RevenueChart, MembershipPie, ProgressLine } from '../components/RechartsAnalytics'

export default function Analytics() {
  const { API } = useAuth()
  const [data, setData] = useState({
    xp: 1240, level: 8, streak: 12, avg_progress: 68, certificates: 2, enrollments: 4, quizzes_taken: 18, avg_score: 82,
    xpHistory: [
      { reason:'Completed React Hooks lesson', xp_earned: 10 },
      { reason:'Quiz perfect score', xp_earned: 25 },
      { reason:'Daily streak bonus', xp_earned: 15 },
      { reason:'AI tutor question', xp_earned: 5 },
    ]
  })
  const [leaderboard, setLeaderboard] = useState([
    { name:'Aarav Sharma', xp: 2840, membership:'pro', streak_days: 24 },
    { name:'Priya Patel', xp: 2120, membership:'premium', streak_days: 18 },
    { name:'Rohan Gupta', xp: 1890, membership:'pro', streak_days: 12 },
    { name:'You', xp: 1240, membership:'free', streak_days: 12 },
  ])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    const headers = { Authorization: `Bearer ${token}` }
    axios.get(`${API}/api/analytics/my-stats`, { headers }).then(r=>setData(r.data)).catch(()=>{})
    axios.get(`${API}/api/analytics/leaderboard`, { headers }).then(r=>setLeaderboard(r.data)).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> ANALYTICS / MY STATS</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="display text-[36px] font-bold tracking-tight">Your Learning Analytics</h1>
            <p className="text-white/40 mt-1 text-[14px]">XP, streaks, progress — gamified learning • Level {data.level} • Keep shipping 🚀</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40 flex items-center gap-1"><BarChart3 className="w-3 h-3"/> Recharts</span>
            <span className="text-[11px] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-3 py-1.5 rounded-full font-bold">PWA Ready</span>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          <div className="bg-white text-black rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -mr-8 -mt-8"/>
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white"/></div>
              <span className="text-[10px] bg-black text-white px-2 py-1 rounded-full font-bold">LVL {data.level}</span>
            </div>
            <p className="text-[32px] font-bold mt-4 display">{data.xp} XP</p>
            <div className="mt-3 w-full bg-black/10 h-1.5 rounded-full"><div className="bg-black h-1.5 rounded-full" style={{width:`${(data.xp%100)}%`}}/></div>
            <p className="text-[11px] text-black/50 mt-2">{100 - (data.xp%100)} XP to next level • {data.level*100} total needed</p>
          </div>
          <div className="card-dark p-6 hover:border-orange-500/20 group">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center"><Flame className="w-5 h-5 text-orange-400"/></div>
            <p className="text-[32px] font-bold mt-4 display flex items-center gap-2">{data.streak} <span className="text-[20px]">🔥</span></p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Day Streak</p>
            <p className="text-[11px] text-green-400 mt-2">Best: 24 days • Keep it!</p>
          </div>
          <div className="card-dark p-6">
            <div className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-xl flex items-center justify-center"><Target className="w-5 h-5 text-white/60"/></div>
            <p className="text-[32px] font-bold mt-4 display">{data.avg_progress}%</p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Avg Progress</p>
            <div className="mt-3 w-full bg-white/[0.06] h-1 rounded-full"><div className="bg-white h-1 rounded-full" style={{width:`${data.avg_progress}%`}}/></div>
          </div>
          <div className="card-dark p-6">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center"><Award className="w-5 h-5 text-amber-400"/></div>
            <p className="text-[32px] font-bold mt-4 display">{data.certificates}</p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Certificates</p>
            <p className="text-[11px] text-white/20 mt-2">2 more in progress</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-dark p-6">
              <h3 className="font-semibold text-[14px] display flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Progress Overview</h3>
              <div className="mt-6">
                <ProgressLine />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[11px] text-white/30"><BookOpen className="w-3 h-3"/> Enrollments</div>
                  <p className="text-[20px] font-bold mt-2">{data.enrollments}</p>
                  <div className="w-full bg-white/[0.06] h-1 rounded-full mt-2"><div className="bg-blue-500 h-1 rounded-full" style={{width:`${Math.min(data.enrollments*20,100)}%`}}/></div>
                </div>
                <div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[11px] text-white/30"><Trophy className="w-3 h-3"/> Quizzes</div>
                  <p className="text-[20px] font-bold mt-2">{data.quizzes_taken}</p>
                  <p className="text-[11px] text-green-400">{data.avg_score}% avg</p>
                </div>
                <div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[11px] text-white/30"><Clock className="w-3 h-3"/> Hours</div>
                  <p className="text-[20px] font-bold mt-2">42h</p>
                  <p className="text-[11px] text-white/20">This month</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="card-dark p-6">
                <h3 className="font-semibold text-[13px] display">Revenue Chart</h3>
                <div className="mt-4"><RevenueChart /></div>
              </div>
              <div className="card-dark p-6">
                <h3 className="font-semibold text-[13px] display">Membership Split</h3>
                <div className="mt-4"><MembershipPie /></div>
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="font-semibold text-[13px] display">XP History</h3>
              <div className="mt-5 space-y-2">
                {data.xpHistory?.map((x,i)=>(
                  <div key={i} className="flex justify-between items-center p-3.5 bg-[#0a0a0f] border border-white/[0.04] hover:border-white/[0.08] rounded-xl text-[13px] transition-colors">
                    <span className="text-white/70">{x.reason}</span><span className="font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full text-[11px]">+{x.xp_earned} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-dark p-6">
              <h3 className="font-semibold text-[14px] display flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-400"/> Leaderboard</h3>
              <p className="text-[11px] text-white/30 mt-1">Top learners this week</p>
              <div className="mt-6 space-y-3">
                {leaderboard.map((u,i)=>(
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${u.name==='You' ? 'bg-white text-black border-white' : 'bg-[#0a0a0f] border-white/[0.04] hover:border-white/[0.08]'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${i===0?'bg-amber-400 text-black':i===1?'bg-white/20 text-white':i===2?'bg-amber-700 text-white':'bg-white/[0.06] text-white/40'}`}>{i+1}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${u.name==='You' ? 'bg-black text-white' : 'bg-gradient-to-br from-blue-600 to-violet-600 text-white'}`}>{u.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-[12px] truncate ${u.name==='You' ? 'text-black' : 'text-white'}`}>{u.name}</p>
                      <p className={`text-[10px] truncate ${u.name==='You' ? 'text-black/50' : 'text-white/30'}`}>{u.membership} • {u.streak_days}🔥</p>
                    </div>
                    <span className={`font-bold text-[12px] ${u.name==='You' ? 'text-black' : 'text-white'}`}>{u.xp} XP</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-white/[0.06] border border-white/[0.06] py-2.5 rounded-full text-[12px] font-medium hover:bg-white/[0.08]">View Full Leaderboard</button>
            </div>

            <div className="bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/[0.06] rounded-2xl p-6">
              <h4 className="font-bold text-[13px] display">How to earn XP?</h4>
              <ul className="mt-4 space-y-2.5 text-[12px]">
                <li className="flex justify-between p-2.5 bg-white/[0.04] rounded-xl"><span className="text-white/60">Complete lesson</span><span className="font-bold text-green-400">+10 XP</span></li>
                <li className="flex justify-between p-2.5 bg-white/[0.04] rounded-xl"><span className="text-white/60">Quiz perfect</span><span className="font-bold text-green-400">+25 XP</span></li>
                <li className="flex justify-between p-2.5 bg-white/[0.04] rounded-xl"><span className="text-white/60">AI tutor Q</span><span className="font-bold text-green-400">+5 XP</span></li>
                <li className="flex justify-between p-2.5 bg-white/[0.04] rounded-xl"><span className="text-white/60">Code run</span><span className="font-bold text-green-400">+3 XP</span></li>
                <li className="flex justify-between p-2.5 bg-white/[0.04] rounded-xl"><span className="text-white/60">Daily streak</span><span className="font-bold text-amber-400">+15 XP</span></li>
                <li className="flex justify-between p-2.5 bg-white text-black rounded-xl font-bold"><span>Course complete</span><span>+100 XP</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
