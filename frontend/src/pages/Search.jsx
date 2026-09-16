import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'
import { Search as SearchIcon, Command } from 'lucide-react'

export default function SearchPage() {
  const { API } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ courses:[], notes:[], quizzes:[] })
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    try {
      const [courses, notes, quizzes] = await Promise.all([
        axios.get(`${API}/api/courses?search=${query}`).then(r=>r.data).catch(()=>[]),
        axios.get(`${API}/api/notes?search=${query}`).then(r=>r.data).catch(()=>[]),
        axios.get(`${API}/api/quizzes`).then(r=>r.data.filter(q=>q.title.toLowerCase().includes(query.toLowerCase()))).catch(()=>[])
      ])
      setResults({ courses, notes, quizzes })
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> SEARCH / ALL</div>
        <h1 className="display text-[42px] font-bold tracking-tight">Search everything</h1>
        <div className="mt-8 flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/>
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleSearch()} placeholder="Search JavaScript, MySQL, React, DSA..." className="w-full pl-11 pr-4 py-3.5 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
          </div>
          <button onClick={handleSearch} className="bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px]">Search</button>
        </div>

        {loading ? <p className="mt-10 text-center text-white/20">Searching...</p> : (
          <div className="mt-12 space-y-12">
            <section>
              <h3 className="font-bold text-[14px] mb-4">Courses ({results.courses.length})</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {results.courses.map(c=> <CourseCard key={c.id} course={c}/>)}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
