/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Info, Shield, ShoppingCart, Video, MessageCircle, HelpCircle, Truck, PackageCheck, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsViewProps {
  language: 'TH' | 'EN';
  setCurrentPage: (page: string) => void;
}

export default function ProductsView({ language, setCurrentPage }: ProductsViewProps) {
  const isTH = language === 'TH';

  // State for gallery switcher
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Gallery descriptions
  const galleryImages = [
    {
      id: 'main',
      title: isTH ? 'มุมมองด้านหน้า (ปิดอยู่)' : 'Front View (Closed)',
      desc: isTH ? 'ลิ้นชักเก็บเงินสองชั้นเหล็กกล้าคาร์บอนขัดเรียบหรูหรา' : 'Carbon-steel dual-tier cash drawer in premium matte black'
    },
    {
      id: 'open-drawers',
      title: isTH ? 'มุมมองขณะเปิดกางออก' : 'Open View (Extended)',
      desc: isTH ? 'ช่องเหรียญ 6 ช่อง ช่องธนบัตร 8 ช่อง แบ่งสัดส่วนสะดวกสบาย' : '6 coin slots and 8 bill slots optimized for rapid change handling'
    },
    {
      id: 'terminal-setup',
      title: isTH ? 'การจัดเซ็ตคู่กับจอ POS' : 'POS Terminal Integration',
      desc: isTH ? 'ติดตั้งจอภาพทัชสกรีนซ้อนบนลิ้นชักได้อย่างประหยัดเนื้อที่สูงสุด' : 'Mount touch terminal monitors directly on top safely to save counter space'
    }
  ];

  // Interactive hardware pricing calculator states
  const [quantity, setQuantity] = useState(1);
  const [addPrinter, setAddPrinter] = useState(false);
  const [addScanner, setAddScanner] = useState(false);
  const [addStand, setAddStand] = useState(false);

  // Price points
  const BASE_PRICE = 3500;
  const PRINTER_PRICE = 1800;
  const SCANNER_PRICE = 1250;
  const STAND_PRICE = 650;

  // Calculate total price
  const getSubtotal = () => {
    let price = BASE_PRICE;
    if (addPrinter) price += PRINTER_PRICE;
    if (addScanner) price += SCANNER_PRICE;
    if (addStand) price += STAND_PRICE;
    return price * quantity;
  };

  // Video tutorial simulator state
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const startVideoPlay = () => {
    setVideoPlaying(true);
    setVideoProgress(0);
    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setVideoPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 150);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Product Showcase Header with Carousel & Order Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
            GrowStore Hardware
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight mt-3">
            {isTH ? 'สินค้าอาร์ดแวร์แนะนำของเรา' : 'Featured Hardware Store Products'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg relative overflow-hidden">
              
              {/* Main Active Image Box with Vector Visualizer */}
              <div className="h-72 sm:h-80 bg-slate-900 rounded-2xl flex items-center justify-center relative p-8 text-white select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-slate-800 opacity-90" />
                
                {/* Graphics */}
                <div className="relative w-full h-full flex flex-col justify-end items-center">
                  
                  {activeImageIdx === 0 && (
                    <motion.div 
                      key="img-0" 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-xs space-y-2 flex-1 flex flex-col justify-center"
                    >
                      {/* Heavy Steel Shell Front */}
                      <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 shadow-xl relative">
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-slate-400" />
                        </div>
                        <div className="w-16 h-1 bg-slate-900 rounded" />
                        <div className="mt-2 text-center text-[10px] text-slate-400 font-mono">CLOSED SECURE</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg h-14 border border-slate-700 shadow-md relative" />
                    </motion.div>
                  )}

                  {activeImageIdx === 1 && (
                    <motion.div 
                      key="img-1" 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-xs space-y-1 flex-1 flex flex-col justify-center"
                    >
                      {/* Dual Drawer Open state */}
                      <div className="bg-slate-700 rounded-t-lg h-10 border border-slate-600 relative">
                        <div className="absolute inset-x-2 bottom-0 h-4 bg-slate-950 flex justify-between items-center px-4 rounded-t">
                          <span className="text-[6px] text-orange-400 font-semibold">1000฿</span>
                          <span className="text-[6px] text-green-400 font-semibold">500฿</span>
                          <span className="text-[6px] text-blue-400 font-semibold">100฿</span>
                        </div>
                      </div>
                      {/* Open coin drawer */}
                      <div className="bg-slate-600 rounded-b-lg h-20 border border-slate-700 shadow-2xl relative translate-y-2 translate-x-1.5 flex items-center justify-around px-4 border border-slate-950">
                        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-[8px] font-bold text-slate-900 shadow-inner">10</div>
                        <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-800 shadow-inner">5</div>
                        <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-[8px] font-bold text-white shadow-inner">2</div>
                        <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-800 shadow-inner">1</div>
                      </div>
                    </motion.div>
                  )}

                  {activeImageIdx === 2 && (
                    <motion.div 
                      key="img-2" 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-xs flex flex-col items-center justify-center flex-1 space-y-1"
                    >
                      {/* Monitor sitting on top */}
                      <div className="w-32 h-20 bg-slate-800 border-2 border-slate-600 rounded-lg p-1 shadow-lg relative flex flex-col justify-between">
                        <div className="bg-blue-600 h-full rounded flex flex-col justify-between p-1">
                          <span className="text-[5px] text-white font-bold">GrowStore Terminal</span>
                          <div className="h-2 w-full bg-white/20 rounded-xs" />
                          <div className="flex justify-between items-center text-[6px] text-white">
                            <span>TOTAL:</span>
                            <span className="font-bold">1,450.00฿</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-2.5 h-6 bg-slate-600" />
                      <div className="bg-slate-700 rounded-lg p-2 w-48 border border-slate-600 shadow-md">
                        <div className="h-4 bg-slate-950 rounded flex justify-center items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1" />
                          <span className="text-[5px] text-slate-400">POS CONNECTED</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Gallery Subtitle panel */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 p-3 rounded-xl border border-white/5 backdrop-blur-xs">
                    <h3 className="text-xs font-bold text-white">{galleryImages[activeImageIdx].title}</h3>
                    <p className="text-[10px] text-slate-300 mt-0.5">{galleryImages[activeImageIdx].desc}</p>
                  </div>
                </div>
              </div>

              {/* Thumbnails switcher */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      activeImageIdx === idx 
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs' 
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider">Image {idx + 1}</span>
                    <span className="block text-[9px] font-semibold text-slate-500 truncate mt-0.5">{img.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-4 text-center text-xs font-semibold text-slate-600">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Shield className="w-5 h-5 text-emerald-500 mb-1" />
                <span>{isTH ? 'รับประกัน 1 ปีเต็ม' : '1 Year Warranty'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Truck className="w-5 h-5 text-blue-500 mb-1" />
                <span>{isTH ? 'จัดส่งฟรีทั่วประเทศ' : 'Free Delivery'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                <PackageCheck className="w-5 h-5 text-purple-500 mb-1" />
                <span>{isTH ? 'ตรวจเช็ค 100% ก่อนส่ง' : '100% QA Checked'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Interactive Pricing Calculator */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Best Seller
                </span>
                <span className="text-xs font-semibold text-slate-400">SKU: HW-DRW2T</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 leading-tight">
                {isTH ? 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น' : 'Automatic 2-Tier Cash Drawer'}
              </h2>
            </div>

            {/* Specifications bullets */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {isTH ? 'คุณสมบัติและสเปกพื้นฐาน' : 'Core Specifications'}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isTH ? 'ล็อกแยกชั้นอิสระจากกันอย่างสมบูรณ์ เพิ่มความปลอดภัยสูงสุด' : 'Independent dual-tier cylinder key locks'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isTH ? 'รองรับการเชื่อมต่อเครื่องพิมพ์สลิปพอร์ต RJ11 เด้งเปิดอัตโนมัติเมื่อพิมพ์' : 'RJ11 trigger interface compatible with receipt printers'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isTH ? 'โครงสร้างทำจากเหล็กกล้าคาร์บอนหนาพิเศษ แข็งแรง ทนแรงบดทับ' : 'Extra thick SECC carbon steel structural body'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isTH ? 'ขนาดกะทัดรัด (410 x 420 x 140 มม.) ประหยัดพื้นที่เคาน์เตอร์' : 'Compact dimension (410 x 420 x 140 mm) optimized'}</span>
                </li>
              </ul>
            </div>

            {/* Interactive Hardware Bundle Configurator */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTH ? 'เลือกอุปกรณ์ชุดเสริมเพื่อจัดเซ็ตสุดคุ้ม' : 'Customize Your POS Bundle Add-ons'}
              </h3>
              
              <div className="space-y-2.5">
                {/* Add-on 1 */}
                <button
                  onClick={() => setAddPrinter(!addPrinter)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    addPrinter 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={addPrinter} 
                      onChange={() => {}} // Handled by button onClick
                      className="rounded text-blue-600 border-slate-300 w-4 h-4" 
                    />
                    <div>
                      <span className="block text-xs font-bold">{isTH ? 'เครื่องพิมพ์ใบเสร็จความร้อน 58มม. (พอร์ต USB+Bluetooth)' : 'Thermal Receipt Printer 58mm'}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{isTH ? 'ไม่ต้องใช้หมึก เชื่อมสายแจ็ค RJ11 สั่งเปิดลิ้นชักทันที' : 'Inkless direct thermal printing, auto-triggers drawer opens'}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">+{PRINTER_PRICE.toLocaleString()} ฿</span>
                </button>

                {/* Add-on 2 */}
                <button
                  onClick={() => setAddScanner(!addScanner)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    addScanner 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={addScanner} 
                      onChange={() => {}} 
                      className="rounded text-blue-600 border-slate-300 w-4 h-4" 
                    />
                    <div>
                      <span className="block text-xs font-bold">{isTH ? 'เครื่องสแกนบาร์โค้ดไร้สายแบบมีแท่นวาง 1D/2D' : 'Wireless 2D Barcode Scanner + Cradle'}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{isTH ? 'สแกนคิวอาร์โค้ดบนจอมือถือและบาร์โค้ดสินค้าได้อย่างรวดเร็ว' : 'Scans screens, product barcodes & QR codes at lightning speed'}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">+{SCANNER_PRICE.toLocaleString()} ฿</span>
                </button>

                {/* Add-on 3 */}
                <button
                  onClick={() => setAddStand(!addStand)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    addStand 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={addStand} 
                      onChange={() => {}} 
                      className="rounded text-blue-600 border-slate-300 w-4 h-4" 
                    />
                    <div>
                      <span className="block text-xs font-bold">{isTH ? 'ขาตั้งแท็บเล็ตอลูมิเนียมเกรดพรีเมียม (หมุนได้ 360°)' : '360° Rotating Aluminum Tablet Stand'}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{isTH ? 'แข็งแรงทนทาน ล็อคความสูงและก้มเงยได้อิสระ วางไอแพดมั่นคง' : 'Perfect matching visual alignment, durable heavy-gauge base'}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">+{STAND_PRICE.toLocaleString()} ฿</span>
                </button>
              </div>
            </div>

            {/* Quantity Selector & Price Summary */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Quantity selectors */}
              <div className="flex items-center justify-between sm:justify-start space-x-4">
                <span className="text-xs font-bold text-slate-500">{isTH ? 'จำนวนชุด:' : 'Quantity:'}</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3.5 py-2 font-black text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3.5 py-2 font-black text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic Price Calculation display */}
              <div className="text-left sm:text-right">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isTH ? 'ราคาสุทธิรวม:' : 'Total net price:'}</span>
                <span className="block text-2xl font-sans font-black text-blue-600 mt-1">
                  {getSubtotal().toLocaleString()} ฿
                </span>
                <p className="text-[10px] text-slate-400 font-semibold">{isTH ? '*จัดส่งฟรี มีเก็บเงินปลายทาง' : '*Includes free delivery nationwide'}</p>
              </div>

            </div>

            {/* CTA Buy/Inquire Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>
                  {isTH ? 'สั่งซื้อ/สอบถามราคาผ่าน LINE สต๊าฟ (@Growstore)' : 'Order via LINE Chat Staff (@Growstore)'}
                </span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. รายละเอียด (Interactive Playback Video Demonstration) */}
      <section className="bg-slate-900 text-white py-16" id="product-video-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">
              {isTH ? 'วิดีโอสาธิตการใช้งานจริง' : 'Video Tutorial Demonstration'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight">
              {isTH ? 'วิธีการเปิดทำงานแบบออโต้เมื่อออกใบเสร็จ' : 'Automatic RJ11 Trigger Drawer Opening'}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <div className="aspect-video w-full relative flex items-center justify-center bg-slate-950">
              
              {/* Fake Interactive Video Streaming overlay */}
              {!videoPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4 text-center z-10">
                  <div className="absolute inset-0 bg-black/60" />
                  <button 
                    onClick={startVideoPlay}
                    className="relative w-20 h-20 rounded-full bg-blue-600 text-white hover:scale-110 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
                    id="play-demo-video-btn"
                  >
                    <Video className="w-8 h-8 fill-white ml-1" />
                  </button>
                  <div className="relative space-y-1">
                    <p className="font-bold text-sm">{isTH ? 'คลิกเพื่อทดสอบเล่นวิดีโอเดโมสั้น' : 'Click to simulate demo video playing'}</p>
                    <p className="text-xs text-slate-400">ความยาว: 1:45 นาที • แนะนำขั้นตอนการติดตั้ง</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-between items-center bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="text-xs font-mono">📡 SIMULATING STREAM: GrowStore_Setup.mp4</span>
                    <span className="text-xs text-green-400 font-bold flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1" />
                      PLAYING
                    </span>
                  </div>

                  {/* Animated Video contents using crisp styled markup */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-28 h-28">
                      {/* Stylized monitor and drawer opens */}
                      <rect x="25" y="10" width="50" height="30" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="40" x2="50" y2="50" stroke="#475569" strokeWidth="4" />
                      <rect x="10" y="50" width="80" height="15" rx="3" fill="#0f172a" />
                      {/* Pull out drawer with speed lines */}
                      <rect x="15" y="58" width="70" height="15" rx="2" fill="#334155" stroke="#f97316" strokeWidth="1" className="animate-drawer-open" />
                      {/* Coins jumping out */}
                      <circle cx="30" cy="54" r="2" fill="#facc15" className="animate-bounce" />
                      <circle cx="70" cy="54" r="2" fill="#facc15" className="animate-bounce" style={{ animationDelay: '200ms' }} />
                    </svg>
                    <p className="text-xs font-bold text-orange-400 mt-4 text-center">
                      {isTH ? 'ขั้นที่ 3: ระบบสั่งใบเสร็จพิมพ์เสร็จสิ้น ลิ้นชักเด้งออกออโต้!' : 'Step 3: Thermal Printing Completed. Drawer opens!'}
                    </p>
                  </div>

                  {/* Timeline bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-150" style={{ width: `${videoProgress}%` }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>00:{(Math.floor(videoProgress * 1.05)).toString().padStart(2, '0')}</span>
                      <span>01:45</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Static background placeholder representing video setup */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-8 text-center border-2 border-dashed border-slate-800">
                <div className="text-slate-500">
                  <Video className="w-12 h-12 mx-auto text-slate-600 mb-2" />
                  <span>GrowStore Hardware Demo Setup Clip</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. คุณสมบัติของสินค้า (Key Product Benefits Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            {isTH ? 'รายละเอียดคุณสมบัติสำคัญ' : 'Detailed Product Advantages'}
          </h2>
          <p className="text-slate-500 text-sm">
            {isTH ? 'เหตุผลทำไมร้านค้าส่วนใหญ่จึงเลือกใช้ฮาร์ดแวร์ GrowStore' : 'Why retail professionals choose our cash drawers.'}
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Card 1: Alternating Left-Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                LOCK SEGREGATION
              </span>
              <h3 className="text-2xl font-bold font-sans text-slate-900">
                {isTH ? 'คุณสมบัติล็อกแยกชั้น สองกุญแจคู่ขนาน' : 'Independent Dual Cylinder Locks'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isTH 
                  ? 'ระบบถูกออกแบบมาสำหรับร้านที่มีการสลับพนักงาน (Cashier shifts) โดยผู้จัดการสามารถถือกุญแจคุมกล่องเก็บเงินชั้นล่าง (สำรองเงินทอนขนาดใหญ่/เอกสารสำคัญ) ในขณะที่พนักงานขายหน้าร้านคุมเฉพาะการเด้งเปิดลิ้นชักชั้นบน ช่วยเพิ่มความรัดกุมในการตรวจสอบยอดทุจริตได้อย่างมีประสิทธิภาพ' 
                  : 'Design optimized for supervisor shifts. Store managers can secure large reserve cash and internal files in the lower lock box, while checkout staff only operate the upper tray, restricting cash access.'}
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600">
                  <Layers className="w-10 h-10" />
                </div>
                <div className="text-slate-800 text-sm font-bold">
                  {isTH ? 'โครงสร้างแยกสัดส่วนการเงินทอน' : 'Segmented Double Cash Partition'}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Reverse Alternating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-64 flex items-center justify-center md:order-last">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="w-10 h-10" />
                </div>
                <div className="text-slate-800 text-sm font-bold">
                  {isTH ? 'ระบบต้านทานไฟช็อตและไฟสั่นในลิ้นชัก' : 'Surge Protection Trigger Mechanism'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                SAFETY CIRCUIT
              </span>
              <h3 className="text-2xl font-bold font-sans text-slate-900">
                {isTH ? 'วงจรป้องกันกระแสไฟช็อตย้อนกลับ' : 'Built-in Solenoid Protection Circuit'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isTH 
                  ? 'ต่างจากลิ้นชักราคาถูกทั่วไป ลิ้นชัก GrowStore ติดตั้งวงจร Solenoid และ Diode ป้องกันไฟฟ้ากระชากเหนี่ยวนำย้อนกลับ (EMF Flyback) ป้องกันไม่ให้พอร์ตเครื่องพิมพ์ใบเสร็จหรือพอร์ตบอร์ดควบคุม POS พังเสียหายจากความถี่กระแสไฟสลับ' 
                  : 'Unlike cheap alternatives, our drawer trigger boards contain specific flyback diode circuits that block electromagnetic back-EMF spikes, shielding your thermal receipt printers and POS computer boards.'}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
