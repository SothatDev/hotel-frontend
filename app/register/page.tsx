"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast"; // 🔥 បំពាក់អាវុធ Toast ជំនួស Error ក្រហម

export default function Register() {
  const router = useRouter();
  
  // States សម្រាប់ទម្រង់ចុះឈ្មោះ
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  // States សម្រាប់ UI បិទ/បើកភ្នែកលេខសម្ងាត់
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ការពារកុំឱ្យគាត់វាយលេខសម្ងាត់ខុសគ្នាមុននឹងបញ្ជូនទៅ Server
    if (password !== passwordConfirmation) {
      toast.error("លេខសម្ងាត់ទាំងពីរមិនផ្ទៀងផ្ទាត់គ្នាទេ! 🔒");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("កំពុងបង្កើតគណនីជូនអ្នក...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("ចុះឈ្មោះបានជោគជ័យ! សូមស្វាគមន៍! 🎉", { id: toastId });
        window.location.href = "/my-bookings";
      } else {
        toast.error(data.message || data.errors?.email?.[0] || data.errors?.password?.[0] || "ការចុះឈ្មោះបរាជ័យ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 Background ពេញអេក្រង់ (រូបសណ្ឋាគារថ្មីសម្រាប់ Register)
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-4" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')" }}>
      
      {/* Overlay ងងឹតព្រាលៗ */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

      {/* 🔥 Glassmorphism Card (Split Screen) */}
      <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row bg-white/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 animate-in fade-in zoom-in-95 duration-500 my-8">
        
        {/* ផ្នែកខាងឆ្វេង៖ រូបភាព និង អត្ថបទ (លាក់លើទូរស័ព្ទ) */}
        <div className="hidden md:flex md:w-5/12 relative bg-cover bg-center items-end p-10"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-tight mb-4 inline-block drop-shadow-lg">
              Angkor <span className="text-amber-500">University</span>
            </Link>
            <p className="text-slate-200 text-sm font-medium leading-relaxed drop-shadow-md">
              "ចាប់ផ្តើមដំណើររបស់អ្នកជាមួយយើង។ បង្កើតគណនីថ្ងៃនេះ ដើម្បីទទួលបានបទពិសោធន៍ស្នាក់នៅដ៏ប្រណីត និងការផ្តល់ជូនពិសេសជាច្រើន។"
            </p>
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ៖ Form ចុះឈ្មោះ */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white/60">
          
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">បង្កើតគណនីថ្មី</h1>
            <p className="text-slate-500 font-medium">បំពេញព័ត៌មានខាងក្រោមដើម្បីចូលរួមជាមួយយើង</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* ប្រអប់ ឈ្មោះ និង Email ដាក់ទន្ទឹមគ្នាលើកុំព្យូទ័រ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">ឈ្មោះពេញ (Full Name)</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                  placeholder="ឈ្មោះរបស់អ្នក"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">អ៊ីមែល (Email)</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* ប្រអប់ Password */}
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">លេខសម្ងាត់ (Password)</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-5 pr-12 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                  placeholder="យ៉ាងហោចណាស់ ៦ ខ្ទង់"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors p-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* ប្រអប់ Confirm Password */}
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">បញ្ជាក់លេខសម្ងាត់ (Confirm Password)</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  minLength={6}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full pl-5 pr-12 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                  placeholder="វាយលេខសម្ងាត់ម្ដងទៀត"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors p-1"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white rounded-2xl font-extrabold transition-all shadow-lg hover:shadow-amber-500/40 flex justify-center items-center border border-amber-300/50"
            >
              {loading ? (
                <span className="flex items-center gap-2">កំពុងដំណើរការ... <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>
              ) : "បង្កើតគណនីឥឡូវនេះ"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            មានគណនីរួចហើយមែនទេ? <Link href="/login" className="text-amber-600 font-bold hover:underline transition-all">ចូលគណនីនៅទីនេះ</Link>
          </p>

        </div>
      </div>
    </div>
  );
}