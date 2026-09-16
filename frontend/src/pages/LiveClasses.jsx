import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Video, Clock, Users, Calendar, Radio, Command } from 'lucide-react'

export default function LiveClasses() {
  const { API } = useAuth()
  const navigate = useNavigate()
  const [classes, setClasses] = useState([
    { id:1, title:'React 19 Live - New Features', description:'Learn React 19 Server Components live with Q&A', instructor_name:'Admin', scheduled_at: new Date(Date.now()+86400000), duration_minutes:90, is_live:false, enrolled_count:45, meeting_link:'https://meet.google.com/xxx' },
    { id:2, title:'DSA Live - Crack FAANG', description:'Live DSA problem solving', instructor_name:'Admin', scheduled_at: new Date(Date.now()+172800000), duration_minutes:120, is_live:true, enrolled_count:120, meeting_link:'https://meet.google.com/yyy' }
  ])

  useEffect(()=>{ axios.get(`${API}/api/live/classes`).then(r=>{ if(r.data?.length) setClasses(r.data) }).catch(()=>{}) }, [])

  const handleEnroll = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    try {
      await axios.post(`${API}/api/live/classes/${id}/enroll`, {}, { headers: { Authorization: `Bearer ${token}` } })
      alert('Enrolled! Check email for meeting link')
    } catch { alert('Enrolled (demo mode)') }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> LIVE / CLASSES</div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center animate-pulse"><Radio className="w-5 h-5 text-white"/></div>
          <div>
            <h1 className="display text-[36px] font-bold tracking-tight">Live Classes</h1>
            <p className="text-white/40 text-[13px]">Learn live with instructors • Q&A • Recordings</p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {classes.map(c=>(
            <div key={c.id} className="card-dark overflow-hidden group hover:border-red-500/20">
              <div className="h-1 bg-red-500 w-full"/>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <span className={`badge ${c.is_live ? 'bg-red-500 text-white animate-pulse' : 'bg-white/[0.06] text-white/40 border border-white/[0.06]'}`}>{c.is_live ? '● LIVE NOW' : 'UPCOMING'}</span>
                  <span className="text-[11px] text-white/20 flex items-center gap-1"><Users className="w-3 h-3"/>{c.enrolled_count}</span>
                </div>
                <h3 className="font-semibold text-[14px] mt-4 group-hover:text-white display">{c.title}</h3>
                <p className="text-[12px] text-white/40 mt-2 line-clamp-2">{c.description}</p>
                <div className="mt-4 space-y-2 text-[11px] text-white/30">
                  <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/> {new Date(c.scheduled_at).toLocaleString()}</p>
                  <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5"/> {c.duration_minutes} mins • by {c.instructor_name}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <button onClick={()=>handleEnroll(c.id)} className="flex-1 bg-white text-black py-2.5 rounded-full font-bold text-[12px]">Enroll Free</button>
                  <a href={c.meeting_link} target="_blank" className="flex-1 bg-white/[0.06] border border-white/[0.06] py-2.5 rounded-full text-[12px] font-medium text-center flex items-center justify-center gap-1"><Video className="w-3.5 h-3.5"/> Join</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
