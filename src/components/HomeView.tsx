import { useState, useEffect, ReactNode } from 'react';
import { ActivePage } from '../types';
import { BUSINESS_TYPES, PRICING_PLANS } from '../data';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Check,
  X,
  Download,
  Headphones,
  Megaphone,
  Monitor,
  Smartphone,
  Tablet,
  Layers,
  BarChart3,
  Package,
  Zap,
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
}

export default function HomeView({ setCurrentPage, language }: HomeViewProps) {
  const isTH = language === 'TH';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePlanIdx, setActivePlanIdx] = useState(2);

  const slides: { title: ReactNode; desc: string }[] = [
    {
      title: isTH
        ? <>ระบบ <span className="text-[#30A4DD]">POS</span> ที่ออกแบบมาเพื่อธุรกิจของคุณ</>
        : <>The <span className="text-[#30A4DD]">POS</span> System Designed for Your Business</>,
      desc: isTH
        ? 'ตอบโจทย์ตั้งแต่ร้านเบ็ดเตล็ดไปจนถึงคลังสินค้าขนาดใหญ่ จัดการหน้าร้านและคุมสต็อกได้อย่างแม่นยำ ครบจบในระบบเดียว'
        : 'Answers everything from small stores to large warehouses. Manage storefronts & stock accurately in one system.',
    },
    {
      title: isTH ? 'ทำงานได้สมบูรณ์แม้ไม่มีอินเทอร์เน็ต' : 'Works Offline Seamlessly',
      desc: isTH
        ? 'ไม่ต้องกังวลเรื่องเน็ตหลุด! โหมดออฟไลน์ช่วยให้คุณขายของและเก็บข้อมูลต่อได้ทันที ซิงค์อัตโนมัติเมื่อออนไลน์'
        : 'Never worry about connection drops! Offline mode keeps you selling. Auto syncs back online.',
    },
    {
      title: isTH ? 'เชื่อมต่อครบครันกับลิ้นชักและอุปกรณ์' : 'Fully Compatible with All Devices',
      desc: isTH
        ? 'อัปเกรดหน้าร้านด้วยลิ้นชักอัตโนมัติสองชั้น เครื่องพิมพ์ใบเสร็จ และสแกนเนอร์บาร์โค้ดคุณภาพสูง'
        : 'Upgrade your store with dual-tier auto drawers, receipt printers and high-speed barcode scanners.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. Hero ── */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center min-h-[520px]">

            {/* Left: 42% */}
            <div className="w-full lg:w-[42%] py-14 space-y-5 flex-shrink-0">
              <h1 className="text-7xl sm:text-8xl font-semibold font-sans tracking-tight leading-none">
                <span className="text-[#131C45]">Grow</span>
                <span className="text-[#2DA6DD]">Store</span>
              </h1>
              <p className="text-xl font-bold text-slate-800 leading-snug">{slides[currentSlide].title}</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{slides[currentSlide].desc}</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="px-7 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200 transition-all cursor-pointer inline-block"
              >
                {isTH ? 'ดูระบบทั้งหมด' : 'View All'}
              </button>
            </div>

            {/* Right: 58% — hero image placeholder */}
            <div className="w-full lg:w-[58%] flex items-end justify-center lg:justify-end h-[520px] relative">
              {/* วางรูป mascot ตรงนี้ — เช่น <img src={heroImage} className="h-full object-contain object-bottom" /> */}
              <svg viewBox="0 0 300 380" className="h-[480px] w-auto drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                {/* Shopping cart */}
                <rect x="155" y="220" width="110" height="62" rx="8" fill="#f97316" />
                <circle cx="178" cy="296" r="14" fill="#374151" />
                <circle cx="244" cy="296" r="14" fill="#374151" />
                <line x1="155" y1="224" x2="132" y2="185" stroke="#f97316" strokeWidth="7" strokeLinecap="round" />
                <line x1="132" y1="185" x2="52" y2="185" stroke="#f97316" strokeWidth="7" strokeLinecap="round" />
                {/* Cart items */}
                <rect x="168" y="228" width="16" height="20" rx="2" fill="white" opacity="0.4" />
                <rect x="192" y="228" width="16" height="20" rx="2" fill="white" opacity="0.4" />
                <rect x="216" y="228" width="16" height="20" rx="2" fill="white" opacity="0.4" />
                {/* Owl body */}
                <circle cx="150" cy="130" r="80" fill="#3b82f6" />
                <ellipse cx="150" cy="152" rx="52" ry="48" fill="#eff6ff" />
                {/* Left eye */}
                <circle cx="116" cy="103" r="26" fill="white" />
                <circle cx="116" cy="103" r="15" fill="#1e3a8a" />
                <circle cx="110" cy="97" r="5" fill="white" />
                {/* Right eye */}
                <circle cx="184" cy="103" r="26" fill="white" />
                <circle cx="184" cy="103" r="15" fill="#1e3a8a" />
                <circle cx="178" cy="97" r="5" fill="white" />
                {/* Glasses */}
                <rect x="82" y="90" width="136" height="26" rx="13" fill="transparent" stroke="#0f172a" strokeWidth="5" />
                <line x1="144" y1="103" x2="156" y2="103" stroke="#0f172a" strokeWidth="6" />
                {/* Beak */}
                <polygon points="150,120 136,146 164,146" fill="#f97316" />
                {/* Ear tufts */}
                <polygon points="108,60 94,28 124,54" fill="#2563eb" />
                <polygon points="192,60 206,28 176,54" fill="#2563eb" />
                {/* Wings */}
                <ellipse cx="72" cy="172" rx="26" ry="40" fill="#2563eb" transform="rotate(-20 72 172)" />
                <ellipse cx="228" cy="172" rx="26" ry="40" fill="#2563eb" transform="rotate(20 228 172)" />
              </svg>
            </div>

          </div>

          {/* Dots — centered */}
          <div className="flex justify-center gap-2 pb-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'w-6 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Quick Links ── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { icon: <Download className="w-8 h-8 text-slate-600" />, label: isTH ? 'ซอฟต์แวร์' : 'Software', page: 'packages' as ActivePage },
              { icon: <Headphones className="w-8 h-8 text-slate-600" />, label: isTH ? 'บริการ' : 'Service', page: 'contact' as ActivePage },
              { icon: <Megaphone className="w-8 h-8 text-slate-600" />, label: isTH ? 'โปรโมชั่น' : 'Promotion', page: 'packages' as ActivePage },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(item.page)}
                className="bg-white rounded-2xl py-8 px-4 flex flex-col items-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {item.icon}
                <span className="text-sm font-bold text-slate-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Business Types ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
            {isTH ? 'ตอบโจทย์ธุรกิจอะไรบ้าง' : 'Who is GrowStore for?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_TYPES.map((biz) => (
              <div key={biz.id} className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <img src={biz.image} alt={biz.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Mini owl badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-11 h-11 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8">
                      <circle cx="16" cy="13" r="9" fill="#3b82f6" />
                      <ellipse cx="16" cy="17" rx="6" ry="5" fill="#eff6ff" />
                      <circle cx="12.5" cy="11" r="3" fill="white" /><circle cx="12.5" cy="11" r="1.8" fill="#1e3a8a" />
                      <circle cx="19.5" cy="11" r="3" fill="white" /><circle cx="19.5" cy="11" r="1.8" fill="#1e3a8a" />
                      <polygon points="16,13 13.5,17 18.5,17" fill="#f97316" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">{biz.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{biz.description}</p>
                  <button
                    onClick={() => setCurrentPage('packages')}
                    className="mt-1 text-xs font-bold text-slate-700 border border-slate-300 rounded-full px-3 py-1.5 inline-flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {isTH ? 'เรียนรู้เพิ่มเติม' : 'Learn More'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. System Capabilities ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold text-center text-white">
            {isTH ? 'ความสามารถของระบบ' : 'System Capabilities'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Layers className="w-6 h-6" />,
                color: 'text-sky-400 bg-sky-500/10',
                title: isTH ? 'แบ่งหน่วยสินค้า' : 'Product Units',
                desc: isTH
                  ? 'รองรับสินค้ากล่อง ลัง แพ็ค หรือแบ่งขายเป็นชิ้น ตัดสต็อกได้แม่นยำ ไม่สับสนเรื่องหน่วยสินค้า'
                  : 'Flexible unit mapping for crates, boxes, or single items. Auto deducts inventory.',
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                color: 'text-emerald-400 bg-emerald-500/10',
                title: isTH ? 'แดชบอร์ดเข้าใจง่าย' : 'Easy Dashboard',
                desc: isTH
                  ? 'ดูกราฟสรุปยอดขาย ต้นทุน กำไร และสถิติสินค้าขายดีแบบเรียลไทม์ที่สวยงาม'
                  : 'Real-time sales charts, profit, and trending items at a glance.',
              },
              {
                icon: <Package className="w-6 h-6" />,
                color: 'text-orange-400 bg-orange-500/10',
                title: isTH ? 'จัดการครุภัณฑ์และวัสดุ' : 'Assets & Materials',
                desc: isTH
                  ? 'คุมสต็อกวัสดุสิ้นเปลือง อุปกรณ์สำนักงาน หรือครุภัณฑ์ภายในร้าน ลดค่าใช้จ่ายส่วนเกิน'
                  : 'Track office supplies and company assets. Reduce redundant overheads.',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                color: 'text-purple-400 bg-purple-500/10',
                title: isTH ? 'การจัดการติดตามและส่งสินค้า' : 'Tracking & Delivery',
                desc: isTH
                  ? 'ติดตามสถานะการจัดส่ง บัญชีที่รับสินค้า ปลายทางพัสดุ และประวัติการจัดส่ง'
                  : 'Manage delivery queues, couriers, shipment progress, and history from POS.',
              },
            ].map((cap, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
                <div className={`w-12 h-12 rounded-xl ${cap.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {cap.icon}
                </div>
                <h3 className="font-bold text-slate-100 mb-2">{cap.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Pricing Carousel ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
              {isTH ? 'แพ็กเกจ' : 'Packages'}
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {isTH ? 'เลือกแผนของคุณ' : 'Choose Your Plan'}
            </h2>
          </div>

          <div className="flex items-center justify-center gap-3">
            {/* Prev arrow */}
            <button
              onClick={() => setActivePlanIdx(p => Math.max(0, p - 1))}
              disabled={activePlanIdx === 0}
              className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            {/* Cards */}
            <div className="flex gap-3 items-center overflow-hidden">
              {PRICING_PLANS.map((plan, idx) => {
                const offset = idx - activePlanIdx;
                if (Math.abs(offset) > 2) return null;
                const isActive = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setActivePlanIdx(idx)}
                    style={{ transition: 'all 0.3s ease' }}
                    className={`flex-shrink-0 rounded-2xl p-5 cursor-pointer ${
                      isActive
                        ? 'w-48 bg-blue-700 text-white shadow-2xl scale-105 border-2 border-blue-500'
                        : isAdjacent
                          ? 'w-40 bg-slate-900 text-white border border-slate-700'
                          : 'w-32 bg-slate-100 text-slate-400 border border-slate-200 opacity-50 scale-95'
                    }`}
                  >
                    {isActive && (
                      <div className="text-5xl font-black text-white mb-2 leading-none">{plan.name}</div>
                    )}
                    {!isActive && (
                      <div className={`text-sm font-bold mb-2 ${isAdjacent ? 'text-slate-300' : 'text-slate-400'}`}>
                        {plan.name}
                      </div>
                    )}

                    <div className="mb-3">
                      <span className={`font-black ${isActive ? 'text-2xl text-white' : 'text-base'}`}>
                        {plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}
                      </span>
                      {plan.price > 0 && (
                        <span className={`text-xs ml-1 ${isActive ? 'text-blue-200' : isAdjacent ? 'text-slate-400' : 'text-slate-400'}`}>
                          {isTH ? 'บาท/เดือน' : '฿/mo'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {plan.features.slice(0, isActive ? 7 : isAdjacent ? 5 : 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5">
                          {feat.available ? (
                            <Check className={`w-3 h-3 flex-shrink-0 mt-0.5 ${isActive ? 'text-blue-200' : 'text-emerald-400'}`} />
                          ) : (
                            <X className={`w-3 h-3 flex-shrink-0 mt-0.5 ${isActive ? 'text-blue-300/60' : 'text-red-400/70'}`} />
                          )}
                          <span className={`text-[10px] leading-tight ${feat.available ? '' : 'line-through opacity-60'} ${isActive ? 'text-blue-100' : isAdjacent ? 'text-slate-300' : 'text-slate-400'}`}>
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {isActive && (
                      <button
                        onClick={e => { e.stopPropagation(); setCurrentPage('packages'); }}
                        className="mt-4 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {isTH ? 'รายละเอียด' : 'Details'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => setActivePlanIdx(p => Math.min(PRICING_PLANS.length - 1, p + 1))}
              disabled={activePlanIdx === PRICING_PLANS.length - 1}
              className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {PRICING_PLANS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePlanIdx(idx)}
                className={`rounded-full transition-all cursor-pointer ${activePlanIdx === idx ? 'w-6 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Products ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
            {isTH ? 'สินค้าของเรา' : 'Our Products'}
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-10">
            {/* Drawer only */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-10 flex items-center justify-center min-h-[200px]">
              <div className="w-36">
                <div className="w-full h-12 bg-slate-800 rounded-t-lg shadow-md relative">
                  <div className="absolute top-1.5 left-3 right-3 h-5 bg-slate-950 rounded-xs border-b border-slate-700 flex items-center justify-around px-2">
                    <div className="w-6 h-3 bg-orange-200/30 rounded-xs border border-orange-200/20 text-[5px] text-center text-slate-400">1000฿</div>
                    <div className="w-6 h-3 bg-green-200/30 rounded-xs text-[5px] text-center text-slate-400">500฿</div>
                  </div>
                </div>
                <div className="w-full h-12 bg-slate-700 rounded-b-lg shadow-md border-t border-slate-600 flex items-center justify-around px-4">
                  <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center text-[7px] font-bold text-slate-800 shadow-inner">10฿</div>
                  <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[7px] font-bold text-slate-800 shadow-inner">5฿</div>
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-500" />
                </div>
              </div>
            </div>

            {/* POS terminal + drawer */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 flex items-center justify-center min-h-[200px]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-40 h-28 bg-slate-900 rounded-xl p-1.5 border-2 border-slate-700 shadow-xl">
                  <div className="w-full h-full bg-blue-600 rounded-lg relative overflow-hidden">
                    <div className="p-1.5 flex justify-between items-center border-b border-white/20">
                      <span className="text-[6px] text-white font-mono">GrowStore Terminal</span>
                      <span className="text-[6px] text-green-300 font-bold">● LIVE</span>
                    </div>
                    <div className="p-1.5 grid grid-cols-3 gap-1 mt-1">
                      {['🥤', '🍞', '🥔', '🥛', '☕', '💧'].map((e, i) => (
                        <div key={i} className="bg-white/10 rounded p-1 text-center text-xs">{e}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-3 h-4 bg-slate-600" />
                <div className="w-20 h-2 bg-slate-700 rounded-full" />
                <div className="w-36 mt-1">
                  <div className="w-full h-10 bg-slate-800 rounded-t-lg">
                    <div className="mx-2 mt-1.5 h-4 bg-slate-950 rounded-xs border-b border-slate-700" />
                  </div>
                  <div className="w-full h-10 bg-slate-700 rounded-b-lg border-t border-slate-600" />
                </div>
              </div>
            </div>

            {/* Drawer variant */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-10 flex items-center justify-center min-h-[200px]">
              <div className="w-36">
                <div className="w-full h-12 bg-slate-800 rounded-t-lg shadow-md relative">
                  <div className="absolute top-1.5 left-3 right-3 h-5 bg-slate-950 rounded-xs border-b border-slate-700 flex items-center justify-around px-2">
                    <div className="w-6 h-3 bg-blue-200/30 rounded-xs text-[5px] text-center text-slate-400">50฿</div>
                    <div className="w-6 h-3 bg-green-200/30 rounded-xs text-[5px] text-center text-slate-400">100฿</div>
                  </div>
                </div>
                <div className="w-full h-12 bg-slate-700 rounded-b-lg shadow-md border-t border-slate-600 flex items-center justify-around px-4">
                  <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-[7px] font-bold text-slate-800 shadow-inner">2฿</div>
                  <div className="w-5 h-5 rounded-full bg-yellow-300 flex items-center justify-center text-[7px] font-bold text-slate-800 shadow-inner">1฿</div>
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-800">
              {isTH ? 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น' : 'Automatic Dual-Tier Cash Drawer'}
            </h3>
            <button
              onClick={() => setCurrentPage('products')}
              className="px-7 py-3 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-sm transition-colors cursor-pointer"
            >
              {isTH ? 'เรียนรู้เพิ่มเติม' : 'Learn More'}
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. Multi-device ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-white mb-12">
            {isTH ? 'การใช้งานในระบบต่างๆ' : 'Works Across All Platforms'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Mobile */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
              <div className="w-28 h-48 bg-slate-900 rounded-3xl p-2 border-4 border-slate-700 shadow-xl relative">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-slate-900 rounded-full z-10" />
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center gap-2 pt-3">
                  <Smartphone className="w-7 h-7 text-white/80" />
                  <span className="text-white text-[10px] font-bold">GrowStore</span>
                  <div className="grid grid-cols-2 gap-1 w-full px-3 mt-1">
                    {['🏪', '📊', '📦', '⚙️'].map((ic, i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-1.5 flex items-center justify-center text-xs">{ic}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-slate-600">Android</span>
                <span className="text-sm font-semibold text-slate-600">iOS</span>
              </div>
              <h3 className="font-bold text-slate-900">{isTH ? 'มือถือ' : 'Mobile'}</h3>
            </div>

            {/* Tablet */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
              <div className="w-52 h-40 bg-slate-900 rounded-2xl p-2 border-4 border-slate-700 shadow-xl relative">
                <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1 h-8 bg-slate-600 rounded-full" />
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex flex-col items-center justify-center gap-2">
                  <Tablet className="w-7 h-7 text-white/80" />
                  <span className="text-white text-[10px] font-bold">GrowStore</span>
                  <div className="grid grid-cols-3 gap-1 w-full px-4 mt-1">
                    {['🏪', '📊', '📦'].map((ic, i) => (
                      <div key={i} className="bg-white/10 rounded p-1.5 flex items-center justify-center text-xs">{ic}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-slate-600">Android</span>
                <span className="text-sm font-semibold text-slate-600">Apple</span>
              </div>
              <h3 className="font-bold text-slate-900">{isTH ? 'แท็บเล็ต' : 'Tablet'}</h3>
            </div>

            {/* Desktop */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-52 h-36 bg-slate-900 rounded-xl p-1.5 border-2 border-slate-700 shadow-xl">
                  <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col overflow-hidden">
                    <div className="flex items-center gap-1 px-2 py-1 border-b border-slate-700 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-[7px] text-slate-400 ml-1 font-mono">GrowStore POS</span>
                    </div>
                    <div className="flex-1 p-2 grid grid-cols-4 gap-1">
                      {['🏪', '📊', '📦', '👥', '⚙️', '🛒', '📈', '💰'].map((ic, i) => (
                        <div key={i} className="bg-slate-600/50 rounded p-1 flex items-center justify-center text-xs">{ic}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-3 h-5 bg-slate-500 rounded-sm" />
                <div className="w-20 h-2 bg-slate-600 rounded-full" />
              </div>
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-slate-600">Windows</span>
                <span className="text-sm font-semibold text-slate-600">macOS</span>
              </div>
              <h3 className="font-bold text-slate-900">{isTH ? 'เดสก์ท็อป' : 'Desktop'}</h3>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
