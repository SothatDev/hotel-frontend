import Link from "next/link";
import BookingButton from "../../../components/BookingButton";

// 🔥 ១. កំណត់ BACKEND_URL ដូចទំព័រមុន ដើម្បីកុំឱ្យដាច់រូប និងងាយស្រួលដូរ Ngrok
const BACKEND_URL = "https://bifid-susannah-fainthearted.ngrok-free.dev"; 

export default async function RoomDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 🔥 ២. កែមកប្រើ BACKEND_URL ជំនួស 127.0.0.1
  const res = await fetch(`${BACKEND_URL}/api/room-types/${id}`, { cache: 'no-store' });
  const result = await res.json();
  const room = result.data;

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">រកមិនឃើញបន្ទប់នេះទេ 😢</h1>
        <Link href="/rooms" className="text-amber-600 font-bold hover:underline">← ត្រឡប់ទៅមើលបន្ទប់ទាំងអស់វិញ</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50/30 pt-28 pb-12 px-6">
      
      <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col md:flex-row overflow-hidden">
        
        {/* ផ្នែករូបភាព */}
        <div className="md:w-1/2 h-80 md:h-auto relative p-4 md:p-6 flex flex-col">
          <div className="w-full h-full min-h-[300px] rounded-[2rem] overflow-hidden shadow-inner relative">
            {room.images && room.images.length > 0 ? (
                // 🔥 ៣. ថែម BACKEND_URL ពីមុខ ដើម្បីឱ្យវាទៅទាញរូបពី Laravel មកបង្ហាញបានត្រឹមត្រូវ ១០០%
                <img 
                  src={`${BACKEND_URL}/storage/${room.images[0]}`} 
                  alt={room.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 absolute inset-0"
                />
              ) : (
                <div className="w-full h-full absolute inset-0 bg-slate-200/50 flex items-center justify-center text-slate-400 font-medium">មិនមានរូបភាពទេ</div>
              )}
              <Link href="/rooms" className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white transition-all border border-white/50 z-10">
                ← ត្រឡប់ក្រោយ
              </Link>
          </div>
        </div>

        {/* ផ្នែកព័ត៌មាន និងប៊ូតុងកក់ */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 drop-shadow-sm">{room.name}</h1>
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-5 py-2 rounded-2xl font-extrabold shadow-lg shadow-amber-500/30 border border-amber-300">
              ${parseFloat(room.price).toFixed(2)} <span className="text-sm font-medium opacity-90">/night</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5 text-slate-600 font-bold mb-8 border-b border-slate-200/60 pb-6">
            <span className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl shadow-sm border border-white/60">
               <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               {room.capacity} Guests
            </span>
            <span className="flex items-center gap-2 bg-emerald-50/50 px-4 py-2 rounded-xl text-emerald-600 shadow-sm border border-emerald-100/50">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               Available
            </span>
          </div>

          <div className="flex-grow mb-8">
            <h3 className="text-xl font-extrabold text-slate-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ពិពណ៌នាលម្អិត
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium bg-white/40 p-5 rounded-2xl border border-white/50 shadow-sm">
              {room.description || 'មិនមានការពិពណ៌នាបន្ថែមសម្រាប់បន្ទប់នេះទេ។'}
            </p>
          </div>

          {/* ភ្ជាប់ប៊ូតុងកក់ */}
          <BookingButton roomId={room.id} pricePerNight={room.price} />
        </div>

      </div>
    </main>
  );
}