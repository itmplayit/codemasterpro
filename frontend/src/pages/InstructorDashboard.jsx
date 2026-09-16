import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Users, BookOpen, DollarSign, Video, TrendingUp, Command, Award, Calendar, Eye, Edit, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function InstructorDashboard() {
  const { API } = useAuth()
  const [data, setData] = useState({
    stats: { courses: 4, students: 1240, lessons: 86, earnings: 28450 },
    courses: [
      { id:1, title:'Complete JavaScript Mastery 2025', enrollments: 540, lesson_count: 24, price: 499, thumbnail:'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=200' },
      { id:2, title:'ReactJS - The Complete Guide', enrollments: 320, lesson_count: 32, price: 799, thumbnail:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200' },
    ],
    recentEnrollments: [
      { id:1, name:'Aarav Sharma', title:'JavaScript Mastery', enrolled_at: new Date() },
      { id:2, name:'Priya Patel', title:'React Guide', enrolled_at: new Date(Date.now()-86400000) },
      { id:3, name:'Rohan Gupta', title:'JavaScript Mastery', enrolled_at: new Date(Date.now()-172800000) },
    ]
  })

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    axios.get(`${API}/api/instructor/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>setData(r.data))
      .catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> INSTRUCTOR / DASHBOARD</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="display text-[36px] font-bold tracking-tight">Instructor Dashboard</h1>
            <p className="text-white/40 mt-1 text-[14px]">Teach, earn, grow — <span className="bg-white text-black px-2 py-0.5 rounded-full text-[11px] font-bold">70% revenue share</span> • ₹28,450 earned</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin" className="bg-white/[0.06] border border-white/[0.06] px-4 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Analytics</Link>
            <button className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2">+ New Course</button>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          <div className="card-dark p-6 group hover:border-white/10 transition-all">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center"><BookOpen className="w-5 h-5 text-black"/></div>
            <p className="text-[32px] font-bold mt-4 display">{data.stats.courses}</p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Courses</p>
            <p className="text-[11px] text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +2 this month</p>
          </div>
          <div className="card-dark p-6">
            <div className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-white/60"/></div>
            <p className="text-[32px] font-bold mt-4 display">{data.stats.students}</p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Students</p>
            <p className="text-[11px] text-green-400 mt-2">+124 this week</p>
          </div>
          <div className="card-dark p-6">
            <div className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-xl flex items-center justify-center"><Video className="w-5 h-5 text-white/60"/></div>
            <p className="text-[32px] font-bold mt-4 display">{data.stats.lessons}</p>
            <p className="text-[11px] tracking-wide text-white/30 uppercase">Lessons</p>
            <p className="text-[11px] text-white/20 mt-2">86% completion avg</p>
          </div>
          <div className="bg-white text-black rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -mr-8 -mt-8"/>
            <DollarSign className="w-8 h-8"/>
            <p className="text-[32px] font-bold mt-3 display">₹{data.stats.earnings.toLocaleString()}</p>
            <p className="text-[11px] tracking-wide text-black/50 uppercase">Total Earnings (70%)</p>
            <p className="text-[11px] font-bold mt-2">Next payout: 1st Feb</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-dark p-0 overflow-hidden">
            <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
              <h3 className="font-semibold text-[14px] display">My Courses</h3>
              <span className="text-[11px] text-white/20">{data.courses.length} courses</span>
            </div>
            <div className="p-3 space-y-2">
              {data.courses.map(c=>(
                <div key={c.id} className="flex items-center gap-4 p-4 bg-[#0a0a0f] border border-white/[0.04] hover:border-white/[0.08] rounded-xl group transition-all">
                  <img src={c.thumbnail} className="w-20 h-12 object-cover rounded-lg"/>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] truncate group-hover:text-white">{c.title}</p>
                    <div className="flex gap-3 mt-1 text-[11px] text-white/30">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{c.enrollments} students</span>
                      <span className="flex items-center gap-1"><Video className="w-3 h-3"/>{c.lesson_count} lessons</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> 1.2k views</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[14px]">₹{c.price}</p>
                    <p className="text-[11px] text-green-400">70% • ₹{Math.round(c.price*0.7)}</p>
                  </div>
                  <button className="w-8 h-8 bg-white/[0.06] border border-white/[0.06] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Edit className="w-3.5 h-3.5"/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-dark p-6">
              <h3 className="font-semibold text-[14px] display flex items-center gap-2"><Calendar className="w-4 h-4"/> Recent Enrollments</h3>
              <div className="mt-5 space-y-3">
                {data.recentEnrollments.map(e=>(
                  <div key={e.id} className="flex gap-3 p-3 bg-[#0a0a0f] border border-white/[0.04] rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-[11px]">{e.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[12px] truncate">{e.name}</p>
                      <p className="text-[11px] text-white/30 truncate">{e.title}</p>
                      <p className="text-[10px] text-white/20 mt-1">{new Date(e.enrolled_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/20 rounded-2xl p-6">
              <h4 className="font-bold text-[13px] display flex items-center gap-2"><Award className="w-4 h-4 text-violet-400"/> Instructor Tips</h4>
              <ul className="mt-4 space-y-2.5 text-[12px] text-white/60 leading-relaxed">
                <li>• Add 3 projects per course → 40% more enrollments</li>
                <li>• Reply to Q&A in 2h → 4.8+ rating</li>
                <li>• Weekly live class → ₹5k extra/mo</li>
              </ul>
              <button className="mt-5 w-full bg-white text-black py-2.5 rounded-full font-bold text-[12px]">View Growth Guide</button>
            </div>
          </div>
        </div>

        <div className="mt-8 card-dark p-6 border-dashed">
          <p className="font-bold text-[13px]">How to become instructor?</p>
          <code className="block bg-[#050507] border border-white/[0.06] p-3 rounded-xl mt-3 text-[11px] font-mono text-white/60">UPDATE users SET role='instructor' WHERE email='your@email.com'</code>
          <p className="text-[11px] text-white/30 mt-3">Contact admin@codemaster.pro for verification. Earn 70% per sale + bonuses.</p>
        </div>
      </div>
    </div>
  )
}
