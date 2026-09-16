import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Users, BookOpen, DollarSign, FileText, Command, Trash2, Edit, Plus, Video, Trophy, Briefcase, Radio, Ticket, Rocket, BarChart3, Award, Search, Save, X, Crown, Layers, MessageSquare, Settings, Tag, Share2, Zap, Flame, Eye, Calendar, Globe, ExternalLink } from 'lucide-react'
import { RevenueChart, MembershipPie, ProgressLine } from '../components/RechartsAnalytics'
import AdminCustomization from '../components/AdminCustomization'

export default function AdminDashboard() {
  const { API } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [notes, setNotes] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [jobs, setJobs] = useState([])
  const [payments, setPayments] = useState([])
  const [coupons, setCoupons] = useState([{ id:1, code:'WELCOME50', discount:50, type:'percent', used:124, limit:500, expiry:'2026-03-01', active:true }, { id:2, code:'PRO100', discount:100, type:'flat', used:45, limit:100, expiry:'2026-02-15', active:true }])
  const [categories, setCategories] = useState([{ id:1, name:'JavaScript', slug:'javascript', courses:8 }, { id:2, name:'ReactJS', slug:'reactjs', courses:6 }, { id:3, name:'Node.js', slug:'nodejs', courses:4 }])
  const [comments, setComments] = useState([{ id:1, user:'Aarav', content:'Great course! XAMPP setup helped', course:'JavaScript Mastery', status:'pending', created_at: new Date() }])
  const [affiliates, setAffiliates] = useState([{ id:1, name:'Rahul YT', email:'rahul@yt.com', referrals:34, earnings:12450, paid:8000, pending:4450, link:'codemaster.pro/ref/rahul123' }])
  const [liveClasses, setLiveClasses] = useState([{ id:1, title:'React 19 Live', instructor:'Admin', scheduled_at: new Date(Date.now()+86400000), enrolled:45, status:'upcoming' }])
  const [deployments, setDeployments] = useState([{ id:1, project:'Todo App', user:'Priya', subdomain:'todo-abc123', status:'live', visits:42, created_at: new Date() }])
  const [showCreate, setShowCreate] = useState({ course:false, note:false, quiz:false, job:false, coupon:false, category:false, live:false })
  const [newCourse, setNewCourse] = useState({ title:'', slug:'', description:'', short_desc:'', category_id:1, level:'beginner', price:0, original_price:0, is_free:true, membership_required:'free', thumbnail:'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600' })
  const [newCoupon, setNewCoupon] = useState({ code:'', discount:10, type:'percent', limit:100, expiry:'' })

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(()=>{
    axios.get(`${API}/api/admin/stats`, { headers }).then(r=>setStats(r.data)).catch(()=>setStats({
      stats: { users: 5234, courses: 24, enrollments: 8420, revenue: 124500, notes: 156, quizzes: 42, jobs: 18, deployments: 89, comments: 342, affiliates: 56 },
      recentUsers: [{ id:1, name:'John Doe', email:'john@example.com', membership:'pro', created_at: new Date() }],
      recentPayments: [{ id:1, name:'Priya', plan:'pro', amount:499, status:'success' }],
    }))
    axios.get(`${API}/api/admin/courses`, { headers }).then(r=>setCourses(r.data)).catch(()=>setCourses([{ id:1, title:'Complete JavaScript Mastery 2025', category_name:'JavaScript', price:499, total_students:1240, level:'beginner', status:'published' }]))
    axios.get(`${API}/api/admin/users`, { headers }).then(r=>setUsers(r.data)).catch(()=>setUsers([{ id:1, name:'Demo User', email:'demo@codemaster.pro', role:'user', membership:'free', created_at: new Date() }, { id:2, name:'Admin', email:'admin@codemaster.pro', role:'admin', membership:'premium', created_at: new Date() }]))
    axios.get(`${API}/api/notes`).then(r=>setNotes(r.data)).catch(()=>setNotes([{ id:1, title:'JavaScript ES6+ Cheat Sheet', category_name:'JavaScript', is_premium:false, views:1240 }]))
    axios.get(`${API}/api/quizzes`).then(r=>setQuizzes(r.data)).catch(()=>setQuizzes([{ id:1, title:'JavaScript Basics Quiz', category_name:'JavaScript', total_questions:20, total_attempts:1240 }]))
    axios.get(`${API}/api/jobs`).then(r=>setJobs(r.data)).catch(()=>setJobs([{ id:1, title:'Frontend Developer', company:'Google', location:'Bangalore', salary:'28 LPA', is_featured:1 }]))
  }, [])

  const tabs = [
    { id:'overview', label:'Overview', icon: BarChart3 },
    { id:'analytics', label:'Analytics', icon: TrendingUp, badge:'NEW' },
    { id:'courses', label:'Courses', count: courses.length, icon: BookOpen },
    { id:'users', label:'Users', count: users.length, icon: Users },
    { id:'notes', label:'Notes', count: notes.length, icon: FileText },
    { id:'quizzes', label:'Quizzes', count: quizzes.length, icon: Trophy },
    { id:'jobs', label:'Jobs', count: jobs.length, icon: Briefcase },
    { id:'live', label:'Live', count: liveClasses.length, icon: Radio },
    { id:'deploy', label:'Deploys', count: deployments.length, icon: Rocket },
    { id:'coupons', label:'Coupons', count: coupons.length, icon: Ticket },
    { id:'affiliate', label:'Affiliate', count: affiliates.length, icon: Share2 },
    { id:'categories', label:'Categories', count: categories.length, icon: Tag },
    { id:'comments', label:'Comments', count: comments.length, icon: MessageSquare },
    { id:'payments', label:'Payments', icon: DollarSign },
    { id:'settings', label:'Settings', icon: Settings },
  ]

  const handleDelete = (type, id) => {
    if (!confirm('Delete?')) return
    if (type==='course') setCourses(courses.filter(c=>c.id!==id))
    if (type==='note') setNotes(notes.filter(n=>n.id!==id))
    if (type==='quiz') setQuizzes(quizzes.filter(q=>q.id!==id))
    if (type==='job') setJobs(jobs.filter(j=>j.id!==id))
    if (type==='coupon') setCoupons(coupons.filter(c=>c.id!==id))
    if (type==='category') setCategories(categories.filter(c=>c.id!==id))
  }

  if (!stats) return <div className="min-h-screen bg-[#050507] p-20 text-center text-white/40">Loading admin...</div>

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-3"><Command className="w-3 h-3"/> ADMIN / DASHBOARD • ALL FEATURES • v6 DARK</div>
        
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h1 className="display text-[28px] font-bold tracking-tight flex items-center gap-3">Admin Dashboard <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">ADMIN ONLY</span><span className="bg-white text-black text-[10px] px-2 py-1 rounded-full">15 TABS • ALL FEATURES</span></h1>
            <p className="text-white/40 text-[12px] mt-1">Full empire control • {stats.stats.users} users • ₹{stats.stats.revenue?.toLocaleString()} revenue • 50k+ students</p>
          </div>
          <div className="flex gap-2">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/><input placeholder="Search users, courses..." className="pl-10 pr-4 py-2.5 bg-[#12121a] border border-white/[0.06] rounded-full text-[12px] w-64 focus:outline-none"/></div>
            <button className="bg-white text-black px-4 py-2.5 rounded-full font-bold text-[11px] flex items-center gap-1.5"><Crown className="w-3.5 h-3.5"/> Export All CSV</button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 bg-[#12121a] border border-white/[0.06] p-1 rounded-full w-fit min-w-full">
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${activeTab===t.id?'bg-white text-black':'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                <t.icon className="w-3.5 h-3.5"/> {t.label} {t.count!==undefined && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab===t.id?'bg-black text-white':'bg-white/[0.08] text-white/40'}`}>{t.count}</span>} {t.badge && <span className="bg-amber-500 text-black text-[8px] px-1 py-0.5 rounded-full font-bold">{t.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {activeTab==='overview' && (
          <>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="card-dark p-4"><Users className="w-4 h-4 text-white/30"/><p className="display text-[20px] font-bold mt-2">{stats.stats.users}</p><p className="text-[9px] text-white/30 tracking-widest">USERS</p><p className="text-[9px] text-green-400">+12%</p></div>
              <div className="card-dark p-4"><BookOpen className="w-4 h-4 text-white/30"/><p className="display text-[20px] font-bold mt-2">{stats.stats.courses}</p><p className="text-[9px] text-white/30 tracking-widest">COURSES</p></div>
              <div className="card-dark p-4"><DollarSign className="w-4 h-4 text-green-400"/><p className="display text-[20px] font-bold mt-2">₹{Math.round(stats.stats.revenue/1000)}k</p><p className="text-[9px] text-white/30 tracking-widest">REVENUE</p></div>
              <div className="card-dark p-4"><Layers className="w-4 h-4 text-white/30"/><p className="display text-[20px] font-bold mt-2">{stats.stats.enrollments}</p><p className="text-[9px] text-white/30 tracking-widest">ENROLL</p></div>
              <div className="card-dark p-4"><FileText className="w-4 h-4 text-white/30"/><p className="display text-[20px] font-bold mt-2">{stats.stats.notes}</p><p className="text-[9px] text-white/30 tracking-widest">NOTES</p></div>
              <div className="card-dark p-4"><Trophy className="w-4 h-4 text-amber-400"/><p className="display text-[20px] font-bold mt-2">{stats.stats.quizzes}</p><p className="text-[9px] text-white/30 tracking-widest">QUIZZES</p></div>
              <div className="card-dark p-4"><Briefcase className="w-4 h-4 text-white/30"/><p className="display text-[20px] font-bold mt-2">{stats.stats.jobs||18}</p><p className="text-[9px] text-white/30 tracking-widest">JOBS</p></div>
              <div className="bg-white text-black rounded-2xl p-4"><Rocket className="w-4 h-4"/><p className="display text-[20px] font-bold mt-2">{stats.stats.deployments||89}</p><p className="text-[9px] text-black/50 tracking-widest">DEPLOYS</p></div>
            </div>
            <div className="mt-4 grid lg:grid-cols-3 gap-4">
              <div className="card-dark p-5"><h3 className="font-bold text-[12px] flex items-center gap-2"><Users className="w-4 h-4"/> Recent Users</h3><div className="mt-3 space-y-2">{stats.recentUsers?.map(u=><div key={u.id} className="flex justify-between p-2.5 bg-[#0a0a0f] border border-white/[0.04] rounded-xl text-[12px]"><div><p className="font-medium">{u.name}</p><p className="text-[10px] text-white/30">{u.email}</p></div><span className="text-[9px] bg-white text-black px-2 py-1 rounded-full font-bold">{u.membership}</span></div>)}</div></div>
              <div className="card-dark p-5"><h3 className="font-bold text-[12px] flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400"/> Recent Payments</h3><div className="mt-3 space-y-2">{stats.recentPayments?.map(p=><div key={p.id} className="flex justify-between p-2.5 bg-[#0a0a0f] border border-white/[0.04] rounded-xl text-[12px]"><div><p className="font-medium">{p.name}</p><p className="text-[10px] text-white/30">{p.plan} • ₹{p.amount}</p></div><span className="text-[9px] bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-1 rounded-full">{p.status}</span></div>)}</div></div>
              <div className="card-dark p-5 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20"><h3 className="font-bold text-[12px]">Quick Actions</h3><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setActiveTab('courses')} className="bg-white text-black p-3 rounded-xl text-[11px] font-bold flex flex-col gap-1"><BookOpen className="w-4 h-4"/> + Course</button><button onClick={()=>setActiveTab('coupons')} className="bg-[#12121a] border border-white/[0.06] p-3 rounded-xl text-[11px] flex flex-col gap-1"><Ticket className="w-4 h-4"/> + Coupon</button><button onClick={()=>setActiveTab('jobs')} className="bg-[#12121a] border border-white/[0.06] p-3 rounded-xl text-[11px] flex flex-col gap-1"><Briefcase className="w-4 h-4"/> + Job</button><button onClick={()=>setActiveTab('live')} className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-[11px] flex flex-col gap-1"><Radio className="w-4 h-4"/> + Live</button></div></div>
            </div>
          </>
        )}

        {activeTab==='analytics' && (
          <div className="mt-6 space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 card-dark p-6"><h3 className="font-bold text-[13px] flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Revenue Last 30 Days</h3><div className="mt-6"><RevenueChart /></div><div className="mt-4 grid grid-cols-4 gap-3 text-[11px]"><div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-3"><p className="text-white/30">Today</p><p className="font-bold text-[14px] mt-1">₹4,200</p><p className="text-green-400 text-[10px]">+18%</p></div><div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-3"><p className="text-white/30">Week</p><p className="font-bold text-[14px] mt-1">₹28,500</p><p className="text-green-400 text-[10px]">+12%</p></div><div className="bg-[#0a0a0f] border border-white/[0.04] rounded-xl p-3"><p className="text-white/30">Month</p><p className="font-bold text-[14px] mt-1">₹1,24,500</p><p className="text-green-400 text-[10px]">+22%</p></div><div className="bg-white text-black rounded-xl p-3"><p className="text-black/50">Year</p><p className="font-bold text-[14px] mt-1">₹8,42,000</p><p className="text-green-600 text-[10px]">+45%</p></div></div></div>
              <div className="space-y-4">
                <div className="card-dark p-6"><h3 className="font-bold text-[12px]">Membership Split</h3><div className="mt-4"><MembershipPie /></div><div className="mt-3 space-y-1.5 text-[11px]"><div className="flex justify-between"><span className="text-white/40">Free</span><span>60% • 3,140 users</span></div><div className="flex justify-between"><span className="text-white/40">Pro ₹499</span><span>30% • 1,570 users</span></div><div className="flex justify-between"><span className="text-white/40">Premium ₹999</span><span>10% • 524 users</span></div></div></div>
                <div className="card-dark p-6"><h3 className="font-bold text-[12px]">Top Courses</h3><div className="mt-3 space-y-2 text-[11px]"><div className="flex justify-between p-2 bg-[#0a0a0f] rounded-lg"><span>JS Mastery</span><span className="font-bold">₹42k</span></div><div className="flex justify-between p-2 bg-[#0a0a0f] rounded-lg"><span>React Guide</span><span className="font-bold">₹38k</span></div><div className="flex justify-between p-2 bg-white text-black rounded-lg font-bold"><span>Python DSA</span><span>₹24k</span></div></div></div>
              </div>
            </div>
            <div className="card-dark p-6"><h3 className="font-bold text-[13px] flex items-center gap-2"><Zap className="w-4 h-4"/> Progress Overview • All Users</h3><div className="mt-4"><ProgressLine /></div></div>
          </div>
        )}

        {activeTab==='courses' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Courses ({courses.length}) • Revenue: ₹{courses.reduce((s,c)=>s+(c.price*c.total_students||0),0).toLocaleString()}</h3><button onClick={()=>setShowCreate({...showCreate, course:true})} className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px] flex items-center gap-1"><Plus className="w-3 h-3"/> New Course</button></div>
            {showCreate.course && <div className="card-dark p-5 mb-4 border-white/[0.1]"><div className="grid md:grid-cols-3 gap-2"><input value={newCourse.title} onChange={e=>setNewCourse({...newCourse, title:e.target.value, slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-')})} placeholder="Title" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"/><input value={newCourse.price} onChange={e=>setNewCourse({...newCourse, price:e.target.value})} placeholder="Price" type="number" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"/><input value={newCourse.thumbnail} onChange={e=>setNewCourse({...newCourse, thumbnail:e.target.value})} placeholder="Thumbnail" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"/></div><button onClick={()=>{ setCourses([{ id:Date.now(), ...newCourse, total_students:0, category_name:'New' }, ...courses]); setShowCreate({...showCreate, course:false}) }} className="mt-3 bg-white text-black px-4 py-2 rounded-full font-bold text-[11px]">Create</button></div>}
            <div className="card-dark overflow-hidden"><table className="w-full text-[11px]"><thead className="bg-white/[0.02] text-[9px] text-white/30 tracking-widest"><tr><th className="p-3 text-left">Title</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Students</th><th className="p-3">Revenue</th><th className="p-3">Action</th></tr></thead><tbody>{courses.map(c=><tr key={c.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]"><td className="p-3 font-medium max-w-[250px] truncate">{c.title}</td><td className="p-3 text-white/40">{c.category_name}</td><td className="p-3">₹{c.price}</td><td className="p-3">{c.total_students}</td><td className="p-3 text-green-400">₹{(c.price*c.total_students||0).toLocaleString()}</td><td className="p-3 flex gap-1"><button className="w-6 h-6 bg-white/[0.06] rounded-full flex items-center justify-center"><Edit className="w-3 h-3"/></button><button onClick={()=>handleDelete('course', c.id)} className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center text-red-400"><Trash2 className="w-3 h-3"/></button></td></tr>)}</tbody></table></div>
          </div>
        )}

        {activeTab==='users' && (
          <div className="mt-6 card-dark overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex justify-between"><h3 className="font-bold text-[13px]">Users ({users.length})</h3><span className="text-[10px] text-white/20">Role & Membership editable</span></div>
            <table className="w-full text-[11px]"><thead className="bg-white/[0.02] text-[9px] text-white/30"><tr><th className="p-3 text-left">User</th><th className="p-3">Role</th><th className="p-3">Membership</th><th className="p-3">Joined</th><th className="p-3">XP</th></tr></thead><tbody>{users.map(u=><tr key={u.id} className="border-t border-white/[0.04]"><td className="p-3"><p className="font-medium">{u.name}</p><p className="text-[10px] text-white/30">{u.email}</p></td><td className="p-3"><select defaultValue={u.role} className="bg-[#0a0a0f] border border-white/[0.06] rounded-full px-2 py-1 text-[10px]"><option>user</option><option>admin</option><option>instructor</option></select></td><td className="p-3"><select defaultValue={u.membership} className="bg-[#0a0a0f] border border-white/[0.06] rounded-full px-2 py-1 text-[10px]"><option>free</option><option>pro</option><option>premium</option></select></td><td className="p-3 text-white/30 text-[10px]">{new Date(u.created_at).toLocaleDateString()}</td><td className="p-3"><span className="bg-white/[0.06] px-2 py-1 rounded-full text-[10px]">1,240 XP</span></td></tr>)}</tbody></table>
          </div>
        )}

        {activeTab==='coupons' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Coupons ({coupons.length}) • Save up to 50%</h3><button onClick={()=>setShowCreate({...showCreate, coupon:true})} className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px] flex items-center gap-1"><Plus className="w-3 h-3"/> New Coupon</button></div>
            {showCreate.coupon && <div className="card-dark p-5 mb-4"><div className="grid md:grid-cols-4 gap-2"><input value={newCoupon.code} onChange={e=>setNewCoupon({...newCoupon, code:e.target.value.toUpperCase()})} placeholder="CODE e.g. WELCOME50" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px] font-mono"/><input value={newCoupon.discount} onChange={e=>setNewCoupon({...newCoupon, discount:e.target.value})} placeholder="Discount" type="number" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"/><select value={newCoupon.type} onChange={e=>setNewCoupon({...newCoupon, type:e.target.value})} className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"><option value="percent">Percent %</option><option value="flat">Flat ₹</option></select><input value={newCoupon.expiry} onChange={e=>setNewCoupon({...newCoupon, expiry:e.target.value})} placeholder="Expiry YYYY-MM-DD" className="px-3 py-2 bg-[#0a0a0f] border border-white/[0.06] rounded-full text-[12px]"/></div><button onClick={()=>{ setCoupons([{ id:Date.now(), ...newCoupon, used:0, limit:100, active:true }, ...coupons]); setShowCreate({...showCreate, coupon:false}) }} className="mt-3 bg-white text-black px-4 py-2 rounded-full font-bold text-[11px]">Create Coupon</button></div>}
            <div className="grid md:grid-cols-3 gap-3">
              {coupons.map(c=>(
                <div key={c.id} className="card-dark p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-bold px-2 py-1 rounded-bl-xl">{c.type==='percent' ? `${c.discount}% OFF` : `₹${c.discount} OFF`}</div>
                  <p className="font-mono font-bold text-[16px] tracking-widest">{c.code}</p>
                  <div className="mt-3 flex gap-2 text-[10px]"><span className="bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full">{c.used}/{c.limit} used</span><span className="bg-white/[0.06] border border-white/[0.06] px-2 py-1 rounded-full">Exp: {c.expiry}</span></div>
                  <div className="mt-3 w-full bg-white/[0.06] h-1.5 rounded-full"><div className="bg-white h-1.5 rounded-full" style={{width:`${(c.used/c.limit)*100}%`}}/></div>
                  <div className="mt-4 flex gap-2"><button className="flex-1 bg-white text-black py-2 rounded-full font-bold text-[11px]">Edit</button><button onClick={()=>handleDelete('coupon', c.id)} className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400"><Trash2 className="w-3 h-3"/></button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='affiliate' && (
          <div className="mt-6">
            <div className="grid md:grid-cols-4 gap-3 mb-6">
              <div className="bg-white text-black rounded-2xl p-5"><p className="text-[11px] text-black/50">TOTAL AFFILIATES</p><p className="text-[24px] font-bold display mt-1">{affiliates.length}</p><p className="text-[10px] text-green-600">+3 this week</p></div>
              <div className="card-dark p-5"><p className="text-[11px] text-white/30">TOTAL REFERRALS</p><p className="text-[24px] font-bold display mt-1">1,240</p></div>
              <div className="card-dark p-5"><p className="text-[11px] text-white/30">TOTAL PAYOUTS</p><p className="text-[24px] font-bold display mt-1">₹42,500</p></div>
              <div className="card-dark p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"><p className="text-[11px] text-green-400">PENDING PAYOUTS</p><p className="text-[24px] font-bold display mt-1">₹12,400</p><button className="mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">Pay All</button></div>
            </div>
            <div className="card-dark overflow-hidden"><table className="w-full text-[11px]"><thead className="bg-white/[0.02] text-[9px] text-white/30"><tr><th className="p-3 text-left">Affiliate</th><th className="p-3">Referrals</th><th className="p-3">Earnings</th><th className="p-3">Paid</th><th className="p-3">Pending</th><th className="p-3">Link</th><th className="p-3">Action</th></tr></thead><tbody>{affiliates.map(a=><tr key={a.id} className="border-t border-white/[0.04]"><td className="p-3"><p className="font-medium">{a.name}</p><p className="text-[10px] text-white/30">{a.email}</p></td><td className="p-3 font-bold">{a.referrals}</td><td className="p-3 text-green-400 font-bold">₹{a.earnings}</td><td className="p-3">₹{a.paid}</td><td className="p-3 text-amber-400">₹{a.pending}</td><td className="p-3"><span className="font-mono text-[10px] bg-[#0a0a0f] border border-white/[0.06] px-2 py-1 rounded-full">{a.link}</span></td><td className="p-3"><button className="bg-white text-black px-3 py-1 rounded-full font-bold text-[10px]">Pay ₹{a.pending}</button></td></tr>)}</tbody></table></div>
          </div>
        )}

        {activeTab==='categories' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Categories ({categories.length})</h3><button className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px] flex items-center gap-1"><Plus className="w-3 h-3"/> New Category</button></div>
            <div className="grid md:grid-cols-4 gap-3">
              {categories.map(c=>(
                <div key={c.id} className="card-dark p-5 flex justify-between items-center">
                  <div><p className="font-bold text-[13px]">{c.name}</p><p className="text-[11px] text-white/30">/{c.slug} • {c.courses} courses</p></div>
                  <div className="flex gap-1"><button className="w-7 h-7 bg-white/[0.06] rounded-full flex items-center justify-center"><Edit className="w-3 h-3"/></button><button onClick={()=>handleDelete('category', c.id)} className="w-7 h-7 bg-red-500/10 rounded-full flex items-center justify-center text-red-400"><Trash2 className="w-3 h-3"/></button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='comments' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Comments & Q&A Moderation ({comments.length})</h3><span className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full">3 pending</span></div>
            <div className="space-y-3">
              {comments.map(c=>(
                <div key={c.id} className="card-dark p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">{c.user[0]}</div>
                  <div className="flex-1">
                    <div className="flex justify-between"><p className="font-medium text-[13px]">{c.user} • <span className="text-white/40 text-[11px]">{c.course}</span></p><span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-full">{c.status}</span></div>
                    <p className="text-[13px] text-white/70 mt-2 leading-relaxed">{c.content}</p>
                    <div className="mt-3 flex gap-2"><button className="bg-green-500 text-white px-3 py-1.5 rounded-full font-bold text-[11px]">Approve</button><button className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full font-bold text-[11px]">Reject</button><button className="bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-[11px]">Reply</button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='live' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Live Classes ({liveClasses.length})</h3><button className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-[11px] flex items-center gap-1"><Plus className="w-3 h-3"/> New Live Class</button></div>
            <div className="grid md:grid-cols-3 gap-3">
              {liveClasses.map(l=>(
                <div key={l.id} className="card-dark p-5 border-l-2 border-l-red-500">
                  <div className="flex justify-between"><span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded-full animate-pulse">● {l.status}</span><span className="text-[11px] text-white/30 flex items-center gap-1"><Users className="w-3 h-3"/>{l.enrolled}</span></div>
                  <p className="font-bold text-[14px] mt-3">{l.title}</p><p className="text-[11px] text-white/30 mt-1">by {l.instructor} • {new Date(l.scheduled_at).toLocaleString()}</p>
                  <div className="mt-4 flex gap-2"><button className="flex-1 bg-white text-black py-2 rounded-full font-bold text-[11px]">Edit</button><button className="flex-1 bg-white/[0.06] border border-white/[0.06] py-2 rounded-full text-[11px]">End Live</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='deploy' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Deployments ({deployments.length}) • Hostinger</h3><span className="text-[11px] bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full">89 live</span></div>
            <div className="grid md:grid-cols-3 gap-3">
              {deployments.map(d=>(
                <div key={d.id} className="card-dark p-5">
                  <div className="flex justify-between"><div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold">{d.project[0]}</div><span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full">{d.status}</span></div>
                  <p className="font-bold text-[13px] mt-3">{d.project}</p><p className="text-[11px] text-white/30">by {d.user} • {d.subdomain}.codemasterpro.in</p>
                  <div className="mt-3 bg-[#0a0a0f] border border-white/[0.06] p-2 rounded-lg flex justify-between items-center"><span className="text-[10px] text-white/40 truncate">{d.subdomain}.codemasterpro.in</span><ExternalLink className="w-3 h-3 text-white/20"/></div>
                  <div className="mt-3 flex gap-2 text-[10px] text-white/20"><span className="flex items-center gap-1"><Eye className="w-3 h-3"/>{d.visits} visits</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{new Date(d.created_at).toLocaleDateString()}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='settings' && (
          <AdminCustomization />
        )}

        {(activeTab==='notes' || activeTab==='quizzes' || activeTab==='jobs' || activeTab==='payments') && (
          <div className="mt-6">
            {activeTab==='notes' && <><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Notes ({notes.length})</h3><button className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px]"><Plus className="w-3 h-3 inline"/> New Note</button></div><div className="grid md:grid-cols-3 gap-3">{notes.map(n=><div key={n.id} className="card-dark p-4 flex justify-between"><div><p className="font-medium text-[12px]">{n.title}</p><p className="text-[10px] text-white/30">{n.category_name} • {n.views} views</p></div><button onClick={()=>handleDelete('note', n.id)} className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center text-red-400"><Trash2 className="w-3 h-3"/></button></div>)}</div></>}
            {activeTab==='quizzes' && <><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Quizzes ({quizzes.length})</h3><button className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px]"><Plus className="w-3 h-3 inline"/> New Quiz</button></div><div className="grid md:grid-cols-3 gap-3">{quizzes.map(q=><div key={q.id} className="card-dark p-4"><p className="font-medium text-[12px]">{q.title}</p><p className="text-[10px] text-white/30 mt-1">{q.category_name} • {q.total_questions||0} Qs</p></div>)}</div></>}
            {activeTab==='jobs' && <><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Jobs ({jobs.length})</h3><button className="bg-white text-black px-4 py-2 rounded-full font-bold text-[11px]"><Plus className="w-3 h-3 inline"/> New Job</button></div><div className="grid md:grid-cols-2 gap-3">{jobs.map(j=><div key={j.id} className="card-dark p-4 flex justify-between"><div><p className="font-medium text-[12px]">{j.title} @ {j.company}</p><p className="text-[10px] text-white/30">{j.location} • {j.salary}</p></div><button onClick={()=>handleDelete('job', j.id)} className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center text-red-400"><Trash2 className="w-3 h-3"/></button></div>)}</div></>}
            {activeTab==='payments' && <div className="card-dark overflow-hidden"><div className="p-4 border-b border-white/[0.06]"><h3 className="font-bold text-[13px]">Payments • ₹{stats.stats.revenue}</h3></div><table className="w-full text-[11px]"><thead className="bg-white/[0.02] text-[9px] text-white/30"><tr><th className="p-3 text-left">User</th><th className="p-3">Plan</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr></thead><tbody><tr className="border-t border-white/[0.04]"><td className="p-3">Priya Patel</td><td className="p-3"><span className="bg-white text-black px-2 py-1 rounded-full text-[9px] font-bold">PRO</span></td><td className="p-3 font-bold">₹499</td><td className="p-3"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[9px]">success</span></td></tr></tbody></table></div>}
          </div>
        )}
      </div>
    </div>
  )
}

function TrendingUp({ className }) { return <BarChart3 className={className} /> }
