import React, { createContext, useContext, useState, useEffect } from 'react';
import { InternshipApplication, ReadinessLevel } from '../types';
import confetti from 'canvas-confetti';

interface CareerContextType {
  completedMilestones: string[];
  toggleMilestone: (id: string) => void;
  isMilestoneCompleted: (id: string) => boolean;

  topicSolvedProblems: Record<string, number>;
  setTopicSolved: (topicId: string, count: number) => void;

  questionReadiness: Record<string, ReadinessLevel>;
  setQuestionReadinessLevel: (qId: string, level: ReadinessLevel) => void;

  internships: InternshipApplication[];
  addInternship: (item: Omit<InternshipApplication, 'id'>) => void;
  updateInternshipStatus: (id: string, status: InternshipApplication['status']) => void;
  deleteInternship: (id: string) => void;

  dailyTasks: DailyTaskItem[];
  toggleDailyTask: (id: string) => void;

  streakCount: number;
  lastCheckinDate: string | null;
  checkInToday: () => boolean;

  totalXP: number;
  userLevel: { level: number; title: string; nextLevelXP: number };

  triggerCelebration: () => void;
}

interface DailyTaskItem {
  id: string;
  title: string;
  category: string;
  targetMinutes: number;
  done: boolean;
}

const DEFAULT_DAILY_TASKS: DailyTaskItem[] = [
  { id: 'dt-1', title: 'Solve 2 DSA Problems (Medium focus)', category: 'DSA', targetMinutes: 60, done: false },
  { id: 'dt-2', title: 'Work on Project / Write clean backend code', category: 'Development', targetMinutes: 60, done: false },
  { id: 'dt-3', title: 'Study 1 CS Core Topic (OS / DBMS / CN)', category: 'CS Core', targetMinutes: 30, done: false },
  { id: 'dt-4', title: 'Explain a technical concept out loud', category: 'Communication', targetMinutes: 20, done: false },
  { id: 'dt-5', title: 'Review 1 System Design architectural pattern', category: 'Engineering', targetMinutes: 30, done: false },
];

