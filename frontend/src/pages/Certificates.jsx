import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Award, Download, Verified, Command, Share2, ExternalLink, Sparkles, Crown } from 'lucide-react'
import PDFCertificate from '../components/PDFCertificate'

export default function Certificates() {
  const { API } = useAuth()
  const [certs, setCerts] = useState([
    { id:1, certificate_id:'CM-2025-JS-001', course_title:'Complete JavaScript Mastery 2025', issued_at: new Date(), user_name:'Demo User' },
    { id:2, certificate_id:'CM-2025-REACT-042', course_title:'ReactJS - The Complete Guide', issued_at: new Date(Date.now()-86400000*5), user_name:'Demo User' }
  ])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    axios.get(`${API}/api/certificates/my-certificates`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>{ if(r.data?.length) setCerts(r.data) }).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> CERTIFICATES / MY</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="display text-[42px] font-bold tracking-tight leading-[0.9] flex items-center gap-4"><Award className="w-10 h-10 text-amber-400"/> My Certificates</h1>
            <p className="text-white/40 mt-3 max-w-xl text-[14px]">Complete 80% of course to unlock verified certificate. Share on LinkedIn, add to resume — trusted by Google, Razorpay.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40">{certs.length} earned</span>
            <span className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-bold flex items-center gap-1"><Crown className="w-3 h-3"/> Verified</span>
          </div>
        </div>

        {certs.length===0 ? (
          <div className="mt-12 card-dark p-12 text-center border-white/[0.08]">
            <div className="w-20 h-20 bg-white/[0.04] border border-white/[0.06] rounded-2xl flex items-center justify-center mx-auto mb-6"><Award className="w-10 h-10 text-white/20"/></div>
            <p className="font-bold text-[16px] display">No certificates yet</p>
            <p className="text-[13px] text-white/40 mt-2 max-w-sm mx-auto">Enroll in courses and complete 80% lessons to earn verified certificates. They are shareable and linked to your profile.</p>
            <button className="mt-6 bg-white text-black px-6 py-2.5 rounded-full font-bold text-[13px]">Browse Courses</button>
          </div>
        ) : (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {certs.map(c=>(
              <div key={c.id} className="group relative overflow-hidden rounded-[20px] bg-[#12121a] border border-white/[0.06] hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"/>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full -mr-20 -mt-20 blur-2xl"/>
                <div className="p-8 relative">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"><Award className="w-6 h-6 text-black"/></div>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full"><Verified className="w-3 h-3"/> VERIFIED</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full"><Sparkles className="w-3 h-3"/> SHAREABLE</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-[10px] tracking-[0.2em] text-white/20 mt-8">CERTIFICATE OF COMPLETION</h3>
                  <p className="text-[12px] text-white/40 mt-3">This certifies that</p>
                  <p className="font-bold text-[20px] mt-1 display">{c.user_name || 'Student Name'}</p>
                  <p className="text-[12px] text-white/40 mt-4">has successfully completed</p>
                  <p className="font-bold text-[15px] mt-1 leading-tight">{c.course_title}</p>
                  
                  <div className="mt-6 flex items-center gap-3 text-[11px] text-white/30">
                    <span className="bg-[#050507] border border-white/[0.06] px-2.5 py-1 rounded-full font-mono">ID: {c.certificate_id}</span>
                    <span>• {new Date(c.issued_at).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}</span>
                  </div>

                  <div className="mt-8 flex gap-2">
                    <div className="flex-1">
                      <PDFCertificate certificate={c} userName={c.user_name || 'Student'} courseTitle={c.course_title} />
                    </div>
                    <button className="flex-1 bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] py-2.5 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5"><Share2 className="w-3.5 h-3.5"/> LinkedIn</button>
                    <button className="w-10 h-10 bg-white/[0.06] border border-white/[0.06] rounded-full flex items-center justify-center hover:bg-white/[0.08]"><ExternalLink className="w-4 h-4"/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="card-dark p-6">
            <h4 className="font-bold text-[13px] flex items-center gap-2"><Verified className="w-4 h-4 text-green-400"/> How it works?</h4>
            <ul className="mt-4 text-[12px] text-white/40 space-y-2.5 leading-relaxed">
              <li className="flex gap-2"><span className="text-white/20">1.</span> Complete 80% of course progress</li>
              <li className="flex gap-2"><span className="text-white/20">2.</span> Backend auto-generates unique ID (CM-XXXX)</li>
              <li className="flex gap-2"><span className="text-white/20">3.</span> Verification via /api/certificates/verify/:id</li>
              <li className="flex gap-2"><span className="text-white/20">4.</span> PDF with QR code + shareable link</li>
            </ul>
          </div>
          <div className="card-dark p-6">
            <h4 className="font-bold text-[13px] flex items-center gap-2"><Award className="w-4 h-4 text-amber-400"/> Trusted by</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[11px] bg-white text-black px-3 py-1 rounded-full font-bold">GOOGLE</span>
              <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-3 py-1 rounded-full text-white/60">RAZORPAY</span>
              <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-3 py-1 rounded-full text-white/60">AMAZON</span>
            </div>
            <p className="text-[11px] text-white/30 mt-4">Certificates verified by codemaster.pro — added to LinkedIn by 2k+ students</p>
          </div>
          <div className="bg-white text-black rounded-2xl p-6">
            <h4 className="font-bold text-[13px] display">Need more?</h4>
            <p className="text-[12px] text-black/60 mt-2 leading-relaxed">Complete Pro courses to earn premium certificates with instructor signature.</p>
            <button className="mt-4 bg-black text-white px-4 py-2.5 rounded-full text-[12px] font-bold w-full">View Pro Courses</button>
          </div>
        </div>
      </div>
    </div>
  )
}
