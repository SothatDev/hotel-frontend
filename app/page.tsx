import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider"; // 👈 ទាញយក Component Slide មកប្រើ

// 🔥 ១. បង្កើតអថេរដាក់ Link Ngrok របស់ Laravel នៅទីនេះ (ដើម្បីងាយស្រួលដូរថ្ងៃក្រោយ)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // 👈 បើបងដូរ Ngrok ថ្មី កុំភ្លេចមកដូរនៅទីនេះផង!

// ហៅ API ទាញទិន្នន័យបន្ទប់
async function getRooms() {
  try {
    const res = await // 🔥 ថែមសោរទម្លុះជញ្ជាំង Ngrok នៅទីនេះ (ជើងទី ២ របស់ fetch)
    fetch(`${BACKEND_URL}/api/room-types`, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const rooms = await getRooms();

  // 🔥 ចម្រាញ់យករូបភាពពី Database មកបញ្ចាំងលើ Slide (យក ៣ រូបដំបូង)
  const apiImages = rooms
    .filter((room: any) => room.images && room.images.length > 0)
    .map((room: any) => `${BACKEND_URL}/storage/${room.images[0]}`)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* បាញ់ទិន្នន័យរូបពី Laravel ទៅឱ្យ Slider */}
      <HeroSlider dynamicImages={apiImages} />

      {/* 🌟 ផ្នែកទី ២៖ បញ្ជីបន្ទប់ (កន្លែងនេះ បងអាចបំបែកវាជា <RoomList rooms={rooms} /> ទៀតក៏បាន!) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
            បន្ទប់ស្នាក់នៅរបស់យើង <span className="text-amber-500"></span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-bold text-xl">មិនទាន់មានបន្ទប់នៅឡើយទេ...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room: any) => (
              <div key={room.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex flex-col">
                
                {/* ផ្នែករូបភាព */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.images && room.images.length > 0 ? `${BACKEND_URL}/storage/${room.images[0]}` : '/placeholder.jpg'} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-2xl font-black shadow-lg border border-white">
                    ${room.price} <span className="text-xs font-medium text-slate-500">/ night</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* ផ្នែកអត្ថបទ */}
                <div className="p-8 flex flex-col flex-grow relative bg-white">
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-3 group-hover:text-amber-500 transition-colors">{room.name}</h3>
                  <p className="text-slate-500 mb-6 flex-grow line-clamp-2 leading-relaxed">{room.description || "បន្ទប់ធំទូលាយ ផ្តល់នូវផាសុកភាពខ្ពស់។"}</p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-slate-600 font-bold bg-slate-50 px-3 py-1.5 rounded-lg">
                      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      {room.capacity} Guests
                    </div>
                    
                    <Link href={`/rooms/${room.id}`} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold transition-all group-hover:bg-amber-500 flex items-center gap-2">
                      Book Now <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}