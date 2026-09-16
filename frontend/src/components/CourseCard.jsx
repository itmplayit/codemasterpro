import { Link } from 'react-router-dom'
import { Clock, Users, Star, Crown } from 'lucide-react'

export default function CourseCard({ course }) {
  const isPremium = course.membership_required !== 'free'
  
  return (
    <Link to={`/courses/${course.slug}`} className="group block">
      <div className="card-dark overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img src={course.thumbnail || `https://picsum.photos/seed/${course.id}/400/225`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"/>
          
          <div className="absolute top-3 left-3 flex gap-1.5">
            {course.is_featured && <span className="badge bg-white text-black">FEATURED</span>}
            {course.is_free ? <span className="badge bg-[#10b981] text-black">FREE</span> : <span className="badge bg-black/50 backdrop-blur-md border border-white/10 text-white">₹{course.price}</span>}
          </div>
          
          {isPremium && (
            <div className="absolute top-3 right-3 bg-[#f59e0b] text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3"/>{course.membership_required.toUpperCase()}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-[11px] text-white/60">
              <span className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full">{course.category_name}</span>
              <span className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full capitalize">{course.level}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-[14px] leading-[1.4] line-clamp-2 group-hover:text-white transition-colors display">{course.title}</h3>
          <p className="text-[12px] text-white/40 mt-2 line-clamp-2 leading-relaxed">{course.short_desc}</p>
          
          <div className="flex items-center gap-3 mt-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{course.duration_hours}h</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{course.total_students}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400"/>{course.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
