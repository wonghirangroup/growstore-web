/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ShieldCheck, LogIn, Lock, User, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'TH' | 'EN';
  onLoginSuccess: (plan: string, username: string) => void;
}

export default function LoginModal({ isOpen, onClose, language, onLoginSuccess }: LoginModalProps) {
  const isTH = language === 'TH';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (selectedPlan: string, uName: string) => {
    onLoginSuccess(selectedPlan, uName);
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert(isTH ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in both fields');
      return;
    }
    // Simulate generic login
    handleDemoLogin('pro', username);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <LogIn className="w-5 h-5 text-blue-400" />
                <span className="font-sans font-black text-sm">
                  {isTH ? 'เข้าสู่ระบบ GrowStore POS' : 'GrowStore POS login'}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer text-slate-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              
              <div className="text-center pb-2">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'ยินดีต้อนรับกลับเข้าสู่ระบบ' : 'Welcome back'}</span>
                <p className="text-xs text-slate-500 mt-1">{isTH ? 'กรอกรหัสพนักงานหรือคลิกบัญชีทดลองด่วนด้านล่าง' : 'Enter credentials or use quick demo profiles'}</p>
              </div>

              {/* Input Username */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center">
                  <User className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  {isTH ? 'ชื่อผู้ใช้งาน / รหัสพนักงาน' : 'Username / Staff ID'}
                </label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin_growstore"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500" 
                />
              </div>

              {/* Input Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center">
                  <Lock className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  {isTH ? 'รหัสผ่านระบบ' : 'Secret Password'}
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500" 
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isTH ? 'เข้าสู่ระบบหน้าร้าน' : 'Secure Login'}</span>
                </button>
              </div>

              {/* Quick demo profiles section */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 block text-center uppercase tracking-widest">
                  {isTH ? 'บัญชีทดลองพิเศษด่วน (DEMO)' : 'QUICK DEMO PROFILES'}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('pro', isTH ? 'ผู้จัดการ สมเจตน์' : 'Manager Somjet')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-100 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-1 text-purple-600 text-[10px] font-bold">
                      <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                      <span>PRO MANAGER</span>
                    </div>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{isTH ? 'ไลเซนส์ไม่จำกัดสาขา' : 'Unlimited branches'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('free', isTH ? 'พนักงาน ณัฐชา' : 'Cashier Natcha')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-100 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-bold">
                      <Star className="w-3 h-3 text-slate-400" />
                      <span>CASHIER STAFF</span>
                    </div>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{isTH ? 'ฟังก์ชันจำลองมาตรฐาน' : 'Free tier sandbox'}</span>
                  </button>
                </div>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
