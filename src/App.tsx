/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActivePage } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import PackagesView from './components/PackagesView';
import GuidesView from './components/GuidesView';
import ContactView from './components/ContactView';
import POSDemo from './components/POSDemo';
import LoginModal from './components/LoginModal';
import { Sparkles, Check, LogOut, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [language, setLanguage] = useState<'TH' | 'EN'>('TH');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string>('free');
  const [activeUser, setActiveUser] = useState<string | null>(null);

  // Success toast notice state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLoginSuccess = (plan: string, username: string) => {
    setDemoPlan(plan);
    setActiveUser(username);
    triggerToast(language === 'TH' ? `เข้าสู่ระบบสำเร็จในฐานะ ${username} (${plan.toUpperCase()} LICENSE)` : `Logged in as ${username} (${plan.toUpperCase()})`);
  };

  const handleLogout = () => {
    setDemoPlan('free');
    setActiveUser(null);
    triggerToast(language === 'TH' ? 'ออกจากระบบสำเร็จ' : 'Logged out successfully');
  };

  const handleSetDemoPlan = (plan: string) => {
    setDemoPlan(plan);
    triggerToast(language === 'TH' ? `ปลดล็อกระบบเรียบร้อย! ขยายขีดจำกัดด้วยแพ็คเกจ ${plan.toUpperCase()}` : `Unlocked GrowStore ${plan.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-800" id="growstore-app">
      
      {/* 1. Header Navbar */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* 2. Top notification indicator bar if logged in */}
      {activeUser && (
        <div className="bg-gradient-to-r from-blue-700 to-sky-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center space-x-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>
            {language === 'TH' 
              ? `เข้าล็อกอินในระบบ GrowStore POS: ${activeUser} | โมดูลทั้งหมด ปลดล็อกระดับโปรโมชั่น` 
              : `Active GrowStore POS session: ${activeUser} | All modules unlocked under promotional plan`}
          </span>
          <button 
            onClick={handleLogout}
            className="underline cursor-pointer hover:text-orange-200 ml-2 text-[10px] flex items-center"
          >
            <LogOut className="w-3 h-3 inline mr-0.5" />
            {language === 'TH' ? 'ออกจากระบบ' : 'Logout'}
          </button>
        </div>
      )}

      {/* 3. Main views container routing */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HomeView setCurrentPage={setCurrentPage} language={language} />
            </motion.div>
          )}

          {currentPage === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ProductsView language={language} setCurrentPage={setCurrentPage} />
            </motion.div>
          )}

          {currentPage === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <PackagesView 
                language={language} 
                setCurrentPage={setCurrentPage} 
                onSetDemoPlan={handleSetDemoPlan} 
              />
            </motion.div>
          )}

          {currentPage === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <GuidesView language={language} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ContactView language={language} />
            </motion.div>
          )}

          {currentPage === 'pos-demo' && (
            <motion.div
              key="pos-demo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <POSDemo language={language} demoPlan={demoPlan} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Footer */}
      <Footer 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language} 
      />

      {/* 5. Floating Modals & Back to Top triggers */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        language={language}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Toast Notice banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-800 text-xs font-bold"
          >
            <div className="bg-emerald-500 text-white p-1 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth back-to-top floating triggers */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-md text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
        aria-label="Back to Top"
        id="back-to-top-btn"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

    </div>
  );
}
