import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { MapPin, Briefcase, DollarSign, Star, Command } from 'lucide-react'

export default function Jobs() {
  const { API } = useAuth()
  const [jobs, setJobs] = useState([
    { id:1, title:'Frontend Developer', company:'Google', location:'Bangalore', type:'fulltime', salary:'28 LPA', description:'ReactJS developer needed for Google Cloud team', skills:'React, JavaScript, TypeScript', is_featured:1 },
    { id:2, title:'Backend Developer (Node + MySQL)', company:'Razorpay', location:'Remote', type:'fulltime', salary:'18 LPA', description:'Build payment systems with Node and MySQL', skills:'Node.js, MySQL, XAMPP, Express', is_featured:1 }
  ])

  useEffect(()=>{ axios.get(`${API}/api/jobs`).then(r=>{ if(r.data?.length) setJobs(r.data) }).catch(()=>{}) }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> JOBS / ALL</div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="display text-[42px] font-bold tracking-tight leading-[0.9]">Jobs that<br/><span className="text-white/20">hire you.</span></h1>
            <p className="text-white/40 mt-3 max-w-xl text-[14px]">Get hired - jobs for our students • Partner with Razorpay, Google • Bhopal to Remote</p>
          </div>
          <div className="hidden md:block text-[11px] bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">3 new this week</div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {jobs.map(job=>(
              <div key={job.id} className="card-dark p-6 hover:border-white/10 group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold">{job.company[0]}</div>
                    <div>
                      <h3 className="font-semibold text-[14px] group-hover:text-white">{job.title}</h3>
                      <p className="text-[12px] text-white/40 mt-1">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  {job.is_featured && <span className="badge bg-[#f59e0b] text-black flex items-center gap-1"><Star className="w-3 h-3"/> FEATURED</span>}
                </div>
                <p className="text-[13px] text-white/40 mt-4 leading-relaxed">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills?.split(',').map(s=> <span key={s} className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40">{s.trim()}</span>)}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-3 text-[11px] text-white/20">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3"/>{job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3"/>{job.salary}</span>
                  </div>
                  <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-[12px] hover:bg-white/90">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-white text-black rounded-2xl p-6">
              <h4 className="font-bold text-[14px] display">Get Hired Faster</h4>
              <p className="text-[12px] text-black/60 mt-2 leading-relaxed">Complete Premium courses to get referral at top companies</p>
              <ul className="mt-4 text-[12px] space-y-2">
                <li>✅ Resume review</li>
                <li>✅ Mock interviews</li>
                <li>✅ Direct referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
