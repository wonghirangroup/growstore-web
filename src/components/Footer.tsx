import { ActivePage } from '../types';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../images/logo222.png';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

interface FooterProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
}

export default function Footer({ setCurrentPage, language }: FooterProps) {
  const isTH = language === 'TH';

  return (
    <footer className="bg-[#F5F6FA] text-[#131C45] border-t border-slate-200 pt-10 pb-6" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-8 mb-10">

          {/* Column 1: Brand */}
          <div className="space-y-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-left group cursor-pointer"
            >
              <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
              <span className="font-sans font-bold text-3xl tracking-tight">
                <span className="text-[#131C45]">Grow</span>
                <span className="text-[#2DA6DD]">Store</span>
              </span>
            </button>

            <p className="text-sm text-slate-500 leading-snug">
              {isTH
                ? 'จัดการร้านง่าย ช่วยธุรกิจคุณโต\nไปกับ GrowStore'
                : 'Easy store management, grow your business with GrowStore.'}
            </p>

            <div className="flex items-center space-x-3 mt-3">
              {[
                { icon: <FacebookIcon />, href: '#' },
                { icon: <TikTokIcon />, href: '#' },
                { icon: <InstagramIcon />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-full border-2 border-[#2DA6DD] text-[#2DA6DD] flex items-center justify-center hover:bg-[#2DA6DD] hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: เมนูแนะนำ */}
          <div>
            <h3 className="font-bold text-[#131C45] text-base mb-5">
              {isTH ? 'เมนูแนะนำ' : 'Navigation'}
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {[
                { label: isTH ? 'สินค้า' : 'Products', page: 'products' as ActivePage },
                { label: isTH ? 'แพ็คเกจ' : 'Packages', page: 'packages' as ActivePage },
                { label: isTH ? 'บริการ' : 'Services', page: 'services' as ActivePage },
                { label: isTH ? 'โปรโมชั่น' : 'Promotions', page: 'packages' as ActivePage },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(item.page)}
                    className="hover:text-[#2DA6DD] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: บริการ */}
          <div>
            <h3 className="font-bold text-[#131C45] text-base mb-5">
              {isTH ? 'บริการ' : 'Services'}
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => setCurrentPage('guides')}
                  className="hover:text-[#2DA6DD] transition-colors cursor-pointer"
                >
                  {isTH ? 'คู่มือการใช้งาน' : 'User Guide'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ติดต่อเรา */}
          <div>
            <h3 className="font-bold text-[#131C45] text-base mb-5">
              {isTH ? 'ติดต่อเรา' : 'Contact Us'}
            </h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-5 h-5 text-[#2DA6DD] flex-shrink-0 mt-0.5" />
                <span>
                  {isTH
                    ? '92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000'
                    : '92/1 Pak Thong Chai Rd, Nai Mueang, Mueang District, Nakhon Ratchasima 30000'}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#2DA6DD] flex-shrink-0" />
                <a href="tel:082-149-2753" className="hover:text-[#2DA6DD] transition-colors">082–1492753</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#2DA6DD] flex-shrink-0" />
                <a href="mailto:Growstore@gmail.com" className="hover:text-[#2DA6DD] transition-colors">Growstore@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          <p>2026 Grow Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
