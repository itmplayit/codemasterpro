import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'
import { Heart, Command } from 'lucide-react'

export default function Wishlist() {
  const { API } = useAuth()
  const [items, setItems] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`${API}/api/wishlist`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>setItems(r.data)).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> WISHLIST / SAVED</div>
        <h1 className="display text-[36px] font-bold tracking-tight flex items-center gap-3"><Heart className="w-8 h-8 text-red-500 fill-red-500"/> My Wishlist</h1>
        {items.length===0 ? (
          <div className="mt-12 card-dark p-12 text-center">
            <Heart className="w-16 h-16 text-white/10 mx-auto mb-4"/>
            <p className="font-bold">No saved courses</p>
            <p className="text-[13px] text-white/40 mt-2">Add courses to wishlist to buy later</p>
          </div>
        ) : (
          <div className="mt-10 grid md:grid-cols-4 gap-4">
            {items.map(i=> <CourseCard key={i.id} course={i}/>)}
          </div>
        )}
      </div>
    </div>
  )
}
