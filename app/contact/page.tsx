"use client";

import { useState } from "react";
import toast from "react-hot-toast"; // 🔥 កុំភ្លេច Import Toast សម្រាប់លោតសារជោគជ័យ

// 🔥 ដាក់ Link Ngrok របស់ Laravel នៅទីនេះ
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // ចាប់យកអក្សរពេលភ្ញៀវវាយបញ្ចូល
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 មុខងារបាញ់សារ (POST) ទៅកាន់ Laravel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("កំពុងបញ្ជូនសាររបស់អ្នក...");

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST", // 👈 ទីបំផុតយើងប្រើ POST ហើយ!
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true" // 🔥 ថែមអាវុធនេះ ដើម្បីទម្លុះរនាំង Ngrok
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("សារត្រូវបានបញ្ជូនជោគជ័យ! 🎉", { id: toastId });
        // លុបអក្សរចេញពី Form វិញក្រោយផ្ញើរួច
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("មានបញ្ហាក្នុងការបញ្ជូនសារ!", { id: toastId });
      }
    } catch (error) {
      toast.error("មិនអាចភ្ជាប់ទៅកាន់ Server បានទេ!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🌟 ផ្នែកទី ១៖ បដា Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-700 mt-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            ទំនាក់ទំនងមកកាន់យើង
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
            ក្រុមការងារយើងខ្ញុំរង់ចាំស្វាគមន៍ និងដោះស្រាយរាល់ចម្ងល់របស់អ្នក ២៤ ម៉ោងលើ ២៤ ម៉ោង។
          </p>
        </div>
      </section>

      {/* 🌟 ផ្នែកទី ២៖ ផែនទី និង ទម្រង់ផ្ញើសារ */}
      <section className="py-20 px-6 max-w-7xl mx-auto -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* 📍 ខាងឆ្វេង៖ ព័ត៌មាន និង ផែនទី (Static) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-6">ទីតាំងសណ្ឋាគារ 🏨</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 text-amber-600 p-3 rounded-full shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">អាសយដ្ឋាន</p>
                    <p className="text-slate-800 font-medium">ផ្លូវជាតិលេខ ៦, សង្កាត់ស្វាយដង្គំ, ក្រុងសៀមរាប, កម្ពុជា</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">លេខទូរស័ព្ទ</p>
                    <p className="text-slate-800 font-medium">+855 12 345 678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">អ៊ីមែល</p>
                    <p className="text-slate-800 font-medium">booking@angkoruniversity.edu.kh</p>
                  </div>
                </div>
              </div>

              {/* Google Maps iframe */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15534.697416391483!2d103.85408434999999!3d13.36376855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101777265a7f9b%3A0xc6e4b2d56637fc6!2sSiem%20Reap!5e0!3m2!1sen!2skh!4v1714445522770!5m2!1sen!2skh" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* 📝 ខាងស្តាំ៖ ទម្រង់ផ្ញើសារ (Form) ទៅកាន់ Database */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-xl border border-white/50 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-2">មានចម្ងល់មែនទេ? ✉️</h2>
              <p className="text-slate-500 font-medium mb-8">សូមបំពេញព័ត៌មានខាងក្រោម យើងខ្ញុំនឹងឆ្លើយតបទៅកាន់អ្នកវិញយ៉ាងលឿនបំផុត។</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ឈ្មោះរបស់អ្នក</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm" placeholder="Ex: Sok Dara" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">អ៊ីមែលរបស់អ្នក</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ប្រធានបទ (Subject)</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm" placeholder="Ex: សាកសួរពីការកក់បន្ទប់" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ខ្លឹមសារសារ (Message)</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-slate-700 shadow-sm resize-none" placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white rounded-2xl font-extrabold transition-all shadow-lg hover:shadow-amber-500/40 flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">កំពុងបញ្ជូន... <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>
                  ) : (
                    <>ផ្ញើសារឥឡូវនេះ <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}