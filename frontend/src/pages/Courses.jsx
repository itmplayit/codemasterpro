import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'
import { Search, SlidersHorizontal, Command } from 'lucide-react'

export default function Courses() {
  const { API } = useAuth()
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState({ search:'', category:'', level:'', free:'' })
  const [categories, setCategories] = useState([])

  useEffect(()=>{ axios.get(`${API}/api/categories`).then(r=>setCategories(r.data)).catch(()=>{}) }, [])

  const fetchCourses = async () => {
    const params = new URLSearchParams()
    if (filter.search) params.append('search', filter.search)
    if (filter.category) params.append('category', filter.category)
    if (filter.level) params.append('level', filter.level)
    if (filter.free) params.append('free', filter.free)
    try {
      const res = await axios.get(`${API}/api/courses?${params}`)
      if (res.data?.length) setCourses(res.data)
    } catch {}
  }

  useEffect(()=>{ fetchCourses() }, [filter.category, filter.level, filter.free])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> COURSES / ALL</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="display text-[48px] font-bold tracking-tight leading-[0.9]">Courses that<br/><span className="text-white/20">ship careers.</span></h1>
            <p className="text-white/40 mt-4 max-w-xl text-[14px]">20+ professional courses with projects, certificates, one-click deploy. React, Node, MySQL, DSA.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/>
              <input value={filter.search} onChange={e=>setFilter({...filter, search:e.target.value})} onKeyDown={e=>e.key==='Enter' && fetchCourses()} placeholder="Search JavaScript, React, MySQL..." className="w-full pl-11 pr-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            </div>
            <button onClick={fetchCourses} className="bg-white text-black px-6 py-3 rounded-full font-bold text-[13px] hover:bg-white/90">Search</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          <select value={filter.category} onChange={e=>setFilter({...filter, category:e.target.value})} className="px-4 py-2 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] text-white/60 focus:outline-none">
            <option value="">All Categories</option>
            {categories.map(c=><option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
          <select value={filter.level} onChange={e=>setFilter({...filter, level:e.target.value})} className="px-4 py-2 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] text-white/60">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select value={filter.free} onChange={e=>setFilter({...filter, free:e.target.value})} className="px-4 py-2 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] text-white/60">
            <option value="">All Pricing</option>
            <option value="true">Free Only</option>
          </select>
          <button onClick={()=>setFilter({search:'', category:'', level:'', free:''})} className="px-4 py-2 text-[13px] text-white/20 hover:text-white/60">Clear</button>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-white/20"><SlidersHorizontal className="w-3 h-3"/> {courses.length} courses</div>
        </div>

        {courses.length===0 ? (
          <div className="mt-16 text-center py-20 card-dark">
            <p className="text-white/40">No courses found. Try different filters or check XAMPP MySQL.</p>
          </div>
        ) : (
          <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map(c=> <CourseCard key={c.id} course={c}/>)}
          </div>
        )}
      </div>
    </div>
  )
}
