import { Link } from 'react-router-dom'
import { DollarSign, Users, TrendingUp, Share2, Award, Command, ArrowRight, Copy, Sparkles, Crown, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function Affiliate() {
  const [copied, setCopied] = useState(false)
  const referralLink = 'https://codemaster.pro/ref/demo-user-123'

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> EARN / AFFILIATE</div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-amber-400">
              <Crown className="w-3 h-3"/> 30% COMMISSION • LIFETIME
            </div>
            <h1 className="display text-[48px] font-bold tracking-tight leading-[0.9] mt-6">
              Earn ₹50k/mo<br/>
              <span className="text-white/20">referring friends.</span>
            </h1>
            <p className="text-white/40 mt-4 max-w-xl text-[14px] leading-relaxed">
              Share CodeMaster Pro, earn 30% per sale forever. Pro ₹499 → you get ₹150. Premium ₹999 → ₹300. 10k visitors = ₹62k/month potential. XAMPP colleges love us.
            </p>

            <div className="mt-8 card-dark p-5 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[11px] tracking-widest text-white/20 font-bold">YOUR REFERRAL LINK</p>
                <p className="font-mono text-[13px] mt-2 text-white/80 truncate">{referralLink}</p>
              </div>
              <button onClick={handleCopy} className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-[12px] flex items-center gap-2 hover:bg-white/90">
                <Copy className="w-3.5 h-3.5"/> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="bg-white text-black rounded-2xl p-5">
                <DollarSign className="w-5 h-5"/>
                <p className="text-[24px] font-bold mt-3 display">₹12,450</p>
                <p className="text-[11px] text-black/50 uppercase tracking-wide">Total Earned</p>
              </div>
              <div className="card-dark p-5">
                <Users className="w-5 h-5 text-white/40"/>
                <p className="text-[24px] font-bold mt-3 display">34</p>
                <p className="text-[11px] text-white/30 uppercase">Referrals</p>
              </div>
              <div className="card-dark p-5">
                <TrendingUp className="w-5 h-5 text-green-400"/>
                <p className="text-[24px] font-bold mt-3 display">₹1,200</p>
                <p className="text-[11px] text-white/30 uppercase">This Month</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link to="/register" className="bg-white text-black px-6 py-3 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-white/90">Start Earning <ArrowRight className="w-4 h-4"/></Link>
              <Link to="/courses" className="bg-white/[0.06] border border-white/[0.06] px-6 py-3 rounded-full font-medium text-[13px]">View Courses</Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-dark p-0 overflow-hidden">
              <div className="p-6 border-b border-white/[0.06]">
                <h3 className="font-bold text-[14px] display flex items-center gap-2"><BarChart3 className="w-4 h-4"/> How it works</h3>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { step:'1', title:'Share your link', desc:'WhatsApp groups, Instagram, YouTube, college groups — XAMPP students convert 8%'},
                  { step:'2', title:'Friend buys Pro/Premium', desc:'They get 10% off via your link, you get 30% commission instantly'},
                  { step:'3', title:'Get paid monthly', desc:'RazorpayX payout on 1st of month, min ₹500. Lifetime commission on renewals'},
                ].map(s=>(
                  <div key={s.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-[12px] shrink-0">{s.step}</div>
                    <div>
                      <p className="font-semibold text-[13px]">{s.title}</p>
                      <p className="text-[12px] text-white/40 mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark p-6 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20">
              <h4 className="font-bold text-[13px] display flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400"/> Commission Structure</h4>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#050507] border border-white/[0.06] rounded-xl">
                  <div><p className="font-medium text-[13px]">Pro Membership</p><p className="text-[11px] text-white/30">₹499/mo</p></div>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-[12px] font-bold">₹150/sale</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white text-black rounded-xl">
                  <div><p className="font-bold text-[13px]">Premium Membership</p><p className="text-[11px] text-black/50">₹999/mo • Most Popular</p></div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-[12px] font-bold">₹300/sale</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#050507] border border-white/[0.06] rounded-xl">
                  <div><p className="font-medium text-[13px]">Course Sales</p><p className="text-[11px] text-white/30">₹499 - ₹2999</p></div>
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-[12px] font-bold">20% per sale</span>
                </div>
              </div>
              <p className="text-[11px] text-white/30 mt-4">+ Lifetime renewals • + 10% bonus if 10+ sales/month • No limit</p>
            </div>

            <div className="bg-white text-black rounded-2xl p-6">
              <h4 className="font-bold text-[14px] display flex items-center gap-2"><Award className="w-4 h-4"/> Top Affiliates</h4>
              <div className="mt-4 space-y-3">
                {[
                  { name:'Rahul • YouTube 50k subs', earn:'₹84,200/mo', sales: 280 },
                  { name:'Anjali • Instagram Reels', earn:'₹42,100/mo', sales: 140 },
                  { name:'Aman • College Groups', earn:'₹28,500/mo', sales: 95 },
                ].map((a,i)=>(
                  <div key={i} className="flex justify-between items-center text-[12px]">
                    <div><p className="font-medium">{a.name}</p><p className="text-[11px] text-black/50">{a.sales} sales</p></div>
                    <span className="font-bold">{a.earn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-4">
          <div className="card-dark p-5"><Share2 className="w-5 h-5 text-white/40"/><p className="font-semibold text-[13px] mt-3">Share Anywhere</p><p className="text-[11px] text-white/30 mt-1">WhatsApp, Insta, YT, Telegram — link tracks 30 days</p></div>
          <div className="card-dark p-5"><DollarSign className="w-5 h-5 text-green-400"/><p className="font-semibold text-[13px] mt-3">Instant Tracking</p><p className="text-[11px] text-white/30 mt-1">Real-time dashboard, clicks, conversions, earnings</p></div>
          <div className="card-dark p-5"><Award className="w-5 h-5 text-amber-400"/><p className="font-semibold text-[13px] mt-3">Marketing Kit</p><p className="text-[11px] text-white/30 mt-1">Banners, videos, copy — ready for XAMPP colleges</p></div>
          <div className="card-dark p-5"><Users className="w-5 h-5 text-blue-400"/><p className="font-semibold text-[13px] mt-3">Support</p><p className="text-[11px] text-white/30 mt-1">Dedicated affiliate manager on WhatsApp</p></div>
        </div>
      </div>
    </div>
  )
}
