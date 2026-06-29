/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PRICING_PLANS, PACKAGE_CATEGORIES } from '../data';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  QrCode, 
  CreditCard, 
  Upload, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Award,
  CircleDot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackagesViewProps {
  language: 'TH' | 'EN';
  setCurrentPage: (page: string) => void;
  onSetDemoPlan: (plan: string) => void;
}

export default function PackagesView({ language, setCurrentPage, onSetDemoPlan }: PackagesViewProps) {
  const isTH = language === 'TH';

  // State for expanded accordions
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

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

  const handleStartSim = (planId: 'free' | 's' | 'm' | 'l' | 'pro') => {
    setSelectedPlanId(planId);
    setSimStep(1);
    setShowSim(true);
    setStoreName('');
    setStorePhone('');
    setSlipUploaded(false);
  };

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
    <div className="space-y-20 pb-20">
      
      {/* 1. Pricing Plan Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Pricing & Packages
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
            {isTH ? 'แพ็คเกจค่าบริการและฟังก์ชันระบบ' : 'GrowStore POS Subscription Packages'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isTH ? 'เลือกแผนที่คุณต้องการ เริ่มต้นขายของ จัดการบัญชีหลังบ้านอย่างสะดวกรวดเร็ว' : 'Select your tier, scale up seamlessly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl border flex flex-col justify-between transition-all relative ${
                  isPopular 
                    ? 'border-blue-500 shadow-xl scale-102 z-10' 
                    : 'border-slate-200/80 hover:border-slate-300 shadow-sm'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md animate-pulse">
                    {isTH ? 'ยอดนิยม' : 'Popular'}
                  </div>
                )}

                {/* Card Top */}
                <div className="p-6 border-b border-slate-50 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">GrowStore</span>
                    <h3 className="text-lg font-bold font-sans text-slate-900 leading-none">{plan.name}</h3>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-3xl font-sans font-black text-slate-900">
                      {plan.price === 0 ? '0' : plan.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-400 ml-1">฿ / {isTH ? 'เดือน' : 'mo'}</span>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{plan.period}</p>
                  </div>
                </div>

                {/* Features checklist snippet */}
                <div className="p-6 bg-slate-50/50 flex-1 space-y-3 border-b border-slate-50">
                  {plan.features.slice(0, 5).map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs font-semibold">
                      {feat.available ? (
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feat.available ? 'text-slate-700' : 'text-slate-400 line-through'}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                  <p className="text-[10px] text-blue-600 font-bold mt-2">
                    {isTH ? '+ ดูตารางฟีเจอร์ด้านล่าง' : '+ See more below'}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="p-4 bg-white rounded-b-2xl">
                  <button
                    onClick={() => handleStartSim(plan.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPopular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isTH ? 'สมัคร / ซื้อแพ็คเกจ' : 'Buy Package'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Detailed Features Comparison Accordion (Image 4 bottom) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-sans font-black text-slate-900 tracking-tight">
            {isTH ? 'ตารางเปรียบเทียบฟังก์ชันการทำงานหลัก' : 'Detailed Module Comparison Table'}
          </h2>
          <p className="text-slate-500 text-xs">
            {isTH ? 'คลิกที่หัวข้อเพื่อเปิดดูขีดความสามารถของแต่ละโมดูลอย่างครบถ้วน' : 'Expand topics to inspect parameters.'}
          </p>
        </div>

        {/* Accordions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden divide-y divide-slate-100">
          {PACKAGE_CATEGORIES.map((category, catIdx) => {
            const isExpanded = expandedIndices.includes(catIdx);
            return (
              <div key={catIdx} className="overflow-hidden">
                {/* Header bar */}
                <button
                  onClick={() => toggleAccordion(catIdx)}
                  className="w-full flex justify-between items-center p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left cursor-pointer font-bold text-sm text-slate-800"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{category.title}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {/* Drawer Contents */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-x-auto"
                    >
                      <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                        <thead>
                          <tr className="bg-slate-100/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            <th className="py-3 px-5 w-2/5">{isTH ? 'ฟีเจอร์การทำงาน' : 'Core Feature'}</th>
                            <th className="py-3 px-3 text-center">ฟรี</th>
                            <th className="py-3 px-3 text-center">S</th>
                            <th className="py-3 px-3 text-center">M</th>
                            <th className="py-3 px-3 text-center">L</th>
                            <th className="py-3 px-3 text-center">Pro</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                          {category.features.map((feat, featIdx) => (
                            <tr key={featIdx} className="hover:bg-slate-50/30">
                              <td className="py-3 px-5 text-slate-800">{feat.name}</td>
                              
                              {/* Free col */}
                              <td className="py-3 px-3 text-center">
                                {typeof feat.free === 'boolean' ? (
                                  feat.free ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
                                ) : <span className="text-slate-600">{feat.free}</span>}
                              </td>

                              {/* S col */}
                              <td className="py-3 px-3 text-center">
                                {typeof feat.s === 'boolean' ? (
                                  feat.s ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
                                ) : <span className="text-slate-600">{feat.s}</span>}
                              </td>

                              {/* M col */}
                              <td className="py-3 px-3 text-center">
                                {typeof feat.m === 'boolean' ? (
                                  feat.m ? <Check className="w-4 h-4 text-emerald-500 mx-auto font-black" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
                                ) : <span className="text-blue-600 font-bold">{feat.m}</span>}
                              </td>

                              {/* L col */}
                              <td className="py-3 px-3 text-center">
                                {typeof feat.l === 'boolean' ? (
                                  feat.l ? <Check className="w-4 h-4 text-emerald-500 mx-auto font-black" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
                                ) : <span className="text-blue-600 font-bold">{feat.l}</span>}
                              </td>

                              {/* Pro col */}
                              <td className="py-3 px-3 text-center">
                                {typeof feat.pro === 'boolean' ? (
                                  feat.pro ? <Check className="w-4 h-4 text-emerald-500 mx-auto font-black" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
                                ) : <span className="text-purple-600 font-extrabold">{feat.pro}</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. วิธีการสั่งซื้อ (How to Order - Static Guidelines) */}
      <section className="bg-slate-50 py-16" id="order-guide-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight">
              {isTH ? 'ขั้นตอนการลงทะเบียนสั่งซื้อ' : 'Standard Ordering Instructions'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isTH ? 'ทำธุรกรรมเสร็จสิ้นและเปิดเครื่องเข้าใช้งานได้รวดเร็วใน 5 ขั้นตอนหลัก' : 'Follow these simple stages to complete your activation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div className="text-2xl mt-4">💬</div>
              <h3 className="font-bold text-xs text-slate-800 mt-2">{isTH ? 'แอดไลน์พนักงาน' : 'Add Line Support'}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'แอด @Growstore แจ้งความประสงค์สั่งซื้อ' : 'Contact staff and inform the selected tier'}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs">
                2
              </span>
              <div className="text-2xl mt-4">📋</div>
              <h3 className="font-bold text-xs text-slate-800 mt-2">{isTH ? 'เลือกแพ็คเกจที่เหมาะสม' : 'Select Package'}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'ระบุสเกลร้านและแพ็คเกจที่จะเปิดใช้' : 'Specify parameters and checkout details'}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs">
                3
              </span>
              <div className="text-2xl mt-4">💸</div>
              <h3 className="font-bold text-xs text-slate-800 mt-2">{isTH ? 'ชำระค่าธรรมเนียม' : 'Transfer Money'}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'โอนเข้าเลขบัญชีบริษัทออฟฟิเชียล' : 'Official bank account transaction'}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs">
                4
              </span>
              <div className="text-2xl mt-4">📁</div>
              <h3 className="font-bold text-xs text-slate-800 mt-2">{isTH ? 'ส่งสลิปเพื่อตรวจสอบ' : 'Send Slip'}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'ส่งหลักฐานโอนเงินและข้อมูลร้านค้า' : 'Upload proof of payment to system'}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs">
                5
              </span>
              <div className="text-2xl mt-4">🚀</div>
              <h3 className="font-bold text-xs text-slate-800 mt-2">{isTH ? 'รับแอคเคาท์ระบบ POS' : 'Activate Terminal'}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'รับรหัสล็อกอินและเริ่มติดตั้งหน้าร้าน' : 'Receive activation credential keys'}</p>
            </div>
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
