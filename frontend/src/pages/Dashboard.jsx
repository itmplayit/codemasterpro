import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { BookOpen, Trophy, FileText, Crown, Award, Command } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { API, user } = useAuth()
  const [data, setData] = useState({ courses:[], attempts:[], payments:[] })

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    axios.get(`${API}/api/courses/user/my-courses`, { headers }).then(r=>setData(d=>({...d, courses:r.data}))).catch(()=>{})
    axios.get(`${API}/api/quizzes/user/my-attempts`, { headers }).then(r=>setData(d=>({...d, attempts:r.data}))).catch(()=>{})
    axios.get(`${API}/api/memberships/my-payments`, { headers }).then(r=>setData(d=>({...d, payments:r.data}))).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> DASHBOARD / {user?.name?.toUpperCase()}</div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="display text-[36px] font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]}</h1>
            <p className="text-white/40 mt-1 text-[14px]"><span className="bg-white text-black px-2 py-0.5 rounded-full text-[11px] font-bold uppercase">{user?.membership}</span> member • Keep shipping</p>
          </div>
          <div className="flex gap-2">
            <Link to="/certificates" className="bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] px-4 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2"><Award className="w-4 h-4"/> Certificates</Link>
            <Link to="/membership" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-black px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2"><Crown className="w-4 h-4"/> Upgrade</Link>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="card-dark p-6"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center"><BookOpen className="w-5 h-5 text-black"/></div><p className="text-[28px] font-bold mt-4 display">{data.courses.length}</p><p className="text-[12px] text-white/40">Enrolled Courses</p></div>
          <div className="card-dark p-6"><div className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-xl flex items-center justify-center"><Trophy className="w-5 h-5 text-white/60"/></div><p className="text-[28px] font-bold mt-4 display">{data.attempts.length}</p><p className="text-[12px] text-white/40">Quiz Attempts</p></div>
          <div className="card-dark p-6"><div className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-white/60"/></div><p className="text-[28px] font-bold mt-4 display">{data.payments.length}</p><p className="text-[12px] text-white/40">Payments</p></div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div className="card-dark p-6">
            <h3 className="font-semibold text-[14px]">My Courses</h3>
            {data.courses.length===0 ? <p className="text-[13px] text-white/40 mt-4">No enrollments yet. <Link to="/courses" className="text-white underline">Browse courses</Link></p> :
              <div className="mt-4 space-y-3">
                {data.courses.map(c=>(
                  <div key={c.id} className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.04] rounded-xl">
                    <img src={c.thumbnail || `https://picsum.photos/seed/${c.course_id}/100`} className="w-14 h-10 object-cover rounded-lg"/>
                    <div className="flex-1"><p className="font-medium text-[13px]">{c.title}</p><div className="w-full bg-white/10 h-1 rounded-full mt-2"><div className="bg-white h-1 rounded-full" style={{width:`${c.progress}%`}}/></div></div>
                    <span className="text-xs font-bold">{c.progress}%</span>
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="card-dark p-6">
            <h3 className="font-semibold text-[14px]">Quiz History</h3>
            {data.attempts.length===0 ? <p className="text-[13px] text-white/40 mt-4">No quiz attempts yet.</p> :
              <div className="mt-4 space-y-2">
                {data.attempts.slice(0,5).map(a=>(
                  <div key={a.id} className="flex justify-between items-center p-3 bg-white/[0.04] border border-white/[0.04] rounded-xl text-[13px]">
                    <span>{a.title}</span><span className={`font-bold ${a.score>=60?'text-green-400':'text-red-400'}`}>{a.score}%</span>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
