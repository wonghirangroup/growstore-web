import { useState } from 'react';
import { ChevronRight, ChevronLeft, Search, Play, Clock, TrendingUp, ShoppingBag, Receipt, Package, Truck, RotateCcw, Wrench, Wallet, ChartColumn, LucideIcon } from 'lucide-react';
import banner44 from '../../images/banner444.png';

interface VideoCategory {
  id: string;
  titleTH: string;
  titleEN: string;
  videos: { nameTH: string; nameEN: string; desc: string; date: string; videoId?: string; duration?: string }[];
}

const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: 'marketing', titleTH: 'การตลาด', titleEN: 'Marketing',
    videos: [
      { nameTH: 'การตลาดออนไลน์',  nameEN: 'Online Marketing',  desc: 'แนะนำการทำการตลาดออนไลน์สำหรับร้านค้า', date: 'Date DD MM YY', duration: '5:24' },
      { nameTH: 'โปรโมชั่นร้านค้า', nameEN: 'Store Promotion',  desc: 'วิธีสร้างโปรโมชั่นเพื่อดึงดูดลูกค้า',    date: 'Date DD MM YY', duration: '3:47' },
      { nameTH: 'สื่อโซเชียล',       nameEN: 'Social Media',     desc: 'การใช้โซเชียลมีเดียเพื่อเพิ่มยอดขาย',   date: 'Date DD MM YY', duration: '7:12' },
      { nameTH: 'วิเคราะห์ตลาด',    nameEN: 'Market Analysis',  desc: 'เครื่องมือวิเคราะห์ตลาดใน GrowStore',   date: 'Date DD MM YY', duration: '6:05' },
    ],
  },
  {
    id: 'purchase', titleTH: 'การซื้อ', titleEN: 'Purchasing',
    videos: [
      { nameTH: 'สั่งซื้อสินค้า',       nameEN: 'Order Products',   desc: 'ขั้นตอนการสั่งซื้อและรับสินค้าเข้าคลัง', date: 'Date DD MM YY', duration: '4:33' },
      { nameTH: 'จัดการซัพพลายเออร์',   nameEN: 'Manage Suppliers', desc: 'วิธีเพิ่มและจัดการซัพพลายเออร์',          date: 'Date DD MM YY', duration: '5:18' },
      { nameTH: 'ใบสั่งซื้อ',           nameEN: 'Purchase Order',   desc: 'การสร้างและติดตามใบสั่งซื้อ',             date: 'Date DD MM YY', duration: '3:55' },
      { nameTH: 'ต้นทุนสินค้า',         nameEN: 'Cost of Goods',    desc: 'การคำนวณต้นทุนและกำไร',                   date: 'Date DD MM YY', duration: '8:20' },
    ],
  },
  {
    id: 'stock', titleTH: 'คลังสินค้า', titleEN: 'Inventory',
    videos: [
      { nameTH: 'เพิ่มสินค้าใหม่',      nameEN: 'Add New Product',    desc: 'ขั้นตอนการเพิ่มสินค้าและตั้งค่าหมวดหมู่',   date: 'Date DD MM YY', duration: '4:10' },
      { nameTH: 'ตรวจนับสต็อก',         nameEN: 'Stock Count',        desc: 'วิธีตรวจนับและอัปเดตสต็อกสินค้า',           date: 'Date DD MM YY', duration: '6:45' },
      { nameTH: 'แจ้งเตือนสินค้าหมด',   nameEN: 'Low Stock Alert',    desc: 'ตั้งค่าแจ้งเตือนเมื่อสินค้าใกล้หมด',         date: 'Date DD MM YY', duration: '2:58' },
      { nameTH: 'โอนย้ายสต็อก',         nameEN: 'Stock Transfer',     desc: 'การโอนสินค้าระหว่างคลังสาขา',               date: 'Date DD MM YY', duration: '5:37' },
    ],
  },
  {
    id: 'sales', titleTH: 'การขาย', titleEN: 'Sales',
    videos: [
      { nameTH: 'เปิดบิลขาย',           nameEN: 'Create Invoice',     desc: 'วิธีสร้างบิลและรับชำระเงินหน้าร้าน',         date: 'Date DD MM YY', duration: '3:22' },
      { nameTH: 'ส่วนลดและโปรโมชั่น',   nameEN: 'Discounts',          desc: 'การตั้งค่าส่วนลดและโปรโมชั่นพิเศษ',          date: 'Date DD MM YY', duration: '4:48' },
      { nameTH: 'ประวัติการขาย',         nameEN: 'Sales History',      desc: 'ดูและกรองประวัติการขายย้อนหลัง',             date: 'Date DD MM YY', duration: '7:03' },
      { nameTH: 'ยกเลิกรายการขาย',      nameEN: 'Void Sale',          desc: 'วิธียกเลิกและแก้ไขรายการขาย',                date: 'Date DD MM YY', duration: '2:41' },
    ],
  },
  {
    id: 'delivery', titleTH: 'การขนส่ง', titleEN: 'Delivery',
    videos: [
      { nameTH: 'สร้างใบส่งสินค้า',     nameEN: 'Delivery Order',     desc: 'การสร้างและพิมพ์ใบส่งสินค้า',                date: 'Date DD MM YY', duration: '5:59' },
      { nameTH: 'ติดตามพัสดุ',           nameEN: 'Track Shipment',     desc: 'วิธีติดตามสถานะการจัดส่ง',                   date: 'Date DD MM YY', duration: '3:14' },
      { nameTH: 'เชื่อมต่อขนส่ง',       nameEN: 'Shipping Integration',desc: 'การเชื่อมต่อบริษัทขนส่งกับระบบ',            date: 'Date DD MM YY', duration: '9:07' },
      { nameTH: 'ค่าจัดส่ง',             nameEN: 'Shipping Rates',     desc: 'การตั้งค่าและคำนวณค่าจัดส่ง',                date: 'Date DD MM YY', duration: '4:25' },
    ],
  },
  {
    id: 'return', titleTH: 'คืนสินค้า', titleEN: 'Returns',
    videos: [
      { nameTH: 'รับคืนสินค้า',          nameEN: 'Accept Return',      desc: 'ขั้นตอนการรับคืนสินค้าจากลูกค้า',            date: 'Date DD MM YY', duration: '4:52' },
      { nameTH: 'เครดิตโน้ต',            nameEN: 'Credit Note',        desc: 'การออกเครดิตโน้ตเมื่อรับคืนสินค้า',          date: 'Date DD MM YY', duration: '6:18' },
      { nameTH: 'คืนเงินลูกค้า',         nameEN: 'Refund',             desc: 'วิธีดำเนินการคืนเงินและบันทึกบัญชี',          date: 'Date DD MM YY', duration: '3:40' },
      { nameTH: 'รายงานการคืน',          nameEN: 'Return Report',      desc: 'ดูสรุปรายการคืนสินค้าทั้งหมด',               date: 'Date DD MM YY', duration: '5:11' },
    ],
  },
  {
    id: 'asset', titleTH: 'คลังครุภัณฑ์และวัสดุ', titleEN: 'Assets',
    videos: [
      { nameTH: 'ลงทะเบียนครุภัณฑ์',    nameEN: 'Register Asset',     desc: 'การเพิ่มและจัดการรายการครุภัณฑ์',            date: 'Date DD MM YY', duration: '7:36' },
      { nameTH: 'เบิกวัสดุ',             nameEN: 'Issue Materials',    desc: 'ขั้นตอนการเบิกวัสดุสำหรับการใช้งาน',          date: 'Date DD MM YY', duration: '3:29' },
      { nameTH: 'ตรวจสอบสภาพ',          nameEN: 'Asset Inspection',   desc: 'การตรวจสอบและบันทึกสภาพครุภัณฑ์',            date: 'Date DD MM YY', duration: '5:44' },
      { nameTH: 'รายงานครุภัณฑ์',       nameEN: 'Asset Report',       desc: 'ดูสรุปมูลค่าและสถานะครุภัณฑ์',               date: 'Date DD MM YY', duration: '4:02' },
    ],
  },
  {
    id: 'finance', titleTH: 'การเงิน', titleEN: 'Finance',
    videos: [
      { nameTH: 'รับชำระเงิน',           nameEN: 'Receive Payment',    desc: 'วิธีบันทึกการรับชำระเงินจากลูกค้า',           date: 'Date DD MM YY', duration: '6:30' },
      { nameTH: 'จ่ายเจ้าหนี้',          nameEN: 'Pay Supplier',       desc: 'การบันทึกการจ่ายเงินให้ซัพพลายเออร์',         date: 'Date DD MM YY', duration: '4:17' },
      { nameTH: 'กระทบยอดเงิน',         nameEN: 'Reconciliation',     desc: 'การกระทบยอดเงินสดและธนาคาร',                 date: 'Date DD MM YY', duration: '8:55' },
      { nameTH: 'งบการเงิน',             nameEN: 'Financial Report',   desc: 'ดูงบกำไรขาดทุนและงบดุล',                     date: 'Date DD MM YY', duration: '10:22' },
    ],
  },
  {
    id: 'report', titleTH: 'รายงาน', titleEN: 'Reports',
    videos: [
      { nameTH: 'รายงานยอดขาย',         nameEN: 'Sales Report',       desc: 'ดูและส่งออกรายงานยอดขายรายวัน/เดือน',         date: 'Date DD MM YY', duration: '5:08' },
      { nameTH: 'รายงานสต็อก',          nameEN: 'Stock Report',       desc: 'สรุปสินค้าคงเหลือและมูลค่าคลัง',              date: 'Date DD MM YY', duration: '3:51' },
      { nameTH: 'รายงานลูกค้า',         nameEN: 'Customer Report',    desc: 'วิเคราะห์พฤติกรรมและยอดซื้อของลูกค้า',        date: 'Date DD MM YY', duration: '6:49' },
      { nameTH: 'ส่งออก Excel',          nameEN: 'Export Excel',       desc: 'วิธีส่งออกข้อมูลรายงานเป็นไฟล์ Excel',         date: 'Date DD MM YY', duration: '2:33' },
    ],
  },
];

