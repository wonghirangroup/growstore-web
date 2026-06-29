/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DEMO_PRODUCTS } from '../data';
import { POSItem, CartItem, OrderRecord } from '../types';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  Tag, 
  Check, 
  Printer, 
  FileText, 
  Layers, 
  Flame, 
  TrendingUp, 
  Coins, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface POSDemoProps {
  language: 'TH' | 'EN';
  demoPlan: string;
}

export default function POSDemo({ language, demoPlan }: POSDemoProps) {
  const isTH = language === 'TH';

  // License configuration based on simulated unlock plan
  const isProUnlocked = demoPlan !== 'free';

  // State for product list with search/filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<POSItem[]>(DEMO_PRODUCTS);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Promo code state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedPromoName, setAppliedPromoName] = useState('');

  // Checkout modal state
  const [showCheckout, setShowCheckout] = useState(false);
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [changeDue, setChangeDue] = useState<number>(0);
  const [isReceiptPrinted, setIsReceiptPrinted] = useState(false);
  const [cashDrawerOpen, setCashDrawerOpen] = useState(false);

  // Completed receipts log state
  const [ordersHistory, setOrdersHistory] = useState<OrderRecord[]>([]);

  // Sound effects simulator toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Auto-fill received cash
  const handleFastCash = (amount: number) => {
    setCashReceived(amount);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.07 * 100) / 100;
  };

  const getTotal = () => {
    const total = getSubtotal() + getTax() - appliedDiscount;
    return Math.max(0, total);
  };

  useEffect(() => {
    if (cashReceived >= getTotal()) {
      setChangeDue(cashReceived - getTotal());
    } else {
      setChangeDue(0);
    }
  }, [cashReceived, cart, appliedDiscount]);

  // Categories list
  const CATEGORIES = [
    { id: 'all', label: isTH ? 'ทั้งหมด' : 'All' },
    { id: 'เครื่องดื่ม', label: isTH ? 'เครื่องดื่ม' : 'Drinks' },
    { id: 'ขนมขบเคี้ยว', label: isTH ? 'ขนมขบเคี้ยว' : 'Snacks' },
    { id: 'ของสด', label: isTH ? 'ของสด' : 'Fresh Food' },
    { id: 'ของใช้ในครัวเรือน', label: isTH ? 'ของใช้ในบ้าน' : 'Household' }
  ];

  // Add to cart
  const handleAddToCart = (item: POSItem) => {
    if (item.stock <= 0) {
      alert(isTH ? 'สินค้าหมดสต็อกชั่วคราว!' : 'Product is out of stock!');
      return;
    }

    const existingIndex = cart.findIndex(c => c.product.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      if (updated[existingIndex].quantity >= item.stock) {
        alert(isTH ? 'ไม่สามารถสั่งเกินจำนวนสินค้าในสต็อกได้' : 'Cannot exceed available stock');
        return;
      }
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product: item, quantity: 1 }]);
    }

    if (soundEnabled) playClickSound();
  };

  // Adjust quantity
  const handleUpdateQuantity = (idx: number, delta: number) => {
    const updated = [...cart];
    const newQty = updated[idx].quantity + delta;
    if (newQty <= 0) {
      updated.splice(idx, 1);
    } else {
      if (newQty > updated[idx].product.stock) {
        alert(isTH ? 'ไม่สามารถสั่งเกินสต็อกที่มีได้' : 'Stock limit reached');
        return;
      }
      updated[idx].quantity = newQty;
    }
    setCart(updated);
  };

  // Remove from cart
  const handleRemoveItem = (idx: number) => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  // Apply discount coupon code
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'GROWSTORE10') {
      const disc = Math.round(getSubtotal() * 0.1);
      setAppliedDiscount(disc);
      setAppliedPromoName('GROWSTORE10 (10% OFF)');
      alert(isTH ? 'ประยุกต์ใช้คูปองลด 10% สำเร็จ!' : '10% Coupon code applied!');
    } else if (code === 'WELCOME50') {
      setAppliedDiscount(Math.min(50, getSubtotal()));
      setAppliedPromoName('WELCOME50 (ลด 50฿)');
      alert(isTH ? 'ประยุกต์ใช้คูปองลด 50 บาทสำเร็จ!' : '50฿ Discount applied!');
    } else {
      alert(isTH ? 'รหัสคูปองไม่ถูกต้อง' : 'Invalid promo code');
    }
    setCouponCode('');
  };

  // Trigger audio tones locally using simple Audio Synthesis Context
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // AudioContext fails silently in safe previews
    }
  };

  const playCashRegisterSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Tone 1: High Ring
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      gain1.gain.setValueAtTime(0.05, ctx.currentTime);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.1);

      // Tone 2: Slit trigger noise (slightly delayed)
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(440, ctx.currentTime);
        gain2.gain.setValueAtTime(0.05, ctx.currentTime);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.15);
      }, 100);

    } catch (e) {}
  };

  // Process checkout final receipt
  const handleFinalizeSale = () => {
    if (cashReceived < getTotal()) {
      alert(isTH ? 'เงินสดที่ได้รับมาน้อยกว่าราคาสุทธิบิล!' : 'Received cash is less than total bill price');
      return;
    }

    // Deduct stocks in our active products state
    const updatedProducts = products.map(prod => {
      const cartItem = cart.find(c => c.product.id === prod.id);
      if (cartItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartItem.quantity)
        };
      }
      return prod;
    });
    setProducts(updatedProducts);

    // Auto-trigger cash drawer sliding open and print receipt
    setIsReceiptPrinted(true);
    setCashDrawerOpen(true);
    if (soundEnabled) playCashRegisterSound();

    // Log the completed order to session logs
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const orderNo = `GS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: OrderRecord = {
      orderNo,
      items: [...cart],
      discount: appliedDiscount,
      total: getTotal(),
      time: timestamp
    };

    setOrdersHistory(prev => [newRecord, ...prev]);
  };

  const handleResetSale = () => {
    setCart([]);
    setAppliedDiscount(0);
    setAppliedPromoName('');
    setCashReceived(0);
    setChangeDue(0);
    setIsReceiptPrinted(false);
    setCashDrawerOpen(false);
    setShowCheckout(false);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
      
      {/* 1. Header with active license notification */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
              GrowStore Terminal Sandbox v3.4
            </span>
            
            {isProUnlocked ? (
              <span className="text-xs font-black bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1 animate-spin" />
                PRO PLAN UNLOCKED
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                FREE DEMO LICENSE
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-sans font-black text-slate-900 leading-none pt-1">
            {isTH ? 'โปรแกรมขายหน้าร้าน (GrowStore POS Terminal)' : 'POS Frontend Cashier Interface'}
          </h1>
        </div>

        {/* Audio helper toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
              soundEnabled 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            🔊 {soundEnabled ? (isTH ? 'เปิดเสียงบี๊บ' : 'Sound ON') : (isTH ? 'ปิดเสียงบี๊บ' : 'Sound OFF')}
          </button>
          
          <button
            onClick={() => {
              if (confirm(isTH ? 'ยืนยันต้องการรีเซ็ตบิลและคลังสินค้าทั้งหมด?' : 'Confirm reset all session data?')) {
                setProducts(DEMO_PRODUCTS);
                handleResetSale();
                setOrdersHistory([]);
              }
            }}
            className="px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            {isTH ? 'รีเซ็ตสต็อกเดโม' : 'Reset Inventory'}
          </button>
        </div>
      </div>

      {/* 2. Main Terminal Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Selection Catalog */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isTH ? 'พิมพ์ค้นหาสินค้าขายดี หรือคีย์บาร์โค้ดสากล...' : 'Search demo products catalog...'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex overflow-x-auto pb-1.5 space-x-2 scrollbar-none border-t border-slate-50 pt-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => {
              const inCartItem = cart.find(c => c.product.id === prod.id);
              const remainingStock = prod.stock - (inCartItem ? inCartItem.quantity : 0);
              
              return (
                <button
                  key={prod.id}
                  onClick={() => handleAddToCart(prod)}
                  disabled={remainingStock <= 0}
                  className={`bg-white p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-44 group ${
                    remainingStock <= 0 
                      ? 'opacity-55 border-slate-200 bg-slate-50 cursor-not-allowed' 
                      : 'border-slate-200/80 hover:border-blue-500 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                        {prod.image}
                      </span>
                      {inCartItem && (
                        <span className="bg-blue-600 text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {inCartItem.quantity}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-xs line-clamp-2 mt-2 group-hover:text-blue-600 leading-tight">
                      {prod.name}
                    </h3>
                  </div>

                  <div className="border-t border-slate-100 pt-2 flex justify-between items-end w-full">
                    <div>
                      <span className="block text-xs font-black text-slate-900 leading-none">
                        {prod.price} ฿
                      </span>
                      <span className={`block text-[8px] font-bold mt-1 ${remainingStock <= 3 ? 'text-red-500' : 'text-slate-400'}`}>
                        {remainingStock <= 0 ? (isTH ? 'สินค้าหมด' : 'Out of Stock') : (isTH ? `คงเหลือ ${remainingStock}` : `${remainingStock} left`)}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Checkout cart sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-6">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-sans font-black text-slate-900 text-sm flex items-center">
              <ShoppingCart className="w-4 h-4 text-blue-600 mr-1.5" />
              {isTH ? 'รายการบิลสั่งซื้อปัจจุบัน' : 'Current Checkout Bill'}
            </h3>
            <span className="text-[10px] font-bold text-slate-400">
              {cart.reduce((s, i) => s + i.quantity, 0)} ITEMS
            </span>
          </div>

          {/* Cart items list */}
          <div className="space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={item.product.id} className="flex justify-between items-center text-xs pb-3 border-b border-slate-50">
                <div className="flex-1 space-y-0.5 pr-2">
                  <span className="font-bold text-slate-800 leading-tight block">{item.product.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.product.price} ฿ / {isTH ? 'ชิ้น' : 'pc'}</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  {/* Quantity adjustments */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button 
                      onClick={() => handleUpdateQuantity(idx, -1)}
                      className="px-2 py-1 font-black text-slate-600 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-2.5 font-bold text-slate-800 text-[11px]">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(idx, 1)}
                      className="px-2 py-1 font-black text-slate-600 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <span className="w-14 text-right font-black text-slate-900">
                    {item.product.price * item.quantity} ฿
                  </span>

                  <button 
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1 hover:bg-red-50 text-red-400 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="h-full py-16 text-center text-slate-400 flex flex-col justify-center items-center">
                <ShoppingCart className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs font-semibold">{isTH ? 'ยังไม่มีรายการสินค้าในบิล' : 'Your cart is empty'}</p>
                <p className="text-[10px] text-slate-400 mt-1">{isTH ? 'คลิกเลือกสินค้าด้านซ้ายเพื่อสะสมยอดขาย' : 'Click items on catalog to add'}</p>
              </div>
            )}
          </div>

          {/* Promo code box */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{isTH ? 'คูปองส่วนลดสมาชิก:' : 'Promo discount code:'}</span>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. GROWSTORE10"
                className="flex-1 px-3 py-1.5 border border-slate-200 text-xs font-bold rounded-lg uppercase outline-hidden bg-white" 
              />
              <button
                onClick={handleApplyCoupon}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {isTH ? 'ใช้คูปอง' : 'Apply'}
              </button>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-[10px] text-emerald-600 font-bold">
                <span>✓ {appliedPromoName}</span>
                <span>-{appliedDiscount} ฿</span>
              </div>
            )}
          </div>

          {/* Bill calculations */}
          <div className="space-y-2 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span>{isTH ? 'ราคารวมสินค้า (Subtotal):' : 'Subtotal:'}</span>
              <span className="text-slate-900">{getSubtotal().toLocaleString()} ฿</span>
            </div>
            <div className="flex justify-between">
              <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
              <span className="text-slate-900">{getTax().toLocaleString()} ฿</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{isTH ? 'ส่วนลดส่วนตัว (Discount):' : 'Discount Code:'}</span>
                <span>-{appliedDiscount.toLocaleString()} ฿</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black border-t border-slate-100 pt-3 text-slate-900">
              <span>{isTH ? 'ราคาสุทธิ (Total):' : 'Total Amount:'}</span>
              <span className="text-blue-600 font-sans font-black">{getTotal().toLocaleString()} ฿</span>
            </div>
          </div>

          {/* Checkout Process trigger button */}
          <div>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                setCashReceived(getTotal());
                setIsReceiptPrinted(false);
                setCashDrawerOpen(false);
                setShowCheckout(true);
              }}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Coins className="w-5 h-5 fill-white" />
              <span>{isTH ? 'ชำระเงิน / พิมพ์ใบเสร็จ' : 'Check out (Receive Cash)'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. Session sales records journal log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-bold text-slate-900 text-sm">{isTH ? 'ประวัติบิลส่งยอดประจำเซสชัน' : 'Session Daily Sales Journal'}</h3>
            <p className="text-slate-400 text-[10px]">{isTH ? 'แสดงรายการบิลที่ออกสำเร็จในเซสชันนี้แบบเรียลไทม์' : 'Real-time transactional journal logs'}</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {isTH ? `บิลทั้งหมด: ${ordersHistory.length} บิล` : `Total: ${ordersHistory.length} bills`}
          </span>
        </div>

        <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
          {ordersHistory.map((rec) => (
            <div key={rec.orderNo} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-semibold text-slate-600">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-900 font-black font-mono">{rec.orderNo}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400 font-mono text-[10px]">{rec.time}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                  <span>{isTH ? `จำนวน ${rec.items.reduce((s, i) => s + i.quantity, 0)} ชิ้น` : `Qty: ${rec.items.reduce((s, i) => s + i.quantity, 0)}`}</span>
                  <span>•</span>
                  <span className="truncate max-w-[280px]">
                    {rec.items.map(i => `${i.product.name} x${i.quantity}`).join(', ')}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-sm font-black text-slate-900">{rec.total.toLocaleString()} ฿</span>
                <span className="block text-[8px] text-emerald-500 font-bold uppercase tracking-wider">✓ PAID SECURE</span>
              </div>
            </div>
          ))}

          {ordersHistory.length === 0 && (
            <div className="py-10 text-center text-slate-400">
              <FileText className="w-8 h-8 mx-auto text-slate-300 mb-1" />
              <p className="text-xs font-semibold">{isTH ? 'ยังไม่มีประวัติการออกบิลในเซสชันนี้' : 'No transactional history yet'}</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. MODAL: FULLY INTERACTIVE CASH DRAWER & RECEIPT INTERACTION */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-200 grid grid-cols-1 md:grid-cols-12"
            >
              
              {/* Left Column: Register Tender Controls */}
              <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Tender Box
                    </span>
                    <button 
                      onClick={() => setShowCheckout(false)}
                      className="p-1 text-slate-400 hover:text-slate-900 md:hidden cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 font-sans">{isTH ? 'บันทึกรับเงินสดหน้าร้าน' : 'Cash Tender Controls'}</h3>
                </div>

                {/* Received bill info */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-1 text-center relative overflow-hidden">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-widest">{isTH ? 'ยอดราคาสุทธิที่ต้องเก็บ:' : 'Total due:'}</span>
                  <p className="text-3xl font-sans font-black text-amber-400">{getTotal().toLocaleString()} ฿</p>
                </div>

                {/* Real-time cash entry */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">{isTH ? 'จำนวนเงินสดที่ได้รับมา (บาท) *' : 'Enter Cash Received *'}</label>
                  <input 
                    type="number" 
                    value={cashReceived || ''}
                    onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-slate-200 text-lg font-black font-mono text-slate-900 rounded-xl focus:border-blue-500 outline-hidden"
                  />
                  
                  {/* Rapid cash selection triggers */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    <button 
                      onClick={() => handleFastCash(getTotal())}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg cursor-pointer"
                    >
                      {isTH ? 'พอดี' : 'Exact'}
                    </button>
                    <button 
                      onClick={() => handleFastCash(100)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg cursor-pointer"
                    >
                      100 ฿
                    </button>
                    <button 
                      onClick={() => handleFastCash(500)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg cursor-pointer"
                    >
                      500 ฿
                    </button>
                    <button 
                      onClick={() => handleFastCash(1000)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg cursor-pointer"
                    >
                      1,000 ฿
                    </button>
                  </div>
                </div>

                {/* Change amount */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">{isTH ? 'เงินทอนทอนลูกค้า:' : 'Change due:'}</span>
                  <span className={`text-xl font-sans font-black ${changeDue > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {changeDue.toLocaleString()} ฿
                  </span>
                </div>

                {/* Checkout Trigger */}
                <div className="pt-2 flex gap-2">
                  <button
                    disabled={cashReceived < getTotal()}
                    onClick={handleFinalizeSale}
                    className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    {isReceiptPrinted ? (isTH ? '✓ ขายสำเร็จเรียบร้อย' : '✓ Completed') : (isTH ? 'พิมพ์ใบเสร็จ & เด้งลิ้นชัก' : 'Print & Open Cash Drawer')}
                  </button>
                  <button
                    onClick={handleResetSale}
                    className="px-5 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {isTH ? 'ปิดบิลนี้ / ทำใหม่' : 'Next Sale'}
                  </button>
                </div>

              </div>

              {/* Right Column: Virtual Hardware Simulation representation (Printers & Sliding drawers) */}
              <div className="md:col-span-6 bg-slate-100 p-6 sm:p-8 border-l border-slate-200 flex flex-col justify-between items-center min-h-[400px]">
                
                <div className="w-full flex justify-between items-center text-[10px] font-bold text-slate-400 pb-3 border-b border-slate-200">
                  <span>HARDWARE SIMULATOR SCREEN</span>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="hidden md:block p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Animated Drawer & Printer Box */}
                <div className="relative w-full max-w-sm h-64 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-6 text-white overflow-hidden shadow-inner">
                  
                  {/* Virtual receipt printing simulation */}
                  {isReceiptPrinted && (
                    <motion.div 
                      initial={{ y: -120, opacity: 0 }}
                      animate={{ y: -45, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="absolute top-0 z-10 w-44 bg-white text-slate-800 p-3 rounded shadow-lg border border-slate-200 flex flex-col justify-between text-[7px] font-mono"
                    >
                      <div className="text-center border-b border-dashed border-slate-300 pb-1.5 space-y-0.5">
                        <span className="block font-sans font-black text-[9px] text-blue-600">GrowStore POS</span>
                        <span className="block text-[6px] text-slate-400">RECEIPT BILL JOURNAL</span>
                      </div>
                      
                      <div className="py-2 space-y-1">
                        {cart.map(i => (
                          <div key={i.product.id} className="flex justify-between font-bold">
                            <span>{i.product.name} x{i.quantity}</span>
                            <span>{i.product.price * i.quantity} ฿</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-dashed border-slate-300 pt-1.5 space-y-1 font-bold">
                        <div className="flex justify-between">
                          <span>SUBTOTAL:</span>
                          <span>{getSubtotal()} ฿</span>
                        </div>
                        {appliedDiscount > 0 && (
                          <div className="flex justify-between text-emerald-600">
                            <span>DISCOUNT:</span>
                            <span>-{appliedDiscount} ฿</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[8px] font-black border-t border-slate-200 pt-1">
                          <span>TOTAL PAID:</span>
                          <span>{getTotal()} ฿</span>
                        </div>
                      </div>

                      <div className="text-center text-[6px] text-slate-400 mt-2 border-t border-dashed border-slate-200 pt-1.5 leading-none">
                        Thank you for using GrowStore POS!
                      </div>
                    </motion.div>
                  )}

                  {/* Dual Drawer model */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-20 bg-slate-800 rounded-lg shadow-2xl relative border border-slate-700">
                    
                    {/* Sliding mechanism layer */}
                    <motion.div 
                      animate={cashDrawerOpen ? { y: 20, zIndex: 12, scale: 1.05 } : { y: 0, zIndex: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="absolute inset-x-2 top-2 h-14 bg-slate-700 border border-slate-600 rounded shadow-md flex items-center justify-around px-2"
                    >
                      {/* Inner coins cells */}
                      <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[5px] text-slate-900 font-bold shadow-inner">10</div>
                      <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[5px] text-slate-900 font-bold shadow-inner">5</div>
                      <div className="w-8 h-4 bg-slate-900 rounded-xs flex items-center justify-center text-[5px] text-emerald-500 font-bold border border-emerald-500/15 font-mono">1000฿</div>
                    </motion.div>

                    {/* Outer lock ring */}
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border border-slate-500 flex items-center justify-center z-10">
                      <div className="w-1.5 h-0.5 bg-slate-300" />
                    </div>

                  </div>

                </div>

                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">
                    {cashDrawerOpen 
                      ? (isTH ? '🔓 ลิ้นชักเด้งออกออโต้สำเร็จ!' : '🔓 Drawer Opened Successfully!') 
                      : (isTH ? '🔒 ลิ้นชักปิดล็อกอยู่' : '🔒 Drawer is Locked')}
                  </span>
                  <p className="text-[10px] text-slate-500">
                    {isTH 
                      ? 'วงจรกระแสไฟ RJ11 ส่งสัญญาณกระตุ้นขดลวด Solenoid เรียบร้อย' 
                      : 'Simulated ESC/POS impulse has completed successfully.'}
                  </p>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
