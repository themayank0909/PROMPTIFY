import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Terminal, Cpu, Layers, Briefcase } from 'lucide-react';
import heroWorkspaceImg from '../assets/images/hero_engineer_workspace_1791016643275.jpg';

interface HeroProps {
  onStartJourney: () => void;
  onExploreRoadmap: () => void;
}

const JOURNEY_STEPS = [
  { id: 1, label: 'YEAR 1', role: 'Foundation', focus: 'Syntax, Memory & Linux', icon: Terminal },
  { id: 2, label: 'YEAR 2', role: 'Engineering', focus: 'DSA & Core CS Systems', icon: Cpu },
  { id: 3, label: 'YEAR 3', role: 'Build & Ship', focus: 'Full-Stack & Open Source', icon: Layers },
  { id: 4, label: 'YEAR 4', role: 'Career Ready', focus: 'System Design & Interviews', icon: Briefcase },
  { id: 5, label: 'OUTCOME', role: 'Software Engineer', focus: 'World-Class Product Companies', icon: CheckCircle2 },
];

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreRoadmap }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#1E232E]">
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 mix-blend-luminosity">
        <img
          src={heroWorkspaceImg}
          alt="Modern developer workspace background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/80 via-[#0B0D10]/95 to-[#0B0D10]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-blue-400 font-medium tracking-wide uppercase mb-4">
            <span>Career Operating System</span>
            <span aria-hidden="true">·</span>
            <span>CS & B.Tech Engineering Blueprint</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-balance">
            4 Years. One Goal. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
              Become Industry Ready.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
            A structured roadmap to build the skills, projects, experience and confidence needed to become a world-class software engineer at Google, Microsoft, Amazon, Meta, Apple, and top product companies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <button
              onClick={onStartJourney}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreRoadmap}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-200 bg-[#161A22] hover:bg-[#1E232E] border border-[#1E232E] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Explore Roadmap
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Interactive Progression: YEAR 1 -> 2 -> 3 -> 4 -> SOFTWARE ENGINEER */}
          <div className="bg-[#11141A]/90 border border-[#1E232E] rounded-xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">The 4-Year Progression Pipeline</span>
              <span className="font-mono text-blue-400">Step {activeStep + 1} of {JOURNEY_STEPS.length}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {JOURNEY_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = activeStep === idx;
                const isPast = activeStep > idx;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-3 rounded-lg border transition-all relative ${
                      isActive
                        ? 'bg-blue-950/40 border-blue-500/60 shadow-md ring-1 ring-blue-500/30'
                        : isPast
                        ? 'bg-[#161A22] border-[#252B38] text-slate-300'
                        : 'bg-[#0E1015] border-[#1A1E27] text-slate-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono tracking-wider font-semibold ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    </div>
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {step.role}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {step.focus}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
