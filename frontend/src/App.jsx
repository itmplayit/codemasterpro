import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ScrollProgress } from './components/AdvancedDynamic'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Notes from './pages/Notes'
import Quizzes from './pages/Quizzes'
import QuizAttempt from './pages/QuizAttempt'
import Membership from './pages/Membership'
import { Login, Register } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Roadmaps from './pages/Roadmaps'
import AdminDashboard from './pages/AdminDashboard'
import Certificates from './pages/Certificates'
import SearchPage from './pages/Search'
import InstructorDashboard from './pages/InstructorDashboard'
import CodePlayground from './pages/CodePlayground'
import Wishlist from './pages/Wishlist'
import Jobs from './pages/Jobs'
import Analytics from './pages/Analytics'
import LiveClasses from './pages/LiveClasses'
import MyDeployments from './pages/MyDeployments'
import Affiliate from './pages/Affiliate'
import Leaderboard from './pages/Leaderboard'
import { About, Privacy, Terms, Contact } from './pages/StaticPages'

function Protected({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 bg-[#050507]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/:slug" element={<QuizAttempt />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
          <Route path="/instructor" element={<Protected><InstructorDashboard /></Protected>} />
          <Route path="/certificates" element={<Protected><Certificates /></Protected>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
          <Route path="/live" element={<LiveClasses />} />
          <Route path="/deployments" element={<Protected><MyDeployments /></Protected>} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
