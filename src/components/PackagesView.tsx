/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ActivePage } from '../types';
import imgE1 from '../../images/e1.png';
import imgE2 from '../../images/e2.png';
import imgE3 from '../../images/e3.png';
import imgE4 from '../../images/e4.png';
import imgE5 from '../../images/e5.png';
import { PRICING_PLANS, PACKAGE_CATEGORIES, COMPARISON_ROWS } from '../data';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,

  QrCode,
  Upload,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Package,
  Tag,
  Store,
  BarChart2,
  Users,
  CreditCard,
  ShoppingCart,
  Briefcase,
  UserCheck,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackagesViewProps {
  language: 'TH' | 'EN';
  setCurrentPage: (page: ActivePage) => void;
  onSetDemoPlan: (plan: string) => void;
  initialHighlight?: string;
}

export default function PackagesView({ language, setCurrentPage, onSetDemoPlan, initialHighlight }: PackagesViewProps) {
  const isTH = language === 'TH';

  const initialIdx = PRICING_PLANS.findIndex(p => p.id === (initialHighlight ?? 'm'));
  const [activePlanIdx, setActivePlanIdx] = useState(initialIdx >= 0 ? initialIdx : 2);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  // State for expanded accordions
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | null>(initialHighlight ?? 'm');
  const tableRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (idx: number) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter(i => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  // State for payment simulator
  const [showSim, setShowSim] = useState(false);
  const [simStep, setSimStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 's' | 'm' | 'l' | 'pro'>('m');
  const [storeName, setStoreName] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [slipUploaded, setSlipUploaded] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[2];


  const handleNextStep = () => {
    if (simStep === 1) {
      if (!storeName.trim() || !storePhone.trim()) {
        alert(isTH ? 'กรุณากรอกชื่อร้านและเบอร์โทรศัพท์จำลอง' : 'Please fill in mock Store Name and Phone');
        return;
      }
      setSimStep(2);
    } else if (simStep === 2) {
      setSimStep(3);
    } else if (simStep === 3) {
      if (!slipUploaded) {
        alert(isTH ? 'กรุณาคลิกเพื่ออัปโหลดสลิปจำลองก่อน' : 'Please upload simulated slip receipt');
        return;
      }
      // Generate mock license code
      const code = 'G-POS-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + selectedPlanId.toUpperCase();
      setActivationCode(code);
      setSimStep(4);
    }
  };

  const handleFinishActivation = () => {
    // Save unlocked plan state
    onSetDemoPlan(selectedPlanId);
    setShowSim(false);
    // Redirect to POS sandbox with unlocked plan!
    setCurrentPage('pos-demo');
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Pricing Carousel */}
      <section className="pt-8 pb-16 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-2">
            <h2 className="text-4xl font-extrabold text-[#2DA6DD]">
              {isTH ? 'แพ็คเกจ' : 'Packages'}
            </h2>
            <p className="text-slate-500 mt-2 font-medium text-sm">
              {isTH ? 'เลือกแผนของคุณ' : 'Choose Your Plan'}
            </p>
          </div>

          {(() => {
            const planColor: Record<string, string> = {
              free: 'text-slate-400', s: 'text-purple-400',
              m: 'text-[#2DA6DD]', l: 'text-red-400', pro: 'text-orange-400',
            };
            const planShadow: Record<string, string> = {
              free: '0 16px 48px rgba(148,163,184,0.55)',
              s: '0 16px 48px rgba(192,132,252,0.55)',
              m: '0 16px 48px rgba(45,166,221,0.55)',
              l: '0 16px 48px rgba(248,113,113,0.55)',
              pro: '0 16px 48px rgba(251,146,60,0.55)',
            };
            const gradientMap: Record<string, string> = {
              m: 'linear-gradient(160deg, #2DA6DD, #2F45AB)',
              s: 'linear-gradient(160deg, #6A6ED2, #E33368)',
              l: 'linear-gradient(160deg, #CA3F42, #E37633)',
              pro: 'linear-gradient(160deg, #FAFE8C, #C36345)',
            };
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {PRICING_PLANS.map((plan, idx) => {
                  const isHovered = idx === hoveredIdx;
                  const isActive = idx === activePlanIdx;
                  const boolFeatures = plan.features.slice(0, plan.features.length - 1);
                  const lastFeature = plan.features[plan.features.length - 1];
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
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(-1)}
                      animate={{
                        boxShadow: (isActive || isHovered) ? planShadow[plan.id] : '0 2px 8px rgba(0,0,0,0.08)',
                        scale: isActive ? 1.05 : isHovered ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                    >
                      {/* Badge */}
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

                      {/* Header */}
                      <div className={`bg-[#131C45] px-4 pb-4 text-center ${plan.id === 'free' || plan.id === 's' ? 'pt-8' : 'pt-5'}`}>
                        <div className={`font-black text-5xl leading-none mb-2 ${!gradientMap[plan.id] ? planColor[plan.id] : ''}`} style={letterStyle}>
                          {plan.name}
                        </div>
                        <div>
                          <span className="font-black text-white text-lg">{plan.price === 0 ? (isTH ? 'ฟรี' : 'Free') : plan.price.toLocaleString()}</span>
                          <span className="text-white text-xs font-semibold ml-1">{plan.price === 0 ? (isTH ? '/เดือน' : 'forever') : (isTH ? ' บาท/เดือน' : ' ฿/mo')}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="bg-white px-4 pt-4 pb-4 flex flex-col gap-2 flex-1">
                        {boolFeatures.slice(0, 6).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feat.available ? 'bg-[#2DA6DD]' : 'bg-red-500'}`}>
                              {feat.available ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-[11px] text-slate-700 leading-tight">{feat.text}</span>
                          </div>
                        ))}
                        {lastFeature && (
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] pl-0.5">
                            <span className="text-sm leading-none">•</span>
                            <span>{lastFeature.text}</span>
                          </div>
                        )}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setActivePlanIdx(idx);
                            setHighlightedPlanId(plan.id);
                            setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                          }}
                          className="mt-auto w-full py-2.5 rounded-xl bg-[#EC6F44] hover:bg-orange-500 text-white font-bold text-sm transition-colors cursor-pointer"
                        >
                          {isTH ? 'รายละเอียด' : 'Details'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 2. Feature Comparison Table */}
      <section ref={tableRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#2DA6DD' }}>
            {isTH ? 'ตารางเปรียบเทียบฟังก์ชันการทำงานหลัก' : 'Feature Comparison Table'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isTH ? 'คลิกที่หัวข้อเพื่อเปิดดูขีดความสามารถของแต่ละโมดูลอย่างครบถ้วน' : 'Click a category header to expand and view all capabilities.'}
          </p>
        </div>

        {(() => {
          const gradientMap: Record<string, string> = {
            m: 'linear-gradient(160deg, #2DA6DD, #2F45AB)',
            s: 'linear-gradient(160deg, #6A6ED2, #E33368)',
            l: 'linear-gradient(160deg, #CA3F42, #E37633)',
            pro: 'linear-gradient(160deg, #FAFE8C, #C36345)',
          };
          const planAccentColor: Record<string, string> = {
            free: '#94A3B8', s: '#C084FC', m: '#2DA6DD', l: '#F87171', pro: '#FB923C',
          };
          const planCellRgba: Record<string, string> = {
            free: 'rgba(148,163,184,0.15)', s: 'rgba(192,132,252,0.15)',
            m: 'rgba(45,166,221,0.15)', l: 'rgba(248,113,113,0.15)', pro: 'rgba(251,146,60,0.15)',
          };
          const hlCell = (id: string) => highlightedPlanId === id ? { backgroundColor: planCellRgba[id] } : {};
          const catIconMap: Record<string, React.ReactElement> = {
            Package: <Package className="w-4 h-4" />,
            Tag: <Tag className="w-4 h-4" />,
            Store: <Store className="w-4 h-4" />,
            BarChart: <BarChart2 className="w-4 h-4" />,
            Users: <Users className="w-4 h-4" />,
            CreditCard: <CreditCard className="w-4 h-4" />,
            ShoppingCart: <ShoppingCart className="w-4 h-4" />,
            Briefcase: <Briefcase className="w-4 h-4" />,
            UserCheck: <UserCheck className="w-4 h-4" />,
            Shield: <Shield className="w-4 h-4" />,
            TrendingUp: <TrendingUp className="w-4 h-4" />,
          };

          const renderCell = (val: string | boolean) => {
            if (typeof val === 'boolean') {
              return val
                ? <Check className="w-4 h-4 text-[#2DA6DD] mx-auto" />
                : <span className="text-slate-300 font-bold text-base mx-auto block text-center leading-none">–</span>;
            }
            return <span className="text-xs font-semibold text-slate-700">{val}</span>;
          };

          return (
            <div>
              {/* Badges in-flow — sits directly above table, no gap */}
              <div className="flex rounded-t-xl overflow-hidden" style={{ marginLeft: '60.4%' }}>
                <div className="flex-1 bg-[#2DA6DD] text-white text-[10px] font-bold text-center py-2">
                  {isTH ? 'ยอดนิยม' : 'Most Popular'}
                </div>
                <div className="flex-[2] bg-[#EC6F44] text-white text-[10px] font-bold text-center py-2">
                  {isTH ? 'ฟีเจอร์ครบทั้งหมด' : 'Full Features'}
                </div>
              </div>

              <div className="overflow-x-auto rounded-tl-2xl rounded-bl-2xl rounded-br-2xl border border-slate-200 shadow-sm">
              <table className="w-full border-collapse text-xs min-w-[640px]" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th className="bg-[#2DA6DD] text-white text-xl font-bold px-5 py-4 text-center align-middle" style={{ width: '34%' }}>
                      {isTH ? 'แพ็คเกจ' : 'Package'}
                    </th>
                    {PRICING_PLANS.map(plan => {
                      const letterStyle = gradientMap[plan.id] ? {
                        background: gradientMap[plan.id],
                        WebkitBackgroundClip: 'text' as const,
                        WebkitTextFillColor: 'transparent' as const,
                        backgroundClip: 'text' as const,
                      } : {};
                      const isHL = highlightedPlanId === plan.id;
                      return (
                        <th key={plan.id} className="px-3 py-4 text-center transition-colors duration-300" style={{ backgroundColor: isHL ? planAccentColor[plan.id] : '#131C45' }}>
                          <div className={`font-black text-3xl leading-none ${plan.id === 'free' ? 'text-white' : ''}`} style={letterStyle}>
                            {plan.name}
                          </div>
                          <div className="text-white text-xs font-semibold mt-1.5">
                            {plan.price === 0 ? 'ฟรี/เดือน' : `${plan.price.toLocaleString()} บาท/เดือน`}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {/* ── Flat comparison rows ── */}
                  {COMPARISON_ROWS.map((feat, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="px-5 py-3 text-slate-800 font-medium">{feat.name}</td>
                      <td className="px-3 py-3 text-center" style={hlCell('free')}>{renderCell(feat.free)}</td>
                      <td className="px-3 py-3 text-center" style={hlCell('s')}>{renderCell(feat.s)}</td>
                      <td className="px-3 py-3 text-center" style={hlCell('m')}>{renderCell(feat.m)}</td>
                      <td className="px-3 py-3 text-center" style={hlCell('l')}>{renderCell(feat.l)}</td>
                      <td className="px-3 py-3 text-center" style={hlCell('pro')}>{renderCell(feat.pro)}</td>
                    </tr>
                  ))}

                  {/* ── Accordion categories ── */}
                  {PACKAGE_CATEGORIES.map((category, catIdx) => {
                    const isExpanded = expandedIndices.includes(catIdx);
                    return (
                      <>
                        {/* Category header row */}
                        <tr key={`cat-${catIdx}`}>
                          <td colSpan={6} className="p-0">
                            <button
                              onClick={() => toggleAccordion(catIdx)}
                              className="w-full flex items-center justify-between px-5 py-4 bg-[#131C45] text-white cursor-pointer hover:bg-[#1a2558] transition-colors"
                            >
                              <span className="flex items-center gap-2 font-bold text-sm">
                                {category.icon && catIconMap[category.icon]}
                                {category.title}
                              </span>
                              {isExpanded
                                ? <ChevronUp className="w-4 h-4 text-slate-400" />
                                : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded feature rows */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.tr
                              key={`cat-rows-${catIdx}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15, ease: 'easeInOut' }}
                              style={{ display: 'contents' }}
                            >
                              {category.features.map((feat, featIdx) => (
                                <tr
                                  key={`feat-${catIdx}-${featIdx}`}
                                  className={featIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                                >
                                  <td className="px-5 py-3 text-slate-800 font-medium">{feat.name}</td>
                                  <td className="px-3 py-3 text-center" style={hlCell('free')}>{renderCell(feat.free)}</td>
                                  <td className="px-3 py-3 text-center" style={hlCell('s')}>{renderCell(feat.s)}</td>
                                  <td className="px-3 py-3 text-center" style={hlCell('m')}>{renderCell(feat.m)}</td>
                                  <td className="px-3 py-3 text-center" style={hlCell('l')}>{renderCell(feat.l)}</td>
                                  <td className="px-3 py-3 text-center" style={hlCell('pro')}>{renderCell(feat.pro)}</td>
                                </tr>
                              ))}
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 3. วิธีการสั่งซื้อ */}
      <section className="bg-[#131C45] py-16" id="order-guide-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-14 tracking-tight">
            {isTH ? 'วิธีการสั่งซื้อ' : 'How to Order'}
          </h2>

          {/* Row 1: Steps 1–3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {[
              {
                n: 1, img: imgE1,
                title: isTH ? 'ขั้นตอนที่ 1' : 'Step 1',
                desc: isTH ? 'กดที่ปุ่ม "สนใจติดต่อ" หรือ\nเพิ่มเพื่อนทางไลน์ @growstore' : 'Tap "Contact Us" or add LINE @growstore',
              },
              {
                n: 2, img: imgE2,
                title: isTH ? 'ขั้นตอนที่ 2' : 'Step 2',
                desc: isTH ? 'เลือกแพ็คเกจที่ต้องการใช้งาน' : 'Choose the package you need',
              },
              {
                n: 3, img: imgE3,
                title: isTH ? 'ขั้นตอนที่ 3' : 'Step 3',
                desc: isTH ? 'โอนเงินชำระค่าบริการตาม\nแพ็คเกจที่เลือก' : 'Transfer payment for selected package',
              },
            ].map(step => (
              <div key={step.n} className="text-center">
                <div className="bg-white rounded-2xl overflow-hidden mb-4 mx-auto" style={{ width: 250, height: 200 }}>
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-bold text-lg">{step.title}</p>
                <p className="text-slate-400 text-sm mt-1 whitespace-pre-line">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 2: Steps 4–5 centered */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
            {[
              {
                n: 4, img: imgE4,
                title: isTH ? 'ขั้นตอนที่ 4' : 'Step 4',
                desc: isTH ? 'ส่งหลักฐานการโอน' : 'Send proof of transfer',
              },
              {
                n: 5, img: imgE5,
                title: isTH ? 'ขั้นตอนที่ 5' : 'Step 5',
                desc: isTH ? 'ได้รับ Account จาก Growstore' : 'Receive your Growstore Account',
              },
            ].map(step => (
              <div key={step.n} className="text-center">
                <div className="bg-white rounded-2xl overflow-hidden mb-4 mx-auto" style={{ width: 250, height: 200 }}>
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-bold text-lg">{step.title}</p>
                <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* LINE CTA button */}
          <div className="flex justify-center">
            <a
              href="https://line.me/R/ti/p/@growstore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b34d] transition-colors text-white font-bold text-xl px-12 py-4 shadow-lg" style={{ borderRadius: 15 }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              {isTH ? 'สนใจติดต่อ' : 'Contact Us'}
            </a>
          </div>

        </div>
      </section>

      {/* 4. MODAL/PANEL: INTERACTIVE ORDER SIMULATOR */}
      <AnimatePresence>
        {showSim && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                  <span className="font-sans font-bold text-base">
                    {isTH ? 'ระบบจำลองการสั่งซื้อแพ็คเกจ GrowStore' : 'GrowStore Ordering Simulator'}
                  </span>
                </div>
                <button 
                  onClick={() => setShowSim(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer text-slate-300"
                >
                  ✕
                </button>
              </div>

              {/* Steps Progress bar */}
              <div className="px-6 py-3.5 bg-slate-100 border-b border-slate-200 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className={simStep >= 1 ? 'text-blue-600' : ''}>{isTH ? '1. กรอกข้อมูลร้าน' : '1. Store info'}</span>
                <span className={simStep >= 2 ? 'text-blue-600' : ''}>{isTH ? '2. โอนเงินจำลอง' : '2. Mock QR Pay'}</span>
                <span className={simStep >= 3 ? 'text-blue-600' : ''}>{isTH ? '3. ส่งเอกสาร' : '3. Submit Slip'}</span>
                <span className={simStep >= 4 ? 'text-blue-600' : ''}>{isTH ? '4. รับสิทธิ์เสร็จสิ้น' : '4. Unlocked'}</span>
              </div>

              {/* Interactive body according to step */}
              <div className="p-8 min-h-[250px] flex flex-col justify-center">
                
                {simStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="text-center pb-2">
                      <span className="text-xs font-semibold text-slate-400">{isTH ? 'คุณกำลังจะสมัครแพ็คเกจ:' : 'Selected tier:'}</span>
                      <h4 className="text-xl font-bold font-sans text-blue-600">GrowStore Plan {selectedPlan.name} ({selectedPlan.price} ฿/{isTH ? 'เดือน' : 'mo'})</h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'ชื่อธุรกิจ / ร้านค้าจำลองของคุณ *' : 'Mock Store Name *'}</label>
                        <input 
                          type="text" 
                          required
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder={isTH ? 'เช่น ร้านกาแฟมีดี, GrowStore Cafe' : 'e.g., GrowStore Coffee Shop'}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 outline-hidden" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'เบอร์โทรศัพท์จำลองของคุณ *' : 'Mock Phone Number *'}</label>
                        <input 
                          type="tel" 
                          required
                          value={storePhone}
                          onChange={(e) => setStorePhone(e.target.value)}
                          placeholder="e.g., 089-123-4567"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 outline-hidden" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {simStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'กรุณาสแกนเพื่อทำรายการชำระเงินจำลอง' : 'Mock QR Payment Interface'}</span>
                    
                    {/* PromptPay stylized QR code container */}
                    <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-200 shadow-inner">
                      <div className="bg-blue-900 text-white py-1 px-4 rounded-t-lg font-bold text-[9px] uppercase tracking-widest">
                        Thai QR Payment / PromptPay
                      </div>
                      <div className="bg-white p-3 flex justify-center border-x border-b border-slate-200">
                        {/* PromptPay Logo & QR Placeholder */}
                        <div className="relative w-36 h-36 bg-slate-100 flex flex-col items-center justify-center p-2 rounded border border-slate-100">
                          <QrCode className="w-28 h-28 text-slate-800" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-white rounded p-1 text-[7px] font-black">
                            PROMPT PAY
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-400">{isTH ? 'ยอดชำระที่ต้องโอน:' : 'Invoice total amount:'}</span>
                      <p className="text-2xl font-black text-slate-900">{selectedPlan.price.toLocaleString()}.00 ฿</p>
                      <p className="text-[10px] text-slate-400">{isTH ? '*ยอดชำระสำหรับการทดลองระบบและรับแอคเคาท์เดโมระดับพรีเมียม' : '*Simulated transaction for unlocking premium features'}</p>
                    </div>
                  </motion.div>
                )}

                {simStep === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 text-center">
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'แนบหลักฐานการทำรายการโอนเงิน' : 'Simulated Slip Submission'}</span>
                    
                    <button
                      onClick={() => setSlipUploaded(true)}
                      className={`w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
                        slipUploaded 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                          : 'border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {slipUploaded ? (
                        <>
                          <ShieldCheck className="w-10 h-10 text-emerald-500 animate-bounce" />
                          <span className="text-xs font-bold">{isTH ? 'แนบสลิปจำลองสำเร็จ! (MOCK_SLIP.PNG)' : 'Mock Slip Submitted successfully!'}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{isTH ? 'คลิกซ้ำหากต้องการอัปโหลดใหม่' : 'Click again to re-upload'}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400" />
                          <span className="text-xs font-bold">{isTH ? 'คลิกที่นี่เพื่อส่งสลิปจำลองออโต้' : 'Click here to attach simulated slip receipt'}</span>
                          <span className="text-[10px] text-slate-400">{isTH ? 'รองรับ JPG, PNG สูงสุด 5MB' : 'Simulate file attach'}</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {simStep === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
                    <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                      <Award className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">{isTH ? 'ระบบตรวจสอบผ่านเรียบร้อย!' : 'Order Processed & Activated!'}</h4>
                      <p className="text-xs text-slate-400">{isTH ? 'คุณได้รับการอัปเกรดเซสชันเดโมเข้าสู่ไลเซนส์ระดับโปรโมชั่น' : 'Your session demo has been upgraded successfully.'}</p>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-1.5 font-mono">
                      <span className="text-[9px] font-bold text-slate-400 block tracking-widest">ACTIVATION LICENSE CODE</span>
                      <span className="text-base font-black text-blue-600">{activationCode}</span>
                    </div>

                    <p className="text-[10px] text-slate-400">
                      {isTH 
                        ? '*ระบบทำการจัดเตรียมข้อมูลร้านค้าจำลองเรียบร้อยแล้ว คลิกเสร็จสิ้นเพื่อเริ่มต้นเล่นโปรแกรม POS' 
                        : '*Click complete to explore the newly unlocked features on POS Sandbox'}
                    </p>
                  </motion.div>
                )}

              </div>

              {/* Footer action buttons */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between gap-3">
                <button
                  disabled={simStep === 4}
                  onClick={() => {
                    if (simStep === 1) setShowSim(false);
                    else setSimStep(simStep - 1);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  {simStep === 1 ? (isTH ? 'ยกเลิก' : 'Cancel') : (isTH ? 'ย้อนกลับ' : 'Back')}
                </button>

                {simStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{isTH ? 'ขั้นตอนต่อไป' : 'Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishActivation}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer flex items-center space-x-1"
                  >
                    <span>{isTH ? 'เสร็จสิ้น และ เปิดระบบ POS' : 'Complete & Open POS'}</span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
