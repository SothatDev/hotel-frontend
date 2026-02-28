"use client";

import { useState, useEffect } from "react";

// 🔥 ទទួលយក { dynamicImages } ពីទំព័រដើម
export default function HeroSlider({ dynamicImages }: { dynamicImages?: string[] }) {

  const defaultImages = [
    "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
  ];

  // បើ API មានរូប យកអាហ្នឹង បើអត់ យក Default
  const slideImages = dynamicImages && dynamicImages.length > 0 ? dynamicImages : defaultImages;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [slideImages.length]);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {slideImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
          អស់លុយចាយហ្ហើយ
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
          ស្វែងរកការស្នាក់នៅដ៏ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            ប្រណីតភាពបំផុត
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
          រត់គេចពីភាព single ហើយមកសម្រាកលំហែកាយនៅ Angkor University Hotel ជាមួយនឹងសេវាកម្មបោកប្រាស់។
        </p>
      </div>
    </section>
  );
}