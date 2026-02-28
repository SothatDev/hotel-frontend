import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* ផ្នែកទី១៖ Logo និងការពិពណ៌នា */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-extrabold text-white tracking-tight mb-4 inline-block">
            Angkor <span className="text-amber-500">University</span>
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-sm font-medium">
            បទពិសោធន៍នៃការស្នាក់នៅដ៏ល្អឯក ជាមួយសេវាកម្មកម្រិតផ្កាយ ៥ និងបរិយាកាសប្រណីតដែលមិនអាចបំភ្លេចបាន។
          </p>
        </div>

        {/* ផ្នែកទី២៖ Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">តំណភ្ជាប់រហ័ស</h3>
          <ul className="space-y-3 font-medium">
            <li><Link href="/" className="hover:text-amber-500 transition-colors">ទំព័រដើម</Link></li>
            <li><Link href="/rooms" className="hover:text-amber-500 transition-colors">បន្ទប់ស្នាក់នៅ</Link></li>
            <li><Link href="/services" className="hover:text-amber-500 transition-colors">សេវាកម្មរបស់យើង</Link></li>
            <li><Link href="/contact" className="hover:text-amber-500 transition-colors">ទំនាក់ទំនង</Link></li>
          </ul>
        </div>

        {/* ផ្នែកទី៣៖ ទំនាក់ទំនង */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">ទំនាក់ទំនង</h3>
          <ul className="space-y-3 font-medium text-sm">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>ផ្លូវជាតិលេខ ៦, ក្រុងសៀមរាប, កម្ពុជា</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>+855 96 77 51 512</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>booking@angkoruniversity.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
        <p>© {new Date().getFullYear()} Angkor University. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-amber-500 transition-colors">គោលការណ៍ឯកជនភាព</Link>
          <Link href="#" className="hover:text-amber-500 transition-colors">លក្ខខណ្ឌប្រើប្រាស់</Link>
        </div>
      </div>
    </footer>
  );
}