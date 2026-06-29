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
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Check,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Package,
  Store,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
}

export default function HomeView({ setCurrentPage, language }: HomeViewProps) {
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
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1920/600' }}>
              {slides[currentSlide].image ? (
                <img
                  src={slides[currentSlide].image}
                  alt="GrowStore Banner"
                  className="absolute inset-0 w-full h-full object-cover"
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
          <div className="flex items-center justify-center gap-4">

            {/* Prev arrow */}
            <button
              onClick={() => setActivePlanIdx(p => Math.max(0, p - 1))}
              disabled={activePlanIdx === 0}
              className="flex-shrink-0 w-12 h-12 z-20 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#EC6F44]" />
            </button>

            {/* Cards — flat carousel */}
            <div className="relative flex-1" style={{ height: '620px' }}>
              {(() => {
                const ACTIVE_W = 280, ADJ_W = 220, FAR_W = 130, GAP = 16;
                const planColor: Record<string, string> = {
                  free: 'text-slate-400', s: 'text-orange-400',
                  m: 'text-[#2DA6DD]',   l: 'text-red-400', pro: 'text-purple-400',
                };
                const planShadow: Record<string, string> = {
                  free: '0 24px 64px rgba(148,163,184,0.5)',
                  s:    '0 24px 64px rgba(251,146,60,0.5)',
                  m:    '0 24px 64px rgba(45,166,221,0.5)',
                  l:    '0 24px 64px rgba(248,113,113,0.5)',
                  pro:  '0 24px 64px rgba(192,132,252,0.5)',
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
                    s: 'linear-gradient(160deg, #FAFE8C, #C36345)',
                    l: 'linear-gradient(160deg, #CA3F42, #E37633)',
                    pro: 'linear-gradient(160deg, #6A6ED2, #E33368)',
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
                          <div className="bg-[#131C45] px-6 pt-6 pb-5 text-center">
                            <div className={`font-black text-7xl leading-none mb-3 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                            <div>
                              <span className="font-black text-white text-2xl">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                              <span className="text-slate-400 text-xs ml-1">{plan.price === 0 ? (isTH ? 'ฟรี /เดือน' : 'forever') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
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
                              onClick={e => { e.stopPropagation(); setCurrentPage('packages'); }}
                              className="mt-3 w-full py-4 rounded-xl bg-[#EC6F44] hover:bg-orange-500 text-white font-bold text-base transition-colors cursor-pointer"
                            >
                              {isTH ? 'รายละเอียด' : 'Details'}
                            </button>
                          </div>
                        </>
                      ) : isAdjacent ? (
                        /* ── Adjacent: dark top + white bottom ── */
                        <>
                          <div className="bg-[#131C45] px-5 pt-6 pb-5 text-center">
                            <div className={`font-black text-4xl leading-none mb-2 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                            <div>
                              <span className="font-black text-white text-base">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                              <span className="text-slate-400 text-xs ml-1">{plan.price === 0 ? (isTH ? 'ฟรี /เดือน' : 'forever') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
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
                        /* ── Far: all gray, icons only ── */
                        <div className="bg-slate-200 p-4 text-center">
                          <div className={`font-black text-2xl leading-none mb-1 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>{plan.name}</div>
                          <div className="mb-4">
                            <span className="text-xs font-bold text-slate-500">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 ml-0.5">{plan.price === 0 ? (isTH ? ' /เดือน' : '') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            {plan.features.slice(0, 4).map((feat, fIdx) => (
                              <div key={fIdx} className={`w-5 h-5 rounded-full flex items-center justify-center ${feat.available ? 'bg-[#2DA6DD]' : 'bg-red-400'}`}>
                                {feat.available ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                });
              })()}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => setActivePlanIdx(p => Math.min(PRICING_PLANS.length - 1, p + 1))}
              disabled={activePlanIdx === PRICING_PLANS.length - 1}
              className="flex-shrink-0 w-12 h-12 z-20 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#EC6F44]" />
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
