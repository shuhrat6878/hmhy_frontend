import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { request } from '../../config/request'

import teacherImg from '@/assets/teacher.png'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export const TeacherLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      const res = await request.post('/signin/teacher', { email, password })

      const token = res.data.data
      localStorage.setItem('token', token)
      localStorage.setItem('role', 'teacher')

      toast.success('Login successful!')
      navigate('/teacher/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/api/v1/teacher/google`
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* soft background */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 flex items-center min-h-screen">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-2xl">

          {/* LEFT: Image */}
          <div className="relative min-h-[240px] md:min-h-[520px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${teacherImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />

            <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-200">
                Teacher Portal
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-black text-white">
                HMHY — O&apos;qituvchi kirishi
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Darslar va guruhlarni boshqarish uchun tizimga kiring.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="p-6 md:p-10 bg-white">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Kirish</h2>
              <p className="text-sm text-slate-500 mt-1">
                Email va parolingizni kiriting
              </p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#4285F4] hover:bg-[#357ae8] transition 
             flex items-center justify-center gap-3 
             text-white font-semibold text-sm
             disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {/* Google icon */}
              <span className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path fill="#EA4335" d="M24 9.5c3.2 0 5.4 1.4 6.6 2.5l4.9-4.9C32.3 4.1 28.5 2.5 24 2.5 14.9 2.5 7.3 8.9 4.7 17.5l5.7 4.4C11.7 14.9 17.4 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.6c-.5 3-2.1 5.5-4.6 7.2l5.7 4.4c3.3-3.1 5.4-7.7 5.4-15.1z" />
                  <path fill="#FBBC05" d="M10.4 28.1c-.4-1.2-.6-2.4-.6-3.6s.2-2.4.6-3.6l-5.7-4.4C3.2 19.6 2.5 22 2.5 24.5s.7 4.9 2.2 7l5.7-4.4z" />
                  <path fill="#34A853" d="M24 46.5c6.5 0 12-2.1 16-5.8l-5.7-4.4c-1.6 1.1-3.7 1.9-6.3 1.9-6.6 0-12.3-5.4-14.3-12.4l-5.7 4.4C11.4 40.1 17.6 46.5 24 46.5z" />
                </svg>
              </span>

              <span>
                {loading ? 'Redirecting...' : 'Sign in with Google'}
              </span>
            </button>


            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-500 font-semibold">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Email */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="teacher@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                disabled={loading}
                className="w-full h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              type="button"
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-[12px] text-center text-slate-500 mt-5">
              By continuing, you agree to HMHY&apos;s Terms of Service and Privacy Policy
            </p>

            <div className="pt-5 mt-5 border-t text-center">
              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="text-indigo-600 hover:underline font-semibold text-sm"
              >
                ← Login as Admin
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
