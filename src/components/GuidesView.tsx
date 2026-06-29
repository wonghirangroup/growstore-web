import { BookOpen } from 'lucide-react';

interface GuidesViewProps {
  language: 'TH' | 'EN';
}

export default function GuidesView({ language }: GuidesViewProps) {
  const isTH = language === 'TH';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24">
      <div className="flex flex-col items-center space-y-4 text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isTH ? 'คู่มือการใช้งาน' : 'User Guides'}
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          {isTH ? 'เนื้อหากำลังจะมาเร็วๆ นี้' : 'Content coming soon'}
        </p>
      </div>
    </div>
  );
}
