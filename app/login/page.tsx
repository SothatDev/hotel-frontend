"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast"; // 🔥 បន្ថែម Toast សម្រាប់លោតសារស្អាតៗ

export default function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);

  // ១. មុខងារសម្រាប់ Login ជាមួយ Google
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    setLoading(true);
    const toastId = toast.loading("កំពុងភ្ជាប់ជាមួយ Google...");
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("ចូលគណនីជោគជ័យ! 🎉", { id: toastId });
        window.location.href = "/my-bookings";
      } else {
        toast.error(data.message || "មិនអាចភ្ជាប់គណនី Google បានទេ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ២. មុខងារសម្រាប់ Login ជាមួយ Telegram
  const handleTelegramResponse = async (response: any) => {
    setLoading(true);
    const toastId = toast.loading("កំពុងភ្ជាប់ជាមួយ Telegram...");
    try {
      const res = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(response), 
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("ចូលគណនីជោគជ័យ! 🎉", { id: toastId });
        window.location.href = "/my-bookings";
      } else {
        toast.error(data.message || "មិនអាចភ្ជាប់គណនី Telegram បានទេ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ហៅប៊ូតុង Telegram
  useEffect(() => {
    const container = document.getElementById("telegram-login-container");
    if (container && container.children.length === 0) {
      (window as any).onTelegramAuth = handleTelegramResponse;

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "HotelMIS_bot"); 
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "15"); // កែឱ្យមូលស្អាត
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.async = true;
      
      container.appendChild(script);
    }
  }, []);

  // ៣. មុខងារសម្រាប់ Login ជាមួយ Email/Password ធម្មតា
  const handleNormalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("កំពុងផ្ទៀងផ្ទាត់...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("ចូលគណនីជោគជ័យ! 🎉", { id: toastId });
        window.location.href = "/my-bookings";
      } else {
        toast.error(data.message || "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 Background ពេញអេក្រង់
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-4" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=2070&auto=format&fit=crop')" }}>
      
      {/* Overlay ងងឹតព្រាលៗ */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

      {/* 🔥 Glassmorphism Card (Split Screen) */}
      <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row bg-white/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 animate-in fade-in zoom-in-95 duration-500">
        
        {/* ផ្នែកខាងឆ្វេង៖ រូបភាព និង អត្ថបទ (លាក់លើទូរស័ព្ទ) */}
        <div className="hidden md:flex md:w-5/12 relative bg-cover bg-center items-end p-10"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-tight mb-4 inline-block drop-shadow-lg">
              Angkor <span className="text-amber-500">University</span>
            </Link>
            <p className="text-slate-200 text-sm font-medium leading-relaxed drop-shadow-md">
              "ត្រលប់មកកាន់កន្លែងដ៏សក្តិសមសម្រាប់អ្នក។ ចូលគណនីដើម្បីបន្តការស្វែងរកបទពិសោធន៍ដ៏អស្ចារ្យ។"
            </p>
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ៖ Form Login */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white/60">
          
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">សូមស្វាគមន៍មកវិញ 👋</h1>
            <p className="text-slate-500 font-medium">ចូលគណនីដើម្បីគ្រប់គ្រងការកក់របស់អ្នក</p>
          </div>

          {/* ប៊ូតុង Social Logins */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-center md:justify-start w-full overflow-hidden rounded-2xl shadow-sm border border-slate-200/50 hover:border-amber-300 transition-colors">
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => toast.error("បរាជ័យក្នុងការភ្ជាប់ជាមួយ Google!")}
                  useOneTap
                  shape="rectangular"
                  size="large"
                  width="400"
                  theme="outline"
                  text="continue_with"
                />
              </GoogleOAuthProvider>
            </div>
            
            <div className="flex justify-center md:justify-start">
              <div id="telegram-login-container" className="hover:scale-[1.02] transition-transform"></div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-300/60 flex-1"></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">ឬប្រើប្រាស់អ៊ីមែល</span>
            <div className="h-px bg-slate-300/60 flex-1"></div>
          </div>

          {/* Form លេខសម្ងាត់ធម្មតា */}
          <form onSubmit={handleNormalLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-2 ml-1">អ៊ីមែល (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-2 ml-1">លេខសម្ងាត់ (Password)</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-5 pr-12 py-3.5 bg-white/70 rounded-2xl border border-white/80 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 border-slate-300 transition-colors" />
                <span className="text-slate-600 font-bold group-hover:text-amber-600 transition-colors">ចងចាំខ្ញុំ</span>
              </label>
              <a href="#" className="text-amber-600 font-bold hover:text-amber-500 transition-colors">ភ្លេចលេខសម្ងាត់?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white rounded-2xl font-extrabold transition-all shadow-lg hover:shadow-amber-500/40 flex justify-center items-center border border-amber-300/50 mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">កំពុងដំណើរការ... <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>
              ) : "ចូលគណនី (Login)"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            មិនទាន់មានគណនីមែនទេ? <Link href="/register" className="text-amber-600 font-bold hover:underline transition-all">ចុះឈ្មោះឥឡូវនេះ</Link>
          </p>

        </div>
      </div>
    </div>
  );
}