function VideoCard({ video, isTH, gridMode, onPlay }: {
  video: VideoCategory['videos'][0];
  isTH: boolean;
  gridMode?: boolean;
  onPlay: (videoId: string, title: string) => void;
}) {
  const videoId = video.videoId ?? 'JCGLR8AJOiI';
  const title = isTH ? video.nameTH : video.nameEN;

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col ${gridMode ? 'w-full' : 'flex-shrink-0'}`} style={gridMode ? undefined : { width: CARD_W }}>
      {/* Thumbnail — 16:9, no black bars */}
      <div className="relative aspect-video bg-slate-200">
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#2DA6DD] text-white text-sm font-bold px-5 py-1.5 rounded-full whitespace-nowrap max-w-[88%] truncate">
          {title}
        </div>
        <button
          onClick={() => onPlay(videoId, title)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 fill-[#131C45] text-[#131C45] ml-1" />
          </div>
        </button>
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col" style={{ height: 100 }}>
        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 flex-1">{video.desc}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="text-xs text-slate-400">{video.date}</p>
          {video.duration && (
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 border border-slate-300 rounded-full px-2 py-0.5">
              <Clock className="w-3 h-3" />
              {video.duration} {isTH ? 'นาที' : 'min'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const CARD_W = 272;
const CARD_GAP = 16;
const VISIBLE = 3;

const DROPDOWN_ITEMS = [
  { id: 'all',       th: 'ทั้งหมด',              en: 'All' },
  { id: 'marketing', th: 'การตลาด',              en: 'Marketing' },
  { id: 'purchase',  th: 'การซื้อ',               en: 'Purchasing' },
  { id: 'stock',     th: 'คลังสินค้า',            en: 'Inventory' },
  { id: 'sales',     th: 'การขาย',               en: 'Sales' },
  { id: 'delivery',  th: 'การขนส่ง',             en: 'Delivery' },
  { id: 'return',    th: 'คืนสินค้า',             en: 'Returns' },
  { id: 'asset',     th: 'คลังครุภัณฑ์และวัสดุ', en: 'Assets' },
  { id: 'finance',   th: 'การเงิน',              en: 'Finance' },
  { id: 'report',    th: 'รายงาน',               en: 'Reports' },
];

function VideoGallery({ isTH }: { isTH: boolean }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [indices, setIndices] = useState<Record<string, number>>({});
  const [playingVideo, setPlayingVideo] = useState<{ id: string; title: string } | null>(null);

  const getIdx = (id: string) => indices[id] ?? 0;
  const setIdx = (id: string, val: number) => setIndices(prev => ({ ...prev, [id]: val }));

  const categories = DROPDOWN_ITEMS.filter(d => d.id !== 'all');

  const categoryIcons: Record<string, LucideIcon> = {
    marketing: TrendingUp,
    purchase: ShoppingBag,
    sales: Receipt,
    stock: Package,
    delivery: Truck,
    return: RotateCcw,
    asset: Wrench,
    finance: Wallet,
    report: ChartColumn,
  };

  const visibleCategories = selectedFilter === 'all'
    ? VIDEO_CATEGORIES
    : VIDEO_CATEGORIES.filter(c => c.id === selectedFilter);

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 pb-8 flex gap-6 items-start">

        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
          {/* Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2DA6DD]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isTH ? 'ค้นหาการสอน' : 'Search'}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm outline-none focus:border-[#2DA6DD]"
              />
            </div>
          </div>

          {/* Header */}
          <div className="px-4 pb-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`w-full text-center px-4 py-2 rounded-lg text-sm font-black cursor-pointer transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#30A4DD] text-white'
                  : 'text-[#131C45] hover:text-[#30A4DD] hover:bg-[#30A4DD]/10'
              }`}
            >
              {isTH ? 'ทั้งหมด' : 'All'}
            </button>
          </div>

          {/* Category list */}
          <div className="pb-4 space-y-1">
            {categories.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedFilter(prev => prev === item.id ? 'all' : item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors rounded-lg ${
                  selectedFilter === item.id
                    ? 'bg-[#30A4DD] text-white'
                    : 'text-[#131C45] hover:text-[#30A4DD] hover:bg-[#30A4DD]/10'
                }`}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {categoryIcons[item.id] && (() => {
                    const Icon = categoryIcons[item.id];
                    return <Icon className="w-5 h-5" />;
                  })()}
                </div>
                <span className="text-sm font-semibold text-left">{isTH ? item.th : item.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-8">
          {visibleCategories.map(cat => {
            const isFiltered = selectedFilter !== 'all';
            const idx = getIdx(cat.id);
            const maxIdx = cat.videos.length - VISIBLE;
            const atStart = idx === 0;
            const atEnd = idx >= maxIdx;
            const translateX = -(idx * (CARD_W + CARD_GAP));

            return (
              <div key={cat.id} className="space-y-3">
                <h3 className="text-xl font-bold text-[#2DA6DD]">
                  {isTH ? cat.titleTH : cat.titleEN}
                </h3>
                {isFiltered ? (
                  /* Grid — no arrows */
                  <div className="grid grid-cols-3 gap-4">
                    {cat.videos.map((v, i) => (
                      <VideoCard key={i} video={v} isTH={isTH} gridMode onPlay={(id, title) => setPlayingVideo({ id, title })} />
                    ))}
                  </div>
                ) : (
                  /* Carousel — with arrows */
                  <div className="relative">
                    <button
                      onClick={() => setIdx(cat.id, Math.max(0, idx - 1))}
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#EC6F44] flex items-center justify-center shadow-md cursor-pointer z-10 transition-opacity duration-300"
                      style={{ opacity: atStart ? 0.25 : 1, left: -20 }}
                      disabled={atStart}
                    >
                      <ChevronLeft className="w-5 h-5 text-[#EC6F44]" />
                    </button>
                    <div className="overflow-hidden" style={{ width: VISIBLE * CARD_W + (VISIBLE - 1) * CARD_GAP }}>
                      <div
                        className="flex gap-4"
                        style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
                      >
                        {cat.videos.map((v, i) => (
                          <VideoCard key={i} video={v} isTH={isTH} onPlay={(id, title) => setPlayingVideo({ id, title })} />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setIdx(cat.id, Math.min(maxIdx, idx + 1))}
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#EC6F44] flex items-center justify-center shadow-md cursor-pointer z-10 transition-opacity duration-300"
                      style={{ opacity: atEnd ? 0.25 : 1, left: VISIBLE * CARD_W + (VISIBLE - 1) * CARD_GAP - 20 }}
                      disabled={atEnd}
                    >
                      <ChevronRight className="w-5 h-5 text-[#EC6F44]" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className="w-full max-w-3xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1`}
                title={playingVideo.title}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface GuidesViewProps {
  language: 'TH' | 'EN';
}

type Tab = 'start' | 'video' | 'article' | 'system';

export default function GuidesView({ language }: GuidesViewProps) {
  const isTH = language === 'TH';
  const [activeTab, setActiveTab] = useState<Tab>('start');

  const tabs: { id: Tab; labelTH: string; labelEN: string }[] = [
    { id: 'start',   labelTH: 'เริ่มต้นใช้งาน', labelEN: 'Getting Started' },
    { id: 'video',   labelTH: 'วิดีโอ',           labelEN: 'Videos' },
    { id: 'article', labelTH: 'บทความ',           labelEN: 'Articles' },
    { id: 'system',  labelTH: 'แนะนำระบบ',        labelEN: 'System Guide' },
  ];

  const contentTitle: Record<Tab, { th: string; en: string }> = {
    start:   { th: 'แนะนำการใช้งานสำหรับผู้เริ่มต้น', en: 'Beginner Guide to GrowStore' },
    video:   { th: 'วิดีโอสอนการใช้งาน',               en: 'Tutorial Videos' },
    article: { th: 'บทความและเคล็ดลับ',                en: 'Articles & Tips' },
    system:  { th: 'แนะนำระบบ POS',                   en: 'POS System Overview' },
  };

  return (
    <div>

      {/* Hero Banner */}
      <section className="relative">
        <img src={banner44} alt="GrowStore Banner" className="w-full object-cover" style={{ height: 500 }} />
        <div className="absolute inset-0 flex flex-col justify-center" style={{ paddingLeft: '38%' }}>
          <p className="font-black drop-shadow-lg text-[#30A4DD] text-8xl" style={{ marginBottom: '0.3em', marginLeft: '-2rem' }}>
            {isTH ? 'มารู้จัก' : 'Discover'}
          </p>
          <p className="font-black drop-shadow-lg text-8xl" style={{ marginLeft: '2rem' }}>
            <span className="text-[#131C45]">Grow</span>
            <span className="text-[#2DA6DD]">Store</span>
            {isTH && <span className="text-[#131C45]"> กัน</span>}
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="pb-16" style={{ background: '#F9F9F9' }}>

        {/* Tab bar */}
        <div className="flex justify-center gap-4 py-8 px-4 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-8 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all"
              style={
                activeTab === tab.id
                  ? { background: '#EC6F44', color: '#fff', border: '2px solid #EC6F44' }
                  : { background: 'transparent', color: '#EC6F44', border: '2px solid #EC6F44' }
              }
            >
              {isTH ? tab.labelTH : tab.labelEN}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab !== 'video' ? (
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            <p className="text-[#2DA6DD] text-center font-bold text-xl">
              {isTH ? contentTitle[activeTab].th : contentTitle[activeTab].en}
            </p>
            <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/JCGLR8AJOiI"
                title="GrowStore Video"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <VideoGallery isTH={isTH} />
        )}

      </section>

    </div>
  );
}
