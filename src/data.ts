/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingPlan, BusinessType, PackageCategory, POSItem } from './types';

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'sme',
    title: 'SME ขนาดเล็ก - กลาง',
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
    title: 'สินค้าและการจัดการทั่วไป',
    features: [
      { name: 'POS ขายหน้าร้าน (บิล/ต่อเดือน)', free: '300', s: '500', m: 'ไม่จำกัด', l: 'ไม่จำกัด', pro: 'ไม่จำกัด' },
      { name: 'พักบิล / Clone บิล', free: true, s: true, m: true, l: true, pro: true },
      { name: 'ยกเลิก / แก้ไขบิลย้อนหลัง', free: true, s: true, m: true, l: true, pro: true },
      { name: 'คืน / เปลี่ยนสินค้า', free: false, s: false, m: true, l: true, pro: true },
      { name: 'โหมด Offline ทำงานแบบไม่มีเน็ต', free: true, s: true, m: true, l: true, pro: true },
      { name: 'ซิงค์ข้อมูลหลายเครื่องเรียลไทม์', free: false, s: false, m: true, l: true, pro: true },
      { name: 'จอแสดงผลฝั่งลูกค้า (Customer Display)', free: false, s: false, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ราคา & โปรโมชั่น',
    features: [
      { name: 'ตั้งราคาสินค้าหลายระดับ (ปลีก-ส่ง)', free: false, s: '2 ระดับ', m: '5 ระดับ', l: 'ไม่จำกัด', pro: 'ไม่จำกัด' },
      { name: 'จัดเซ็ตโปรโมชั่น ซื้อคู่ถูกกว่า', free: false, s: false, m: true, l: true, pro: true },
      { name: 'คูปองส่วนลด & แต้มสะสม', free: false, s: true, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'คลังสินค้า (Inventory)',
    features: [
      { name: 'ระบบแจ้งเตือนสินค้าใกล้หมดสต็อก', free: true, s: true, m: true, l: true, pro: true },
      { name: 'จัดการสต็อกแยกสาขา', free: false, s: false, m: '3 สาขา', l: '10 สาขา', pro: 'ไม่จำกัด' },
      { name: 'รองรับการนำเข้า-ส่งออก Excel', free: true, s: true, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'ต้นทุน & กำไร',
    features: [
      { name: 'รายงานคำนวณต้นทุนเฉลี่ย (FIFO/LIFO)', free: false, s: true, m: true, l: true, pro: true },
      { name: 'สรุปยอดขายและกำไรสุทธิรายวัน/เดือน', free: true, s: true, m: true, l: true, pro: true },
    ]
  },
  {
    title: 'BI & AI อัจฉริยะ',
    features: [
      { name: 'AI วิเคราะห์ยอดขายและคาดการณ์สินค้าขายดี', free: false, s: false, m: false, l: true, pro: true },
      { name: 'Dashboard สรุปผลภาพรวมแบบ Interactive', free: 'พื้นฐาน', s: 'พื้นฐาน', m: 'ระดับสูง', l: 'ระดับสูง', pro: 'ระดับสูง' },
    ]
  }
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
