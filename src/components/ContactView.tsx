/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';

interface ContactViewProps {
  language: 'TH' | 'EN';
}

export default function ContactView({ language }: ContactViewProps) {
  const isTH = language === 'TH';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/35 text-sm outline-none focus:border-[#EC6F44]/60 transition-colors';

  return (
    <div>
      {/* Section 1: Contact info + form */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-stretch">

          {/* Left: Contact info */}
          <div className="flex flex-col gap-5 pt-2">
            <h2 className="text-4xl font-bold" style={{ color: '#EC6F44' }}>
              {isTH ? 'ติดต่อเรา' : 'Contact Us'}
            </h2>

            <p className="text-slate-600 text-xl leading-relaxed">
              92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง<br />
              จ.นครราชสีมา 30000
            </p>

            <div className="flex items-center gap-2.5 text-slate-600 text-sm">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>063-972-2228</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 text-sm">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Growstore@gmail.com</span>
            </div>

            <hr className="border-slate-200" />

            {/* LINE button */}
            <a
              href="https://line.me/R/ti/p/@growstore"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b34d] transition-colors text-white font-bold px-7 py-3 rounded-xl text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              {isTH ? 'ติดต่อเรา' : 'Contact via LINE'}
            </a>

            {/* Map — flex-1 ทำให้ยืดเต็มพื้นที่ที่เหลือ */}
            <div className="rounded-2xl overflow-hidden flex-1 min-h-[200px]">
              <iframe
                src="https://maps.google.com/maps?q=92/1+%E0%B8%96.%E0%B8%9B%E0%B8%B1%E0%B8%81%E0%B8%98%E0%B8%87%E0%B8%8A%E0%B8%B1%E0%B8%A2+%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AA%E0%B8%B5%E0%B8%A1%E0%B8%B2&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GrowStore Location"
              />
            </div>
          </div>

          {/* Right: Form card */}
          <div className="bg-[#131C45] rounded-2xl p-8 space-y-5">
            <h3 className="text-white text-xl font-bold">
              {isTH ? 'ฝากข้อความถึงเรา' : 'Send Us a Message'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  {isTH ? 'ชื่อ-นามสกุล' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isTH ? 'กรุณาใส่ชื่อ-นามสกุล' : 'Enter your full name'}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  {isTH ? 'อีเมล' : 'Email'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={isTH ? 'กรุณาใส่อีเมล' : 'Enter your email'}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  {isTH ? 'เบอร์โทรศัพท์' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={isTH ? 'กรุณาใส่เบอร์โทรศัพท์' : 'Enter your phone number'}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  {isTH ? 'ข้อความ' : 'Message'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isTH ? 'กรุณาใส่ข้อความ' : 'Enter your message'}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting || sent}
                className="w-full py-3 bg-[#EC6F44] hover:bg-[#d4623a] disabled:opacity-60 transition-colors text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {sent
                  ? (isTH ? 'ส่งเรียบร้อยแล้ว!' : 'Sent!')
                  : submitting
                  ? (isTH ? 'กำลังส่ง...' : 'Sending...')
                  : (isTH ? 'ส่งข้อความ' : 'Send Message')}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
