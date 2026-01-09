
import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Brain, 
  Briefcase, 
  School, 
  MessageCircle, 
  BookOpen,
  Search,
  Bell,
  Menu,
  User as UserIcon,
  ChevronRight,
  Crown
} from 'lucide-react';
import { View } from './types';
import HomeView from './views/HomeView';
import TestsView from './views/TestsView';
import SectorsView from './views/SectorsView';
import SectorDetailView from './views/SectorDetailView';
import UniversitiesView from './views/UniversitiesView';
import ReviewsView from './views/ReviewsView';
import ResourcesView from './views/ResourcesView';
import ProfileView from './views/ProfileView';
import PremiumView from './views/PremiumView';

const USER_AVATAR = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Home);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [savedResources, setSavedResources] = useState<string[]>([]);
  const [followedUniversities, setFollowedUniversities] = useState<string[]>([]);
  const [savedSectors, setSavedSectors] = useState<string[]>([]);
  const [testResult, setTestResult] = useState<string | null>(localStorage.getItem('guidely_test_result'));

  const toggleSaveResource = (id: string) => {
    setSavedResources(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleFollowUni = (id: string) => {
    setFollowedUniversities(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSaveSector = (id: string) => {
    setSavedSectors(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleTestComplete = (result: string) => {
    setTestResult(result);
    localStorage.setItem('guidely_test_result', result);
  };

  const handleNavigateToSectorDetail = (id: string) => {
    setSelectedSectorId(id);
    setActiveView(View.SectorDetail);
  };

  const renderView = () => {
    switch (activeView) {
      case View.Home: return <HomeView onNavigate={setActiveView} />;
      case View.Tests: return <TestsView onComplete={handleTestComplete} onNavigate={setActiveView} />;
      case View.Sectors: return <SectorsView savedIds={savedSectors} onToggleSave={toggleSaveSector} onSeeDetail={handleNavigateToSectorDetail} hasTestResult={!!testResult} />;
      case View.SectorDetail: return <SectorDetailView sectorId={selectedSectorId} onBack={() => setActiveView(View.Sectors)} personalityResult={testResult} />;
      case View.Universities: return <UniversitiesView followedIds={followedUniversities} onToggleFollow={toggleFollowUni} />;
      case View.Reviews: return <ReviewsView />;
      case View.Resources: return <ResourcesView savedIds={savedResources} onToggleSave={toggleSaveResource} />;
      case View.Profile: return (
        <ProfileView 
          savedResources={savedResources} 
          followedUnis={followedUniversities} 
          savedSectors={savedSectors}
          testResult={testResult}
          onNavigate={setActiveView}
          onSeeSectorDetail={handleNavigateToSectorDetail}
        />
      );
      case View.Premium: return <PremiumView testResult={testResult} onNavigate={setActiveView} />;
      default: return <HomeView onNavigate={setActiveView} />;
    }
  };

  const navItems = [
    { id: View.Home, icon: HomeIcon, label: 'Ana Sayfa' },
    { id: View.Tests, icon: Brain, label: 'Testler' },
    { id: View.Sectors, icon: Briefcase, label: 'Sektörler' },
    { id: View.Universities, icon: School, label: 'Üniversiteler' },
    { id: View.Reviews, icon: MessageCircle, label: 'Görüşler' },
    { id: View.Resources, icon: BookOpen, label: 'Kaynaklar' },
    { id: View.Premium, icon: Crown, label: 'Premium', special: true },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b px-5 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3" onClick={() => setActiveView(View.Home)}>
          <span className="font-extrabold text-brand-primary text-xl tracking-tighter">GUIDELY</span>
        </div>
        <div 
          className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center cursor-pointer overflow-hidden border border-brand-100"
          onClick={() => setActiveView(View.Profile)}
        >
          <img src={USER_AVATAR} alt="User" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r min-h-screen p-7 sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-1.5 mb-12 px-2 cursor-pointer group" onClick={() => setActiveView(View.Home)}>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-black text-brand-primary text-2xl tracking-tighter uppercase">GUIDELY</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-0.5">Geleceğini Şekillendir</p>
        </div>
        
        <nav className="flex-1 space-y-2.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeView === item.id || (item.id === View.Sectors && activeView === View.SectorDetail)
                  ? 'bg-brand-primary text-white shadow-xl shadow-brand-200 translate-x-1' 
                  : item.special 
                    ? 'text-yellow-600 hover:bg-yellow-50 font-black' 
                    : 'text-gray-500 hover:bg-brand-50 hover:text-brand-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeView === item.id ? 'animate-pulse' : ''}`} />
              <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
              {(activeView === item.id) && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div 
          onClick={() => setActiveView(View.Profile)}
          className={`mt-auto p-5 rounded-[28px] border transition-all duration-300 group cursor-pointer ${
            activeView === View.Profile 
              ? 'bg-brand-primary border-brand-primary text-white shadow-2xl shadow-brand-200' 
              : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-brand-200 hover:shadow-xl'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <img src={USER_AVATAR} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate">Can Yılmaz</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${activeView === View.Profile ? 'text-brand-100' : 'text-gray-400'}`}>Profilim</p>
            </div>
            <UserIcon className={`w-4 h-4 ml-auto ${activeView === View.Profile ? 'text-white' : 'text-gray-300'}`} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-12 px-5 md:px-14 py-8 bg-[#FAFAFC]">
        {renderView()}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 flex justify-around items-center z-50 rounded-t-[32px] shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeView === item.id || (item.id === View.Sectors && activeView === View.SectorDetail) 
                ? 'text-brand-primary scale-110' 
                : 'text-gray-400 opacity-70'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[9px] font-extrabold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
