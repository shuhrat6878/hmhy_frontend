import { ShieldCheck, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

import studentImg from "../../assets/student.png"; 

const Telegram = () => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* soft background */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 flex items-center min-h-screen">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-2xl">
          
          {/* LEFT: Image */}
          <div className="relative min-h-[240px] md:min-h-[520px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${studentImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />

            <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-200">
                Student Portal
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-black text-white">
                Telegram bot orqali davom eting
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Darslarni ko‘rish, band qilish va boshqarish — hammasi bot orqali.
              </p>
            </div>
          </div>

          {/* RIGHT: Card */}
          <div className="p-6 md:p-10 bg-white">
            <Card className="border-none shadow-none rounded-3xl">
              <CardContent className="p-0 flex flex-col items-center text-center space-y-6">
                
                {/* Logo */}
                <div className="flex items-center gap-1 mb-2">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">
                    HM
                  </h1>
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#14b8a6]">
                    HY
                  </h1>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">
                    Help me help you
                  </h2>
                  <p className="text-base md:text-lg font-medium text-gray-500">
                    Xush kelibsiz!
                  </p>
                  <p className="text-[15px] text-gray-500 max-w-[340px] mx-auto leading-relaxed">
                    Platformamizdan foydalanish uchun Telegram botimizga o‘ting.
                  </p>
                </div>

                {/* Button */}
                <Button
                  className="w-full h-12 rounded-xl text-[15px] font-semibold gap-2
                             bg-gradient-to-r from-[#3b82f6] to-[#14b8a6]
                             hover:opacity-90 transition-opacity"
                  onClick={() => window.open("https://t.me/hm_hy_new_bot", "_blank")}
                >
                  <Send className="w-4 h-4" />
                  Telegram Bot'ga o'tish
                </Button>

                <p className="text-[13px] text-gray-400 max-w-[360px] leading-snug">
                  Bot orqali darslarni ko‘rishingiz, band qilishingiz va boshqarishingiz mumkin.
                </p>

                <button
                  type="button"
                  className="pt-2 flex items-center gap-1.5 text-[#3b82f6] hover:underline text-[13px] font-medium"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Maxfiylik Siyosati</span>
                </button>

                <footer className="pt-2">
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </footer>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Telegram;
