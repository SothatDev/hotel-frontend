"use client";

import { useState, useEffect } from "react";

const BACKEND_URL = "https://bifid-susannah-fainthearted.ngrok-free.dev";

// 🖼️ រូបភាពបម្រុង (បើ Admin មិនទាន់បាន Upload សេវាកម្មអ្វីសោះ វានឹងលោតរូបនេះ)
const defaultImages = [
  "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582604660946-f628d05c1061?q=80&w=2070&auto=format&fit=crop"
];

// 🔥 ទទួលយកទិន្នន័យ dynamicServices ពី page.tsx
export default function ServiceSlider({ dynamicServices }: { dynamicServices: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ១. ចម្រាញ់យករូបភាពចេញពី API (យកតែសេវាកម្មណាដែលមានរូបភាព)
  const apiImages = dynamicServices
    ?.filter((service) => service.image) 
    .map((service) => `${BACKEND_URL}/storage/${service.image}`);

  // ២. បើមានរូបពី Back-end ប្រើរូប Back-end, បើអត់ទេ ប្រើរូបបម្រុង (defaultImages)
  const slideImages = apiImages && apiImages.length > 0 ? apiImages : defaultImages;

  // ⏱️ ក្បួន Auto Slide 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [slideImages.length]); // ដាក់ dependency នេះដើម្បីឱ្យវាស្គាល់ចំនួនរូបភាព

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* 🖼️ ប្រព័ន្ធបញ្ចាំងរូបភាព (Slide Show) */}
      {slideImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* 🖤 Overlay ងងឹតព្រាលៗ */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

      {/* ✨ ខ្លឹមសារអក្សរ */}
      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-700 mt-16">
        <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-slate-200 text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
          កន្លែងកម្សាន្ត និងការសម្រាកលំហែ
        </span>
        <h1 className="text-5xl md:text-6xl md:leading-tight font-black text-white mb-6 drop-shadow-2xl">
          សេវាកម្ម និងកន្លែងកម្សាន្ត
        </h1>
        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
          បទពិសោធន៍នៃការសម្រាកលំហែកាយដ៏ល្អឥតខ្ចោះ ជាមួយសេវាកម្មលំដាប់ថ្នាក់អន្តរជាតិ ដែលរៀបចំឡើងយ៉ាងពិសេសសម្រាប់អ្នក។
        </p>
      </div>
    </section>
  );
}