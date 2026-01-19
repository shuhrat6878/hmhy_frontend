import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { useDashboardStats } from "../../../hooks/use-dashboard-stats"
import { Link } from "react-router-dom"

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats()
  const username = localStorage.getItem("username") || "Shuxrat"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-slate-700" />
          <p className="text-slate-500 font-semibold text-sm">
            Platforma yuklanmoqda...
          </p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
            <CardTitle className="text-xl">Xatolik yuz berdi</CardTitle>
            <CardDescription>
              Ma’lumotlarni olishda muammo bo‘ldi. Qayta urinib ko‘ring.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-900"
            >
              Qayta urinish
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = data.data

  const colorMap = {
    blue: {
      iconWrap: "bg-blue-90 text-blue-600",
      soft: "bg-blue-50/70 border-blue-100",
      accentText: "text-blue-700",
      dot: "bg-blue-500",
    },
    emerald: {
      iconWrap: "bg-emerald-50 text-emerald-600",
      soft: "bg-emerald-50/70 border-emerald-100",
      accentText: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    purple: {
      iconWrap: "bg-purple-50 text-purple-600",
      soft: "bg-purple-50/70 border-purple-100",
      accentText: "text-purple-700",
      dot: "bg-purple-500",
    },
    amber: {
      iconWrap: "bg-amber-50 text-amber-600",
      soft: "bg-amber-50/70 border-amber-100",
      accentText: "text-amber-700",
      dot: "bg-amber-500",
    },
  } as const

  const topStats = [
    {
      title: "Ustozlar",
      value: stats.totalTeachers,
      sub: "Jami ustozlar",
      icon: Users,
      color: "blue" as const,
    },
    {
      title: "Talabalar",
      value: stats.totalStudents,
      sub: "Jami talabalar",
      icon: GraduationCap,
      color: "emerald" as const,
    },
    {
      title: "Darslar",
      value: stats.totalLessons,
      sub: "Jami darslar",
      icon: BookOpen,
      color: "purple" as const,
    },
    {
      title: "Daromad",
      value: stats.totalRevenue,
      sub: "Jami daromad (UZS)",
      icon: DollarSign,
      color: "amber" as const,
      format: (v: number) => v.toLocaleString("uz-UZ"),
    },
  ]

  const quickActions = [
    { title: "Ustozlar", icon: Users, color: "blue" as const, link: "/app/admin/teacher" },
    { title: "Talabalar", icon: GraduationCap, color: "emerald" as const, link: "/app/admin/student" },
    { title: "Darslar", icon: BookOpen, color: "purple" as const, link: "/app/admin/lesson" },
    { title: "To‘lovlar", icon: DollarSign, color: "amber" as const, link: "/app/admin/payment" },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-cyan-800 to-blue-600 text-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Xush kelibsiz - <span className="text-green-400">{username}</span> 😊
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Bugungi platformangiz statistikasi
            </p>
          </div>

          <div className="flex items-center gap-2">
            
          </div>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {topStats.map((s) => {
          const c = colorMap[s.color]
          const Icon = s.icon
          const val = s.format ? s.format(s.value as number) : s.value

          return (
            <Card key={s.title} className="shadow-sm hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${c.iconWrap}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">{s.sub}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">{s.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {val}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* MIDDLE CARDS (rasmga o‘xshash 3 blok) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Talabalar */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              Talabalar
            </CardTitle>
            <CardDescription>Holat bo‘yicha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`p-4 rounded-xl border ${colorMap.emerald.soft} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-slate-700">Faol</span>
              </div>
              <span className="font-bold text-slate-900">{stats.totalStudents}</span>
            </div>

            <div className="p-4 rounded-xl border bg-red-50/70 border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-slate-700">Bloklangan</span>
              </div>
              <span className="font-bold text-slate-900">0</span>
            </div>
          </CardContent>
        </Card>

        {/* Ustozlar */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Ustozlar
            </CardTitle>
            <CardDescription>Ko‘rsatkichlar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`p-4 rounded-xl border ${colorMap.blue.soft} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-700">Jami</span>
              </div>
              <span className="font-bold text-slate-900">{stats.totalTeachers}</span>
            </div>

            <div className={`p-4 rounded-xl border ${colorMap.purple.soft} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                <span className="font-medium text-slate-700">O‘rtacha reyting</span>
              </div>
              <span className="font-bold text-slate-900">4.5</span>
            </div>
          </CardContent>
        </Card>

        {/* To‘lovlar */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              To‘lovlar
            </CardTitle>
            <CardDescription>Moliyaviy holat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`p-4 rounded-xl border ${colorMap.amber.soft} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-slate-700">Jami</span>
              </div>
              <span className="font-bold text-slate-900">{stats.totalRevenue.toLocaleString("uz-UZ")}</span>
            </div>

            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/app/admin/payments">
                Barcha to‘lovlar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tezkor harakatlar</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((a) => {
              const c = colorMap[a.color]
              const Icon = a.icon
              return (
                <Link
                  key={a.title}
                  to={a.link}
                  className={`rounded-xl border ${c.soft} p-5 flex flex-col items-center gap-2 hover:shadow-md transition`}
                >
                  <div className={`p-3 rounded-xl ${c.iconWrap}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{a.title}</p>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
