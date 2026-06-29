/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { BUSINESS_TYPES, PRICING_PLANS } from '../data';
import { 
  Store, 
  ChevronRight, 
  ArrowRight, 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Users, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Coins, 
  Package, 
  BarChart3, 
  Layers, 
  Sparkles,
  ShoppingBag,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
}

export default function HomeView({ setCurrentPage, language }: HomeViewProps) {
  const isTH = language === 'TH';

  // Hero carousel simulation
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: isTH ? 'ระบบ POS ที่ออกแบบมาเพื่อธุรกิจของคุณ' : 'The POS System Designed for Your Business',
      desc: isTH 
        ? 'ตอบโจทย์ตั้งแต่ร้านเบ็ดเตล็ดไปจนถึงคลังสินค้าขนาดใหญ่ จัดการหน้าร้านและคุมสต็อกได้อย่างแม่นยำ ครบจบในระบบเดียว' 
        : 'Answers everything from miscellaneous grocery stores to large warehouses. Manage storefronts & stock accurately in one system.',
      cta: isTH ? 'ทดลองระบบ POS เดโมฟรี' : 'Try Free POS Demo',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: isTH ? 'ทำงานได้สมบูรณ์แม้ไม่มีอินเทอร์เน็ต' : 'Works Offline Seamlessly Without Internet',
      desc: isTH 
        ? 'ไม่ต้องกังวลเรื่องเน็ตหลุด! โหมดออฟไลน์ช่วยให้คุณขายของ เช็คบิล และเก็บข้อมูลต่อได้ทันที ซิงค์อัตโนมัติเมื่อออนไลน์' 
        : 'Never worry about connection drops! Offline mode lets you checkout and save transactions. Auto syncs back online.',
      cta: isTH ? 'ดูแพ็คเกจและราคา' : 'See Pricing Plans',
      color: 'from-sky-500 to-blue-700'
    },
    {
      title: isTH ? 'เชื่อมต่อครบครันกับลิ้นชักและอุปกรณ์' : 'Fully Compatible with Drawers & Devices',
      desc: isTH 
        ? 'อัปเกรดหน้าร้านด้วยลิ้นชักอัตโนมัติสองชั้น เครื่องพิมพ์ใบเสร็จ และสแกนเนอร์บาร์โค้ดคุณภาพสูง เพื่อการทำธุรกรรมที่รวดเร็ว' 
        : 'Upgrade your store counter with dual-tier auto cash drawers, receipt printers and high-speed barcode scanners.',
      cta: isTH ? 'ดูรายละเอียดฮาร์ดแวร์' : 'Explore Hardware',
      color: 'from-slate-800 to-slate-950'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Selected Business Type for Interactive Panel
  const [selectedBiz, setSelectedBiz] = useState<string>('sme');

  // Device display mockup switcher
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Interactive Package comparison in home view
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 's' | 'm' | 'l' | 'pro'>('m');
  const activePlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[2];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      
      {/* 1. Hero Section Slider */}
      <section className="relative bg-slate-50 pt-6" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[500px] flex items-center shadow-xl">
            {/* Animated Background Gradients */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-90 transition-all duration-1000`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent)]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 sm:p-12 lg:p-16 items-center w-full">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-sky-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                  <span>{isTH ? 'ระบบ POS อันดับหนึ่งสำหรับคุณ' : 'No.1 POS System for You'}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-tight text-white">
                  {slides[currentSlide].title}
                </h1>
                
                <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed max-w-2xl">
                  {slides[currentSlide].desc}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    onClick={() => {
                      if (currentSlide === 0) setCurrentPage('pos-demo');
                      else if (currentSlide === 1) setCurrentPage('packages');
                      else setCurrentPage('products');
                    }}
                    className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-102 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage('packages')}
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-xs transition-colors border border-white/20 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>{isTH ? 'ดูตารางราคาแบบละเอียด' : 'View Full Pricing Table'}</span>
                  </button>
                </div>
              </div>

              {/* Right Illustration with Mascot Animation */}
              <div className="lg:col-span-5 flex justify-center relative">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                  {/* Floating geometric glow rings */}
                  <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '25s' }} />
                  <div className="absolute inset-4 rounded-full border border-white/5 animate-reverse-spin" style={{ animationDuration: '35s' }} />
                  
                  {/* Mascot / POS Simulation Display */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-slate-800/80 p-5 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">GrowStore Terminal v2.4</span>
                    </div>

                    {/* Cute Mascot SVG Representation */}
                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                      <svg viewBox="0 0 100 100" className="w-24 h-24 filter drop-shadow-md">
                        {/* Body */}
                        <circle cx="50" cy="50" r="35" fill="#3b82f6" />
                        {/* Belly */}
                        <circle cx="50" cy="58" r="22" fill="#eff6ff" />
                        {/* Big Eyes */}
                        <circle cx="38" cy="42" r="10" fill="#ffffff" />
                        <circle cx="38" cy="42" r="5" fill="#1e3a8a" />
                        <circle cx="38" cy="40" r="2" fill="#ffffff" />
                        <circle cx="62" cy="42" r="10" fill="#ffffff" />
                        <circle cx="62" cy="42" r="5" fill="#1e3a8a" />
                        <circle cx="62" cy="40" r="2" fill="#ffffff" />
                        {/* Cute yellow Beak */}
                        <polygon points="50,46 45,54 55,54" fill="#f97316" />
                        {/* Glasses */}
                        <rect x="25" y="38" width="50" height="8" rx="4" fill="transparent" stroke="#0f172a" strokeWidth="2.5" />
                        <line x1="48" y1="42" x2="52" y2="42" stroke="#0f172a" strokeWidth="3" />
                        {/* Cute Hair Tuft */}
                        <path d="M46,12 Q50,5 50,15" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                        <path d="M54,12 Q50,5 50,15" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      
                      <div className="mt-2 text-center">
                        <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase animate-pulse">
                          ● System Live
                        </span>
                        <p className="text-xs text-slate-300 font-semibold mt-1">
                          {isTH ? 'ยินดีต้อนรับสู่ระบบ GrowStore' : 'Welcome to GrowStore'}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-white/5">
                      <span>{isTH ? 'การขายวันนี้: ' : 'Sales today: '} 14,250 ฿</span>
                      <span>100% Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'bg-orange-500 w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Top Cards */}
      <section className="-mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{isTH ? 'ระบบซอฟต์แวร์เสถียร' : 'Stable Software'}</h3>
                <p className="text-sm text-slate-500 mt-1">{isTH ? 'คลาวด์เสถียร 99.9% ใช้งานออฟไลน์ได้ดีเยี่ยม ข้อมูลปลอดภัยสูงสุด' : '99.9% uptime cloud. Works perfectly offline. Max security.'}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{isTH ? 'การรับประกันสินค้า' : 'Hardware Warranty'}</h3>
                <p className="text-sm text-slate-500 mt-1">{isTH ? 'รับประกันฮาร์ดแวร์ลิ้นชักและตัวเครื่อง 1 ปีเต็ม พร้อมบริการสลับเครื่องเคลม' : 'Full 1-year warranty on hardware. Prompt replacement service.'}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-start space-x-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{isTH ? 'ซัพพอร์ตช่วยเหลือ 24 ชม.' : '24/7 Support'}</h3>
                <p className="text-sm text-slate-500 mt-1">{isTH ? 'ทีมวิศวกรและฝ่ายซัพพอร์ตคอยดูแลเคียงข้าง ตอบไว แก้ไขตรงจุด' : 'Support team standing by around the clock. Rapid replies.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ตอบโจทย์ธุรกิจอะไรบ้าง (Target Businesses Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            {isTH ? (
              <>ตอบโจทย์<span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">ธุรกิจอะไรบ้าง</span></>
            ) : (
              <>Who is <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">GrowStore</span> for?</>
            )}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {isTH 
              ? 'ระบบของเราได้รับการออกแบบอย่างยืดหยุ่นเพื่อรองรับพฤติกรรมและความต้องการของร้านค้าในแต่ละขนาด' 
              : 'Our system is flexibly designed to support the workflow of stores of various types.'}
          </p>
        </div>

        {/* Interactive Business Types Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Cards List */}
          <div className="lg:col-span-5 space-y-4">
            {BUSINESS_TYPES.map((biz) => {
              const isActive = selectedBiz === biz.id;
              return (
                <button
                  key={biz.id}
                  onClick={() => setSelectedBiz(biz.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all cursor-pointer border flex items-center space-x-4 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg border-blue-600 shadow-blue-100' 
                      : 'bg-white text-slate-800 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {biz.id === 'sme' && <Coins className="w-6 h-6" />}
                    {biz.id === 'retail' && <ShoppingBag className="w-6 h-6" />}
                    {biz.id === 'wholesale' && <Store className="w-6 h-6" />}
                    {biz.id === 'warehouse' && <Package className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base leading-tight">{biz.title}</h3>
                    <p className={`text-xs mt-1 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {biz.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Visual Panel */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {BUSINESS_TYPES.map((biz) => {
                if (biz.id !== selectedBiz) return null;
                return (
                  <motion.div
                    key={biz.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md">
                        <img 
                          src={biz.image} 
                          alt={biz.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                          GrowStore for {biz.id.toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold font-sans text-slate-900">{biz.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{biz.description}</p>
                      </div>
                    </div>

                    {/* Features list specifically for selected biz */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-3 mt-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {isTH ? 'จุดเด่นที่ช่วยแก้ปัญหา' : 'How GrowStore Solves Your Pain Point'}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{biz.id === 'sme' ? (isTH ? 'ลงทุนน้อย คืนทุนไว' : 'Low budget, fast return') : (isTH ? 'เช็คสต็อกไว รายละเอียดครบ' : 'Fast check, detailed info')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{biz.id === 'retail' ? (isTH ? 'สแกนจ่ายรวดเร็ว ค้นหาไว' : 'Quick scan payment & search') : (isTH ? 'ระบบจัดการคลังและสาขา' : 'Multi-branch & warehouse manager')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{isTH ? 'ใช้งานแบบไม่ต้องมีเน็ตได้' : '100% stable offline support'}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{isTH ? 'ออกบิลและใบเสร็จอัตโนมัติ' : 'Auto bill & receipt creation'}</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setCurrentPage('packages')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{isTH ? 'อ่านรีวิวและการเปรียบเทียบเพิ่ม' : 'See Detailed Comparison'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ความสามารถของระบบ (System Capabilities Grid) */}
      <section className="bg-slate-900 text-white py-16" id="capabilities-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-sans font-extrabold tracking-tight">
              {isTH ? (
                <>ความสามารถของ<span className="text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg">ระบบ GrowStore</span></>
              ) : (
                <>Powerful <span className="text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg">Features</span> of GrowStore</>
              )}
            </h2>
            <p className="text-slate-400 text-sm">
              {isTH 
                ? 'เราเตรียมพร้อมทุกเครื่องมือช่วยวิเคราะห์หน้าร้าน บริหารสต็อก และเพิ่มยอดขายอย่างก้าวล้ำด้วยเทคโนโลยีล่าสุด' 
                : 'We provide all essential retail tools: sales charts, inventory manager, automated checkouts and shipping.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">{isTH ? 'แบ่งหน่วยสินค้า' : 'Divided Product Units'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {isTH 
                  ? 'รองรับสินค้ากล่อง ลัง แพ็ค หรือแบ่งขายเป็นชิ้นเล็กๆ ตัดสต็อกได้แม่นยำ ไม่สับสนเรื่องหน่วยสินค้า' 
                  : 'Flexible unit mapping (crates, boxes, single items). Automatically deducts nested inventory.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">{isTH ? 'แดชบอร์ดเข้าใจง่าย' : 'Easy Dashboard'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {isTH 
                  ? 'ดูกราฟสรุปยอดขาย ต้นทุน กำไร และสถิติสินค้าขายดีแบบเรียลไทม์ผ่านกราฟเส้นและบาร์ชาร์ตที่สวยงาม' 
                  : 'View elegant real-time sales charts, expenses, and trending items clearly without accounting knowledge.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">{isTH ? 'จัดการครุภัณฑ์และวัสดุ' : 'Assets & Materials'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {isTH 
                  ? 'คุมสต็อกวัสดุสิ้นเปลือง อุปกรณ์สำนักงาน หรือครุภัณฑ์ภายในร้าน ช่วยลดค่าใช้จ่ายจุกจิกภายในธุรกิจ' 
                  : 'Track office supplies, equipment, and company assets. Avoid loss and reduce redundant overheads.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">{isTH ? 'ติดตามคิวและระบบจัดส่ง' : 'Tracking & Delivery'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {isTH 
                  ? 'ติดตามสถานะการจัดส่ง บัญชีที่รับสินค้า ปลายทางพัสดุ และประวัติการจัดส่งได้อย่างครบครัน' 
                  : 'Manage order delivery queues, couriers, shipment progress, and history log directly from the POS.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. แพ็คเกจ (Interactive Quick Preview Plans) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            {isTH ? (
              <>แพ็คเกจ<span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">ยอดนิยม</span></>
            ) : (
              <>Our <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">Pricing Plans</span></>
            )}
          </h2>
          <p className="text-slate-500 text-sm">
            {isTH ? 'เลือกแผนที่เหมาะสมสำหรับสเกลร้านค้าของคุณในปัจจุบัน' : 'Choose the best plan for your retail scale.'}
          </p>
        </div>

        {/* Quick selector bar for plans */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {PRICING_PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlanId(p.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPlanId === p.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.name} ({p.price === 0 ? (isTH ? 'ฟรี' : 'Free') : `${p.price}฿`})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plan Details Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden relative">
          {activePlan.popular && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-xs animate-pulse">
              🔥 Best Value
            </div>
          )}
          
          <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                GrowStore Plan
              </span>
              <h3 className="text-3xl font-sans font-extrabold text-slate-900 mt-2">
                {isTH ? 'แพ็คเกจ' : 'Package'} {activePlan.name}
              </h3>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="text-4xl font-sans font-black text-slate-900">
                {activePlan.price === 0 ? '0' : activePlan.price.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-400 ml-1">฿ / {isTH ? 'เดือน' : 'month'}</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">{activePlan.period}</p>
            </div>
          </div>

          <div className="p-8 bg-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePlan.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-sm">
                {feat.available ? (
                  <Check className="w-5 h-5 text-emerald-500 bg-emerald-50 p-1 rounded-full" />
                ) : (
                  <X className="w-5 h-5 text-red-500 bg-red-50 p-1 rounded-full" />
                )}
                <span className={`font-semibold ${feat.available ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
                  {feat.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 text-center">
            <button
              onClick={() => setCurrentPage('packages')}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-100 hover:scale-102 transition-all cursor-pointer inline-flex items-center space-x-2"
            >
              <span>{isTH ? 'ดูรายละเอียดและสั่งซื้อ' : 'View Details & Purchase'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Featured Product Section ("ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น") */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Graphics */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border border-slate-100 shadow-xl overflow-hidden group">
                {/* Visual badge */}
                <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  HOT ITEM
                </span>
                
                {/* Cash Drawer Vector illustration using clean visual markup */}
                <div className="relative h-64 w-full bg-slate-100 rounded-2xl flex items-center justify-center p-8">
                  <div className="w-full h-full relative flex flex-col justify-end">
                    
                    {/* Drawer shell */}
                    <div className="bg-slate-800 w-full h-24 rounded-lg relative shadow-lg border-b-4 border-slate-900">
                      
                      {/* Top drawer (Open slit) */}
                      <div className="absolute top-1 left-2 right-2 h-8 bg-slate-950 rounded border-b border-slate-800 flex items-center justify-around px-4">
                        <div className="w-8 h-4 bg-orange-200/30 rounded-xs border border-orange-200/10 text-[6px] text-center text-slate-400">1000฿</div>
                        <div className="w-8 h-4 bg-green-200/30 rounded-xs border border-green-200/10 text-[6px] text-center text-slate-400">500฿</div>
                        <div className="w-8 h-4 bg-blue-200/30 rounded-xs border border-blue-200/10 text-[6px] text-center text-slate-400">50฿</div>
                      </div>

                      {/* Bottom drawer (Pulled out slightly) */}
                      <div className="absolute top-10 left-4 right-4 h-12 bg-slate-700 rounded shadow-md border-t border-slate-600 flex items-center justify-around translate-y-2 translate-x-1 border border-slate-800">
                        <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-extrabold text-slate-800 shadow-inner">10฿</div>
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-extrabold text-slate-800 shadow-inner">5฿</div>
                        <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-[8px] font-extrabold text-slate-800 shadow-inner">2฿</div>
                        
                        {/* Lock cylinder */}
                        <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-500 flex items-center justify-center">
                          <div className="w-1.5 h-0.5 bg-slate-300" />
                        </div>
                      </div>

                    </div>

                    {/* Integrated mini POS Terminal Monitor sitting on top */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-36 flex flex-col items-center justify-end">
                      {/* Monitor screen */}
                      <div className="w-40 h-28 bg-slate-900 rounded-xl p-1.5 border-2 border-slate-700 shadow-lg relative">
                        <div className="w-full h-full bg-blue-600 rounded-lg flex flex-col justify-between p-1">
                          <div className="flex justify-between items-center border-b border-white/20 pb-0.5">
                            <span className="text-[5px] text-white font-mono">GrowStore Terminal</span>
                            <span className="text-[5px] text-green-300 font-bold">● ONLINE</span>
                          </div>
                          {/* Mini POS item list visualization */}
                          <div className="flex-1 py-1 space-y-0.5">
                            <div className="flex justify-between text-[4px] text-white">
                              <span>1. Coke Can x2</span>
                              <span>30.00฿</span>
                            </div>
                            <div className="flex justify-between text-[4px] text-white">
                              <span>2. Potato Lays x1</span>
                              <span>20.00฿</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center bg-white/10 p-0.5 rounded text-[5px] text-white font-bold">
                            <span>TOTAL:</span>
                            <span>50.00฿</span>
                          </div>
                        </div>
                      </div>
                      {/* Monitor Stand */}
                      <div className="w-3 h-6 bg-slate-700" />
                      <div className="w-16 h-2 bg-slate-800 rounded-full" />
                    </div>

                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-slate-100 p-2 rounded-xl text-[10px] font-bold text-slate-600">
                    {isTH ? 'ลิ้นชักแยกชั้น' : 'Dual Drawers'}
                  </div>
                  <div className="bg-slate-100 p-2 rounded-xl text-[10px] font-bold text-slate-600">
                    {isTH ? 'เหล็กทนทานสูง' : 'Heavy Steel'}
                  </div>
                  <div className="bg-slate-100 p-2 rounded-xl text-[10px] font-bold text-slate-600">
                    {isTH ? 'พอร์ต RJ11 ออโต้' : 'RJ11 Trigger'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5" />
                <span>{isTH ? 'ฮาร์ดแวร์แนะนำระดับพรีเมียม' : 'Premium Hardware Bundle'}</span>
              </div>
              
              <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
                {isTH ? 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น' : 'Automatic Dual-Tier Cash Drawer'}
              </h2>
              
              <p className="text-slate-500 text-sm leading-relaxed">
                {isTH 
                  ? 'ยกระดับระบบความปลอดภัยและการทวนสอบเงินสด ด้วยลิ้นชักเปิดอัตโนมัติเมื่อพิมพ์ใบเสร็จ ตัวถังเหล็กหนาทนทานสูง แยกชั้นเหรียญและธนบัตรได้อย่างสมบูรณ์แบบ ทำงานร่วมกับโปรแกรม GrowStore POS ไร้รอยต่อ' 
                  : 'Upgrade counter safety. The drawers slide open automatically on receipt printing. Divided slots for bills and coins, built with ultra-strong heavy-gauge steel shells.'}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{isTH ? 'ล็อกแยกชั้นอย่างอิสระ เพิ่มความปลอดภัย x2' : 'Independently keyed drawers for double security'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{isTH ? 'โครงสร้างเหล็กกล้า แข็งแรงทนทาน รองรับแรงกดทับได้สูง' : 'High-density steel body withstands heavy monitors'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{isTH ? 'ดีไซน์ประหยัดพื้นที่เคาน์เตอร์ ดูเรียบร้อยและหรูหรา' : 'Compact space-saving layout for clean countertops'}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setCurrentPage('products')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-100 transition-colors text-center cursor-pointer"
                >
                  {isTH ? 'ดูรายละเอียดและวิดีโอเดโม' : 'Explore Cash Drawer'}
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('contact');
                  }}
                  className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-colors text-center cursor-pointer"
                >
                  {isTH ? 'สอบถามราคาพิเศษ/สั่งจอง' : 'Pre-order / Quotation'}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. การใช้งานในระบบต่างๆ (Interactive Mockups Switcher) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            {isTH ? (
              <>รองรับการใช้งาน<span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">หลากหลายอุปกรณ์</span></>
            ) : (
              <>Compatible with <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">Multi-device</span> Platforms</>
            )}
          </h2>
          <p className="text-slate-500 text-sm">
            {isTH ? 'ไม่จำเป็นต้องซื้อฮาร์ดแวร์ใหม่! ใช้เครื่องเดิมของคุณเข้าล็อกอินใช้ GrowStore ได้ทันที' : 'No expensive proprietary hardware needed. Login on your existing browser.'}
          </p>
        </div>

        {/* Devices selector tabs */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`px-5 py-3 rounded-xl flex items-center space-x-2 text-xs font-bold transition-all cursor-pointer ${
              activeDevice === 'desktop' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>{isTH ? 'เดสก์ท็อป / PC' : 'Desktop / PC'}</span>
          </button>

          <button
            onClick={() => setActiveDevice('tablet')}
            className={`px-5 py-3 rounded-xl flex items-center space-x-2 text-xs font-bold transition-all cursor-pointer ${
              activeDevice === 'tablet' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>{isTH ? 'แท็บเล็ต / iPad' : 'Tablet / iPad'}</span>
          </button>

          <button
            onClick={() => setActiveDevice('mobile')}
            className={`px-5 py-3 rounded-xl flex items-center space-x-2 text-xs font-bold transition-all cursor-pointer ${
              activeDevice === 'mobile' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isTH ? 'สมาร์ทโฟน / มือถือ' : 'Smart Phone'}</span>
          </button>
        </div>

        {/* Dynamic device frame preview */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200/80 max-w-4xl w-full flex items-center justify-center min-h-[400px]">
            
            <AnimatePresence mode="wait">
              {activeDevice === 'desktop' && (
                <motion.div
                  key="desktop"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-2xl bg-slate-900 rounded-2xl p-2 border border-slate-700 shadow-2xl"
                >
                  {/* Browser top-bar */}
                  <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-t-xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <div className="bg-slate-700/80 px-4 py-1.5 rounded-md text-[10px] font-mono text-slate-300 w-full max-w-xs text-center mx-auto truncate">
                      https://app.growstore-pos.com/dashboard
                    </div>
                  </div>
                  {/* Dashboard representation */}
                  <div className="bg-white p-4 h-80 rounded-b-xl grid grid-cols-12 gap-3 text-slate-800 font-sans">
                    
                    {/* Left sidebar */}
                    <div className="col-span-3 border-r border-slate-100 pr-2 space-y-1.5 pt-2">
                      <div className="h-6 bg-blue-500 text-white text-[9px] font-bold rounded flex items-center px-2">🏪 GrowStore POS</div>
                      <div className="h-5 hover:bg-slate-50 text-[8px] font-semibold text-slate-600 rounded flex items-center px-2 cursor-pointer">📦 สต็อกสินค้า</div>
                      <div className="h-5 hover:bg-slate-50 text-[8px] font-semibold text-slate-600 rounded flex items-center px-2 cursor-pointer">📈 สรุปยอดขาย</div>
                      <div className="h-5 hover:bg-slate-50 text-[8px] font-semibold text-slate-600 rounded flex items-center px-2 cursor-pointer">👥 จัดการสมาชิก</div>
                    </div>
                    
                    {/* Right content grid */}
                    <div className="col-span-9 space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800">{isTH ? 'แผงควบคุมหลัก (Dashboard)' : 'Dashboard'}</span>
                        <span className="text-[9px] font-bold text-slate-400">📅 2026-06-28</span>
                      </div>
                      
                      {/* Metric widgets */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                          <span className="block text-[8px] text-blue-500 font-bold">{isTH ? 'ยอดขายวันนี้' : 'Sales Today'}</span>
                          <span className="block text-sm font-extrabold text-blue-700 mt-1">24,500 ฿</span>
                        </div>
                        <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                          <span className="block text-[8px] text-emerald-500 font-bold">{isTH ? 'กำไรสุทธิ' : 'Net Profits'}</span>
                          <span className="block text-sm font-extrabold text-emerald-700 mt-1">9,800 ฿</span>
                        </div>
                        <div className="bg-orange-50 p-2.5 rounded-lg border border-orange-100">
                          <span className="block text-[8px] text-orange-500 font-bold">{isTH ? 'ออเดอร์ใหม่' : 'New Orders'}</span>
                          <span className="block text-sm font-extrabold text-orange-700 mt-1">142 รายการ</span>
                        </div>
                      </div>

                      {/* Simulated Chart preview */}
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between text-[8px] font-bold text-slate-500">
                          <span>{isTH ? 'รายงานยอดขายรายชั่วโมง' : 'Hourly Sales Trend'}</span>
                          <span className="text-blue-600">{isTH ? 'วิเคราะห์ด้วย AI' : 'AI Analysis Enabled'}</span>
                        </div>
                        
                        {/* Beautiful CSS bar graph */}
                        <div className="flex items-end justify-between h-20 pt-2 space-x-2">
                          <div className="w-full bg-slate-200 rounded-t-sm h-[30%] hover:bg-blue-500 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">3k</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-t-sm h-[45%] hover:bg-blue-500 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">4.5k</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-t-sm h-[60%] hover:bg-blue-500 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">6k</span>
                          </div>
                          <div className="w-full bg-blue-500 rounded-t-sm h-[85%] hover:bg-blue-600 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-100">8.5k</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-t-sm h-[55%] hover:bg-blue-500 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">5.5k</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-t-sm h-[40%] hover:bg-blue-500 transition-all cursor-pointer relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">4k</span>
                          </div>
                        </div>

                        <div className="flex justify-between text-[6px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-100">
                          <span>09:00</span>
                          <span>11:00</span>
                          <span>13:00</span>
                          <span>15:00</span>
                          <span>17:00</span>
                          <span>19:00</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {activeDevice === 'tablet' && (
                <motion.div
                  key="tablet"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md bg-slate-900 rounded-3xl p-3 border border-slate-700 shadow-2xl relative"
                >
                  {/* Tablet front-camera */}
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-800 rounded-full" />
                  
                  {/* Tablet screen */}
                  <div className="bg-white rounded-xl overflow-hidden h-96 p-4 text-slate-800 flex flex-col justify-between">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-blue-600">🍎 GrowStore POS (iPad Mini)</span>
                      <span className="text-[10px] text-slate-400">STAFF ID: #405</span>
                    </div>

                    {/* POS Checkout representation */}
                    <div className="flex-1 grid grid-cols-2 gap-3 pt-2 h-full overflow-hidden">
                      {/* Products Grid Column */}
                      <div className="space-y-2 overflow-y-auto">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {isTH ? 'กลุ่ม: เครื่องดื่ม' : 'Drink Grid'}
                        </span>
                        
                        <div className="grid grid-cols-2 gap-1.5">
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-center">
                            <span className="text-lg">🥤</span>
                            <span className="block text-[8px] font-bold mt-1">Coke Can</span>
                            <span className="text-[8px] text-blue-600 font-extrabold">15฿</span>
                          </div>
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-center">
                            <span className="text-lg">💧</span>
                            <span className="block text-[8px] font-bold mt-1">Water 600ml</span>
                            <span className="text-[8px] text-blue-600 font-extrabold">10฿</span>
                          </div>
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-center">
                            <span className="text-lg">🥛</span>
                            <span className="block text-[8px] font-bold mt-1">Milk Drink</span>
                            <span className="text-[8px] text-blue-600 font-extrabold">12฿</span>
                          </div>
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-center">
                            <span className="text-lg">☕</span>
                            <span className="block text-[8px] font-bold mt-1">Coffee Latte</span>
                            <span className="text-[8px] text-blue-600 font-extrabold">17฿</span>
                          </div>
                        </div>
                      </div>

                      {/* Current Cart Column */}
                      <div className="border-l border-slate-100 pl-2 flex flex-col justify-between h-full">
                        <div className="space-y-1.5 flex-1 overflow-y-auto">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {isTH ? 'รายการตะกร้า' : 'Current Cart'}
                          </span>
                          
                          <div className="flex justify-between items-center text-[8px] border-b border-slate-50 py-1">
                            <span>🥤 Coke Can x2</span>
                            <span className="font-bold">30฿</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px] border-b border-slate-50 py-1">
                            <span>🍞 Toast Bread x1</span>
                            <span className="font-bold">24฿</span>
                          </div>
                        </div>

                        {/* Order Summary & Button */}
                        <div className="border-t border-slate-100 pt-2 space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>Total (VAT Inc.):</span>
                            <span className="text-blue-600 font-black">54.00 ฿</span>
                          </div>
                          <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer">
                            <span>💸 Check out / เช็คบิล</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

              {activeDevice === 'mobile' && (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-64 bg-slate-900 rounded-3xl p-3 border-4 border-slate-700 shadow-2xl relative"
                >
                  {/* Phone speaker / notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-700 rounded-full" />
                  </div>
                  
                  {/* Phone Screen */}
                  <div className="bg-white rounded-2xl overflow-hidden h-96 p-3 pt-6 text-slate-800 flex flex-col justify-between">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 text-[9px]">
                      <span className="font-black text-blue-600">GrowStore Mobile</span>
                      <span className="text-slate-400">📶 5G 10:14 AM</span>
                    </div>

                    {/* Simple app layout */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-2">
                        {/* Quick Scanner animation */}
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center relative overflow-hidden group">
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 animate-scanner-line" />
                          <span className="text-xs">📷 Tap to Scan Barcode</span>
                          <p className="text-[7px] text-slate-400 mt-1">ใช้กล้องหลังโทรศัพท์สแกนบาร์โค้ดสินค้าได้ทันที</p>
                        </div>

                        {/* Sales overview */}
                        <div className="bg-slate-900 text-white p-3 rounded-xl">
                          <span className="text-[7px] text-slate-400 block uppercase tracking-wider">{isTH ? 'ยอดสะสมวันนี้' : 'Accrued Sales'}</span>
                          <span className="text-base font-black text-amber-400">8,420.00 ฿</span>
                          
                          <div className="flex justify-between text-[7px] mt-1.5 pt-1.5 border-t border-white/10 text-slate-300">
                            <span>บิลทั้งหมด: 24 บิล</span>
                            <span className="text-emerald-400">เป้าหมาย: 84%</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick action buttons */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button className="py-2.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-bold text-center cursor-pointer">
                          📝 เปิดบิลใหม่
                        </button>
                        <button className="py-2.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-bold text-center cursor-pointer">
                          📦 ตรวจสต็อกสินค้า
                        </button>
                      </div>
                    </div>

                    {/* Bottom nav tabs mock */}
                    <div className="border-t border-slate-100 pt-1.5 flex justify-around text-[7px] font-bold text-slate-400">
                      <span className="text-blue-600">🏠 หน้าหลัก</span>
                      <span>📊 สถิติ</span>
                      <span>⚙️ ตั้งค่า</span>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* 7. CTA Support banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent)] animate-pulse" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight leading-tight">
              {isTH 
                ? 'เริ่มยกระดับธุรกิจของคุณด้วยระบบ GrowStore วันนี้' 
                : 'Accelerate Your Retail Business with GrowStore Today'}
            </h2>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              {isTH 
                ? 'ร่วมเดินทางไปกับผู้ใช้งานมากกว่า 1,200 ร้านค้าทั่วประเทศ ที่ไว้วางใจให้ GrowStore ดูแลความเสถียรและสรุปบัญชีทุกหน้าร้าน' 
                : 'Join over 1,200 trusted retail stores across Thailand who rely on GrowStore to handle storefront checkouts.'}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <button
                onClick={() => setCurrentPage('pos-demo')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isTH ? 'ทดลองเปิดเครื่อง POS เดโม' : 'Start Free Terminal Demo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20 font-bold text-sm transition-colors text-center cursor-pointer"
              >
                {isTH ? 'ติดต่อทีมเซลส์ / ขอใบเสนอราคา' : 'Contact Sales Team'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
