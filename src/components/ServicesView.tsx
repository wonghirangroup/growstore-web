import { Phone } from 'lucide-react';

interface ServicesViewProps {
  language: 'TH' | 'EN';
}

export default function ServicesView({ language }: ServicesViewProps) {
  const isTH = language === 'TH';

  const steps = isTH
    ? [
        'ลงทะเบียนบัญชีเข้าใช้ระบบ GrowStore (สามารถใช้เวอร์ชันฟรีได้)',
        'ไปที่หน้าเมนู "ตั้งค่าหน้าร้าน" ใส่โลโก้ร้านค้า ชื่อ และเบอร์ติดต่อ',
        'เลือกหัวข้อ "กลุ่มสินค้า" เพื่อกำหนดหมวดหมู่ เช่น เครื่องดื่ม อาหาร',
        'กดเพิ่มตัวเลือกสินค้าพร้อมระบุจำนวนสต็อกและราคาขาย แล้วเริ่มขายได้เลย',
      ]
    : [
        'Sign up for a GrowStore POS account (free tier available).',
        'Go to "Store Settings" — enter your logo, brand name and contact details.',
        'Define product categories such as Beverages, Food, and Supplies.',
        'Add products with stock and pricing, then start selling immediately.',
      ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-14 space-y-10">

      {/* วิธีใช้งาน */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-[#131C45]">
          {isTH ? 'วิธีใช้งาน' : 'How to Use'}
        </h2>

        {/* YouTube embed */}
        <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <iframe
            src="https://www.youtube.com/embed/JCGLR8AJOiI"
            title="GrowStore Product Video"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* ขั้นตอนการใช้งาน */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: '#EC6F44' }}>
          {isTH ? 'ขั้นตอนการใช้งาน' : 'Usage Steps'}
        </h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
              <span className="font-semibold flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ติดต่อ–สอบถาม */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: '#EC6F44' }}>
          {isTH ? 'ติดต่อ–สอบถาม 24 ชั่วโมง' : 'Contact & Support 24 Hours'}
        </h2>

        <div className="flex items-center gap-2.5 text-slate-700 text-sm">
          <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>063-972-2228</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 text-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="#06C755">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span>@Growstore</span>
        </div>
      </section>

    </div>
  );
}
