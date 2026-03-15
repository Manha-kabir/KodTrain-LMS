/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  Play,
  CheckCircle2,
  LogOut,
  Menu,
  X,
  Star,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';
import { TRAINING_MODULES, LEADERBOARD_DATA, Module, Lesson, QuizQuestion } from './constants';

type Page = 'home' | 'dashboard' | 'modules' | 'lesson' | 'quiz' | 'leaderboard' | 'achievements';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // User State
  const [userPoints, setUserPoints] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation handlers
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const startModule = (module: Module) => {
    setSelectedModule(module);
    setCurrentLessonIndex(0);
    navigateTo('lesson');
  };

  const completeLesson = () => {
    if (selectedModule && currentLessonIndex < selectedModule.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    } else {
      navigateTo('quiz');
      setQuizScore(0);
      setQuizFinished(false);
    }
  };

  const handleQuizSubmit = (score: number) => {
    setQuizScore(score);
    setQuizFinished(true);
    
    if (selectedModule && !completedModules.includes(selectedModule.id)) {
      setUserPoints(prev => prev + selectedModule.points);
      setCompletedModules(prev => [...prev, selectedModule.id]);
    }
  };

  // Components
  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out border-r border-slate-800`}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">KodTrain</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => navigateTo('dashboard')} />
          <SidebarLink icon={<BookOpen size={20} />} label="Training Modules" active={currentPage === 'modules' || currentPage === 'lesson' || currentPage === 'quiz'} onClick={() => navigateTo('modules')} />
          <SidebarLink icon={<Trophy size={20} />} label="Leaderboard" active={currentPage === 'leaderboard'} onClick={() => navigateTo('leaderboard')} />
          <SidebarLink icon={<Award size={20} />} label="Achievements" active={currentPage === 'achievements'} onClick={() => navigateTo('achievements')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Employee #4829</p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 w-full p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  const SidebarLink = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
    </button>
  );

  const Header = ({ title }: { title: string }) => (
    <header className="flex items-center justify-between mb-8 lg:mb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <p className="text-slate-500 mt-1">Welcome back, John! Ready to learn today?</p>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Points</span>
          <span className="text-xl font-bold text-indigo-600">{userPoints} pts</span>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-500">
          <Zap size={24} fill="currentColor" />
        </div>
      </div>
      <button 
        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>
    </header>
  );

  // Page Components
  const HomePage = () => (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">The Future of Corporate Training</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
          Train Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">KodTrain</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Empower your workforce with professional skills through interactive modules, 
          real-time assessments, and gamified learning experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigateTo('dashboard')}
            className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 flex items-center gap-3 group"
          >
            Start Training
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-lg transition-all border border-slate-700">
            View Demo
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold">50+</span>
          <span className="text-xs uppercase tracking-widest text-slate-500">Modules</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold">10k+</span>
          <span className="text-xs uppercase tracking-widest text-slate-500">Learners</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold">98%</span>
          <span className="text-xs uppercase tracking-widest text-slate-500">Completion</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold">24/7</span>
          <span className="text-xs uppercase tracking-widest text-slate-500">Support</span>
        </div>
      </motion.div>
    </div>
  );

  const DashboardPage = () => (
    <div className="max-w-6xl mx-auto">
      <Header title="Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          icon={<Zap className="text-orange-500" size={24} />} 
          label="Training Points" 
          value={userPoints.toString()} 
          subValue="+120 this week"
          color="bg-orange-50"
        />
        <StatCard 
          icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
          label="Completed Modules" 
          value={completedModules.length.toString()} 
          subValue={`${TRAINING_MODULES.length - completedModules.length} remaining`}
          color="bg-emerald-50"
        />
        <StatCard 
          icon={<TrendingUp className="text-indigo-500" size={24} />} 
          label="Overall Progress" 
          value={`${Math.round((completedModules.length / TRAINING_MODULES.length) * 100)}%`} 
          subValue="Top 15% of team"
          color="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recommended Modules</h3>
            <button onClick={() => navigateTo('modules')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAINING_MODULES.slice(0, 4).map(module => (
              <ModuleMiniCard 
                key={module.id} 
                module={module} 
                completed={completedModules.includes(module.id)}
                onClick={() => startModule(module)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Achievements</h3>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            {completedModules.length > 0 ? (
              <div className="space-y-4">
                {completedModules.map(id => {
                  const module = TRAINING_MODULES.find(m => m.id === id);
                  return (
                    <div key={id} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module?.color} flex items-center justify-center text-white shadow-lg`}>
                        <Award size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{module?.badge}</p>
                        <p className="text-xs text-slate-500">Earned for {module?.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Award size={32} />
                </div>
                <p className="text-sm text-slate-500">Complete your first module to earn badges!</p>
              </div>
            )}
            <button 
              onClick={() => navigateTo('achievements')}
              className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-sm font-bold transition-colors"
            >
              View All Badges
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ModulesPage = () => (
    <div className="max-w-6xl mx-auto">
      <Header title="Training Modules" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TRAINING_MODULES.map(module => (
          <ModuleCard 
            key={module.id} 
            module={module} 
            completed={completedModules.includes(module.id)}
            onClick={() => startModule(module)}
          />
        ))}
      </div>
    </div>
  );

  const LessonPage = () => {
    if (!selectedModule) return null;
    const lesson = selectedModule.lessons[currentLessonIndex];
    const progress = ((currentLessonIndex + 1) / selectedModule.lessons.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigateTo('modules')}
            className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedModule.title}</p>
            <h2 className="text-2xl font-bold text-slate-900">Lesson {currentLessonIndex + 1}: {lesson.title}</h2>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-bottom border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Clock size={16} />
              {lesson.duration} read
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <BookOpen size={16} />
              Part {currentLessonIndex + 1} of {selectedModule.lessons.length}
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              {lesson.content}
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-indigo-500 italic text-slate-600">
              "Continuous learning is the minimum requirement for success in any field."
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex-1 max-w-xs mr-8">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                <span>Module Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
            <button 
              onClick={completeLesson}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              {currentLessonIndex < selectedModule.lessons.length - 1 ? 'Next Lesson' : 'Start Quiz'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuizPage = () => {
    if (!selectedModule) return null;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [localScore, setLocalScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    const question = selectedModule.quiz[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
      if (isAnswered) return;
      setSelectedOption(index);
      setIsAnswered(true);
      if (index === question.correctAnswer) {
        setLocalScore(prev => prev + 1);
      }
    };

    const nextQuestion = () => {
      if (currentQuestionIndex < selectedModule.quiz.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        handleQuizSubmit(localScore);
      }
    };

    if (quizFinished) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Module Complete!</h2>
            <p className="text-slate-500 text-lg mb-8">
              You scored <span className="font-bold text-slate-900">{quizScore}/{selectedModule.quiz.length}</span> in the {selectedModule.title} quiz.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Points Earned</p>
                <p className="text-3xl font-black text-indigo-600">+{selectedModule.points}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Badge Unlocked</p>
                <p className="text-xl font-bold text-slate-900">{selectedModule.badge}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigateTo('dashboard')}
                className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
              >
                Back to Dashboard
              </button>
              <button 
                onClick={() => navigateTo('leaderboard')}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-bold transition-all"
              >
                View Leaderboard
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Knowledge Check</p>
            <h2 className="text-2xl font-bold text-slate-900">{selectedModule.title}</h2>
          </div>
          <div className="text-sm font-bold text-slate-400">
            Question {currentQuestionIndex + 1} of {selectedModule.quiz.length}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-10 leading-snug">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full p-6 rounded-2xl text-left font-medium transition-all border-2 flex items-center justify-between group ${
                  selectedOption === idx
                    ? idx === question.correctAnswer
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : 'bg-red-50 border-red-500 text-red-900'
                    : isAnswered && idx === question.correctAnswer
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{option}</span>
                {isAnswered && idx === question.correctAnswer && <CheckCircle2 size={20} className="text-emerald-500" />}
                {isAnswered && selectedOption === idx && idx !== question.correctAnswer && <X size={20} className="text-red-500" />}
              </button>
            ))}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex justify-end"
            >
              <button 
                onClick={nextQuestion}
                className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center gap-2"
              >
                {currentQuestionIndex < selectedModule.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const LeaderboardPage = () => (
    <div className="max-w-4xl mx-auto">
      <Header title="Leaderboard" />
      
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white text-center">
          <Trophy size={48} className="mx-auto mb-4 text-yellow-400 fill-yellow-400" />
          <h3 className="text-3xl font-black mb-2">Top Performers</h3>
          <p className="text-indigo-100 opacity-80">Ranking based on total training points earned</p>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {LEADERBOARD_DATA.map((user, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${idx === 0 ? 'bg-yellow-50/50' : 'hover:bg-slate-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                  idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-700' : 'text-slate-300'
                }`}>
                  {idx + 1}
                </div>
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.completed} Modules Completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-indigo-600">{user.points}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                </div>
              </div>
            ))}
            
            {/* Current User Row */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg text-indigo-600">
                  12
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  JD
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">John Doe (You)</p>
                  <p className="text-xs text-slate-500">{completedModules.length} Modules Completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-indigo-600">{userPoints}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AchievementsPage = () => (
    <div className="max-w-6xl mx-auto">
      <Header title="Achievements" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {TRAINING_MODULES.map(module => {
          const isEarned = completedModules.includes(module.id);
          return (
            <div 
              key={module.id}
              className={`relative group flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-300 ${
                isEarned 
                  ? 'bg-white border-slate-100 shadow-lg shadow-slate-200/50' 
                  : 'bg-slate-50/50 border-slate-100 grayscale opacity-40'
              }`}
            >
              <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-4 shadow-xl shadow-indigo-500/10 transform transition-transform group-hover:scale-110`}>
                <Award size={32} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{module.badge}</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{isEarned ? 'Earned' : 'Locked'}</p>
              
              {!isEarned && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-slate-600 border border-slate-100">
                    Complete {module.title}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Helper Components
  const StatCard = ({ icon, label, value, subValue, color }: { icon: React.ReactNode, label: string, value: string, subValue: string, color: string }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-3xl font-black text-slate-900">{value}</h4>
        <span className="text-xs font-medium text-slate-500">{subValue}</span>
      </div>
    </div>
  );

  const ModuleMiniCard = ({ module, completed, onClick }: { module: Module, completed: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all text-left group"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/10`}>
        <module.icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{module.title}</h4>
        <p className="text-xs text-slate-500 truncate">{module.lessons.length} Lessons • {module.points} pts</p>
      </div>
      {completed ? (
        <CheckCircle2 className="text-emerald-500" size={18} />
      ) : (
        <ChevronRight className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" size={18} />
      )}
    </button>
  );

  const ModuleCard = ({ module, completed, onClick }: { module: Module, completed: boolean, onClick: () => void }) => (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
      <div className={`h-32 bg-gradient-to-br ${module.color} p-8 flex justify-between items-start relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 z-10">
          <module.icon size={28} />
        </div>
        {completed && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider z-10">
            <CheckCircle2 size={12} />
            Completed
          </div>
        )}
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{module.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
          {module.description}
        </p>
        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lessons</span>
              <span className="text-sm font-bold text-slate-700">{module.lessons.length}</span>
            </div>
            <div className="w-px h-6 bg-slate-100" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</span>
              <span className="text-sm font-bold text-slate-700">{module.points}</span>
            </div>
          </div>
          <button 
            onClick={onClick}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              completed 
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
            }`}
          >
            {completed ? 'Review' : 'Start Now'}
            <Play size={14} fill={completed ? 'transparent' : 'currentColor'} />
          </button>
        </div>
      </div>
    </div>
  );

  if (currentPage === 'home') return <HomePage />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 lg:p-12 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedModule?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'modules' && <ModulesPage />}
            {currentPage === 'lesson' && <LessonPage />}
            {currentPage === 'quiz' && <QuizPage />}
            {currentPage === 'leaderboard' && <LeaderboardPage />}
            {currentPage === 'achievements' && <AchievementsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
