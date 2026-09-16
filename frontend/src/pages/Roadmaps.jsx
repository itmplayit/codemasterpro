import { CheckCircle, Circle, Map, ArrowRight, Clock, Award, Command, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Roadmaps() {
  const roadmaps = [
    { 
      title: 'Frontend Developer 2025', 
      desc: 'From zero to hired — React, Next.js, deploy',
      level: 'Beginner to Advanced',
      time: '6 months',
      color: 'from-blue-600 to-violet-600',
      steps: [
        { name: 'HTML/CSS Fundamentals', done: true, time: '2 weeks' },
        { name: 'JavaScript ES6+ Mastery', done: true, time: '4 weeks' },
        { name: 'ReactJS + Hooks + Router', done: true, time: '6 weeks' },
        { name: 'State Management (Redux/Zustand)', done: false, time: '3 weeks' },
        { name: 'Next.js 15 + Server Components', done: false, time: '4 weeks' },
        { name: 'Testing & Deployment (Hostinger)', done: false, time: '2 weeks' },
      ] 
    },
    { 
      title: 'Backend Developer (Node + MySQL)', 
      desc: 'XAMPP to production — APIs that scale',
      level: 'Intermediate',
      time: '5 months',
      color: 'from-emerald-600 to-teal-600',
      steps: [
        { name: 'Node.js Basics + NPM', done: true, time: '2 weeks' },
        { name: 'Express.js + Middleware', done: true, time: '3 weeks' },
        { name: 'MySQL with XAMPP (Joins, Index)', done: false, time: '4 weeks' },
        { name: 'JWT Auth + RBAC', done: false, time: '2 weeks' },
        { name: 'REST APIs + Razorpay', done: false, time: '3 weeks' },
        { name: 'Deployment on Hostinger VPS', done: false, time: '2 weeks' },
      ] 
    },
    { 
      title: 'Full Stack (MERN + XAMPP)', 
      desc: 'Build SaaS, earn ₹50k/mo — our flagship',
      level: 'Advanced',
      time: '8 months',
      color: 'from-orange-500 to-red-500',
      popular: true,
      steps: [
        { name: 'Frontend Roadmap (Complete)', done: false, time: '6 weeks' },
        { name: 'Backend Roadmap (Complete)', done: false, time: '5 weeks' },
        { name: 'Authentication + Payments', done: false, time: '3 weeks' },
        { name: 'Payment Gateway (Razorpay)', done: false, time: '2 weeks' },
        { name: 'AdSense + Affiliate Monetization', done: false, time: '2 weeks' },
        { name: 'Build SaaS + Launch', done: false, time: '4 weeks' },
      ] 
    },
  ]

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> ROADMAPS / ALL</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="display text-[48px] font-bold tracking-tight leading-[0.9]">Roadmaps that<br/><span className="text-white/20">get you hired.</span></h1>
            <p className="text-white/40 mt-4 max-w-xl text-[14px]">Step-by-step paths used by 50k+ developers. XAMPP MySQL, React, Razorpay — production ready.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40 flex items-center gap-1"><Map className="w-3 h-3"/> 3 Roadmaps</span>
            <span className="text-[11px] bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full font-bold">Updated 2025</span>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {roadmaps.map((r,i)=>(
            <div key={i} className="card-dark p-0 overflow-hidden group hover:border-white/10 hover:-translate-y-1 transition-all duration-500 relative">
              {r.popular && <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3"/> MOST POPULAR</div>}
              <div className={`h-1 w-full bg-gradient-to-r ${r.color}`}/>
              <div className="p-7">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-5`}>
                  <Map className="w-6 h-6 text-white"/>
                </div>
                <h3 className="font-bold text-[18px] display leading-tight">{r.title}</h3>
                <p className="text-[12px] text-white/40 mt-2 leading-relaxed">{r.desc}</p>
                <div className="flex gap-2 mt-4">
                  <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40">{r.level}</span>
                  <span className="text-[10px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40 flex items-center gap-1"><Clock className="w-3 h-3"/>{r.time}</span>
                </div>

                <div className="mt-8 space-y-4 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/[0.06]"/>
                  {r.steps.map((s, idx)=>(
                    <div key={idx} className="flex gap-3 relative group/step">
                      {s.done ? <CheckCircle className="w-6 h-6 text-green-400 bg-[#12121a] relative z-10 shrink-0"/> : <Circle className="w-6 h-6 text-white/20 bg-[#12121a] relative z-10 shrink-0 group-hover/step:text-white/40 transition-colors"/>}
                      <div className="flex-1 min-w-0">
                        <span className={`text-[13px] leading-tight block ${s.done?'text-white font-medium':'text-white/60 group-hover/step:text-white/80'}`}>{s.name}</span>
                        <span className="text-[10px] text-white/20">{s.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-2">
                  <Link to="/courses" className="flex-1 bg-white text-black py-3 rounded-full font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-white/90 transition-all">Start Roadmap <ArrowRight className="w-4 h-4"/></Link>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-white/20">
                  <Award className="w-3 h-3"/> Certificate on completion
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 card-dark p-8 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="font-bold text-[16px] display flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400"/> Why our roadmaps work?</h3>
              <ul className="mt-4 space-y-2 text-[13px] text-white/60">
                <li className="flex gap-2"><span className="text-green-400">✓</span> Built for Indian colleges — XAMPP MySQL, no Docker needed</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Projects + Deploy to Hostinger — portfolio ready</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Razorpay + AdSense monetization included</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> 50k+ students, 1200+ hired at Google, Razorpay, Amazon</li>
              </ul>
            </div>
            <div className="md:w-80 bg-[#050507] border border-white/[0.06] rounded-xl p-5">
              <p className="text-[11px] font-bold tracking-widest text-white/20">STUDENT STORY</p>
              <p className="text-[13px] mt-3 leading-relaxed text-white/80">“Followed Full Stack roadmap, built 5 projects, deployed on Hostinger, got job at Razorpay ₹18 LPA. XAMPP setup saved me weeks.”</p>
              <p className="text-[11px] text-white/30 mt-3">— Priya, Bhopal → Bangalore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
