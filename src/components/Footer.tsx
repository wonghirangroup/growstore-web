/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActivePage } from '../types';
import { Store, MapPin, Phone, Mail, Facebook, Instagram, Video } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
}

export default function Footer({ setCurrentPage, language }: FooterProps) {
  const isTH = language === 'TH';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-1 space-y-4">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="flex items-center space-x-2 text-left group cursor-pointer"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500 text-white">
                <Store className="w-4 h-4" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                GrowStore
              </span>
            </button>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              {isTH 
                ? 'จัดการร้านค้าและสต็อกสินค้าของคุณอย่างมืออาชีพด้วยระบบ POS อัจฉริยะ ตอบโจทย์ทุกรูปแบบธุรกิจ' 
                : 'Manage your store and inventory professionally with an intelligent POS system that meets every business format.'}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Recommended Menus */}
          <div>
            <h3 className="text-white font-sans font-bold text-sm tracking-wider uppercase mb-4">
              {isTH ? 'เมนูแนะนำ' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('products')} 
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {isTH ? 'สินค้าอาร์ดแวร์' : 'Hardware Products'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('packages')} 
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {isTH ? 'แพ็คเกจราคา' : 'Pricing Plans'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('guides')} 
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {isTH ? 'คู่มือแนะนำระบบ' : 'Guides & Tutorials'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('pos-demo')} 
                  className="text-slate-400 hover:text-emerald-400 font-semibold transition-colors cursor-pointer"
                >
                  {isTH ? 'ทดลองระบบเดโม' : 'Try POS Terminal Demo'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-sans font-bold text-sm tracking-wider uppercase mb-4">
              {isTH ? 'บริการของเรา' : 'Services'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('guides')} 
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {isTH ? 'คู่มือการติดตั้ง' : 'Installation Guide'}
                </button>
              </li>
              <li>
                <a href="#line-support" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {isTH ? 'บริการซัพพอร์ต 24 ชม.' : '24/7 Tech Support'}
                </a>
              </li>
              <li>
                <a href="#api" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {isTH ? 'การเชื่อมต่อระบบ API' : 'API Integrations'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-bold text-sm tracking-wider uppercase mb-4">
              {isTH ? 'ติดต่อเรา' : 'Contact Us'}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isTH 
                    ? '92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000' 
                    : '92/1 Pak Thong Chai Rd, Nai Mueang, Mueang District, Nakhon Ratchasima 30000'}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-sky-400" />
                <a href="tel:082-149-2753" className="hover:text-white transition-colors">082-1492753</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-sky-400" />
                <a href="mailto:Growstore@gmail.com" className="hover:text-white transition-colors">Growstore@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Grow Store. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">{isTH ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{isTH ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
