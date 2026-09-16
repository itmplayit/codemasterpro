import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Check, Crown, Zap, Star, Command } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RazorpayCheckout from '../components/RazorpayCheckout'

export default function Membership() {
  const { API, user } = useAuth()
  const [plans, setPlans] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{ 
    axios.get(`${API}/api/memberships/plans`).then(r=>setPlans(r.data)).catch(()=>{
      setPlans({
        free: { price: 0, features: ['Free courses', 'Basic notes', 'Community'] },
        pro: { price: 499, features: ['All free', 'Pro courses', 'Premium notes', 'Quizzes', 'Certificate', 'Ad-free', 'Deploy 10'] },
        premium: { price: 999, features: ['All Pro', 'Premium courses', '1-1 Mentorship', 'Interview prep', 'Job referrals', 'Deploy 100'] }
      })
    })
  }, [])

  if (!plans) return <div className="min-h-screen bg-[#050507] p-20 text-center text-white">Loading plans...</div>

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest"><Crown className="w-3 h-3"/> PRICING</div>
          <h1 className="display text-[48px] font-bold tracking-tight mt-6 leading-[0.9]">Invest in your<br/><span className="text-white/20">career.</span></h1>
          <p className="text-white/40 mt-4">Join 50k+ developers. Cancel anytime. Razorpay + UPI. Bhopal to Bangalore.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="card-dark p-8">
            <h3 className="font-bold text-[14px]">Free</h3>
            <p className="display text-[36px] font-bold mt-4">₹0<span className="text-[14px] font-medium text-white/20">/forever</span></p>
            <ul className="mt-6 space-y-3 text-[13px] text-white/60">
              {plans.free.features.map((f,i)=><li key={i} className="flex gap-2"><Check className="w-4 h-4 text-white/20"/>{f}</li>)}
            </ul>
            <button className="mt-8 w-full bg-white/[0.06] border border-white/[0.06] py-3 rounded-full font-semibold text-[13px]">Current Plan</button>
          </div>

          <div className="card-dark p-8 border-white/20 bg-white/[0.04] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3"/> MOST POPULAR</div>
            <h3 className="font-bold text-[14px] flex items-center gap-2"><Zap className="w-4 h-4"/> Pro</h3>
            <p className="display text-[36px] font-bold mt-4">₹499<span className="text-[14px] font-medium text-white/20">/mo</span></p>
            <ul className="mt-6 space-y-3 text-[13px] text-white/60">
              {plans.pro.features.map((f,i)=><li key={i} className="flex gap-2"><Check className="w-4 h-4 text-white"/>{f}</li>)}
            </ul>
            <div className="mt-8">
              <RazorpayCheckout plan="pro" amount={plans.pro.price} onSuccess={()=>navigate('/dashboard')} />
            </div>
            <p className="text-[10px] text-center text-white/20 mt-3">Razorpay • UPI • Cards • Mock active</p>
          </div>

          <div className="bg-white text-black rounded-2xl p-8">
            <h3 className="font-bold text-[14px] flex items-center gap-2"><Crown className="w-4 h-4"/> Premium</h3>
            <p className="display text-[36px] font-bold mt-4">₹999<span className="text-[14px] font-medium text-black/40">/mo</span></p>
            <ul className="mt-6 space-y-3 text-[13px] text-black/60">
              {plans.premium.features.map((f,i)=><li key={i} className="flex gap-2"><Check className="w-4 h-4 text-black"/>{f}</li>)}
            </ul>
            <div className="mt-8">
              <RazorpayCheckout plan="premium" amount={plans.premium.price} onSuccess={()=>navigate('/dashboard')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