const INITIAL_INTERNSHIPS: InternshipApplication[] = [
  {
    id: 'int-1',
    company: 'Google',
    role: 'Software Engineering Intern (Summer 2027)',
    dateApplied: '2026-09-15',
    status: 'OA',
    notes: 'Completed Snapshot assessment. Preparing for follow-up technical phone screen.',
    location: 'Bangalore / Hyderabad / Remote',
    link: 'https://careers.google.com',
  },
  {
    id: 'int-2',
    company: 'Microsoft',
    role: 'Explore / SWE Intern',
    dateApplied: '2026-09-22',
    status: 'Interview',
    notes: 'Round 1 cleared. Final round with Principal Engineering Manager on Monday.',
    location: 'Hyderabad, India',
    link: 'https://careers.microsoft.com',
  },
  {
    id: 'int-3',
    company: 'Amazon',
    role: 'SDE Intern',
    dateApplied: '2026-09-28',
    status: 'Applied',
    notes: 'Applied via employee referral from college alumni.',
    location: 'Bangalore, India',
    link: 'https://amazon.jobs',
  },
];

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lwm_milestones');
      return saved ? JSON.parse(saved) : ['y1-m1', 'y1-m2'];
    } catch {
      return ['y1-m1', 'y1-m2'];
    }
  });

  const [topicSolvedProblems, setTopicSolvedProblems] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('lwm_topic_solved');
      return saved ? JSON.parse(saved) : { arrays: 20, strings: 14, searching: 10, sorting: 8, linked_list: 6 };
    } catch {
      return { arrays: 20, strings: 14, searching: 10, sorting: 8, linked_list: 6 };
    }
  });

  const [questionReadiness, setQuestionReadiness] = useState<Record<string, ReadinessLevel>>(() => {
    try {
      const saved = localStorage.getItem('lwm_question_readiness');
      return saved ? JSON.parse(saved) : { 'dsa-1': 'interview_ready', 'oop-1': 'can_explain', 'dbms-1': 'learning' };
    } catch {
      return { 'dsa-1': 'interview_ready', 'oop-1': 'can_explain', 'dbms-1': 'learning' };
    }
  });

  const [internships, setInternships] = useState<InternshipApplication[]>(() => {
    try {
      const saved = localStorage.getItem('lwm_internships');
      return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
    } catch {
      return INITIAL_INTERNSHIPS;
    }
  });

  const [dailyTasks, setDailyTasks] = useState<DailyTaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('lwm_daily_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_DAILY_TASKS;
    } catch {
      return DEFAULT_DAILY_TASKS;
    }
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('lwm_streak');
      return saved ? parseInt(saved, 10) : 12;
    } catch {
      return 12;
    }
  });

  const [lastCheckinDate, setLastCheckinDate] = useState<string | null>(() => {
    return localStorage.getItem('lwm_last_checkin') || '2026-10-02';
  });

  useEffect(() => {
    localStorage.setItem('lwm_milestones', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  useEffect(() => {
    localStorage.setItem('lwm_topic_solved', JSON.stringify(topicSolvedProblems));
  }, [topicSolvedProblems]);

  useEffect(() => {
    localStorage.setItem('lwm_question_readiness', JSON.stringify(questionReadiness));
  }, [questionReadiness]);

  useEffect(() => {
    localStorage.setItem('lwm_internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('lwm_daily_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  useEffect(() => {
    localStorage.setItem('lwm_streak', streakCount.toString());
  }, [streakCount]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3B82F6', '#60A5FA', '#10B981', '#F59E0B'],
      });
    } catch {}
  };

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) => {
      const exists = prev.includes(id);
      if (!exists) {
        triggerCelebration();
        return [...prev, id];
      }
      return prev.filter((m) => m !== id);
    });
  };

  const isMilestoneCompleted = (id: string) => completedMilestones.includes(id);

  const setTopicSolved = (topicId: string, count: number) => {
    setTopicSolvedProblems((prev) => ({
      ...prev,
      [topicId]: Math.max(0, count),
    }));
  };

  const setQuestionReadinessLevel = (qId: string, level: ReadinessLevel) => {
    setQuestionReadiness((prev) => ({
      ...prev,
      [qId]: level,
    }));
  };

  const addInternship = (item: Omit<InternshipApplication, 'id'>) => {
    const newItem: InternshipApplication = {
      ...item,
      id: `int-${Date.now()}`,
    };
    setInternships((prev) => [newItem, ...prev]);
    triggerCelebration();
  };

  const updateInternshipStatus = (id: string, status: InternshipApplication['status']) => {
    setInternships((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (status === 'Offer') triggerCelebration();
          return { ...item, status };
        }
        return item;
      })
    );
  };

  const deleteInternship = (id: string) => {
    setInternships((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDailyTask = (id: string) => {
    setDailyTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextState = !task.done;
          if (nextState) triggerCelebration();
          return { ...task, done: nextState };
        }
        return task;
      })
    );
  };

  const checkInToday = (): boolean => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (lastCheckinDate === todayStr) {
      return false;
    }
    const nextStreak = streakCount + 1;
    setStreakCount(nextStreak);
    setLastCheckinDate(todayStr);
    localStorage.setItem('lwm_last_checkin', todayStr);
    triggerCelebration();
    return true;
  };

  // XP Formula
  const milestoneXP = completedMilestones.length * 150;
  const dsaXP = Object.values(topicSolvedProblems).reduce((acc, curr) => acc + curr * 20, 0);
  const interviewXP = Object.values(questionReadiness).filter((v) => v === 'interview_ready' || v === 'can_explain').length * 75;
  const streakXP = streakCount * 30;
  const totalXP = milestoneXP + dsaXP + interviewXP + streakXP;

  const getUserLevel = (xp: number) => {
    if (xp < 800) return { level: 1, title: 'Year 1: Foundation Builder', nextLevelXP: 800 };
    if (xp < 2000) return { level: 2, title: 'Year 2: Problem Solving Apprentice', nextLevelXP: 2000 };
    if (xp < 4000) return { level: 3, title: 'Year 3: Full-Stack Builder', nextLevelXP: 4000 };
    return { level: 4, title: 'Year 4: Industry Ready Engineer', nextLevelXP: 7000 };
  };

  return (
    <CareerContext.Provider
      value={{
        completedMilestones,
        toggleMilestone,
        isMilestoneCompleted,
        topicSolvedProblems,
        setTopicSolved,
        questionReadiness,
        setQuestionReadinessLevel,
        internships,
        addInternship,
        updateInternshipStatus,
        deleteInternship,
        dailyTasks,
        toggleDailyTask,
        streakCount,
        lastCheckinDate,
        checkInToday,
        totalXP,
        userLevel: getUserLevel(totalXP),
        triggerCelebration,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) throw new Error('useCareer must be used within a CareerProvider');
  return context;
};
