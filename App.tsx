import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { MacWaterBubbles } from './components/MacWaterBubbles';
import { HomeDashboard } from './components/HomeDashboard';
import { LiveClassRoom } from './components/LiveClassRoom';
import { CoursesBatches } from './components/CoursesBatches';
import { PythonLab } from './components/PythonLab';
import { SaathiMentor } from './components/SaathiMentor';
import { CodeGuruAI } from './components/CodeGuruAI';
import { ConnectMentor } from './components/ConnectMentor';
import { CodePlayground } from './components/CodePlayground';
import { CommunityForum } from './components/CommunityForum';
import { AttendanceModal } from './components/AttendanceModal';
import { BrandLogo } from './components/BrandLogo';
import { HeartHandshake, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [streakCount, setStreakCount] = useState<number>(14);
  const [codeCoins, setCodeCoins] = useState<number>(850);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState<boolean>(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/attendance')
      .then((res) => res.json())
      .then((data) => {
        if (data.isPresentToday !== undefined) setIsAttendanceMarked(data.isPresentToday);
        if (data.currentStreak) setStreakCount(data.currentStreak);
        if (data.codeCoins) setCodeCoins(data.codeCoins);
      })
      .catch(() => {});
  }, []);

  const handlePunchAttendance = async () => {
    try {
      const res = await fetch('/api/attendance/punch', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setIsAttendanceMarked(true);
        setStreakCount((prev) => prev + 1);
        setCodeCoins((prev) => prev + 50);
      }
    } catch {
      setIsAttendanceMarked(true);
      setStreakCount((prev) => prev + 1);
      setCodeCoins((prev) => prev + 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col relative selection:bg-blue-600/30 selection:text-blue-200">
      {/* 2026 Mac Liquid Water Bubbles Background Canvas */}
      <MacWaterBubbles />

      {/* macOS Frosted Glass Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        streakCount={streakCount}
        codeCoins={codeCoins}
        isAttendanceMarked={isAttendanceMarked}
        onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 relative z-10 pb-16">
        {currentTab === 'home' && (
          <HomeDashboard
            onNavigate={setCurrentTab}
            streakCount={streakCount}
            codeCoins={codeCoins}
            isAttendanceMarked={isAttendanceMarked}
            onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
          />
        )}
        {currentTab === 'live' && <LiveClassRoom />}
        {currentTab === 'batches' && <CoursesBatches codeCoins={codeCoins} />}
        {currentTab === 'python' && <PythonLab />}
        {currentTab === 'saathi' && <SaathiMentor />}
        {currentTab === 'codeguru' && <CodeGuruAI />}
        {currentTab === 'mentors' && <ConnectMentor />}
        {currentTab === 'playground' && <CodePlayground onAskCodeGuru={() => setCurrentTab('codeguru')} />}
        {currentTab === 'community' && <CommunityForum />}
      </main>

      {/* Attendance & Rewards Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        isMarkedToday={isAttendanceMarked}
        streakCount={streakCount}
        codeCoins={codeCoins}
        onPunchAttendance={handlePunchAttendance}
        onRedeemReward={(title, cost) => setCodeCoins((prev) => Math.max(0, prev - cost))}
      />

      {/* Floating Bottom Quick Triggers */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        <button
          onClick={() => setCurrentTab('saathi')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full mac-glass border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-600/30 transition-all shadow-lg cursor-pointer"
        >
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold hidden sm:inline">Saathi (साथी)</span>
        </button>
        <button
          onClick={() => setCurrentTab('codeguru')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full mac-glass border border-blue-500/40 text-blue-300 hover:text-white hover:bg-blue-600/30 transition-all shadow-lg cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold hidden sm:inline">CodeGuru AI</span>
        </button>
      </div>
    </div>
  );
}
