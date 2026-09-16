import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Clock, Users, Star, Play, Check, Lock, Crown, FileText, Heart, Command } from 'lucide-react'
import Comments from '../components/Comments'
import AITutor from '../components/AITutor'
import VideoPlayer from '../components/VideoPlayer'

export default function CourseDetail() {
  const { slug } = useParams()
  const { API, user } = useAuth()
  const [course, setCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(0)
  const [inWishlist, setInWishlist] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${API}/api/courses/${slug}`).then(r=>setCourse(r.data)).catch(()=>{
      setCourse({
        id:1, title:'Complete JavaScript Mastery 2025', slug, description:'Master JavaScript from scratch with projects, ES6+, async, DOM', category_name:'JavaScript', level:'beginner', duration_hours:24.5, total_students:1240, rating:4.8, price:499, original_price:1999, is_free:false, membership_required:'free', thumbnail:'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600',
        lessons: [
          { id:1, title:'Introduction to JavaScript', description:'What is JS and why learn it', video_url:'https://www.youtube.com/embed/W6NZfCO5SIk', duration_minutes:12, is_preview:true, order_no:1 },
          { id:2, title:'Variables and Data Types', description:'let, const, var explained', video_url:'https://www.youtube.com/embed/W6NZfCO5SIk', duration_minutes:18, is_preview:true, order_no:2 },
          { id:3, title:'Functions and Scope', description:'Deep dive into functions', video_url:'https://www.youtube.com/embed/W6NZfCO5SIk', duration_minutes:22, is_preview:false, order_no:3 }
        ]
      })
    })
  }, [slug])

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return }
    const token = localStorage.getItem('token')
    try {
      await axios.post(`${API}/api/courses/${course.id}/enroll`, {}, { headers: { Authorization: `Bearer ${token}` } })
      alert('Enrolled successfully!')
    } catch (e) {
      alert(e.response?.data?.message || 'Enroll failed')
      if (e.response?.data?.required) navigate('/membership')
    }
  }

  const handleWishlist = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    try {
      if (inWishlist) {
        await axios.delete(`${API}/api/wishlist/${course.id}`, { headers: { Authorization: `Bearer ${token}` } })
        setInWishlist(false)
      } else {
        await axios.post(`${API}/api/wishlist/${course.id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        setInWishlist(true)
      }
    } catch {}
  }

  if (!course) return <div className="min-h-screen bg-[#050507] p-20 text-center text-white/40">Loading...</div>

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="border-b border-white/[0.06] bg-[#0a0a0f]">
        <div className="max-w-[1400px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-4"><Command className="w-3 h-3"/> COURSES / {course.category_name?.toUpperCase()}</div>
            <div className="flex gap-2 mb-4">
              <span className="badge bg-white/[0.06] border border-white/[0.06] text-white/60">{course.category_name}</span>
              <span className="badge bg-white text-black">{course.level}</span>
              {course.membership_required!=='free' && <span className="badge bg-[#f59e0b] text-black flex items-center gap-1"><Crown className="w-3 h-3"/>{course.membership_required}</span>}
            </div>
            <h1 className="display text-[36px] font-bold leading-[1.1] tracking-tight">{course.title}</h1>
            <p className="mt-4 text-white/40 leading-relaxed text-[14px]">{course.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-[12px]">
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40"><Clock className="w-3.5 h-3.5"/>{course.duration_hours}h</span>
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40"><Users className="w-3 h-3"/>{course.total_students} students</span>
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-full text-white/40"><Star className="w-3 h-3 fill-amber-400 text-amber-400"/>{course.rating}</span>
            </div>
          </div>
          <div className="card-dark p-5 h-fit">
            <img src={course.thumbnail} alt="" className="w-full h-44 object-cover rounded-xl mb-5"/>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="display text-[28px] font-bold">{course.is_free ? 'FREE' : `₹${course.price}`}</span>
              {course.original_price>course.price && <span className="line-through text-white/20 text-[13px]">₹{course.original_price}</span>}
            </div>
            <button onClick={handleEnroll} className="w-full bg-white text-black py-3 rounded-full font-bold text-[14px] hover:bg-white/90">Enroll Now</button>
            <button onClick={handleWishlist} className={`w-full mt-3 py-3 rounded-full font-bold text-[13px] flex items-center justify-center gap-2 border ${inWishlist?'bg-red-500/10 border-red-500/20 text-red-400':'bg-white/[0.06] border-white/[0.06] text-white/60 hover:bg-white/[0.08]'}`}><Heart className={`w-4 h-4 ${inWishlist?'fill-red-500':''}`}/> {inWishlist?'In Wishlist':'Add to Wishlist'}</button>
            <ul className="mt-6 space-y-2 text-[12px] text-white/40">
              <li className="flex gap-2"><Check className="w-4 h-4 text-white/60"/> Lifetime access</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-white/60"/> Certificate</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-white/60"/> {course.lessons?.length} lessons</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <VideoPlayer lesson={course.lessons?.[activeLesson]} courseId={course.id} />
          <div>
            <h3 className="font-bold text-[18px] display">{course.lessons?.[activeLesson]?.title}</h3>
            <p className="text-[13px] text-white/40 mt-2">{course.lessons?.[activeLesson]?.description}</p>
          </div>
          <div className="card-dark p-0 overflow-hidden">
            <div className="p-5 border-b border-white/[0.06]"><h4 className="font-bold text-[13px]">AI Tutor • Ask about this lesson</h4></div>
            <div className="p-5"><AITutor courseContext={course.title} /></div>
          </div>
          <Comments courseId={course.id} />
        </div>
        <div className="card-dark p-2 h-fit max-h-[600px] overflow-auto">
          <h4 className="font-bold p-3 text-[13px]">Course Content • {course.lessons?.length} lessons</h4>
          {course.lessons?.map((l, idx)=>(
            <button key={l.id} onClick={()=>setActiveLesson(idx)} className={`w-full text-left p-3 rounded-xl flex items-start gap-3 hover:bg-white/[0.04] transition ${activeLesson===idx?'bg-white/[0.06] border border-white/[0.06]':''}`}>
              <div className={`mt-1 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${activeLesson===idx?'bg-white text-black':'bg-white/[0.06] text-white/40'}`}>
                <Play className="w-3.5 h-3.5"/>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium leading-tight">{idx+1}. {l.title}</p>
                <p className="text-[11px] text-white/30 mt-1">{l.duration_minutes} min {l.is_preview && '• Preview'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
