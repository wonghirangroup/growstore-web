/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActivePage } from '../types';
import imgS1 from '../../images/s1.png';
import imgS2 from '../../images/s2.png';
import imgS3 from '../../images/s3.png';




interface ProductsViewProps {
  language: 'TH' | 'EN';
  setCurrentPage: (page: ActivePage) => void;
}

export default function ProductsView({ language }: ProductsViewProps) {
  const isTH = language === 'TH';
  const [activeImg, setActiveImg] = useState(0);
  const thumbs = [imgS1, imgS2, imgS3];

  const features = [
    {
      img: imgS3,
      title: isTH ? 'คุณสมบัติของการลิ้นชัก' : 'Cash Drawer Feature',
      desc: isTH
        ? 'ล็อกแยกชั้นอิสระจากกัน เพิ่มความปลอดภัยสูงสุด รองรับการใช้งานในร้านที่มีพนักงานหลายคน'
        : 'Independent dual-tier locks for maximum security, suitable for multi-staff stores.',
      reverse: false,
    },
    {
      img: imgS1,
      title: isTH ? 'คุณสมบัติของการลิ้นชัก' : 'Cash Drawer Feature',
      desc: isTH
        ? 'รองรับการเชื่อมต่อเครื่องพิมพ์สลิป เปิดอัตโนมัติเมื่อพิมพ์ ไม่ต้องกดมือ ลดความผิดพลาด'
        : 'Compatible with receipt printers, auto-opens on print, reduces human error.',
      reverse: true,
    },
    {
      img: imgS2,
      title: isTH ? 'คุณสมบัติของการลิ้นชัก' : 'Cash Drawer Feature',
      desc: isTH
        ? 'โครงสร้างเหล็กหนาพิเศษ ทนทาน รองรับแรงกดทับได้ดี ขนาดกะทัดรัด ประหยัดพื้นที่เคาน์เตอร์'
        : 'Thick steel body, durable under pressure, compact design saves counter space.',
      reverse: false,
    },
  ];

  return (
    <div>

      {/* 1. สินค้าของเรา */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <h2 className="text-4xl font-semibold text-center mb-10" style={{ color: '#2DA6DD' }}>
          {isTH ? 'สินค้าของเรา' : 'Our Products'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: image gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <img
                src={thumbs[activeImg]}
                alt="product"
                className="w-full object-contain"
                style={{ height: 280 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {thumbs.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${activeImg === idx ? 'border-[#2DA6DD]' : 'border-slate-200'}`}
                >
                  <img src={src} alt={`thumb-${idx}`} className="w-full object-contain" style={{ height: 72 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="space-y-5">
            <h3 className="text-2xl font-black text-[#131C45]">
              {isTH ? 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น' : 'Automatic 2-Tier Cash Drawer'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {[
                isTH ? 'ล็อกแยกชั้น อิสระจากกัน เพิ่มความปลอดภัย' : 'Independent dual-tier cylinder key locks',
                isTH ? 'รองรับการเชื่อมต่อเครื่องพิมพ์สลิป เปิดอัตโนมัติเมื่อพิมพ์' : 'Auto-opens via RJ11 receipt printer trigger',
                isTH ? 'โครงสร้างเหล็กหนาพิเศษ ทนทาน รองรับแรงกดทับได้ดี' : 'Extra thick carbon steel structural body',
                isTH ? 'ขนาดกะทัดรัด ประหยัดพื้นที่เคาน์เตอร์' : 'Compact dimension, optimized for counters',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#131C45] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <hr className="border-slate-200" />
            <p className="text-3xl font-black text-[#131C45] text-center py-4">
              {isTH ? 'ราคา XXX,XXX บาท' : 'Price XXX,XXX THB'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Video section */}
      <section className="bg-[#131C45] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-8 text-white">
            {isTH ? 'วีดีโอสินค้า' : 'Product Video'}
          </h2>
          <div
            className="rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center gap-5"
            style={{ aspectRatio: '16/9' }}
          >
            <div className="w-20 h-20 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white ml-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="text-white/50 text-sm tracking-wide">
              {isTH ? 'วีดีโอสินค้า (เร็วๆ นี้)' : 'Product Video (Coming Soon)'}
            </span>
          </div>
        </div>
      </section>

      {/* 3. คุณสมบัติ */}
      <section className="pb-16">
        <h2 className="text-4xl font-semibold text-center pt-12 pb-10" style={{ color: '#2DA6DD' }}>
          {isTH ? 'คุณสมบัติ' : 'Specifications'}
        </h2>

        {features.map((feat, idx) => (
          <div
            key={idx}
            className={`${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
          >
            <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${feat.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <img
                src={feat.img}
                alt={feat.title}
                className="w-full rounded-2xl object-contain"
                style={{ maxHeight: 300 }}
              />
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#131C45]">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. CTA LINE */}
      <section className="bg-[#131C45] py-14">
        <div className="flex justify-center">
          <a
            href="https://line.me/R/ti/p/@growstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b34d] transition-colors text-white font-bold text-xl px-12 py-4 shadow-lg"
            style={{ borderRadius: 15 }}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            {isTH ? 'สนใจติดต่อ' : 'Contact Us'}
          </a>
        </div>
      </section>

    </div>
  );
}
