/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingPlan, BusinessType, PackageCategory, PackageFeature, POSItem } from './types';

export const COMPARISON_ROWS: PackageFeature[] = [
  { name: 'POS ขายหน้าร้าน (บิล/ต่อเดือน)', free: '300', s: '500', m: 'ไม่จำกัด', l: 'ไม่จำกัด', pro: 'ไม่จำกัด' },
  { name: 'พักบิล / Clone บิล', free: true, s: true, m: true, l: true, pro: true },
  { name: 'ยกเลิก / แก้ไขบิลย้อนหลัง', free: true, s: true, m: true, l: true, pro: true },
  { name: 'คืน / เปลี่ยนสินค้า', free: false, s: false, m: true, l: true, pro: true },
  { name: 'Offline Mode', free: true, s: true, m: true, l: true, pro: true },
  { name: 'Sync หลายเครื่อง', free: false, s: false, m: true, l: true, pro: true },
  { name: 'Customer Display', free: false, s: false, m: true, l: true, pro: true },
  { name: 'Cash Drawer', free: true, s: true, m: true, l: true, pro: true },
  { name: 'Saving Drawer', free: false, s: false, m: false, l: true, pro: true },
  { name: 'ประวัติบิล & การแก้ไข', free: '1 เดือน', s: '1 ปี', m: 'ไม่จำกัด', l: 'ไม่จำกัด', pro: 'ไม่จำกัด' },
];

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'sme',
    title: 'SME',
    subtitle: 'ขนาดเล็ก - กลาง',
    description: 'ต้องการระบบที่ใช้งานง่าย ลงทุนต่ำ และช่วยวางรากฐานที่เป็นมาตรฐานสำหรับการบริหารธุรกิจ',
    icon: 'Store',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'retail',
    title: 'ร้านเบ็ดเตล็ด',
    description: 'ระบบขายหน้าร้าน (POS) ที่คิดเงินรวดเร็ว พร้อมช่วยช่วยจัดการสินค้าที่หลากหลายจุกจิก ให้คุณค้นหาและเช็คสต็อกได้อย่างง่ายดาย',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'wholesale',
    title: 'ร้านค้าปลีกและค้าส่ง',
    description: 'ระบบที่ยืดหยุ่น รองรับการตั้งราคาปลีกและส่ง พร้อมตัดสต็อกขนาดใหญ่ที่เชื่อมโยงข้อมูลอย่างง่ายดาย',
    icon: 'ShoppingCart',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'warehouse',
    title: 'คลังสินค้า',
    description: 'ระบบที่ยืดหยุ่น รองรับการตั้งราคาปลีกและส่ง พร้อมตัดสต็อกขนาดใหญ่ที่เชื่อมโยงข้อมูลอย่างง่ายดาย',
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'ฟรี',
    price: 0,
    period: 'ฟรีตลอดชีพ',
    features: [
      { text: 'โหมดออฟไลน์ (Offline Mode)', available: true },
      { text: 'เชื่อมต่อได้หลายเครื่อง', available: false },
      { text: 'ใช้งานได้หลายภาษา', available: true },
      { text: 'แสดงบิลให้ลูกค้าดู', available: false },
      { text: 'เชื่อมกล่องเงินสด', available: true },
      { text: 'เปิดลิ้นชักอัตโนมัติ', available: false },
      { text: 'เก็บข้อมูลย้อนหลัง 3 เดือน', available: true },
    ]
  },
  {
    id: 's',
    name: 'S',
    price: 99,
    period: 'บาท/เดือน',
    features: [
      { text: 'โหมดออฟไลน์ (Offline Mode)', available: true },
      { text: 'เชื่อมต่อได้หลายเครื่อง', available: false },
      { text: 'ใช้งานได้หลายภาษา', available: true },
      { text: 'แสดงบิลให้ลูกค้าดู', available: false },
      { text: 'เชื่อมกล่องเงินสด', available: true },
      { text: 'เปิดลิ้นชักอัตโนมัติ', available: false },
      { text: 'เก็บข้อมูลย้อนหลัง 1 ปี', available: true },
    ]
  },
  {
    id: 'm',
    name: 'M',
    price: 390,
    period: 'บาท/เดือน',
    popular: true,
    badge: 'ยอดนิยม',
    features: [
      { text: 'โหมดออฟไลน์ (Offline Mode)', available: true },
      { text: 'เชื่อมต่อได้หลายเครื่อง', available: true },
      { text: 'ใช้งานได้หลายภาษา', available: true },
      { text: 'แสดงบิลให้ลูกค้าดู', available: true },
      { text: 'เชื่อมกล่องเงินสด', available: true },
      { text: 'เปิดลิ้นชักอัตโนมัติ', available: false },
      { text: 'เก็บข้อมูลถาวร', available: true },
    ]
  },
  {
    id: 'l',
    name: 'L',
    price: 590,
    period: 'บาท/เดือน',
    features: [
      { text: 'โหมดออฟไลน์ (Offline Mode)', available: true },
      { text: 'เชื่อมต่อได้หลายเครื่อง', available: true },
      { text: 'ใช้งานได้หลายภาษา', available: true },
      { text: 'แสดงบิลให้ลูกค้าดู', available: true },
      { text: 'เชื่อมกล่องเงินสด', available: true },
      { text: 'เปิดลิ้นชักอัตโนมัติ (อัตโนมัติ)', available: true },
      { text: 'เก็บข้อมูลถาวร + มี AI ทำนายยอดขาย', available: true },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1490,
    period: 'บาท/เดือน',
    features: [
      { text: 'โหมดออฟไลน์ (Offline Mode)', available: true },
      { text: 'เชื่อมต่อได้หลายเครื่อง', available: true },
      { text: 'ใช้งานได้หลายภาษา', available: true },
      { text: 'แสดงบิลให้ลูกค้าดู', available: true },
      { text: 'เชื่อมกล่องเงินสด', available: true },
      { text: 'เปิดลิ้นชักอัตโนมัติ (อัตโนมัติ)', available: true },
      { text: 'เก็บข้อมูลถาวร + AI ทำนาย + บัญชี 200 ผู้ใช้', available: true },
    ]
  }
];

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  {
    title: 'สินค้า',
    icon: 'Package',
    features: [
      { name: 'รหัสสินค้า / หลายบาร์โค้ด', free: true, s: true, m: true, l: true, pro: true },
      { name: 'หน่วยสินค้า', free: true, s: false, m: true, l: true, pro: true },
      { name: 'แตกรวม / บรรจุภัณฑ์', free: false, s: false, m: true, l: true, pro: true },
      { name: 'Serial / Lot / Expiry', free: true, s: true, m: true, l: true, pro: true },
      { name: 'แจ้งเตือนเมื่อ หมดอายุ / ใกล้อายุ', free: false, s: false, m: true, l: true, pro: true },
      { name: 'Blacklist สินค้า', free: false, s: false, m: true, l: true, pro: true },
      { name: 'Import / Export Excel', free: true, s: true, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ราคา & โปรโมชั่น',
    icon: 'Tag',
    features: [
      { name: 'ระดับราคา', free: '2 ราคา', s: '2 ราคา', m: true, l: true, pro: true },
      { name: 'ราคาตามกลุ่มลูกค้า', free: false, s: false, m: true, l: true, pro: true },
      { name: 'ราคาตามสาขา / ช่องทาง', free: false, s: false, m: false, l: true, pro: true },
      { name: 'โปรโมชั่น (ส่วนลด/แถม)', free: '1 โปร', s: '5 โปร', m: true, l: true, pro: true },
      { name: 'Coupon / Gift Card', free: false, s: false, m: false, l: true, pro: true },
    ]
  },
  {
    title: 'คลังสินค้า',
    icon: 'Store',
    features: [
      { name: 'ดูสต็อก', free: '100 SKU', s: '300 SKU', m: true, l: true, pro: true },
      { name: 'โอนสินค้า / สต็อกสาขา', free: false, s: false, m: true, l: true, pro: true },
      { name: 'จองสส๊อก / แพ็คสินค้า', free: false, s: false, m: false, l: true, pro: true },
      { name: 'จัดการชั้นวาง / พาเหรด', free: false, s: false, m: true, l: true, pro: true },
      { name: 'FIFO / FILO', free: false, s: false, m: true, l: true, pro: true },
      { name: 'ประวัติการเคลื่อนไหว', free: 'นำเข้า', s:'นำเข้า', m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ต้นทุน & กำไร',
    icon: 'BarChart',
    features: [
      { name: 'ประวัติต้นทุน / ย้อนหลัง', free: '100 SKU', s: '300 SKU', m: true, l: true, pro: true },
      { name: 'FIFO / ราคาเฉลี่ย', free: false, s: false, m: true, l: true, pro: true },
      { name: 'ต้นทุน ณ บิลขาย', free: false, s: false, m: false, l: true, pro: true },
      { name: 'กำไรต่อบิล / ต่อสินค้า', free: false, s: false, m: true, l: true, pro: true },
      { name: 'กำไรสุทธิ', free: false, s: false, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ลูกค้า & สมาชิก',
    icon: 'Users',
    features: [
      { name: 'ข้อมูลลูกค้า / โปรไฟล์', free: true, s: true, m: true, l: true, pro: true },
      { name: 'Tier / คะแนนสมาชิก', free: true, s: true, m: true, l: true, pro: true },
      { name: 'เครดิตเทอม / วันเกิด', free: false, s: false, m: true, l: true, pro: true },
      { name: 'Blacklist ลูกค้า', free: true, s: true, m: true, l: true, pro: true },
      { name: 'QR ลูกค้า', free: false, s: false, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'การชำระเงิน',
    icon: 'CreditCard',
    features: [
      { name: 'เงินสด / โอน / QR / บัตร', free: true, s: true, m: true, l: true, pro: true },
      { name: 'ส่วนลด / Refund', free: false, s: false, m: true, l: true, pro: true },
      { name: 'ประวัติการชำระเงิน', free: '3 เดือน', s: '1 ปี', m: true, l: true, pro: true },
    ]
  },
  {
    title: 'จัดซื้อ',
    icon: 'ShoppingCart',
    features: [
      { name: 'ใบสั่งซื้อ (PO)', free: '10 ใบ', s: '20 ใบ', m: true, l: true, pro: true },
      { name: 'ใบรับซื้อ (PR)', free: false, s: false, m: true, l: true, pro: true },
      { name: 'ใบส่งคืน (GR)', free: true, s: true, m: true, l: true, pro: true },
      { name: 'แคตตาล็อกซัพพลายเออร์', free: false, s: false, m: true, l: true, pro: true },
      { name: 'Credit Term & ประเมิน Supplier', free: false, s: false, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'B2B & การเงิน',
    icon: 'Briefcase',
    features: [
      { name: 'ใบแสดงราคา / SO / DO', free: false, s: false, m: false, l: true, pro: true },
      { name: 'ใบแจ้งหนี้ B2B', free: false, s: false, m: false, l: true, pro: true },
      { name: 'AP / AR', free: false, s: false, m: true, l: true, pro: true },
      { name: 'e-Tax Invoice / ภาษีหลายอัตรา', free: false, s: false, m: true, l: true, pro: true },
      { name: 'รายงานภาษี', free: false, s: false, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ผู้ใช้ & สาขา',
    icon: 'UserCheck',
    features: [
      { name: 'จำนวน User', free: '5 คน', s: '10 คน', m: '20 คน', l: '50 คน', pro: '200 คน' },
      { name: 'ผู้ใช้หลายคน (Admin)', free: '1 คน', s: '1 คน', m: '1 คน', l: '4 คน', pro: '8 คน' },
      { name: 'Role / Permission', free: true, s: true, m: true, l: true, pro: true },
      { name: 'สิทธิ์ตามสาขา / 2FA', free: false, s: false, m: false, l: true, pro: true },
      { name: 'หลายสาขา / แยกราคาต่อราคา', free: false, s: false, m: false, l: true, pro: true },
    ]
  },
  {
    title: 'Audit & Log',
    icon: 'Shield',
    features: [
      { name: 'Login/Logout / Change History', free: '3 เดือน', s: '1 ปี', m: true, l: true, pro: true },
      { name: 'Tamper-proof Log', free: false, s: false, m: true, l: true, pro: true },
      { name: 'All Log / Data Export Log', free: '3 เดือน', s: '1 ปี', m: true, l: true, pro: true },
    ]
  },
  {
    title: 'BI & AI',
    icon: 'TrendingUp',
    features: [
      { name: 'รายงานกราฟ', free: true, s: true, m: true, l: true, pro: true },
      { name: 'วิเคราะห์ยอดขาย', free: false, s: false, m: true, l: true, pro: true },
      { name: 'AI คาดการณ์ยอดขาย', free: false, s: false, m: false, l: true, pro: true },
      { name: 'AI ตรวจจับการโกง', free: false, s: false, m: false, l: true, pro: true },
    ]
  },
];

export const DEMO_PRODUCTS: POSItem[] = [
  { id: 'p1', name: 'โค้ก กระป๋อง 325 มล.', price: 15, category: 'เครื่องดื่ม', image: '🥤', stock: 45 },
  { id: 'p2', name: 'น้ำดื่มสิงห์ 600 มล.', price: 10, category: 'เครื่องดื่ม', image: '💧', stock: 120 },
  { id: 'p3', name: 'เลย์ มันฝรั่งแผ่นเรียบ รสออริจินัล', price: 20, category: 'ขนมขบเคี้ยว', image: '🥔', stock: 35 },
  { id: 'p4', name: 'เบนโตะ ปลาหมึกอบทรงเครื่อง', price: 20, category: 'ขนมขบเคี้ยว', image: '🦑', stock: 50 },
  { id: 'p5', name: 'มาม่า บะหมี่กึ่งสำเร็จรูป รสต้มยำกุ้ง', price: 8, category: 'อาหารแห้ง', image: '🍜', stock: 85 },
  { id: 'p6', name: 'ไข่ไก่แพ็ค 10 ฟอง เบอร์ 2', price: 45, category: 'ของสด', image: '🥚', stock: 12 },
  { id: 'p7', name: 'นมเปรี้ยวดัชมิลล์ รสผลไม้รวม', price: 12, category: 'ของสด', image: '🥛', stock: 24 },
  { id: 'p8', name: 'ขนมปังฟาร์มเฮ้าส์ โฮลวีต', price: 24, category: 'เบเกอรี่', image: '🍞', stock: 18 },
  { id: 'p9', name: 'กาแฟกระป๋อง เบอร์ดี้ ไอซ์', price: 17, category: 'เครื่องดื่ม', image: '☕', stock: 40 },
  { id: 'p10', name: 'ยาสีฟัน คอลเกต 150 กรัม', price: 55, category: 'ของใช้ในครัวเรือน', image: '🪥', stock: 15 }
];

export const FAQS = [
  {
    question: 'ระบบ GrowStore POS รองรับอุปกรณ์อะไรบ้าง?',
    answer: 'ระบบถูกออกแบบมาให้เป็น Cross-platform สามารถทำงานได้อย่างลื่นไหลบน มือถือ (iOS, Android), แท็บเล็ต (iPad, Android Tablet), และเครื่องเดสก์ท็อป (Windows, macOS, Linux) รวมถึงเครื่องหน้าจอขาย POS สำเร็จรูปทุกชนิด'
  },
  {
    question: 'หากไม่มีการเชื่อมต่ออินเทอร์เน็ต จะสามารถขายของได้หรือไม่?',
    answer: 'สามารถขายได้ตามปกติ! GrowStore มีโหมด Offline ออฟไลน์อัจฉริยะ ข้อมูลการขายจะถูกเก็บไว้ในเครื่องอย่างปลอดภัย และเมื่ออุปกรณ์กลับมาเชื่อมต่ออินเทอร์เน็ต ระบบจะซิงค์ข้อมูลขึ้นระบบคลาวด์โดยอัตโนมัติ'
  },
  {
    question: 'ลิ้นชักเก็บเงินอัตโนมัติ 2 ชั้น ทำงานร่วมกับโปรแกรมขายหน้าร้านอย่างไร?',
    answer: 'ลิ้นชักนี้มาพร้อมพอร์ต RJ11 ซึ่งเชื่อมต่อโดยตรงกับเครื่องพิมพ์ใบเสร็จ เมื่อมีคำสั่งพิมพ์ใบเสร็จจากระบบ GrowStore POS เครื่องพิมพ์จะส่งกระแสไฟไปกระตุ้นให้ลิ้นชักเด้งเปิดออกอัตโนมัติอย่างรวดเร็วและปลอดภัย'
  },
  {
    question: 'มีบริการช่วยเหลือหลังการขายอย่างไรบ้าง?',
    answer: 'เรามีทีมงานซัพพอร์ตช่วยเหลือตอบคำถามและแก้ไขปัญหาผ่านทางไลน์และโทรศัพท์ ตลอด 24 ชั่วโมงสำหรับลูกค้าแพ็คเกจ M ขึ้นไป พร้อมทั้งมีคลิปคู่มือการใช้งานและเอกสารการใช้งานสอนทุกขั้นตอนแบบเข้าใจง่าย'
  }
];
