import { Helmet } from 'react-helmet-async'
import { Command } from 'lucide-react'

export function About() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Helmet><title>About - CodeMaster Pro | Built in Bhopal for India</title></Helmet>
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> ABOUT / STORY</div>
        <h1 className="display text-[48px] font-bold tracking-tight leading-[0.9]">Built in Bhopal,<br/><span className="text-white/20">for India.</span></h1>
        <div className="mt-10 prose prose-invert max-w-none text-white/40 leading-relaxed text-[14px]">
          <p>Hi, I'm a developer from <span className="text-white font-semibold">Bhopal, Madhya Pradesh</span>. I built CodeMaster Pro because I struggled to find quality coding notes in one place.</p>
          <p className="mt-4">This platform is built with <span className="text-white font-semibold">ReactJS + MySQL (XAMPP)</span> - the same stack I teach. No fluff, just real-world coding education.</p>
          <h3 className="text-[18px] font-bold mt-10 text-white display">What we offer:</h3>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-white/60">
            <li>20+ professional courses (JavaScript, React, Node, MySQL, DSA)</li>
            <li>150+ premium notes & cheat sheets</li>
            <li>One-click deploy to Hostinger, AI Tutor, Playground</li>
            <li>Job board, certificates, gamification</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Helmet><title>Privacy Policy - CodeMaster Pro</title></Helmet>
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> LEGAL / PRIVACY</div>
        <h1 className="display text-[42px] font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-[12px] text-white/20 mt-2">Last updated: Sep 15, 2026</p>
        <div className="mt-8 prose prose-invert text-white/40 leading-relaxed text-[13px]">
          <p>At CodeMaster Pro, we respect your privacy.</p>
          <h3 className="font-bold mt-6 text-white">Information we collect:</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Email, name when you register</li>
            <li>Course progress, quiz attempts</li>
            <li>Payment info via Razorpay (we don't store card details)</li>
          </ul>
          <h3 className="font-bold mt-6 text-white">Google AdSense:</h3>
          <p className="mt-2">We use Google AdSense to show ads. Google may use cookies to show relevant ads.</p>
          <h3 className="font-bold mt-6 text-white">Contact:</h3>
          <p className="mt-2">admin@codemaster.pro</p>
        </div>
      </div>
    </div>
  )
}

export function Terms() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Helmet><title>Terms - CodeMaster Pro</title></Helmet>
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> LEGAL / TERMS</div>
        <h1 className="display text-[42px] font-bold tracking-tight">Terms of Service</h1>
        <div className="mt-8 prose prose-invert text-white/40 leading-relaxed text-[13px]">
          <p>By using CodeMaster Pro, you agree to these terms.</p>
          <h3 className="font-bold mt-6 text-white">Memberships:</h3>
          <p className="mt-2">Pro ₹499/mo, Premium ₹999/mo. Recurring billing via Razorpay. Cancel anytime. No refunds after 7 days.</p>
          <h3 className="font-bold mt-6 text-white">Content:</h3>
          <p className="mt-2">All notes, courses are for personal use. Don't resell.</p>
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Helmet><title>Contact - CodeMaster Pro</title></Helmet>
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> CONTACT / SUPPORT</div>
        <h1 className="display text-[42px] font-bold tracking-tight">Contact Us</h1>
        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-white/40 text-[14px]">Have questions? We reply within 24 hours.</p>
            <div className="mt-6 space-y-3 text-[13px]">
              <p><span className="text-white/20">Email:</span> <span className="text-white">admin@codemaster.pro</span></p>
              <p><span className="text-white/20">Location:</span> Bhopal, MP 🇮🇳</p>
              <p><span className="text-white/20">Telegram:</span> t.me/codemasterpro</p>
            </div>
            <div className="mt-8 p-4 bg-white/[0.04] border border-white/[0.06] rounded-2xl">
              <p className="font-bold text-[13px]">For AdSense & Partnerships:</p>
              <p className="text-[12px] text-white/40 mt-1">10k+ monthly visitors, 50k+ students. Email for ad placements.</p>
            </div>
          </div>
          <form className="card-dark p-6 space-y-4">
            <input placeholder="Your name" className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            <input placeholder="Email" className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.06] rounded-2xl text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            <button className="w-full bg-white text-black py-3 rounded-full font-bold text-[13px]">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
