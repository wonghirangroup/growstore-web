/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActivePage } from '../types';
import { Store, Monitor, LogIn, ChevronRight, Globe } from 'lucide-react';

interface NavbarProps {
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  language: 'TH' | 'EN';
  setLanguage: (lang: 'TH' | 'EN') => void;
  onOpenLogin: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  onOpenLogin
}: NavbarProps) {
  const menuItems = [
    { id: 'home', label: language === 'TH' ? 'หน้าแรก' : 'Home' },
    { id: 'products', label: language === 'TH' ? 'สินค้า' : 'Products' },
    { id: 'packages', label: language === 'TH' ? 'แพ็คเกจ' : 'Packages' },
    { id: 'guides', label: language === 'TH' ? 'คู่มือการใช้งาน' : 'Guides' },
    { id: 'contact', label: language === 'TH' ? 'ติดต่อเรา' : 'Contact Us' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage('home')} 
            className="flex items-center space-x-2 group cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-100 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
            <div className="text-left">
              <span className="block font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                GrowStore
              </span>
              <span className="block text-[10px] font-medium text-slate-400 -mt-1 tracking-widest">
                POS SYSTEMS
              </span>
            </div>
          </button>

          {/* Nav items */}
          <nav className="hidden md:flex space-x-1" id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right menu tools */}
          <div className="flex items-center space-x-3">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'TH' ? 'EN' : 'TH')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
              id="lang-toggle-btn"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="flex items-center">
                {language === 'TH' ? (
                  <>
                    <span className="mr-1">🇹🇭</span> TH
                  </>
                ) : (
                  <>
                    <span className="mr-1">🇺🇸</span> EN
                  </>
                )}
              </span>
            </button>

            {/* Try Sandbox Button */}
            <button
              onClick={() => setCurrentPage('pos-demo')}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === 'pos-demo'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
              id="pos-demo-toggle-btn"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{language === 'TH' ? 'ทดลอง POS เดโม' : 'Try POS Demo'}</span>
            </button>

            {/* Login button */}
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer"
              id="login-btn"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{language === 'TH' ? 'เข้าสู่ระบบ' : 'Login'}</span>
            </button>
          </div>
        </div>

        {/* Mobile quick actions bar (only for screens < md) */}
        <div className="md:hidden flex overflow-x-auto pb-3 space-x-2 scrollbar-none border-t border-slate-50 pt-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage('pos-demo')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 cursor-pointer ${
              currentPage === 'pos-demo'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>{language === 'TH' ? 'ลองเดโม' : 'Demo'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
