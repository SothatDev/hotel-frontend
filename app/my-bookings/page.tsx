"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast"; // 🔥 ១. Import Toast

// 🔥 ២. ដាក់ Link Ngrok ដើម្បីទាញរូបភាពពី Laravel (ដូចទំព័រ Home ដែរ)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/my-bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.data);
      } else {
        toast.error("មិនអាចទាញយកទិន្នន័យបានទេ!");
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!");
    } finally {
      setLoading(false);
    }
  };

  // មុខងារបង់ប្រាក់ (Stripe)
  const handlePayment = async (bookingId: number) => {
    const token = localStorage.getItem("token");
    const toastId = toast.loading("កំពុងភ្ជាប់ទៅកាន់ប្រព័ន្ធបង់ប្រាក់..."); // 🔥 ប្រើ Toast Loading

    try {
      const res = await fetch(`/api/payment/checkout/${bookingId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        toast.success("កំពុងបញ្ជូនទៅកាន់ Stripe...", { id: toastId });
        window.location.href = data.url;
      } else {
        toast.error("មានបញ្ហាក្នុងការបង្កើតវិក្កយបត្រ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មិនអាចភ្ជាប់ទៅកាន់ប្រព័ន្ធបង់ប្រាក់បានទេ!", { id: toastId });
    }
  };

  // មុខងារលុបចោលការកក់
  const handleCancel = async (bookingId: number) => {
    if (!confirm("តើអ្នកពិតជាចង់លុបចោលការកក់នេះមែនទេ? វាមិនអាចត្រឡប់វិញបានទេ!")) return;
    
    const token = localStorage.getItem("token");
    const toastId = toast.loading("កំពុងលុបចោលការកក់..."); // 🔥 ប្រើ Toast Loading

    try {
      const res = await fetch(`/api/my-bookings/${bookingId}/cancel`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("បានលុបចោលការកក់ដោយជោគជ័យ! 🗑️", { id: toastId });
        fetchBookings(); // ទាញទិន្នន័យថ្មីមកបង្ហាញ
      } else {
        toast.error(data.message || "មិនអាចលុបចោលបានទេ!", { id: toastId });
      }
    } catch (err) {
      toast.error("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50/30 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50/30 pt-28 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 drop-shadow-sm mb-2">
              ប្រវត្តិការកក់របស់ខ្ញុំ 🧾
            </h1>
            <p className="text-slate-500 font-medium">គ្រប់គ្រងបន្ទប់ដែលអ្នកបានកក់ និងទូទាត់ប្រាក់នៅទីនេះ</p>
          </div>
          <Link href="/" className="text-amber-600 font-bold bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white hover:bg-white hover:shadow-md transition-all">
            + កក់បន្ទប់បន្ថែម
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-12 text-center border border-white/60 shadow-sm">
            <div className="w-24 h-24 bg-amber-100/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">មិនទាន់មានការកក់នៅឡើយទេ!</h3>
            <p className="text-slate-500 mb-6">សូមស្វែងរកបន្ទប់ដែលសក្តិសមសម្រាប់អ្នកឥឡូវនេះ។</p>
            <Link href="/" className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-500/30">
              ស្វែងរកបន្ទប់
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              // 🔥 ៣. ទាញយករូបភាពបន្ទប់ពី API
              const roomImages = booking.room?.room_type?.images;
              const imageUrl = roomImages && roomImages.length > 0 ? `${BACKEND_URL}/storage/${roomImages[0]}` : null;

              return (
                <div key={booking.id} className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/80 transition-all hover:shadow-[0_15px_40px_rgba(245,158,11,0.08)]">
                  
                  {/* ផ្នែកខាងលើ និងកណ្តាល រៀបជា Flex រួមគ្នា */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* 🔥 ផ្នែកថ្មី៖ រូបភាពបន្ទប់ (Surprise!) */}
                    <div className="hidden sm:block lg:w-48 shrink-0">
                      <div className="w-full h-32 lg:h-full rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                        {imageUrl ? (
                          <img src={imageUrl} alt="Room" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-slate-200/50 flex items-center justify-center text-slate-400 text-sm font-bold">គ្មានរូបភាព</div>
                        )}
                      </div>
                    </div>

                    {/* ផ្នែកព័ត៌មានកណ្តាល */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                            បន្ទប់លេខ {booking.room?.room_number || "N/A"}
                            {booking.status === 'pending' && <span className="bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">រង់ចាំការបញ្ជាក់</span>}
                            {booking.status === 'confirmed' && <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">បានបញ្ជាក់</span>}
                            {booking.status === 'cancelled' && <span className="bg-slate-200 text-slate-500 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">បានលុបចោល</span>}
                          </h2>
                          <p className="text-slate-500 text-sm mt-1 font-medium">{booking.room?.room_type?.name || "ប្រភេទបន្ទប់"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500 font-bold mb-1">កូដកក់: <span className="text-slate-800">#{booking.id}</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-auto">
                        <div className="bg-white/60 border border-white/80 p-4 rounded-2xl shadow-sm">
                          <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg> ថ្ងៃចូល</p>
                          <p className="text-lg font-extrabold text-slate-800">{new Date(booking.check_in).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          <p className="text-xs text-slate-500 mt-1 font-medium">ម៉ោង: {booking.arrival_time}</p>
                        </div>
                        <div className="bg-white/60 border border-white/80 p-4 rounded-2xl shadow-sm">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> ថ្ងៃចេញ</p>
                          <p className="text-lg font-extrabold text-slate-800">{new Date(booking.check_out).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          <p className="text-xs text-slate-500 mt-1 font-medium">ម៉ោង: 12:00 PM</p>
                        </div>
                      </div>
                    </div>

                    {/* ផ្នែកតម្លៃ និងប៊ូតុងសកម្មភាព */}
                    <div className="lg:w-72 bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-center relative overflow-hidden shrink-0">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
                      
                      <div className="relative z-10 text-center mb-4">
                        <p className="text-slate-400 text-sm font-medium mb-1">តម្លៃសរុប</p>
                        <p className="text-4xl font-black text-amber-400">${Number(booking.total_price).toFixed(2)}</p>
                      </div>

                      <div className="relative z-10 space-y-3">
                        {booking.payment_status === 'paid' ? (
                          <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            បានទូទាត់រួចរាល់
                          </div>
                        ) : booking.status !== 'cancelled' ? (
                          // 🔥 ៤. ប្តូរពណ៌ប៊ូតុង Stripe ទៅជាមាស/ខ្មៅ
                          <button 
                            onClick={() => handlePayment(booking.id)}
                            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-orange-500 text-slate-900 py-3 rounded-xl font-extrabold transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            ទូទាត់ប្រាក់ (Stripe)
                          </button>
                        ) : (
                           <div className="w-full bg-slate-800 border border-slate-700 text-slate-400 py-3 rounded-xl text-center font-bold">
                            វិក្កយបត្រត្រូវបានលុប
                          </div>
                        )}

                        {booking.status === 'pending' && booking.payment_status !== 'paid' && (
                          <button 
                            onClick={() => handleCancel(booking.id)}
                            className="w-full bg-transparent border border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 py-2.5 rounded-xl text-sm font-bold transition-all"
                          >
                            ✕ លុបចោលការកក់
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}