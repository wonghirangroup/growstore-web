/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Check, 
  Sparkles, 
  Clock, 
  Star, 
  User, 
  HeartHandshake,
  Locate
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactViewProps {
  language: 'TH' | 'EN';
}

interface SubmittedMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  timestamp: string;
  botReply?: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coords: { x: number; y: number };
}

export default function ContactView({ language }: ContactViewProps) {
  const isTH = language === 'TH';

  // Submission form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('sales');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // local messages history log
  const [messagesList, setMessagesList] = useState<SubmittedMessage[]>([
    {
      id: 'init-1',
      name: isTH ? 'นลินี แสนสุข' : 'Nalinee Sansook',
      email: 'nalinee@example.com',
      topic: 'sales',
      message: isTH ? 'สนใจอยากติดตั้งชุด POS ที่ร้านกาแฟ ขนาดเล็ก ในเมืองนครราชสีมา มีบริการเข้าไปดูหน้างานไหมคะ?' : 'Interested in small cafe POS setup in Korat district. Do you offer site visits?',
      timestamp: '2026-06-28 14:22',
      botReply: isTH 
        ? 'สวัสดีค่ะคุณนลินี ทีมงานฝ่ายเทคนิคของ GrowStore มีทีมงานแสตนด์บายดูแลหน้าร้านเขต นครราชสีมา ค่ะ เจ้าหน้าที่ฝ่ายขายจะติดต่อกลับทางอีเมลเพื่อทำเรื่องนัดหมายนะคะ ขอบคุณค่ะ' 
        : 'Hello Nalinee, our Korat engineering team is available. Sales representatives will contact you via email shortly.'
    }
  ]);

  // Branch Outlets State
  const [selectedBranchId, setSelectedBranchId] = useState('korat-hq');

  const BRANCHES: Branch[] = [
    {
      id: 'korat-hq',
      name: isTH ? 'สาขาใหญ่ นครราชสีมา (HQ)' : 'Korat Main Headquarters',
      address: isTH 
        ? '92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000 (ข้างปั๊ม ปตท. ทางเข้าเมือง)' 
        : '92/1 Pak Thong Chai Rd, Nai Mueang, Mueang, Nakhon Ratchasima 30000',
      phone: '082-1492753',
      hours: isTH ? 'ทุกวัน: 08:00 - 18:00 น.' : 'Daily: 08:00 AM - 06:00 PM',
      coords: { x: 50, y: 55 }
    },
    {
      id: 'bangkok-hub',
      name: isTH ? 'สาขา กรุงเทพฯ-สุทธิสาร' : 'Bangkok Suthisan Center',
      address: isTH 
        ? '540 ถ.สุทธิสารวินิจฉัย แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400' 
        : '540 Suthisarn Rd, Din Daeng, Bangkok 10400',
      phone: '082-1492754',
      hours: isTH ? 'จันทร์ - เสาร์: 09:00 - 18:00 น.' : 'Mon - Sat: 09:00 AM - 06:00 PM',
      coords: { x: 44, y: 72 }
    },
    {
      id: 'khonkaen-hub',
      name: isTH ? 'สาขา ขอนแก่น-กัลปพฤกษ์' : 'Khon Kaen Hub',
      address: isTH 
        ? '122 ถ.มะลิวัลย์ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000' 
        : '122 Maliwan Rd, Nai Mueang, Khon Kaen 40000',
      phone: '082-1492755',
      hours: isTH ? 'ทุกวัน: 09:00 - 17:00 น.' : 'Daily: 09:00 AM - 05:00 PM',
      coords: { x: 65, y: 35 }
    }
  ];

  const selectedBranch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];

  // Customer Satisfaction poll state
  const [votedScore, setVotedScore] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState({ 5: 142, 4: 38, 3: 12, 2: 3, 1: 1 });

  const handleSatisfactionVote = (score: number) => {
    if (votedScore) return; // Only vote once per session
    setVotedScore(score);
    setPollVotes(prev => ({
      ...prev,
      [score]: prev[score as keyof typeof prev] + 1
    }));
  };

  const getTotalVotes = () => (Object.values(pollVotes) as number[]).reduce((a, b) => a + b, 0);

  // Handle message submission
  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert(isTH ? 'กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่ง' : 'Please fill in all details');
      return;
    }

    setSubmitting(true);

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsgId = `user-${Math.random().toString(36).substring(2, 7)}`;
    const newMsg: SubmittedMessage = {
      id: newMsgId,
      name,
      email,
      topic,
      message,
      timestamp
    };

    setTimeout(() => {
      // Add user message to state
      setMessagesList(prev => [newMsg, ...prev]);
      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');

      // Simulate bot typing response
      setTimeout(() => {
        setMessagesList(prev => prev.map(m => {
          if (m.id === newMsgId) {
            return {
              ...m,
              botReply: isTH 
                ? `สวัสดีค่ะคุณ ${name} ทีมงานสตาฟ GrowStore ได้รับข้อความทางด้าน "${topic === 'sales' ? 'ฝ่ายขายและราคา' : 'ฝ่ายเทคนิค/บริการ'}" เรียบร้อยแล้วค่ะ สัญญาณวิทยุและบอทกำลังจัดส่งเรื่องให้ทีมแอดมินติดต่อกลับอย่างเร่งด่วนค่ะ!` 
                : `Thank you ${name}! We have received your query regarding ${topic} support. A tech support engineer will respond within 2 hours.`
            };
          }
          return m;
        }));
      }, 2000);

    }, 1200);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Header with Contact details cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Connect With Us
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
            {isTH ? 'ช่องทางการติดต่อฝ่ายบริการลูกค้า' : 'Get in Touch with GrowStore Support'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isTH ? 'หากคุณมีคำถามเรื่องบริการ ทีมแอดมินของเราพร้อมให้คำแนะนำ 24 ชั่วโมง' : 'Our customer support channels are standing by.'}
          </p>
        </div>

        {/* Support contacts cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between items-center space-y-4">
            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-full">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{isTH ? 'สายด่วนฝ่ายบริการ' : 'Hotline Call'}</h3>
              <p className="text-xs text-slate-400 mt-1">{isTH ? 'โทรติดต่อสอบถามข้อมูลสด' : 'Real-time sales support'}</p>
              <a href="tel:082-149-2753" className="block text-base font-extrabold text-blue-600 mt-2">082-1492753</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between items-center space-y-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-full">
              <MessageCircle className="w-6 h-6 fill-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{isTH ? 'Line Official Account' : 'LINE Support'}</h3>
              <p className="text-xs text-slate-400 mt-1">{isTH ? 'แชทพิมพ์แอดไลน์คุยไว' : 'Fast text chat support'}</p>
              <a href="https://line.me" target="_blank" rel="noreferrer" className="block text-base font-extrabold text-emerald-600 mt-2">@Growstore</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between items-center space-y-4">
            <div className="p-3.5 bg-sky-50 text-sky-600 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{isTH ? 'อีเมลฝ่ายเทคนิค' : 'Official Email'}</h3>
              <p className="text-xs text-slate-400 mt-1">{isTH ? 'ส่งขอใบเสนอราคาพัสดุ' : 'Request bulk quotations'}</p>
              <a href="mailto:Growstore@gmail.com" className="block text-sm font-extrabold text-slate-700 mt-2 hover:text-blue-600">Growstore@gmail.com</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between items-center space-y-4">
            <div className="p-3.5 bg-orange-50 text-orange-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{isTH ? 'เวลาเปิดทำการสำนักงาน' : 'Operating Hours'}</h3>
              <p className="text-xs text-slate-400 mt-1">{isTH ? 'เข้าชมฮาร์ดแวร์จริงที่ออฟฟิศ' : 'Visit HQ demo center'}</p>
              <span className="block text-xs font-bold text-slate-800 mt-3">{isTH ? 'ทุกวัน: 08:00 - 18:00 น.' : 'Daily: 8 AM - 6 PM'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Map Branches Locator (Vector map representation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-sans font-black text-slate-900 tracking-tight">
              {isTH ? 'สำนักงานสาขาและคลังสินค้า GrowStore' : 'Find Our Local Branches & Warehouse'}
            </h2>
            <p className="text-slate-500 text-xs">
              {isTH ? 'คลิกที่จุดวงกลมบนแผนที่จำลองด้านขวาเพื่อสลับรายละเอียดที่ตั้งพอร์ตจัดเก็บ' : 'Click coordinates pins on mock locator map to view address details.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Address details box */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Active Outlet Details
                </span>
                
                <h3 className="text-xl font-bold text-slate-900">{selectedBranch.name}</h3>
                
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{selectedBranch.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedBranch.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{selectedBranch.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => alert(isTH ? `เปิดแผนที่นำทางไปยัง ${selectedBranch.name} สำเร็จ (จำลอง)` : `Simulated navigation to ${selectedBranch.name}`)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  {isTH ? 'เปิด Google Map นำทาง' : 'Navigate Here'}
                </button>
                <button
                  onClick={() => alert(isTH ? `สายส่งสัญญาณคอลเซ็นเตอร์ ${selectedBranch.phone}` : `Dialing ${selectedBranch.phone}`)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {isTH ? 'โทรติดต่อด่วน' : 'Call Office'}
                </button>
              </div>
            </div>

            {/* Right Map Canvas representation */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 relative min-h-[300px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient-slate opacity-40" />
              
              {/* Thailand Vector Map representation styled with clean inline SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full max-h-[350px] opacity-25">
                {/* Simplified Thailand outline coordinates */}
                <path 
                  d="M45,20 L55,25 L60,35 L62,45 L52,55 L48,65 L44,75 L38,85 L42,90 L38,95 L34,92 L40,80 L44,68 L42,50 L38,40 L35,32 L40,25 Z" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>

              {/* Pin markers */}
              {BRANCHES.map((b) => {
                const isSelected = selectedBranchId === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className="absolute cursor-pointer group"
                    style={{ left: `${b.coords.x}%`, top: `${b.coords.y}%` }}
                    id={`pin-${b.id}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse rings */}
                      <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 ${isSelected ? 'animate-ping bg-blue-500' : 'group-hover:animate-ping bg-orange-500'}`} />
                      
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md relative z-10 transition-transform ${isSelected ? 'bg-blue-600 scale-125' : 'bg-orange-500 group-hover:scale-110'}`} />
                      
                      {/* Floating tooltip label */}
                      <span className="absolute bottom-6 whitespace-nowrap bg-slate-950/95 text-white text-[8px] font-bold px-2 py-0.5 rounded border border-white/5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                        {b.name}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-xs text-[10px] text-slate-400">
                <span>📍 คลิกจุดวงกลมสีเพื่อเปลี่ยนดูข้อมูลพิกัดสาขา</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Customer Satisfaction Rating Meter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900 font-sans">{isTH ? 'ร่วมประเมินความพึงพอใจการใช้งานระบบ' : 'Customer Satisfaction Poll'}</h3>
            <p className="text-slate-500 text-xs">{isTH ? 'ประเมินความเห็นของคุณต่อโปรแกรม POS และอุปกรณ์ลิ้นชัก GrowStore' : 'Vote on software features, warranty and service quality.'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center border-t border-slate-100 pt-6">
            
            {/* Satisfaction selection */}
            <div className="sm:col-span-5 text-center sm:text-left space-y-4">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'ประเมินความพึงพอใจของคุณ:' : 'Cast your vote:'}</span>
              
              <div className="flex justify-center sm:justify-start space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    disabled={votedScore !== null}
                    onClick={() => handleSatisfactionVote(star)}
                    className="p-1 cursor-pointer hover:scale-115 transition-transform disabled:opacity-85 text-amber-400"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        votedScore !== null && star <= votedScore 
                          ? 'fill-amber-400 text-amber-400' 
                          : votedScore === null 
                            ? 'hover:fill-amber-400 text-slate-200' 
                            : 'text-slate-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {votedScore !== null ? (
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isTH ? 'ขอบคุณสำหรับคะแนนประเมินประวัติ!' : 'Thank you for your rating!'}</span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-semibold">{isTH ? '*คลิกที่ดวงดาวเพื่อส่งคะแนนประเมินจำลอง' : '*Click stars to submit simulated rating'}</span>
              )}
            </div>

            {/* Poll stats distribution using CSS percentage bars */}
            <div className="sm:col-span-7 space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-50">
                <span>RATING BREAKDOWN</span>
                <span>{getTotalVotes().toLocaleString()} VOTES TOTAL</span>
              </div>
              
              {[5, 4, 3, 2, 1].map((score) => {
                const votes = pollVotes[score as keyof typeof pollVotes];
                const pct = Math.round((votes / getTotalVotes()) * 100);
                return (
                  <div key={score} className="flex items-center space-x-3">
                    <span className="w-12 text-slate-500 flex items-center space-x-0.5 justify-end">
                      <span>{score}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>
                    
                    {/* Bar track */}
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>

                    <span className="w-8 text-right text-slate-400 font-mono text-[10px]">{pct}%</span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Feedback submission log & History (alternating panel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Support Ticket
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-sans">{isTH ? 'ส่งหัวข้อคำถามติดต่อพนักงานคลาวด์' : 'Submit Contact Inquiry'}</h3>
            </div>

            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'ชื่อ-นามสกุล ของคุณ *' : 'Your Name *'}</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe" 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'อีเมลติดต่อกลับ *' : 'Contact Email *'}</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johndoe@gmail.com" 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'หัวข้อต้องการติดต่อ *' : 'Inquiry Topic *'}</label>
                <select 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500 bg-white"
                >
                  <option value="sales">{isTH ? 'ฝ่ายขายและรายละเอียดราคาพิเศษ' : 'Sales and Package Rates'}</option>
                  <option value="technical">{isTH ? 'ฝ่ายสนับสนุนด้านเทคนิคและซอฟต์แวร์' : 'Technical Support'}</option>
                  <option value="warranty">{isTH ? 'การรับประกันฮาร์ดแวร์ / เคลมลิ้นชัก' : 'Warranty & Hardware Claim'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'ระบุข้อความคำถามรายละเอียด *' : 'Inquiry Message *'}</label>
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isTH ? 'ระบุรายละเอียดธุรกิจของคุณหรือคำถามที่สงสัยได้ที่นี่...' : 'Enter your detailed question here...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isTH ? 'กำลังจัดส่งเรื่อง...' : 'Sending inquiry...') : (isTH ? 'ส่งคำถามเข้าสู่ระบบคลาวด์' : 'Submit Ticket')}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Logs history feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 font-sans">{isTH ? 'กล่องบันทึกข้อมูลตั๋วติดต่อของเซสชัน' : 'Session Message Log Stream'}</h3>
                <p className="text-slate-500 text-xs">{isTH ? 'แสดงรายการตั๋วที่คุณส่ง และดูข้อความตอบกลับจากบอทฝ่ายแอดมินจำลอง' : 'Live stream representation. Admins reply on screen within 2s.'}</p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{messagesList.length} TICKETS</span>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messagesList.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                  >
                    {/* User inquiry header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {msg.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">{msg.name}</span>
                          <span className="block text-[10px] text-slate-400">{msg.email}</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">
                      {msg.message}
                    </p>

                    {/* Bot automated reply with typing state indicator */}
                    <div className="border-t border-slate-50 pt-3">
                      {msg.botReply ? (
                        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 space-y-2">
                          <div className="flex justify-between items-center text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                            <span className="flex items-center">
                              <Sparkles className="w-3 h-3 text-amber-500 mr-1 animate-spin" />
                              GrowStore Support Agent Bot
                            </span>
                            <span>CONNECTED</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                            {msg.botReply}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
                          <span className="flex space-x-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                          </span>
                          <span>{isTH ? 'แอดมินกำลังร่างข้อความตอบกลับ...' : 'Admin support drafting response...'}</span>
                        </div>
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
