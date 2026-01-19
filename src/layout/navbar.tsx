import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"
import { links } from "./layout-data"
import { Link, useNavigate } from "react-router-dom"
import type { Role } from "../pages/auth/types"
import { ActiveLink } from "../components/active-link"
import { HMHYText } from "../components/hmhy"

export function AppSidebar({ role }: { role: Role }) {
    const navigate = useNavigate()
    const roleLinks = links[role as keyof typeof links] || []

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("username")
        navigate("/", { replace: true })
    }
    console.log(handleLogout);
    

    return (
        <Sidebar className="bg-[#0f172a] text-white">
            {/* HEADER / LOGO */}
            <SidebarHeader className="h-32 px-5 flex items-center border-b border-white/10 bg-[#0f172a] pt-8 ">
                <Link to={`/app/${role}`} className="flex items-center gap-2 ">
                    

                   <div className="">
                     <HMHYText />
                   </div>
                </Link>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent className="px-2 py-4 bg-[#0f172a]">
                <SidebarGroupContent className="p-0 bg-[#0f172a]">
                    <SidebarMenu className="space-y-1">
                        {roleLinks.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <ActiveLink href={item.url}>
                                        <div className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/10">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

          
        </Sidebar>
    )
}