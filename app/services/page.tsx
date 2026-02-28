import Link from "next/link";
import ServiceSlider from "@/components/services/ServiceSlider"; // 🔥 Import Slider កាលីបៗមកប្រើ

// 🔥 ១. ដាក់ Link Ngrok របស់ Laravel នៅទីនេះ
const BACKEND_URL = "https://bifid-susannah-fainthearted.ngrok-free.dev";

// 🔥 ២. បង្កើតមុខងារហៅ API ទាញយកសេវាកម្មទាំងអស់
async function getServices() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/services`, { cache: "no-store" });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export default async function ServicesPage() {
  // 🔥 ៣. ហៅទិន្នន័យមកប្រើ
  const services = await getServices();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🌟 ផ្នែកទី ១៖ ហៅ Auto Slider មកប្រើជំនួសផ្ទាំងបដាចាស់! */}
      <ServiceSlider dynamicServices={services} />

      {/* 🌟 ផ្នែកទី ២៖ បញ្ជីសេវាកម្ម (ទាញពី Database) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        
        {services.length === 0 ? (
          // បើ Admin មិនទាន់បញ្ចូលសេវាកម្មទេ
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-amber-100/50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">មិនទាន់មានសេវាកម្មនៅឡើយទេ</h3>
            <p className="text-slate-500">សូមរង់ចាំការធ្វើបច្ចុប្បន្នភាពពីខាងសណ្ឋាគារឆាប់ៗនេះ។</p>
          </div>
        ) : (
          <div className="space-y-24">
            {/* បង្វិល (Loop) បង្ហាញសេវាកម្មទាំងអស់ */}
            {services.map((service: any, index: number) => {
              // ភ្ជាប់ Link រូបភាពពេញ
              const imageUrl = service.image ? `${BACKEND_URL}/storage/${service.image}` : '/placeholder.jpg';

              return (
                <div 
                  key={service.id} 
                  className={`flex flex-col gap-12 items-center ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  
                  {/* ផ្នែករូបភាព */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-200">
                      <img 
                        src={imageUrl} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      {/* បន្ទះម៉ោង និង តម្លៃ */}
                      <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-lg flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <p className="font-bold text-slate-700">{service.time || 'មិនបញ្ជាក់ម៉ោង'}</p>
                        </div>
                        {/* បើមានតម្លៃ លោតចេញស្លាកតម្លៃពណ៌បៃតង */}
                        {Number(service.price) > 0 && (
                          <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full font-black text-sm">
                            ${Number(service.price).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ផ្នែកអត្ថបទ */}
                  <div className="w-full lg:w-1/2 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
                      {service.name}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium whitespace-pre-line">
                      {service.description}
                    </p>
                    <Link href="/rooms" className="inline-flex items-center gap-2 text-amber-600 font-extrabold hover:text-amber-700 transition-colors text-lg group">
                      កក់បន្ទប់ឥឡូវនេះ 
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </section>

    </div>
  );
}