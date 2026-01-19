import { useNavigate } from "react-router-dom";
import { Shield, GraduationCap, Users, ArrowRight } from "lucide-react";


import adminImg from "@/assets/admin.png";
import teacherImg from "@/assets/teacher.png";
import studentImg from "@/assets/student.png";
import { HMHYText } from "../components/hmhy";

type RoleItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  path: string;
  image: string;
  buttonText: string;
};

export default function RoleSelect() {
  const navigate = useNavigate();

  const roles: RoleItem[] = [
    {
      title: "Admin",
      desc: "Tizimni boshqarish va nazorat",
      icon: <Shield className="w-6 h-6" />,
      path: "/admin/login",
      image: adminImg,
      buttonText: "Admin login",
    },
    {
      title: "Teacher",
      desc: "Darslar va guruhlarni boshqarish",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "/teacher/login",
      image: teacherImg,
      buttonText: "Teacher login",
    },
    {
      title: "Student",
      desc: "Telegram bot orqali ro'yxatdan o'tish",
      icon: <Users className="w-6 h-6" />,
      path: "/telegram",
      image: studentImg,
      buttonText: "Student page",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white relative overflow-hidden">
      {/* Soft background */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-60">
        {/* Header */}
        <div className="text-center mb-10">
          
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="flex justify-center mb-2">
              <HMHYText />
            </div>

            <span className="ml-2 text-3xl md:text-4xl font-black tracking-tight ">
              Platformasiga kirish
            </span>
          </div>

          
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.path}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.06] "
                style={{ backgroundImage: `url(${role.image})` }}
              />

              {/* Overlay (for readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />

              {/* Content */}
              <div className="relative flex min-h-[340px] flex-col justify-between p-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 backdrop-blur bg-blue-600/50">
                    <span className="text-white">{role.icon}</span>
                    <span className="text-sm font-semibold ">{role.title}</span>
                  </div>

                  <p className="mt-4 text-sm text-white/75 leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                <button
                  onClick={() => navigate(role.path)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 text-blue-900 px-4 py-3 text-sm font-bold transition-all duration-300 hover:bg-blue-100 active:scale-[0.99]"
                >
                  {role.buttonText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-10 text-white/50 text-xs font-medium">
          © 2026 HMHY Platformasi. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}
