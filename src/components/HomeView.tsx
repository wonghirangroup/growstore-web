import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage } from '../types';
import { BUSINESS_TYPES, PRICING_PLANS } from '../data';
import banner1 from '../../images/Banner 2.png';
import iconQ1 from '../../images/icon q1.png';
import iconQ2 from '../../images/icon q2.png';
import iconQ3 from '../../images/icon q3.png';
import imgP1 from '../../images/p1.png';
import imgP2 from '../../images/P2.png';
import imgP3 from '../../images/P3.png';
import imgP4 from '../../images/P4.png';
import imgB1 from '../../images/B1.png';
import imgB2 from '../../images/B2.png';
import imgB3 from '../../images/B3.png';
import imgB4 from '../../images/B4.png';
import imgS1 from '../../images/s1.png';
import imgS2 from '../../images/s2.png';
import imgS3 from '../../images/s3.png';
import imgF1 from '../../images/f1.png';
import imgF2 from '../../images/f2.png';
import imgF3 from '../../images/f3.png';
import imgF4 from '../../images/f4.png';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Check,
  X,
  Monitor,
  Package,
  Store,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
  onSelectPackage: (planId: string) => void;
}

export default function HomeView({ setCurrentPage, language, onSelectPackage }: HomeViewProps) {
  const isTH = language === 'TH';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activePlanIdx, setActivePlanIdx] = useState(2);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const slides: { image: string | null; title: ReactNode; desc: string }[] = [
    {
      image: banner1,
      title: isTH
        ? <>ระบบ <span className="text-[#30A4DD]">POS</span> ที่ออกแบบมาเพื่อธุรกิจของคุณ</>
        : <>The <span className="text-[#30A4DD]">POS</span> System Designed for Your Business</>,
      desc: isTH
        ? 'ตอบโจทย์ตั้งแต่ร้านเบ็ดเตล็ดไปจนถึงคลังสินค้าขนาดใหญ่ จัดการหน้าร้านและคุมสต็อกได้อย่างแม่นยำ ครบจบในระบบเดียว'
        : 'Answers everything from small stores to large warehouses. Manage storefronts & stock accurately in one system.',
    },
    {
      image: null,
      title: isTH ? 'ทำงานได้สมบูรณ์แม้ไม่มีอินเทอร์เน็ต' : 'Works Offline Seamlessly',
      desc: isTH
        ? 'ไม่ต้องกังวลเรื่องเน็ตหลุด! โหมดออฟไลน์ช่วยให้คุณขายของและเก็บข้อมูลต่อได้ทันที ซิงค์อัตโนมัติเมื่อออนไลน์'
        : 'Never worry about connection drops! Offline mode keeps you selling. Auto syncs back online.',
    },
    {
      image: null,
      title: isTH ? 'เชื่อมต่อครบครันกับลิ้นชักและอุปกรณ์' : 'Fully Compatible with All Devices',
      desc: isTH
        ? 'อัปเกรดหน้าร้านด้วยลิ้นชักอัตโนมัติสองชั้น เครื่องพิมพ์ใบเสร็จ และสแกนเนอร์บาร์โค้ดคุณภาพสูง'
        : 'Upgrade your store with dual-tier auto drawers, receipt printers and high-speed barcode scanners.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide(p => (p + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 80, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -80, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-full"
          >
            {/* ทุก slide ใช้สัดส่วน 1920x600 */}
            <div className="relative w-full overflow-hidden" style={{ height: 'clamp(480px, 31.25vw, 680px)' }}>
              {slides[currentSlide].image ? (
                <img
                  src={slides[currentSlide].image}
                  alt="GrowStore Banner"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                  <p className="text-slate-300 text-2xl font-bold">
                    {isTH ? 'กำลังจะมาเร็วๆ นี้' : 'Coming Soon'}
                  </p>
                </div>
              )}

              {/* Text overlay — แสดงเฉพาะ slide ที่มีรูป */}
              {slides[currentSlide].image && (
                <div className="absolute inset-0 flex items-start">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
                    <div className="w-full lg:w-[45%] space-y-4">
                      <h1 className="text-7xl sm:text-8xl font-semibold font-sans tracking-tight leading-none">
                        <span className="text-[#131C45]">Grow</span>
                        <span className="text-[#2DA6DD]">Store</span>
                      </h1>
                      <p className="text-xl font-bold text-slate-800 leading-snug">{slides[currentSlide].title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed max-w-sm">{slides[currentSlide].desc}</p>
                      <button
                        onClick={() => setCurrentPage('products')}
                        className="px-7 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200 transition-all cursor-pointer inline-block"
                      >
                        {isTH ? 'ดูระบบทั้งหมด' : 'View All'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots — กลางล่าง */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'w-6 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-[#DFE0E6] hover:bg-[#E9C8BC]'}`}
            />
          ))}
        </div>
      </section>

      {/* ── 2. Quick Links ── */}
      <section className="bg-[#131C45] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { icon: <img src={iconQ1} alt="ซอฟต์แวร์" className="w-16 h-16 object-contain" />, label: isTH ? 'ซอฟต์แวร์' : 'Software', page: 'packages' as ActivePage },
              { icon: <img src={iconQ2} alt="บริการ" className="w-16 h-16 object-contain" />, label: isTH ? 'บริการ' : 'Service', page: 'services' as ActivePage },
              { icon: <img src={iconQ3} alt="โปรโมชั่น" className="w-16 h-16 object-contain" />, label: isTH ? 'โปรโมชั่น' : 'Promotion', page: 'packages' as ActivePage },
            ].map((item, idx) => ( 
              <button
                key={idx}
                onClick={() => setCurrentPage(item.page)}
                className="bg-white rounded-2xl py-8 px-4 flex flex-col items-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {item.icon}
                <span className="text-sm font-bold text-[#131C45]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Business Types ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-[#131C45] mb-12">
            {isTH ? <>ตอบโจทย์<span className="text-[#2DA6DD]">ธุรกิจ</span>อะไรบ้าง</> : 'Who is GrowStore for?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_TYPES.map((biz) => {
              const bizImageMap: Record<string, string> = { sme: imgB1, retail: imgB2, wholesale: imgB3, warehouse: imgB4 };
              const iconMap: Record<string, React.ReactNode> = {
                Store: <Store className="w-7 h-7 text-white" />,
                ShoppingBag: <ShoppingBag className="w-7 h-7 text-white" />,
                ShoppingCart: <ShoppingCart className="w-7 h-7 text-white" />,
                Package: <Package className="w-7 h-7 text-white" />,
              };
              return (
                <div key={biz.id} className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                  {/* Image */}
                  <div className="h-48 rounded-t-3xl overflow-hidden">
                    <img src={bizImageMap[biz.id] ?? biz.image} alt={biz.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  {/* Dark circle icon badge — อยู่บน card wrapper เพื่อไม่ให้ overflow-hidden ตัด */}
                  <div className="absolute top-48 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#131C45] rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                    {iconMap[biz.icon] ?? <Package className="w-7 h-7 text-white" />}
                  </div>
                  {/* Content */}
                  <div className="pt-10 pb-6 px-5 flex flex-col flex-1 items-center text-center space-y-2">
                    <h3 className="text-xl font-extrabold text-[#131C45]">{biz.title}</h3>
                    {biz.subtitle && <p className="text-sm font-bold text-slate-600">{biz.subtitle}</p>}
                    <p className="text-xs text-slate-500 leading-relaxed">{biz.description}</p>
                    <button
                      onClick={() => setCurrentPage('packages')}
                      className="mt-auto w-full py-3 rounded-[15px] border-2 border-[#EC6F44] text-[#EC6F44] font-bold text-sm flex items-center px-4 bg-white hover:bg-[#EC6F44] hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="flex-1 text-center">{isTH ? 'เรียนรู้เพิ่มเติม' : 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. System Capabilities ── */}
      <section className="bg-[#131C45] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <h2 className="text-3xl font-extrabold text-center text-white">
            {isTH ? <>ความสามารถของ<span className="text-[#30A4DD]">ระบบ</span></> : 'System Capabilities'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[  
              { icon: <img src={imgP1} alt="แบ่งหน่วยสินค้า" className="w-20 h-20 object-contain" />, title: isTH ? 'แบ่งหน่วยสินค้า' : 'Product Units' },
              { icon: <img src={imgP2} alt="แดชบอร์ด" className="w-20 h-20 object-contain" />, title: isTH ? 'แดชบอร์ดที่เข้าใจง่าย' : 'Easy Dashboard' },
              { icon: <img src={imgP3} alt="ครุภัณฑ์" className="w-20 h-20 object-contain" />, title: isTH ? 'การจัดการครุภัณฑ์และวัสดุ' : 'Assets & Materials' },
              { icon: <img src={imgP4} alt="จัดส่ง" className="w-20 h-20 object-contain" />,   title: isTH ? 'ติดตามการจัดส่งสินค้า' : 'Tracking & Delivery' },
            ].map((cap, idx) => (
              <div key={idx} className="bg-white rounded-2xl py-10 px-6 flex flex-col items-center justify-start text-center gap-5 hover:scale-105 transition-transform">
                <div className="text-[#131C45] h-20 flex items-center justify-center">{cap.icon}</div>
                <h3 className="font-bold text-[#131C45] text-sm leading-snug">{cap.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Pricing Carousel ── */}
      <section className="py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-[#2DA6DD]">
              {isTH ? 'แพ็คเกจ' : 'Packages'}
            </h2>
            <p className="text-slate-500 mt-2 font-medium text-sm">
              {isTH ? 'เลือกแผนของคุณ' : 'Choose Your Plan'}
            </p>
          </div>

          {/* Carousel */}
          <div className="flex items-center justify-center">

            {/* Cards — flat carousel */}
            <div className="relative flex-1" style={{ height: '620px' }}>

              {/* Prev arrow — absolute, left edge of active card */}
              <button
                onClick={() => setActivePlanIdx(p => Math.max(0, p - 1))}
                disabled={activePlanIdx === 0}
                className="absolute z-20 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all cursor-pointer"
                style={{ left: 'calc(50% - 145px)', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <ChevronLeft className="w-5 h-5 text-[#EC6F44]" />
              </button>

              {/* Next arrow — absolute, right edge of active card */}
              <button
                onClick={() => setActivePlanIdx(p => Math.min(PRICING_PLANS.length - 1, p + 1))}
                disabled={activePlanIdx === PRICING_PLANS.length - 1}
                className="absolute z-20 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all cursor-pointer"
                style={{ left: 'calc(50% + 145px)', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <ChevronRight className="w-5 h-5 text-[#EC6F44]" />
              </button>

              {(() => {
                const ACTIVE_W = 290, ADJ_W = 225, FAR_W = 175, GAP = 12;
                const planColor: Record<string, string> = {
                  free: 'text-slate-400', s: 'text-purple-400',
                  m: 'text-[#2DA6DD]',   l: 'text-red-400', pro: 'text-orange-400',
                };
                const planShadow: Record<string, string> = {
                  free: '0 24px 64px rgba(148,163,184,0.5)',
                  s:    '0 24px 64px rgba(192,132,252,0.5)',
                  m:    '0 24px 64px rgba(45,166,221,0.5)',
                  l:    '0 24px 64px rgba(248,113,113,0.5)',
                  pro:  '0 24px 64px rgba(251,146,60,0.5)',
                };

                return PRICING_PLANS.map((plan, idx) => {
                  const offset = idx - activePlanIdx;
                  if (Math.abs(offset) > 2) return null;
                  const isActive = offset === 0;
                  const isAdjacent = Math.abs(offset) === 1;
                  const cardWidth = isActive ? ACTIVE_W : isAdjacent ? ADJ_W : FAR_W;
                  const sign = Math.sign(offset) || 0;
                  const absOff = Math.abs(offset);
                  const centerX = absOff === 0 ? 0
                    : absOff === 1 ? sign * (ACTIVE_W / 2 + GAP + ADJ_W / 2)
                    : sign * (ACTIVE_W / 2 + GAP + ADJ_W + GAP + FAR_W / 2);
                  const tx = centerX - cardWidth / 2;
                  const boolFeatures = plan.features.slice(0, plan.features.length - 1);
                  const lastFeature = plan.features[plan.features.length - 1];
                  const gradientMap: Record<string, string> = {
                    m: 'linear-gradient(160deg, #2DA6DD, #2F45AB)',
                    s: 'linear-gradient(160deg, #6A6ED2, #E33368)',
                    l: 'linear-gradient(160deg, #CA3F42, #E37633)',
                    pro: 'linear-gradient(160deg, #FAFE8C, #C36345)',
                  };
                  const letterStyle = gradientMap[plan.id] ? {
                    background: gradientMap[plan.id],
                    WebkitBackgroundClip: 'text' as const,
                    WebkitTextFillColor: 'transparent' as const,
                    backgroundClip: 'text' as const,
                  } : {};

                  return (
                    <motion.div
                      key={plan.id}
                      onClick={() => setActivePlanIdx(idx)}
                      style={{
                        position: 'absolute', left: '50%', top: '50%',
                        translateY: '-50%',
                        zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
                      }}
                      animate={{
                        x: tx,
                        width: cardWidth,
                        opacity: isActive ? 1 : isAdjacent ? 1 : 0.6,
                        boxShadow: isActive ? planShadow[plan.id] : '0 0px 0px rgba(0,0,0,0)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 28,
                        mass: 0.9,
                        opacity: { duration: 0.25, ease: 'easeOut' },
                        boxShadow: { duration: 0.3, ease: 'easeOut' },
                      }}
                      className="rounded-2xl cursor-pointer overflow-hidden"
                    >
                      {isActive ? (
                        /* ── Active: 2-tone (dark top + white bottom) ── */
                        <>
                          {plan.id === 'm' && (
                            <div className="bg-[#2DA6DD] text-white text-xs font-bold text-center py-2">
                              {isTH ? 'ยอดนิยม' : 'Most Popular'}
                            </div>
                          )}
                          {(plan.id === 'l' || plan.id === 'pro') && (
                            <div className="bg-[#EC6F44] text-white text-xs font-bold text-center py-2">
                              {isTH ? 'ครบทุกฟีเจอร์' : 'Full Features'}
                            </div>
                          )}
                          <div className="bg-[#131C45] px-6 pt-6 pb-5 text-center">
                            <div className={`font-black text-7xl leading-none mb-3 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                            <div>
                              <span className="font-black text-white text-2xl">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                              <span className="text-white text-sm font-semibold ml-1">{plan.price === 0 ? (isTH ? '/เดือน' : 'forever') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
                            </div>
                          </div>
                          <div className="bg-white px-6 pt-5 pb-6 space-y-3">
                            {boolFeatures.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2.5">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${feat.available ? 'bg-[#2DA6DD]' : 'bg-red-500'}`}>
                                  {feat.available ? <Check className="w-3.5 h-3.5 text-white" /> : <X className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className="text-xs text-slate-700 leading-tight">{feat.text}</span>
                              </div>
                            ))}
                            {lastFeature && (
                              <div className="flex items-center gap-2 text-slate-500 text-xs pl-0.5">
                                <span className="text-sm leading-none">•</span>
                                <span>{lastFeature.text}</span>
                              </div>
                            )}
                            <button
                              onClick={e => { e.stopPropagation(); onSelectPackage(plan.id); }}
                              className="mt-3 w-full py-4 rounded-xl bg-[#EC6F44] hover:bg-orange-500 text-white font-bold text-base transition-colors cursor-pointer"
                            >
                              {isTH ? 'รายละเอียด' : 'Details'}
                            </button>
                          </div>
                        </>
                      ) : isAdjacent ? (
                        /* ── Adjacent: dark top + white bottom ── */
                        <>
                          {plan.id === 'm' && (
                            <div className="bg-[#2DA6DD] text-white text-[10px] font-bold text-center py-1.5">
                              {isTH ? 'ยอดนิยม' : 'Most Popular'}
                            </div>
                          )}
                          {(plan.id === 'l' || plan.id === 'pro') && (
                            <div className="bg-[#EC6F44] text-white text-[10px] font-bold text-center py-1.5">
                              {isTH ? 'ครบทุกฟีเจอร์' : 'Full Features'}
                            </div>
                          )}
                          <div className="bg-[#131C45] px-5 pt-6 pb-5 text-center">
                            <div className={`font-black text-4xl leading-none mb-2 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                            <div>
                              <span className="font-black text-white text-base">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                              <span className="text-slate-400 text-xs ml-1">{plan.price === 0 ? (isTH ? '/เดือน' : 'forever') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
                            </div>
                          </div>
                          <div className="bg-white px-4 pt-4 pb-5 space-y-2.5">
                            {boolFeatures.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feat.available ? 'bg-[#2DA6DD]' : 'bg-red-500'}`}>
                                  {feat.available ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-[11px] text-slate-700 leading-tight">{feat.text}</span>
                              </div>
                            ))}
                            {lastFeature && (
                              <div className="flex items-center gap-2 text-slate-500 text-[11px] pl-0.5">
                                <span className="text-sm leading-none">•</span>
                                <span>{lastFeature.text}</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        /* ── Far: dark top + white bottom, with text ── */
                        <>
                          {plan.id === 'm' && (
                            <div className="bg-[#2DA6DD] text-white text-[10px] font-bold text-center py-1.5">
                              {isTH ? 'ยอดนิยม' : 'Most Popular'}
                            </div>
                          )}
                          {(plan.id === 'l' || plan.id === 'pro') && (
                            <div className="bg-[#EC6F44] text-white text-[10px] font-bold text-center py-1.5">
                              {isTH ? 'ครบทุกฟีเจอร์' : 'Full Features'}
                            </div>
                          )}
                          <div className="bg-[#131C45] px-3 pt-5 pb-4 text-center">
                            <div className={`font-black text-3xl leading-none mb-1.5 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                            <div>
                              <span className="font-black text-white text-sm">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                              <span className="text-slate-400 text-[10px] ml-0.5">{plan.price === 0 ? (isTH ? ' /เดือน' : '') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
                            </div>
                          </div>
                          <div className="bg-white px-3 pt-3 pb-4 space-y-2">
                            {boolFeatures.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-1.5">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${feat.available ? 'bg-[#2DA6DD]' : 'bg-red-500'}`}>
                                  {feat.available ? <Check className="w-2.5 h-2.5 text-white" /> : <X className="w-2.5 h-2.5 text-white" />}
                                </div>
                                <span className="text-[10px] text-slate-700 leading-tight">{feat.text}</span>
                              </div>
                            ))}
                            {lastFeature && (
                              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] pl-0.5">
                                <span className="text-xs leading-none">•</span>
                                <span>{lastFeature.text}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                });
              })()}
            </div>
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
          <h2 className="text-3xl font-extrabold text-center text-[#2DA6DD] mb-12">
            {isTH ? 'สินค้าของเรา' : 'Our Products'}
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 flex items-center justify-center min-h-[200px]">
              <img src={imgS1} alt="Product 1" className="max-h-40 w-auto object-contain" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 flex items-center justify-center min-h-[200px]">
              <img src={imgS2} alt="Product 2" className="max-h-40 w-auto object-contain" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 flex items-center justify-center min-h-[200px]">
              <img src={imgS3} alt="Product 3" className="max-h-40 w-auto object-contain" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-[#131C45]">
              {isTH ? 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น' : 'Automatic Dual-Tier Cash Drawer'}
            </h3>
            <button
              onClick={() => setCurrentPage('products')}
              className="px-8 py-3 rounded-[15px] border-2 border-[#EC6F44] text-[#EC6F44] font-bold text-sm bg-white hover:bg-[#EC6F44] hover:text-white transition-colors cursor-pointer mx-auto"
            >
              {isTH ? 'เรียนรู้เพิ่มเติม' : 'Learn More'}
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. Multi-device ── */}
      <section className="bg-[#131C45] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            <span className="text-[#2DA6DD]">{isTH ? 'การใช้งาน' : 'Works'}</span>
            <span className="text-white">{isTH ? 'ในระบบต่างๆ' : ' Across All Platforms'}</span>
          </h2>

          {(() => {
            const AndroidIcon = () => (
              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#3DDC84">
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11 23.33 11 22.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 1c-1.1 0-2.15.23-3.12.63L7.4.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.14 3.07 5 5.16 5 7.5L5 8h14v-.5c0-2.34-1.14-4.43-2.97-5.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
              </svg>
            );
            const AppleIcon = () => (
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#1d1d1f">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            );
            const WindowsIcon = () => (
              <svg viewBox="0 0 20 20" className="w-9 h-9">
                <path fill="#F35325" d="M1 1h8.5v8.5H1z"/>
                <path fill="#81BC06" d="M10.5 1H19v8.5h-8.5z"/>
                <path fill="#05A6F0" d="M1 10.5h8.5V19H1z"/>
                <path fill="#FFBA08" d="M10.5 10.5H19V19h-8.5z"/>
              </svg>
            );
            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                {/* ── มือถือ ── */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center" style={{ height: 160 }}>
                    <img src={imgF1} alt="มือถือ" className="max-h-40 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-5"><AndroidIcon /><AppleIcon /></div>
                  <p className="font-bold text-slate-800 text-sm">{isTH ? 'มือถือ' : 'Mobile'}</p>
                </div>

                {/* ── แท็บเล็ต ── */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center" style={{ height: 160 }}>
                    <img src={imgF2} alt="แท็บเล็ต" className="max-h-40 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-5"><AndroidIcon /><AppleIcon /></div>
                  <p className="font-bold text-slate-800 text-sm">{isTH ? 'แท็บเล็ต' : 'Tablet'}</p>
                </div>

                {/* ── เดสก์ท็อป ── */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center" style={{ height: 160 }}>
                    <img src={imgF3} alt="เดสก์ท็อป" className="max-h-40 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-5"><WindowsIcon /><AppleIcon /></div>
                  <p className="font-bold text-slate-800 text-sm">{isTH ? 'เดสก์ท็อป' : 'Desktop'}</p>
                </div>

                {/* ── เว็บเบราว์เซอร์ ── */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center" style={{ height: 160 }}>
                    <img src={imgF4} alt="คี-ออส" className="max-h-40 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-5"><WindowsIcon /><AppleIcon /></div>
                  <p className="font-bold text-slate-800 text-sm">{isTH ? 'คี-ออส' : 'Kiosk'}</p>
                </div>

              </div>
            );
          })()}
        </div>
      </section>

    </div>
  );
}
