"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isScrolled, setIsScrolled] = useState(false);
  // 🔥 ១. បន្ថែម State ថ្មីសម្រាប់ត្រួតពិនិត្យការបើក/បិទ Menu លើទូរស័ព្ទ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 🔥 ២. បិទ Mobile Menu ស្វ័យប្រវត្តិ រាល់ពេលភ្ញៀវចុចប្តូរទំព័រ
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const navLinks = [
    { name: "ទំព័រដើម", href: "/" },
    { name: "បន្ទប់ទាំងអស់", href: "/rooms" },
    { name: "សេវាកម្ម", href: "/services" },
    { name: "ទំនាក់ទំនង", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled || isMobileMenuOpen
        ? "bg-white/90 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative">
        
        {/* ឡូហ្គោ */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1 z-50">
          <span className={`transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-slate-800" : "text-white drop-shadow-md"}`}>Angkor</span>
          <span className="text-amber-500 drop-shadow-md">University</span>
        </Link>

        {/* 💻 Menu កណ្តាលសម្រាប់កុំព្យូទ័រ (លាក់លើទូរស័ព្ទ) */}
        <div className="hidden md:flex items-center gap-8 font-extrabold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`transition-all duration-300 ${
                  isActive 
                    ? "text-amber-500 border-b-2 border-amber-500 pb-1"
                    : isScrolled 
                      ? "text-slate-600 hover:text-amber-500" 
                      : "text-slate-200 hover:text-white drop-shadow-md"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* ផ្នែកខាងស្តាំ */}
        <div className="flex items-center gap-4 z-50">
          {/* User Profile / Login */}
          {user ? (
            <div className="relative flex items-center gap-4" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 font-bold transition-all focus:outline-none group px-3 py-1.5 rounded-full border shadow-sm ${
                  isScrolled || isMobileMenuOpen ? "bg-white/50 border-slate-200 text-slate-700 hover:text-amber-600" : "bg-black/20 backdrop-blur-md border-white/20 text-white hover:border-amber-400"
                }`}
              >
                {user.profile_photo_path ? (
                  <img src={user.profile_photo_path} alt={user.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover shadow-sm border border-amber-200 group-hover:border-amber-500 transition-colors" />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-tr from-amber-400 to-amber-500 text-white rounded-full flex items-center justify-center font-extrabold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block">{user.name}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-all border-b border-slate-100/50">
                    <div className="p-2 bg-amber-100/60 text-amber-600 rounded-xl"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                    ប្រវត្តិការកក់របស់ខ្ញុំ
                  </Link>
                  <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-all border-b border-slate-100/50">
                    <div className="p-2 bg-blue-100/60 text-blue-600 rounded-xl"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                    គណនីរបស់ខ្ញុំ
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-red-500 hover:bg-red-50/80 transition-all w-full text-left">
                    <div className="p-2 bg-red-100/60 text-red-500 rounded-xl"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
                    ចាកចេញ (Logout)
                  </button>
                </div>
              )}
            </div>
          ) : (
             <Link href="/login" className={`hidden sm:block px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:shadow-amber-500/30 border ${
               isScrolled || isMobileMenuOpen ? "bg-slate-900 text-white hover:bg-amber-500 hover:border-amber-400" : "bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-amber-500 hover:border-amber-400"
             }`}>
              Sign In
            </Link>
          )}

          {/* 📱 ៣. ប៊ូតុង Hamburger សម្រាប់ទូរស័ព្ទ (លាក់លើកុំព្យូទ័រ) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden flex items-center justify-center p-2 rounded-xl focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? (
              // រូបសញ្ញាខ្វែង (X) ពេលបើក
              <svg className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              // រូបបន្ទាត់ ៣ ពេលបិទ
              <svg className={`w-7 h-7 ${isScrolled ? "text-slate-800" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* 📱 ៤. ផ្ទាំង Menu ធ្លាក់ចុះមកក្រោមសម្រាប់ទូរស័ព្ទ (Mobile Menu Overlay) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col px-8 gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-lg font-bold py-3 border-b border-slate-100 transition-colors ${
                  isActive ? "text-amber-500 border-amber-200" : "text-slate-600 hover:text-amber-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* ប៊ូតុង Login លើទូរស័ព្ទ (បើអត់ទាន់ Login) */}
          {!user && (
            <Link href="/login" className="mt-4 bg-slate-900 text-white text-center py-3.5 rounded-2xl font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-transform">
              ចូលគណនី (Sign In)
            </Link>
          )}
        </div>
      </div>

    </nav>
  );
}