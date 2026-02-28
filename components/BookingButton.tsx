"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom"; // 🔥 បន្ថែមក្បាច់ Portal នៅទីនេះ
import toast from 'react-hot-toast';

export default function BookingButton({ roomId, pricePerNight }: { roomId: number, pricePerNight: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // 🔥 សម្រាប់ឆែកថាវារត់លើ Client ហើយឬនៅ
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [arrivalTime, setArrivalTime] = useState("14:00"); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 🔥 ឱ្យវារៀបចំ Portal ពេលទំព័រដើរស្រួល
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      
      if (end <= start) {
        setTotalPrice(0);
        setError("ថ្ងៃ Check-out ត្រូវតែនៅក្រោយថ្ងៃ Check-in!");
        return;
      } else {
        setError(""); 
      }

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const validDays = diffDays > 0 ? diffDays : 1; 
      setTotalPrice(validDays * pricePerNight);
    }
  }, [checkIn, checkOut, pricePerNight]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token"); 
    
    if (!token) {
      // ✅ កូដថ្មីកាលីបកប់ (ប្រើជំនួស)
      toast.error("សូម Login ជាមុនសិន ទើបអាចកក់បន្ទប់បាន! 🔐");
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut || totalPrice <= 0) {
      setError("សូមជ្រើសរើសថ្ងៃ Check-in និង Check-out ឱ្យបានត្រឹមត្រូវ! 📅");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
          room_id: roomId,
          check_in: checkIn,
          check_out: checkOut,
          arrival_time: arrivalTime, 
          total_price: totalPrice,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ កូដថ្មីកាលីបកប់ (ប្រើជំនួស)
        toast.success("កក់បន្ទប់បានជោគជ័យ! 🎉");
        setIsOpen(false); 
        router.push("/my-bookings");
      } else {
        setError(data.message || "មានបញ្ហាក្នុងការកក់បន្ទប់!");
      }
    } catch (err) {
      setError("មិនអាចភ្ជាប់ទៅកាន់ Server បានទេ! 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-slate-900 hover:bg-amber-500 text-white py-4 rounded-2xl text-lg font-extrabold transition-all shadow-xl hover:shadow-amber-500/40 mt-auto border border-slate-700 hover:border-amber-400"
      >
        កក់បន្ទប់នេះ (Book Now)
      </button>

      {/* 🔥 ប្រើប្រាស់ createPortal ដើម្បីបញ្ចូន Popup ទៅដាក់លើ Body ឱ្យរួចពីទ្រុង */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/60 relative animate-in fade-in zoom-in-95 duration-300">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-red-100 rounded-full text-slate-500 hover:text-red-500 font-bold text-xl transition-colors border border-white/50 shadow-sm">
              ✕
            </button>
            
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              កំណត់ថ្ងៃស្នាក់នៅ 🗓️
            </h2>

            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-3.5 rounded-2xl text-sm font-bold mb-5 border border-red-200 shadow-sm flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">ថ្ងៃចូល (Check-in)</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]} 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl p-3.5 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none text-slate-700 font-medium shadow-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">ថ្ងៃចេញ (Check-out)</label>
                <input 
                  type="date" 
                  min={checkIn || new Date().toISOString().split('T')[0]} 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl p-3.5 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none text-slate-700 font-medium shadow-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 ml-1">ម៉ោងមកដល់ (Arrival Time)</label>
                <input 
                  type="time" 
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl p-3.5 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none text-slate-700 font-medium shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 backdrop-blur-sm rounded-2xl p-5 mb-6 flex justify-between items-center border border-amber-200/50 shadow-inner">
              <span className="text-amber-800 font-extrabold">តម្លៃសរុប (Total):</span>
              <span className="text-3xl font-black text-amber-500 drop-shadow-sm">${totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleBooking}
              disabled={loading || totalPrice <= 0 || !!error}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 text-white font-extrabold py-4 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/40 flex justify-center items-center border border-amber-300/50"
            >
              {loading ? (
                <span className="flex items-center gap-2">កំពុងកក់បន្ទប់... <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>
              ) : "បញ្ជាក់ការកក់ (Confirm)"}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}