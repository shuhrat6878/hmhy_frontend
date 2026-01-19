import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "./navbar"
import { type Role } from "../pages/auth/types"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { LogOut, User } from "lucide-react"

export const MainLayout = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role") as Role | null
  const username = localStorage.getItem("username") || "Shuxrat"

  if (!token || !role) {
    return <Navigate replace to="/" />
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    navigate("/", { replace: true })
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} />

      <main className="flex-1 min-h-screen bg-gray-100">
        <header className="h-14 bg-[#0f172a] text-white flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-white hover:bg-white/10 rounded-md" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Admin Panel </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <User className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/90">{username}</span>

              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/20 hover:bg-emerald-500/25">
                {role.toUpperCase()}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={handleLogout}
              title="Chiqish"
            >
              <LogOut className="w-5 h-5" />
              <span className="sr-only ">Chiqish</span>
            </Button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
