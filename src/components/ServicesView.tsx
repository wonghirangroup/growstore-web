import { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Terminal,
  HelpCircle,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesViewProps {
  language: 'TH' | 'EN';
}

interface GuideItem {
  id: string;
  category: 'setup' | 'hardware' | 'inventory' | 'reports';
  title: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export default function ServicesView({ language }: ServicesViewProps) {
  const isTH = language === 'TH';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'setup' | 'hardware' | 'inventory' | 'reports'>('all');
  const [printerDiagnosticStatus, setPrinterDiagnosticStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  const [activeDiagnosticStep, setActiveDiagnosticStep] = useState(0);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);

  const CATEGORIES = [
    { id: 'all', label: isTH ? 'ทั้งหมด' : 'All' },
    { id: 'setup', label: isTH ? 'เริ่มต้นใช้งาน' : 'Getting Started' },
    { id: 'hardware', label: isTH ? 'ฮาร์ดแวร์ & ลิ้นชัก' : 'Hardware Setup' },
    { id: 'inventory', label: isTH ? 'จัดการคลังสินค้า' : 'Inventory' },
    { id: 'reports', label: isTH ? 'รายงาน & AI' : 'Reports & AI' },
  ] as const;

  const GUIDES: GuideItem[] = [
    {
      id: 'g1',
      category: 'setup',
      title: isTH ? 'การเริ่มต้นใช้งาน GrowStore POS ใน 5 นาที' : 'Setting up GrowStore POS in 5 minutes',
      excerpt: isTH ? 'สอนเชื่อมต่อระบบ บัญชีพนักงาน ตั้งค่าชื่อร้านค้า และเพิ่มสินค้าหมวดหมู่แรกของคุณ' : 'Connect accounts, configure shop brand and list your first items easily.',
      readTime: '3 นาที',
      content: [
        isTH ? 'ขั้นตอนที่ 1: ลงทะเบียนบัญชีเข้าใช้ระบบ GrowStore (สามารถใช้เวอร์ชันฟรีได้)' : 'Step 1: Sign up for a GrowStore POS account.',
        isTH ? 'ขั้นตอนที่ 2: ไปที่หน้าเมนู "ตั้งค่าหน้าร้าน" ใส่โลโก้ร้านค้า ชื่อ และเบอร์ติดต่อ' : 'Step 2: Navigate to store config. Define logo, brand and contact details.',
        isTH ? 'ขั้นตอนที่ 3: เลือกหัวข้อ "กลุ่มสินค้า" เพื่อกำหนดหมวดหมู่ เช่น เครื่องดื่ม อาหาร' : 'Step 3: Define product groups (Drinks, Food, Supplies).',
        isTH ? 'ขั้นตอนที่ 4: กดเพิ่มตัวเลือกสินค้าเดี่ยว พร้อมระบุจำนวนสต็อกเริ่มต้นและราคาขาย' : 'Step 4: Create single product items, assign initial stock and price.',
        isTH ? 'ขั้นตอนที่ 5: เริ่มต้นกดเปิดหน้า "หน้าร้าน POS" และขายบิลแรกของคุณได้ทันที!' : 'Step 5: Go to POS screen and process your first transaction!'
      ]
    },
    {
      id: 'g2',
      category: 'hardware',
      title: isTH ? 'วิธีการเชื่อมโยงเครื่องพิมพ์สลิปและลิ้นชัก' : 'Interfacing Receipt Printers & Drawers',
      excerpt: isTH ? 'ขั้นตอนเชื่อมพอร์ต RJ11 ของลิ้นชักเข้าเครื่องพิมพ์ใบเสร็จ สั่งให้ลิ้นชักเด้งเปิดออโต้เมื่อพิมพ์บิลสำเร็จ' : 'Guide for connecting cash drawer RJ11 ports directly to thermal printers.',
      readTime: '5 นาที',
      content: [
        isTH ? 'ขั้นตอนที่ 1: เสียบแจ็คหัวโทรศัพท์ RJ11 ของลิ้นชักเข้าหลังพอร์ต RJ11 ของเครื่องพิมพ์' : 'Step 1: Insert the RJ11 cable from drawer to back of receipt printer.',
        isTH ? 'ขั้นตอนที่ 2: เชื่อมเครื่องพิมพ์สลิปเข้ากับอุปกรณ์แท็บเล็ต/เดสก์ท็อปผ่าน USB หรือบลูทูธ' : 'Step 2: Connect the thermal printer to your POS screen via USB/Bluetooth.',
        isTH ? 'ขั้นตอนที่ 3: ในระบบ GrowStore เข้าเมนู "ตั้งค่าอุปกรณ์" เลือกเปิดโมดูล "เด้งลิ้นชักอัตโนมัติ"' : 'Step 3: Go to GrowStore app config. Turn on "Auto Open Cash Drawer".',
        isTH ? 'ขั้นตอนที่ 4: ทดสอบสั่งพิมพ์ "ใบเสร็จทดลอง" เพื่อเช็คการส่งกระแสไฟกระตุ้นวงจร' : 'Step 4: Press Diagnostic to test automatic pulse triggers.'
      ]
    },
    {
      id: 'g3',
      category: 'inventory',
      title: isTH ? 'การจัดการตัดสต็อกสินค้าแบ่งขายแยกหน่วย' : 'Handling Nested Product Stock & Units',
      excerpt: isTH ? 'วิธีกำหนดสัดส่วนหน่วย ลัง, แพ็ค, ชิ้น ให้ตัดยอดสต็อกได้อย่างสมบูรณ์แบบ' : 'Set up relationship mappings between boxes, packs, and loose items.',
      readTime: '4 นาที',
      content: [
        isTH ? 'ขั้นตอนที่ 1: เพิ่มสินค้าแม่ (เช่น เครื่องดื่มโคล่าแบบกล่องใหญ่ บรรจุ 24 ชิ้น)' : 'Step 1: Create parent item (e.g. Coke Carton, contains 24 cans).',
        isTH ? 'ขั้นตอนที่ 2: เพิ่มสินค้าลูก (โค้กแบบกระป๋องแยกเดี่ยว)' : 'Step 2: Create child item (Coke single unit can).',
        isTH ? 'ขั้นตอนที่ 3: ในช่องตั้งค่าหน่วย ระบุมุมมองสัดส่วน 1 กล่อง = 24 ชิ้นเดี่ยว' : 'Step 3: In relationship mappings, declare 1 Carton = 24 Can units.',
        isTH ? 'ขั้นตอนที่ 4: เมื่อทำการขายปลีกกระป๋อง ระบบจะหักย่อยเศษสต็อกอัตโนมัติ' : 'Step 4: When selling single cans, parent stock automatically subtracts correctly.'
      ]
    },
    {
      id: 'g4',
      category: 'reports',
      title: isTH ? 'การเปิดใช้งาน AI คาดการณ์ยอดขายและของใกล้หมด' : 'Activating Sales Predictor AI Module',
      excerpt: isTH ? 'อธิบายการเปิดระบบอัจฉริยะวิเคราะห์สินค้าหมดสต็อกและทำนายช่วงเวลาที่ลูกค้าซื้อด้วย AI' : 'Utilize integrated neural algorithms to forecast inventory replenishment.',
      readTime: '6 นาที',
      content: [
        isTH ? 'ขั้นตอนที่ 1: ตรวจสอบระดับแพ็คเกจระบบ GrowStore ของคุณให้อยู่ในเทียร์ L หรือ Pro' : 'Step 1: Verify subscription status is L or Pro tier.',
        isTH ? 'ขั้นตอนที่ 2: ไปที่แผง "AI & Forecast" กดสวิตช์เปิดใช้งานโมดูลอัจฉริยะ' : 'Step 2: Go to AI settings, toggle on prediction models.',
        isTH ? 'ขั้นตอนที่ 3: ระบบจะวิเคราะห์ประวัติยอดขายย้อนหลังตั้งแต่ 30 วันเป็นต้นไป' : 'Step 3: Algorithms analyze transactions from last 30 days.',
        isTH ? 'ขั้นตอนที่ 4: แสดงแผนภาพพยากรณ์สินค้าขายดี ยอดสต็อกที่ควรตุน และสินค้าใกล้หมดสต็อก' : 'Step 4: Get detailed graphs on items needing restock or seasonal peaks.'
      ]
    }
  ];

  const handleStartDiagnostic = () => {
    setPrinterDiagnosticStatus('checking');
    setActiveDiagnosticStep(1);
    setTimeout(() => {
      setActiveDiagnosticStep(2);
      setTimeout(() => {
        setActiveDiagnosticStep(3);
        setTimeout(() => {
          setPrinterDiagnosticStatus('success');
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const filteredGuides = GUIDES.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeGuide = GUIDES.find(g => g.id === activeGuideId);

  return (
    <div className="space-y-16 pb-20">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {isTH ? 'บริการของเรา' : 'Our Services'}
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
            {isTH ? 'บริการติดตั้งและสนับสนุนระบบ POS' : 'POS Installation & Support Services'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isTH ? 'ค้นหาบทเรียนการใช้งาน วิธีตั้งค่า และระบบตรวจสอบจากทีมวิศวกร' : 'Learn setup tricks, inventory methods and diagnostics tools.'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isTH ? 'ค้นหาบริการ เช่น สต็อก, เครื่องพิมพ์, AI...' : 'Search services...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 outline-hidden"
            />
          </div>
          <div className="flex overflow-x-auto pb-1.5 space-x-2 scrollbar-none border-t border-slate-50 pt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGuides.map((guide) => (
              <motion.div
                layout
                key={guide.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{guide.category.toUpperCase()} GUIDE</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">{guide.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">{guide.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{guide.excerpt}</p>
                </div>
                <div className="pt-5 border-t border-slate-50 mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setActiveGuideId(guide.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{isTH ? 'เปิดอ่านรายละเอียด' : 'Read Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-300">🏪 GrowStore Support</span>
                </div>
              </motion.div>
            ))}
            {filteredGuides.length === 0 && (
              <div className="col-span-2 py-12 text-center text-slate-400">
                <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">{isTH ? 'ไม่พบบริการที่ตรงกับการค้นหา' : 'No matching services found'}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Diagnostic Tool */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest border border-sky-500/10">
              <Terminal className="w-3.5 h-3.5" />
              <span>Diagnostic Sandbox Tool</span>
            </div>
            <h3 className="text-xl font-bold font-sans">
              {isTH ? 'ระบบจำลองทดสอบเชื่อมต่อเครื่องพิมพ์สลิปและลิ้นชัก' : 'Printer & Drawer Connection Diagnostics'}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {isTH
                ? 'จำลองทดสอบเครื่องพิมพ์ความร้อนแบบเรียลไทม์เพื่อส่งสัญญาณตรวจสอบวงจร RJ11 ของลิ้นชักอัตโนมัติ'
                : 'Simulate thermal printer status check. Test if the drawer triggers correctly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-t border-slate-800 pt-6">
            <div className="md:col-span-5 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'ขั้นตอนการจำลอง:' : 'Testing Controls:'}</span>
              <div className="space-y-2 text-xs">
                {[
                  isTH ? 'เช็คการจ่ายกระแสไฟเข้า (Volt)' : 'Verify EMF trigger voltage',
                  isTH ? 'ส่งโค้ดสัญญาณ ESC/POS' : 'Pulse ESC/POS drawer kick code',
                  isTH ? 'ตรวจเช็คสปริงของลิ้นชัก' : 'Sense solenoid trigger feedback',
                ].map((label, i) => (
                  <div key={i} className={`flex items-center space-x-2.5 p-3 rounded-xl border ${
                    printerDiagnosticStatus === 'checking' && activeDiagnosticStep === i + 1
                      ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-950/40 text-slate-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <button
                disabled={printerDiagnosticStatus === 'checking'}
                onClick={handleStartDiagnostic}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${printerDiagnosticStatus === 'checking' ? 'animate-spin' : ''}`} />
                <span>{isTH ? 'คลิกทดสอบยิงสัญญาณเปิดลิ้นชัก' : 'Send Test Kick Signal'}</span>
              </button>
            </div>

            <div className="md:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 h-64 flex flex-col justify-between font-mono">
              <div className="space-y-1 text-[10px] text-slate-400 overflow-y-auto flex-1">
                <p className="text-slate-500">&gt; Initializing test bench v2.1...</p>
                <p className="text-slate-500">&gt; Port: virtual_COM3_Printer</p>
                {printerDiagnosticStatus === 'checking' && (
                  <>
                    {activeDiagnosticStep >= 1 && <p className="text-amber-400">&gt; [CHECK] Checking solenoid input: 24V supply... OK</p>}
                    {activeDiagnosticStep >= 2 && <p className="text-amber-400">&gt; [TRIGGER] Sending ESC/POS sequence: "\x1B\x70\x00\x19\xFA"</p>}
                    {activeDiagnosticStep >= 3 && <p className="text-amber-400">&gt; [SENSE] Awaiting drawer status microswitch loop...</p>}
                  </>
                )}
                {printerDiagnosticStatus === 'success' && (
                  <>
                    <p className="text-amber-400">&gt; [CHECK] Checking solenoid input: 24V supply... OK</p>
                    <p className="text-amber-400">&gt; [TRIGGER] Sending ESC/POS sequence: "\x1B\x70\x00\x19\xFA"</p>
                    <p className="text-amber-400">&gt; [SENSE] Solenoid triggered. Microswitch feedback: OPEN</p>
                    <p className="text-green-400 font-bold">&gt; [SUCCESS] Connection established! Drawer kicked successfully!</p>
                  </>
                )}
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Diagnostics:</span>
                {printerDiagnosticStatus === 'idle' && <span className="text-slate-400 font-bold">IDLE / READY</span>}
                {printerDiagnosticStatus === 'checking' && <span className="text-amber-400 font-bold animate-pulse">TESTING TRIGGER...</span>}
                {printerDiagnosticStatus === 'success' && <span className="text-green-400 font-black">TEST PASSED (OK)</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Reading Modal */}
      <AnimatePresence>
        {activeGuideId && activeGuide && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span className="font-sans font-bold text-sm truncate max-w-[280px]">{activeGuide.title}</span>
                </div>
                <button onClick={() => setActiveGuideId(null)} className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer text-slate-300">✕</button>
              </div>
              <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{activeGuide.category} MODULE</span>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{activeGuide.title}</h3>
                </div>
                <div className="space-y-4">
                  {activeGuide.content.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-700 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveGuideId(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  {isTH ? 'ปิดหน้าต่างการอ่าน' : 'Close Article'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
