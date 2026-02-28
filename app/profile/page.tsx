"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  // States សម្រាប់ Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email); // Email យើងគ្រាន់តែបង្ហាញ មិនឱ្យកែទេ
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "លេខសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ!" });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          new_password: newPassword ? newPassword : null,
          new_password_confirmation: confirmPassword ? confirmPassword : null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        // Update LocalStorage ជាមួយនឹងឈ្មោះថ្មី
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // សម្អាតប្រអប់ Password វិញ
        setNewPassword("");
        setConfirmPassword("");
        
        // ធ្វើឱ្យ Navbar update ឈ្មោះភ្លាមៗ
        window.dispatchEvent(new Event("storage"));
      } else {
        setMessage({ type: "error", text: data.message || "មានបញ្ហា មិនអាចកែប្រែបានទេ!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "មិនអាចតភ្ជាប់ទៅកាន់ Server បានទេ!" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">កំពុងទាញយកទិន្នន័យ... ⏳</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
          <span className="text-amber-500 bg-amber-100 p-2 rounded-xl">👤</span> ព័ត៌មានគណនី
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl font-bold text-sm border ${message.type === 'error' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
              {message.type === 'error' ? '⚠️ ' : '✅ '} {message.text}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            {/* ឈ្មោះ និង Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ឈ្មោះរបស់អ្នក</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-medium text-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">អាសយដ្ឋានអ៊ីមែល</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full border border-slate-100 bg-slate-50 rounded-xl p-3 text-slate-500 font-medium cursor-not-allowed"
                />
                <p className="text-xs text-slate-400 mt-1">អ៊ីមែលមិនអាចផ្លាស់ប្តូរបានទេ</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* ប្តូរ Password */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">🔒 ប្តូរលេខសម្ងាត់ (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">លេខសម្ងាត់ថ្មី</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="ទុកចោលបើមិនចង់ប្តូរ"
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="វាយម្តងទៀត"
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    កំពុងរក្សាទុក...
                  </>
                ) : (
                  "💾 រក្សាទុកការផ្លាស់ប្តូរ"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}