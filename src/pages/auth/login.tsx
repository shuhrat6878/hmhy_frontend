import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { PasswordInput } from '../../components/ui/password-input'
import { UseLogin } from './service/use-login'
import { toast } from 'sonner'

import adminImg from '@/assets/admin.png'

const formSchema = z.object({
  username: z.string().min(2, "Username kamida 2 ta belgi bo'lishi kerak").max(50),
  password: z.string().min(2, "Password kamida 2 ta belgi bo'lishi kerak").max(50),
})

const Login = () => {
  const { mutate, isPending } = UseLogin()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Admin1",
      password: "Admin123!",
    },
  })

  const onSubmit = () => {
    mutate(
      {
        username: form.getValues("username"),
        password: form.getValues("password"),
      },
      {
        onSuccess: (res) => {
          localStorage.setItem('token', res.data.accessToken)
          localStorage.setItem('role', res.data.role.toLowerCase())
          localStorage.setItem('username', res.data.username)

          toast.success(res.message?.uz || 'Login muvaffaqiyatli!')
          navigate(`/app/${res.data.role.toLowerCase()}`)
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* soft gradients */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 flex items-center min-h-screen">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-2xl">
          
          {/* LEFT: Image */}
          <div className="relative min-h-[240px] md:min-h-[520px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${adminImg})` }}
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />

            <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                Admin Panel
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-black text-white">
                Tizim boshqaruvi
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Faqat ruxsat etilgan foydalanuvchilar uchun.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="p-6 md:p-10 bg-white">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Kirish</h2>
              <p className="text-sm text-slate-500 mt-1">
                Username va parolingizni kiriting
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          disabled={isPending}
                          className="h-11 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                          disabled={isPending}
                          className="h-11 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl font-bold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Yuklanmoqda...
                    </span>
                  ) : (
                    'Tizimga kirish'
                  )}
                </Button>

                <p className="text-[12px] text-center text-slate-500">
                  Admin Panel — Faqat ruxsat etilgan foydalanuvchilar uchun
                </p>

                <div className="pt-5 border-t">
                  <p className="text-sm text-slate-600 mb-2">Are you a teacher?</p>
                  <button
                    type="button"
                    onClick={() => navigate('/teacher/login')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Register as Teacher →
                  </button>
                </div>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
