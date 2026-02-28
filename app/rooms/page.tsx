"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoomFilterBar from "@/components/rooms/RoomFilterBar"; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Suites", "Deluxe", "Standard"];

  useEffect(() => {
    // 🔥 ថែមសោរទម្លុះជញ្ជាំង Ngrok នៅទីនេះ (ជើងទី ២ របស់ fetch)
    fetch(`${BACKEND_URL}/api/room-types`, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setRooms(result.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (activeFilter === "All") return true;
    const roomName = room.name.toLowerCase();
    if (activeFilter === "Suites") return roomName.includes("suite");
    if (activeFilter === "Deluxe") return roomName.includes("deluxe");
    if (activeFilter === "Standard") return roomName.includes("standard") || roomName.includes("single") || roomName.includes("double");
    return true;
  });

  return (
    // 🔥 ប្តូរផ្ទៃខាងក្រោមទៅជាពណ៌ប្រផេះខ្ចី (bg-slate-50) ដូច Home Page
    <div className="min-h-screen bg-slate-50 selection:bg-amber-500/30 pb-20">
      
      {/* 🌟 Header Section (រក្សាភាពងងឹតកាលីប bg-slate-900 ដដែល) */}
      <section className="bg-slate-900 pt-36 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <p className="text-amber-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">The Grand Collection</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Rooms & Suites</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            ជ្រើសរើសបន្ទប់ដែលស័ក្តិសមបំផុតសម្រាប់អ្នក។ ពួកយើងផ្តល់ជូននូវផាសុកភាព ភាពប្រណីត និងសេវាកម្មអេតចាយ។
          </p>
        </div>
      </section>

      {/* 🔍 Filter Bar Component ពណ៌ស */}
      <RoomFilterBar 
        filters={filters} 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
        resultsCount={filteredRooms.length} 
      />

      {/* 🛏️ បញ្ជីបន្ទប់ */}
      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
             <svg className="animate-spin h-10 w-10 text-amber-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-200 animate-in zoom-in-95 duration-500">
             <span className="text-6xl mb-4 block opacity-50">🛌</span>
             <h3 className="text-2xl font-black text-slate-800 mb-2">រកមិនឃើញបន្ទប់ប្រភេទនេះទេ!</h3>
             <button onClick={() => setActiveFilter("All")} className="mt-6 text-amber-600 hover:text-amber-500 font-bold underline transition-colors">
                ← មើលបន្ទប់ទាំងអស់វិញ
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredRooms.map((room: any) => (
              <div key={room.id} className="group relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-slate-900 border border-slate-200 cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700">
                <img src={room.images && room.images.length > 0 ? `${BACKEND_URL}/storage/${room.images[0]}` : '/placeholder.jpg'} alt={room.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-500 group-hover:via-slate-900/60"></div>
                
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full font-bold shadow-lg z-20">
                    <span className="text-amber-600">${parseFloat(room.price).toFixed(2)}</span> <span className="text-xs font-medium text-slate-500">/ night</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white bg-amber-500 px-3 py-1 rounded-full shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      {room.capacity} Guests
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 drop-shadow-md">{room.name}</h3>
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <Link href={`/rooms/${room.id}`} className="text-amber-400 font-bold flex items-center gap-2 hover:text-amber-300 transition-colors uppercase text-sm tracking-wider">
                      Discover Room <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
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