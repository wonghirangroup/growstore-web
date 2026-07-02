import { useState, useRef, useEffect } from 'react';
import { ActivePage } from '../types';
import { Monitor, LogIn, ChevronDown } from 'lucide-react';
import logo from '../../images/logo222.png';


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
  const [productsOpen, setProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const isTH = language === 'TH';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-0 group cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="relative group-hover:scale-105 transition-transform">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <span className="block font-sans font-bold text-xl tracking-tight">
              <span className="text-[#131C45]">Grow</span>
              <span className="text-[#2DA6DD]">Store</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1 h-full" id="desktop-nav">

            {/* หน้าแรก */}
            <button
              id="nav-home"
              onClick={() => setCurrentPage('home')}
              className={`relative px-4 py-2 text-sm font-semibold cursor-pointer transition-colors group ${
                currentPage === 'home' ? 'text-sky-500' : 'text-slate-600 hover:text-sky-500'
              }`}
            >
              {isTH ? 'หน้าแรก' : 'Home'}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-sky-500 transition-transform duration-300 origin-center ${
                currentPage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75 group-hover:opacity-40'
              }`} />
            </button>

            {/* สินค้า — split: label navigates, chevron toggles dropdown */}
            <div ref={productsRef} className="relative h-full flex items-center">
              <div className="relative flex items-center group">
                <button
                  id="nav-products"
                  onClick={() => { setCurrentPage('products'); setProductsOpen(false); }}
                  className={`pl-4 pr-1 py-2 text-sm font-semibold cursor-pointer transition-colors ${
                    currentPage === 'products' || currentPage === 'packages'
                      ? 'text-sky-500'
                      : 'text-slate-600 hover:text-sky-500'
                  }`}
                >
                  {isTH ? 'สินค้า' : 'Products'}
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setProductsOpen(p => !p); }}
                  className={`pr-3 pl-0.5 py-2 cursor-pointer transition-colors ${
                    currentPage === 'products' || currentPage === 'packages'
                      ? 'text-sky-500'
                      : 'text-slate-500 hover:text-sky-500'
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Underline indicator spans full label+chevron area */}
                <span className={`absolute bottom-0 left-2 right-1 h-0.5 rounded-full bg-sky-500 transition-transform duration-300 origin-center ${
                  currentPage === 'products' || currentPage === 'packages'
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-75 group-hover:opacity-40'
                }`} />
              </div>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 min-w-[140px] z-50">
                  <button
                    onClick={() => { setCurrentPage('products'); setProductsOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                      currentPage === 'products'
                        ? 'text-sky-500 bg-sky-50'
                        : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50'
                    }`}
                  >
                    {isTH ? 'สินค้า' : 'Products'}
                  </button>
                  <button
                    onClick={() => { setCurrentPage('packages'); setProductsOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                      currentPage === 'packages'
                        ? 'text-sky-500 bg-sky-50'
                        : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50'
                    }`}
                  >
                    {isTH ? 'แพ็คเกจ' : 'Packages'}
                  </button>
                </div>
              )}
            </div>

            {/* บริการ */}
            <button
              id="nav-services"
              onClick={() => setCurrentPage('services')}
              className={`relative px-4 py-2 text-sm font-semibold cursor-pointer transition-colors group ${
                currentPage === 'services' ? 'text-sky-500' : 'text-slate-600 hover:text-sky-500'
              }`}
            >
              {isTH ? 'บริการ' : 'Services'}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-sky-500 transition-transform duration-300 origin-center ${
                currentPage === 'services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75 group-hover:opacity-40'
              }`} />
            </button>

            {/* คู่มือ */}
            <button
              id="nav-guides"
              onClick={() => setCurrentPage('guides')}
              className={`relative px-4 py-2 text-sm font-semibold cursor-pointer transition-colors group ${
                currentPage === 'guides' ? 'text-sky-500' : 'text-slate-600 hover:text-sky-500'
              }`}
            >
              {isTH ? 'คู่มือ' : 'Guides'}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-sky-500 transition-transform duration-300 origin-center ${
                currentPage === 'guides' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75 group-hover:opacity-40'
              }`} />
            </button>

            {/* ติดต่อเรา — orange accent */}
            <button
              id="nav-contact"
              onClick={() => setCurrentPage('contact')}
              className={`relative px-4 py-2 text-sm font-semibold cursor-pointer transition-colors group ${
                currentPage === 'contact' ? 'text-orange-500' : 'text-orange-500 hover:text-orange-600'
              }`}
            >
              {isTH ? 'ติดต่อเรา' : 'Contact Us'}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-orange-500 transition-transform duration-300 origin-center ${
                currentPage === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75 group-hover:opacity-40'
              }`} />
            </button>
          </nav>

          {/* Right tools */}
          <div className="flex items-center space-x-3">
            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                className="flex items-center space-x-1.5 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900"
                id="lang-toggle-btn"
              >
                {language === 'TH' ? (
                  <>
                    <img src="https://flagcdn.com/w40/th.png" alt="TH" className="w-5 h-5 rounded-full object-cover" />
                    <span>ไทย</span>
                  </>
                ) : (
                  <>
                    <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-5 h-5 rounded-full object-cover" />
                    <span>English</span>
                  </>
                )}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 min-w-[130px] z-50">
                  <button
                    onClick={() => { setLanguage('TH'); setLangOpen(false); }}
                    className={`w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm font-semibold transition-colors ${
                      language === 'TH' ? 'text-sky-500 bg-sky-50' : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50'
                    }`}
                  >
                    <img src="https://flagcdn.com/w40/th.png" alt="TH" className="w-5 h-5 rounded-full object-cover" />
                    <span>ไทย</span>
                  </button>
                  <button
                    onClick={() => { setLanguage('EN'); setLangOpen(false); }}
                    className={`w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm font-semibold transition-colors ${
                      language === 'EN' ? 'text-sky-500 bg-sky-50' : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50'
                    }`}
                  >
                    <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-5 h-5 rounded-full object-cover" />
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>

            {/* POS Demo button */}
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
              <span>{isTH ? 'ทดลอง POS เดโม' : 'Try POS Demo'}</span>
            </button>

            {/* Login */}
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-[#2DA6DD] hover:bg-[#2DA6DD] text-white text-xs font-bold shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer"
              id="login-btn"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTH ? 'เข้าสู่ระบบ' : 'Login'}</span>
            </button>
          </div>
        </div>

        {/* Mobile quick-action bar */}
        <div className="md:hidden flex overflow-x-auto pb-3 space-x-2 scrollbar-none border-t border-slate-50 pt-2">
          {([
            { id: 'home', label: isTH ? 'หน้าแรก' : 'Home' },
            { id: 'products', label: isTH ? 'สินค้า' : 'Products' },
            { id: 'packages', label: isTH ? 'แพ็คเกจ' : 'Packages' },
            { id: 'services', label: isTH ? 'บริการ' : 'Services' },
            { id: 'guides', label: isTH ? 'คู่มือ' : 'Guides' },
            { id: 'contact', label: isTH ? 'ติดต่อเรา' : 'Contact' },
          ] as { id: ActivePage; label: string }[]).map((item, idx) => (
            <button
              key={idx}
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
            <span>{isTH ? 'ลองเดโม' : 'Demo'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
