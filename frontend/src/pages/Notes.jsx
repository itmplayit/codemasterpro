import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Search, Download, Eye, Crown, FileText, Command } from 'lucide-react'

export default function Notes() {
  const { API } = useAuth()
  const [notes, setNotes] = useState([
    { id:1, title:'JavaScript ES6+ Cheat Sheet', slug:'js-es6', category_name:'JavaScript', description:'All ES6 features with examples - arrow, destructuring, promises', file_type:'pdf', is_premium:false, views:1240, tags:'javascript,es6' },
    { id:2, title:'React Hooks Complete Notes', slug:'react-hooks', category_name:'ReactJS', description:'useState, useEffect, useContext all explained with playground', file_type:'pdf', is_premium:true, views:890, tags:'react,hooks' },
    { id:3, title:'MySQL Commands PDF', slug:'mysql-commands', category_name:'SQL', description:'All SQL queries for interview - SELECT, JOIN, GROUP BY', file_type:'pdf', is_premium:false, views:2100, tags:'sql,mysql,xampp' }
  ])
  const [search, setSearch] = useState('')

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/api/notes?search=${search}`)
      if (res.data?.length) setNotes(res.data)
    } catch {}
  }
  useEffect(()=>{ fetchNotes() }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> NOTES / ALL</div>
          <h1 className="display text-[42px] font-bold tracking-tight leading-[0.9]">Notes that<br/><span className="text-white/20">stick.</span></h1>
          <p className="text-white/40 mt-3 max-w-xl text-[14px]">150+ premium notes, cheat sheets, PDFs - MySQL, React, DSA. Download, learn, get hired.</p>

          <div className="mt-8 flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter' && fetchNotes()} placeholder="Search notes..." className="w-full pl-11 pr-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            </div>
            <button onClick={fetchNotes} className="bg-white text-black px-6 py-3 rounded-full font-bold text-[13px]">Search</button>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {notes.map(n=>(
              <div key={n.id} className="card-dark p-5 group hover:border-white/10 hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center"><FileText className="w-5 h-5 text-white/60"/></div>
                  {n.is_premium && <span className="badge bg-[#f59e0b] text-black flex items-center gap-1"><Crown className="w-3 h-3"/> PRO</span>}
                </div>
                <h3 className="font-semibold text-[14px] mt-4 group-hover:text-white display">{n.title}</h3>
                <p className="text-[12px] text-white/40 mt-2 line-clamp-2 leading-relaxed">{n.description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[10px] px-2.5 py-1 bg-white/[0.06] border border-white/[0.06] rounded-full text-white/40">{n.category_name}</span>
                  <span className="text-[11px] text-white/20">{n.views} views</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <button className="flex-1 bg-white/[0.06] hover:bg-white/[0.08] border border-white/[0.06] py-2.5 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5"><Eye className="w-3.5 h-3.5"/> View</button>
                  <button className="flex-1 bg-white text-black py-2.5 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5"/> {n.file_type.toUpperCase()}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="card-dark p-5">
            <h4 className="font-bold text-[13px] tracking-wide">CATEGORIES</h4>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li className="flex justify-between text-white/60 hover:text-white cursor-pointer"><span>JavaScript</span><span className="text-white/20">24</span></li>
              <li className="flex justify-between text-white/60 hover:text-white cursor-pointer"><span>ReactJS</span><span className="text-white/20">18</span></li>
              <li className="flex justify-between text-white/60 hover:text-white cursor-pointer"><span>MySQL / XAMPP</span><span className="text-white/20">12</span></li>
              <li className="flex justify-between text-white/60 hover:text-white cursor-pointer"><span>DSA</span><span className="text-white/20">32</span></li>
            </ul>
          </div>
          <div className="bg-white text-black rounded-2xl p-6">
            <h4 className="font-bold text-[14px] display">Get Premium Notes</h4>
            <p className="text-[12px] text-black/60 mt-2 leading-relaxed">Unlock all 150+ notes with Pro membership at just ₹499/mo</p>
            <button className="mt-4 bg-black text-white px-4 py-2.5 rounded-full text-[12px] font-bold w-full">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </div>
  )
}
