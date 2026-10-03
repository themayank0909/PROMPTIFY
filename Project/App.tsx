import React, { useState } from 'react';
import { CareerProvider } from './context/CareerContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoadmapDashboard } from './components/RoadmapDashboard';
import { YearOneDeepDive } from './components/YearOneDeepDive';
import { YearTwoDSAMastery } from './components/YearTwoDSAMastery';
import { YearThreeBuildExperience } from './components/YearThreeBuildExperience';
import { YearFourJobReady } from './components/YearFourJobReady';
import { InterviewSimulator } from './components/InterviewSimulator';
import { DailyCareerOS } from './components/DailyCareerOS';
import { SkillTree } from './components/SkillTree';
import { PhilosophySection } from './components/PhilosophySection';
import { ResourcesHub } from './components/ResourcesHub';
import { CommunityStories } from './components/CommunityStories';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { YearId } from './types';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<YearId>(1);
  const [activeSection, setActiveSection] = useState<string>('roadmap');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const scrollToRoadmap = (year?: YearId) => {
    if (year) setSelectedYear(year);
    const element = document.getElementById('roadmap');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CareerProvider>
      <div className="min-h-screen bg-[#0B0D10] text-[#E6EDF3] flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
        {/* Navigation */}
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* 1. Hero Section */}
        <main className="flex-1">
          <Hero
            onStartJourney={() => scrollToRoadmap(1)}
            onExploreRoadmap={() => scrollToRoadmap(selectedYear)}
          />

          {/* 2 & 3. Interactive 4-Year Roadmap Dashboard */}
          <RoadmapDashboard
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />

          {/* 4. Year 1 Deep-Dive (Programming, Linux, Git, Systems, Communication) */}
          <YearOneDeepDive />

          {/* 5. Year 2 DSA Progression & Core CS (OOP, DBMS, OS, Computer Networks) */}
          <YearTwoDSAMastery />

          {/* 6, 7 & 8. Year 3: Projects Catalog, Open Source / GSoC & Internship Tracker */}
          <YearThreeBuildExperience />

          {/* 9. Year 4: High-Level System Design, LLD & Behavioral STAR Preparation */}
          <YearFourJobReady />

          {/* 10. Technical Interview Simulator with Readiness Scorer */}
          <InterviewSimulator />

          {/* 11. Daily Mission & Career OS Dashboard */}
          <DailyCareerOS />

          {/* 12. Interactive Engineering Skill Tree & Prerequisite Graph */}
          <SkillTree />

          {/* 15. Learning Philosophy: "Don't chase technologies. Build fundamentals." */}
          <PhilosophySection />

          {/* 16. Curated Engineering Knowledge Library & Official Docs */}
          <ResourcesHub />

          {/* 12 & 13. Student Success Stories & FAQ */}
          <CommunityStories />
        </main>

        {/* 14. Final CTA & Footer */}
        <Footer onStartJourney={() => scrollToRoadmap(1)} />

        {/* Global Modals & Drawers */}
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelectAction={setActiveSection}
        />

        <UserProfileDrawer
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      </div>
    </CareerProvider>
  );
}
