
import React, { useMemo, useState } from 'react';
import { View, Sector } from '../types';
import { 
  Bookmark, School, Briefcase, Brain, ArrowRight, Settings, 
  LogOut, ChevronRight, Award, Crown, CheckCircle2, 
  Target, Sparkles, X, Loader2, AlertCircle, Info, Lightbulb, BookOpen,
  User as UserIcon
} from 'lucide-react';
import { universities } from './UniversitiesView';
import { sectors } from './SectorsView';
import { initialResources } from './ResourcesView';
import { getSectorBrief } from '../geminiService';

interface Props {
  savedResources: string[];
  followedUnis: string[];
  savedSectors: string[];
  testResult: string | null;
  onNavigate: (view: View) => void;
  onSeeSectorDetail?: (id: string) => void;
}

const ProfileView: React.FC<Props> = ({ 
  savedResources, 
  followedUnis, 
  savedSectors, 
  testResult, 
  onNavigate,
  onSeeSectorDetail 
}) => {
  const [selectedSectorForBrief, setSelectedSectorForBrief] = useState<any | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [briefData, setBriefData] = useState<{ strengths: string[], challenges: string[], summary: string } | null>(null);

  const followedList = universities.filter(u => followedUnis.includes(u.id));
  const savedSectorsList = useMemo(() => sectors.filter(s => savedSectors.includes(s.id)), [savedSectors]);
  const savedResourcesList = useMemo(() => initialResources.filter(r => savedResources.includes(r.id)), [savedResources]);
  
  const USER_IMAGE = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300';

  const calculateCompatibility = (sectorName: string, result: string | null) => {
    if (!result) return 0;
    let hash = 0;
    const str = sectorName + result;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(65 + (hash % 31)); 
  };

  const compatibilityList = useMemo(() => {
    if (!testResult) return [];
    return sectors.map(s => ({
      ...s,
      score: calculateCompatibility(s.name, testResult)
    })).sort((a, b) => b.score - a.score);
  }, [testResult]);

  const handleOpenBrief = async (sector: any) => {
    if (!testResult) return;
    setSelectedSectorForBrief(sector);
    setBriefLoading(true);
    setBriefData(null);

    const result = await getSectorBrief(sector.name, testResult);
    
    // Simple parsing logic for the expected AI response format
    const strengthsMatch = result?.match(/GÜÇLÜ_YÖNLER:\s*([\s\S]*?)(?=ZORLUKLAR:|$)/i);
    const challengesMatch = result?.match(/ZORLUKLAR:\s*([\s\S]*?)(?=ÖZET:|$)/i);
    const summaryMatch = result?.match(/ÖZET:\s*([\s\S]*?)$/i);

    const parseList = (text?: string) => {
      if (!text) return [];
      return text.split('\n').map(l => l.replace(/^[•\-\*\d\.]+\s*/, '').trim()).filter(l => l.length > 5);
    };

    setBriefData({
      strengths: parseList(strengthsMatch?.[1]),
      challenges: parseList(challengesMatch?.[1]),
      summary: summaryMatch?.[1]?.trim() || "Analiz tamamlandı."
    });
    setBriefLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Profile Card */}
      <section className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-32 h-32 rounded-full border-4 border-brand-50 p-1 shadow-lg relative z-10 overflow-hidden">
          <img 
            src={USER_IMAGE} 
            className="w-full h-full object-cover rounded-full bg-brand-100" 
            alt="Avatar" 
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Can Yılmaz</h1>
          <p className="text-gray-500 font-medium mb-4">Lise 4. Sınıf • Sayısal Öğrencisi</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-gray-50 px-4 py-2 rounded-xl text-gray-500 text-[10px] font-black flex items-center gap-2 border border-gray-100 uppercase tracking-widest">
              <UserIcon className="w-3.5 h-3.5" /> Standart Üye
            </div>
            <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </section>

      {/* Premium Upgrade Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#333] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Önerilen
            </div>
            <h2 className="text-2xl font-black">Guidely Premium'un Avantajlarını Keşfet</h2>
            <p className="text-gray-400 text-sm max-w-md font-medium">Kişiselleştirilmiş mentorluk ve AI destekli kariyer araçları ile rakiplerinin önüne geç.</p>
          </div>
          <button 
            onClick={() => onNavigate(View.Premium)}
            className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-900/20 whitespace-nowrap"
          >
            Premium'a Yükselt
          </button>
        </div>
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Sector Compatibility Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
             <Target className="w-6 h-6 text-brand-primary" /> Sektör Uyumluluklarım
           </h3>
           {testResult && (
             <span className="text-[10px] font-black text-brand-primary bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-widest flex items-center gap-1.5">
               <Sparkles className="w-3 h-3" /> AI Analizli
             </span>
           )}
        </div>

        {testResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibilityList.slice(0, 6).map((sector) => (
              <div 
                key={sector.id} 
                className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all group relative overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-2xl border border-brand-100 shadow-inner group-hover:scale-110 transition-transform">
                    {sector.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-primary tracking-tight">%{sector.score}</span>
                    <span className="text-[8px] font-black text-gray-400 uppercase block tracking-widest">Uyum</span>
                  </div>
                </div>
                <h4 className="font-black text-gray-800 mb-1 tracking-tight">{sector.name}</h4>
                <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest mb-6">{sector.category}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                    <div 
                      className="h-full bg-brand-primary rounded-full transition-all duration-1000 delay-300" 
                      style={{ width: `${sector.score}%` }}
                    />
                  </div>
                  <button 
                    onClick={() => handleOpenBrief(sector)}
                    className="w-full py-3 bg-brand-50 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Detayları Gör <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 bg-brand-primary/5 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[40px] border-2 border-dashed border-gray-100 text-center space-y-6">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Brain className="w-10 h-10" />
             </div>
             <div>
                <h4 className="text-lg font-black text-gray-800 mb-1">Henüz Bir Analiz Yok</h4>
                <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">Kişilik analizini tamamlayarak sana en uygun sektörleri yüzde puanıyla keşfetmeye başla.</p>
             </div>
             <button 
              onClick={() => onNavigate(View.Tests)}
              className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-200 active:scale-95"
             >
                Testi Başlat
             </button>
          </div>
        )}
      </section>

      {/* Brief Modal */}
      {selectedSectorForBrief && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <button 
              onClick={() => setSelectedSectorForBrief(null)}
              className="absolute top-6 right-6 p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all z-10"
             >
              <X className="w-6 h-6 text-gray-400" />
             </button>

             <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 bg-brand-50 rounded-[22px] flex items-center justify-center text-3xl shadow-inner border border-brand-100">
                    {selectedSectorForBrief.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">{selectedSectorForBrief.name}</h3>
                    <p className="text-xs font-black text-brand-primary uppercase tracking-widest">Kişisel Analiz Özeti</p>
                  </div>
                </div>

                {briefLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-6">
                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-black text-gray-800 uppercase tracking-widest">Analiz Hazırlanıyor</p>
                      <p className="text-xs text-gray-400 font-medium">Yapay zeka profilini inceliyor...</p>
                    </div>
                  </div>
                ) : briefData ? (
                  <div className="space-y-10">
                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Bu meslek için güçlü yönlerin
                      </h4>
                      <div className="space-y-3">
                        {briefData.strengths.map((s, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-green-50/50 rounded-2xl border border-green-100/50 items-start">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Neler senin için zorlayıcı olabilir?
                      </h4>
                      <div className="space-y-3">
                        {briefData.challenges.map((c, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-amber-50/50 rounded-2xl border border-amber-100/50 items-start">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-brand-50 p-6 rounded-[30px] border border-brand-100 flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm flex-shrink-0">
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-brand-900 uppercase tracking-widest mb-1">Özet Tavsiye</p>
                        <p className="text-xs text-brand-700 font-medium leading-relaxed italic">"{briefData.summary}"</p>
                      </div>
                    </section>

                    <button 
                      onClick={() => setSelectedSectorForBrief(null)}
                      className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-200 active:scale-95"
                    >
                      Anladım, Kapat
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-400 font-medium">Bir hata oluştu. Lütfen tekrar deneyin.</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Test Result Summary - Design Updated to Match TestsView results */}
      <section className="bg-brand-900 rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
              <Brain className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Kişilik Analizim</h2>
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Guidely AI Professional Identity</p>
            </div>
          </div>
          <div className="hidden sm:block">
             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        {testResult ? (
          <div className="space-y-8 relative z-10">
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[40px] border border-white/10 shadow-inner">
              <div className="text-indigo-50 font-medium leading-[1.8] text-lg selection:bg-yellow-500 selection:text-black">
                {/* Clamped rendering of analysis for profile preview with the same logic as result page */}
                {testResult.split('\n').slice(0, 8).map((line, idx) => {
                  const isHeader = line.match(/^\d+\.|\*\*|###|####/);
                  if (isHeader) {
                    return (
                      <h3 key={idx} className="text-xl font-black text-white mt-6 mb-4 flex items-center gap-3 tracking-tight border-l-4 border-yellow-400 pl-4 py-1">
                        {line.replace(/\*\*|###|####/g, '')}
                      </h3>
                    );
                  }
                  if (line.trim() === '') return <div key={idx} className="h-4" />;
                  return (
                    <p key={idx} className="mb-4 text-indigo-100/90 line-clamp-3">
                      {line}
                    </p>
                  );
                })}
                {testResult.split('\n').length > 8 && <p className="text-yellow-400 text-xs font-black uppercase mt-2 tracking-widest">...ve daha fazlası</p>}
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate(View.Tests)}
              className="w-full py-5 bg-white text-brand-900 rounded-[22px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-yellow-400 hover:text-black transition-all shadow-xl active:scale-[0.98]"
            >
              Tam Analiz Raporunu İncele <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12 relative z-10">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Brain className="w-10 h-10 text-white/20" />
             </div>
             <p className="text-indigo-200 text-lg mb-8 italic opacity-70 max-w-sm mx-auto">Kariyer rotanı belirlemek için henüz bir analiz sonucu bulunamadı.</p>
             <button 
                onClick={() => onNavigate(View.Tests)}
                className="px-12 py-5 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-yellow-500/20 hover:bg-white transition-all active:scale-95"
             >
                Testi Hemen Çöz
             </button>
          </div>
        )}
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-[80px] pointer-events-none"></div>
      </section>

      {/* Grid Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Followed Schools */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <School className="w-5 h-5 text-indigo-500" /> Takip Ettiğim Okullar
            </h3>
            <span className="text-xs font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate(View.Universities)}>Hepsini Gör</span>
          </div>
          <div className="space-y-3">
            {followedList.length > 0 ? followedList.map(uni => (
              <div key={uni.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors cursor-pointer" onClick={() => onNavigate(View.Universities)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg p-1 flex items-center justify-center">
                    <School className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{uni.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{uni.location}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            )) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                <p className="text-xs text-gray-400">Henüz okul takip etmiyorsun.</p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Sectors */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-primary" /> Kaydedilen Sektörlerim
            </h3>
            <span className="text-xs font-bold text-brand-primary cursor-pointer" onClick={() => onNavigate(View.Sectors)}>Düzenle</span>
          </div>
          <div className="space-y-3">
            {savedSectorsList.length > 0 ? savedSectorsList.map(sector => (
              <div 
                key={sector.id} 
                onClick={() => onSeeSectorDetail?.(sector.id)}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-brand-primary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-xl">
                    {sector.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{sector.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{sector.category}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-primary transition-colors" />
              </div>
            )) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                <p className="text-xs text-gray-400">Henüz sektör kaydetmedin.</p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Resources */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-500" /> Kaydedilen Kaynaklarım
            </h3>
            <span className="text-xs font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate(View.Resources)}>Düzenle</span>
          </div>
          <div className="space-y-3">
            {savedResourcesList.length > 0 ? savedResourcesList.map(res => (
              <div key={res.id} onClick={() => onNavigate(View.Resources)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-purple-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{res.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{res.subject}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
              </div>
            )) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                <p className="text-xs text-gray-400">Henüz kaynak kaydetmedin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors">
        <LogOut className="w-5 h-5" /> Çıkış Yap
      </button>
    </div>
  );
};

export default ProfileView;
