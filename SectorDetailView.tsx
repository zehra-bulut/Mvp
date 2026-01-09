
import React, { useState, useRef, useMemo } from 'react';
import { sectors } from './SectorsView';
import { ExpertInsight, Specialization, WorkplaceCategory } from '../types';
import { getSectorCompatibility } from '../geminiService';
import { 
  ArrowLeft, TrendingUp, Sparkles, UserCheck, Briefcase, 
  ChevronRight, MessageCircle, Quote, X, Calendar, Award, 
  Linkedin, Loader2, CheckCircle2, Zap, Target, AlertCircle,
  Brain, Play, Pause, BarChart4, FileText, Cpu, HeartHandshake,
  DollarSign, BarChart3, Gauge, Network, Info, Building2, Globe, Filter
} from 'lucide-react';

interface Props {
  sectorId: string | null;
  onBack: () => void;
  personalityResult: string | null;
}

const SectorDetailView: React.FC<Props> = ({ sectorId, onBack, personalityResult }) => {
  const sector = sectors.find(s => s.id === sectorId);
  const [selectedExpert, setSelectedExpert] = useState<ExpertInsight | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<Specialization | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [compatibilityReport, setCompatibilityReport] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Advanced Filters for Expert Insights
  const [specFilter, setSpecFilter] = useState<string>('all');
  const [expFilter, setExpFilter] = useState<string>('all');

  if (!sector) return (
    <div className="text-center py-20">
      <p className="text-gray-500 mb-4">Sektör bulunamadı.</p>
      <button onClick={onBack} className="text-brand-primary font-bold">Geri Dön</button>
    </div>
  );

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStartAnalysis = async () => {
    if (!personalityResult) {
      alert("Lütfen önce Testler kısmından kişilik analizinizi tamamlayın.");
      return;
    }
    setIsAnalyzing(true);
    const result = await getSectorCompatibility(sector.name, personalityResult);
    
    const scoreMatch = result?.match(/UYUM_ORANI: %(\d+)/);
    if (scoreMatch && scoreMatch[1]) {
      setMatchScore(parseInt(scoreMatch[1]));
    }
    
    const cleanReport = result?.replace(/UYUM_ORANI: %(\d+)/, '').trim();
    setCompatibilityReport(cleanReport || "Analiz raporu oluşturulamadı.");
    setIsAnalyzing(false);
  };

  const getDifficultyScore = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'çok yüksek': return 95;
      case 'yüksek': return 75;
      case 'orta': return 50;
      case 'düşük': return 25;
      default: return 50;
    }
  };

  const defaultExpert: ExpertInsight = {
    id: 'ex-def',
    name: 'Prof. Dr. Deniz Mert',
    title: 'Sektör Danışmanı',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    comment: 'Bu alanda fark yaratmak istiyorsanız sadece teknik değil, yumuşak becerilerinizi de geliştirmelisiniz.',
    fieldOfWork: 'Akademik Danışmanlık',
    experienceYears: 20,
    bio: 'Kariyer planlama ve sektörel uyum üzerine 20 yılı aşkın süredir akademik çalışmalar yürütmekteyim.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    scoringSummary: [
      { label: 'İş Tatmini', score: 8 },
      { label: 'Giriş Zorluğu', score: 7 },
      { label: 'Gelecek Potansiyeli', score: 9 }
    ]
  };

  const insights = sector.expertInsights || [defaultExpert];

  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      const matchesSpec = specFilter === 'all' || insight.fieldOfWork.toLowerCase().includes(specFilter.toLowerCase()) || insight.title.toLowerCase().includes(specFilter.toLowerCase());
      
      let matchesExp = true;
      if (expFilter !== 'all') {
        const years = insight.experienceYears;
        if (expFilter === 'junior') matchesExp = years <= 5;
        else if (expFilter === 'mid') matchesExp = years > 5 && years <= 12;
        else if (expFilter === 'senior') matchesExp = years > 12 && years <= 20;
        else if (expFilter === 'expert') matchesExp = years > 20;
      }

      return matchesSpec && matchesExp;
    });
  }, [insights, specFilter, expFilter]);

  const uniqueSpecs = useMemo(() => {
    const specs = new Set<string>();
    insights.forEach(i => specs.add(i.fieldOfWork));
    return Array.from(specs);
  }, [insights]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all group"
      >
        <ArrowLeft className="w-5 h-5" /> Sektör Listesine Dön
      </button>

      {/* Hero Header */}
      <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
          <div className="w-24 h-24 bg-brand-50 rounded-3xl flex items-center justify-center text-5xl shadow-inner border border-brand-100">
            {sector.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">{sector.name}</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full flex items-center gap-1 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> {sector.growth} Büyüme
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-lg font-medium italic">"{sector.description}"</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-brand-primary" /> Maaş Aralığı Analizi
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-2">
               <span className="text-2xl font-black text-gray-800">{sector.salary}</span>
               <span className="text-[10px] font-black text-green-500 uppercase">Aylık Ort.</span>
            </div>
            <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
               <div className="absolute left-[20%] right-[30%] h-full bg-brand-primary/20 rounded-full border-x-4 border-brand-primary"></div>
            </div>
            <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-tighter">
              <span>Junior (Giriş)</span>
              <span>Mid (Orta)</span>
              <span>Senior (Kıdemli)</span>
            </div>
            <p className="text-xs text-gray-500 font-medium pt-2 leading-relaxed">
              *Veriler sektör ortalaması ve kurumsal şirketlerin teklifleri baz alınarak hazırlanmıştır.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-brand-primary" /> Zorluk Puanlaması
          </h3>
          <div className="flex flex-col items-center justify-center space-y-4">
             <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                   <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                     strokeDasharray={364} 
                     strokeDashoffset={364 - (364 * getDifficultyScore(sector.difficulty)) / 100}
                     strokeLinecap="round" 
                     className="text-brand-primary" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-lg font-black text-gray-800">{sector.difficulty}</span>
                   <span className="text-[9px] font-black text-gray-400 uppercase">Endeks</span>
                </div>
             </div>
             <p className="text-center text-xs text-gray-500 font-medium px-4 leading-relaxed">
               Bu sektördeki teknik gereklilikler ve öğrenme eğrisi göz önüne alınmıştır.
             </p>
          </div>
        </div>
      </div>

      {/* Specializations Section */}
      {sector.specializations && sector.specializations.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 px-2 tracking-tight">
            <Network className="w-6 h-6 text-brand-primary" /> Hangi Alanlara Yönelebilirsin?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sector.specializations.map((spec, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedSpec(spec)}
                className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-primary transition-all cursor-pointer group flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 leading-tight">{spec.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Detayları & Karşılaştırmayı Gör</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Specialization Detail Modal */}
      {selectedSpec && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedSpec(null)}
              className="absolute top-6 right-6 p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all z-10"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
            <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-brand-50 rounded-[22px] flex items-center justify-center text-brand-primary shadow-inner">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">{selectedSpec.title}</h3>
                  <p className="text-xs font-black text-brand-primary uppercase tracking-widest">{sector.name} Alt Branşı</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Info className="w-4 h-4 text-brand-primary" /> Ne Yapar?
                   </h4>
                   <p className="text-gray-600 font-medium leading-relaxed bg-gray-50 p-6 rounded-3xl border border-gray-100">
                     {selectedSpec.description}
                   </p>
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-[35px] border border-indigo-100 space-y-6">
                   <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                     <BarChart4 className="w-4 h-4" /> Sektörel Karşılaştırma Verileri
                   </h4>
                   
                   <div className="grid grid-cols-1 gap-4">
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-black uppercase">
                          <span className="text-gray-500 flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-orange-500" /> İş Bulma Hızı</span>
                          <span className="text-indigo-600">{selectedSpec.jobFindingEase}/10</span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden border border-indigo-100">
                          <div className="h-full bg-orange-400 transition-all duration-1000" style={{ width: `${selectedSpec.jobFindingEase * 10}%` }}></div>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-black uppercase">
                          <span className="text-gray-500 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-green-500" /> Gelişim Potansiyeli</span>
                          <span className="text-indigo-600">{selectedSpec.growthPotential}/10</span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden border border-indigo-100">
                          <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${selectedSpec.growthPotential * 10}%` }}></div>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-black uppercase">
                          <span className="text-gray-500 flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-blue-500" /> Yurt Dışı İmkânı</span>
                          <span className="text-indigo-600">{selectedSpec.internationalOpportunities}/10</span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden border border-indigo-100">
                          <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${selectedSpec.internationalOpportunities * 10}%` }}></div>
                        </div>
                     </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Building2 className="w-4 h-4 text-brand-primary" /> Nerede Çalışır? (Sektörel Dağılım & Şirketler)
                   </h4>
                   
                   <div className="space-y-6">
                     {selectedSpec.workplaceDistribution ? selectedSpec.workplaceDistribution.map((dist, dIdx) => (
                       <div key={dIdx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                          <div className="flex justify-between items-center">
                             <span className="text-sm font-black text-gray-800">{dist.category}</span>
                             <span className="text-xs font-black text-brand-primary">%{dist.percentage}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                             <div className="h-full bg-brand-primary" style={{ width: `${dist.percentage}%` }}></div>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                             {dist.companies.map((comp, cIdx) => (
                               <span key={cIdx} className="px-3 py-1 bg-brand-50 text-brand-700 text-[10px] font-black rounded-lg border border-brand-100">
                                 {comp}
                               </span>
                             ))}
                          </div>
                       </div>
                     )) : (
                       <p className="text-gray-600 font-medium leading-relaxed bg-brand-50/30 p-6 rounded-3xl border border-brand-50">
                         {selectedSpec.workplace}
                       </p>
                     )}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedSpec(null)}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-200 active:scale-[0.98] mt-4"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Categorization Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 px-2 tracking-tight">
          <BarChart3 className="w-6 h-6 text-brand-primary" /> Yetkinlik Haritası
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hard Skills */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm border-t-8 border-t-brand-primary">
            <h3 className="font-black text-gray-800 mb-6 flex items-center gap-3 text-sm uppercase tracking-widest">
              <Cpu className="w-5 h-5 text-brand-primary" /> Hard Skills (Teknik)
            </h3>
            <div className="flex flex-wrap gap-3">
              {(sector.hardSkills || sector.skills || []).map(skill => (
                <span key={skill} className="px-4 py-2 bg-brand-50 text-brand-primary rounded-2xl text-xs font-black border border-brand-100 hover:bg-brand-primary hover:text-white transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-gray-400 font-medium italic">
              *Bu beceriler doğrudan iş performansı için zorunludur.
            </p>
          </div>

          {/* Soft Skills */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm border-t-8 border-t-indigo-400">
            <h3 className="font-black text-gray-800 mb-6 flex items-center gap-3 text-sm uppercase tracking-widest">
              <HeartHandshake className="w-5 h-5 text-indigo-400" /> Soft Skills (Sosyal)
            </h3>
            <div className="flex flex-wrap gap-3">
              {(sector.softSkills || ['İletişim', 'Liderlik', 'Öğrenme Merakı', 'Disiplin']).map(skill => (
                <span key={skill} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black border border-indigo-100 hover:bg-indigo-400 hover:text-white transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-gray-400 font-medium italic">
              *Kariyer yükselişinde teknik beceriler kadar kritiktir.
            </p>
          </div>
        </div>
      </section>

      {/* AI Compatibility Engine */}
      <section className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-primary/10 rounded-2xl">
              <Sparkles className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">Yapay Zeka Uyumluluk Analizi</h3>
              <p className="text-gray-400 text-sm font-medium">Kişilik özelliklerin ve sektör beklentilerinin dijital karşılaştırması.</p>
            </div>
          </div>

          {!compatibilityReport ? (
            <div className="text-center py-6 bg-brand-50/50 rounded-[40px] border border-brand-100 border-dashed">
              <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">
                Kişilik analizini kullanarak <span className="text-brand-primary font-bold">{sector.name}</span> sektörüyle olan potansiyel uyum düzeyini ölçelim.
              </p>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-5">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
                    <Brain className="w-6 h-6 text-brand-primary/40 absolute inset-0 m-auto" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-brand-primary uppercase tracking-widest">Veriler İşleniyor</p>
                    <p className="text-xs text-gray-400">Güçlü yönlerin analiz ediliyor...</p>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleStartAnalysis}
                  className="bg-brand-primary text-white px-12 py-5 rounded-[24px] font-black shadow-2xl shadow-brand-200 hover:bg-brand-700 transition-all active:scale-95 group flex items-center gap-3 mx-auto uppercase text-sm tracking-widest"
                >
                  Uyumluluk Analizini Başlat <Zap className="w-4 h-4 group-hover:animate-pulse" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-brand-50 p-8 rounded-[40px] border border-brand-100">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90 transform">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-white" />
                    <circle
                      cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="14" fill="transparent"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * (matchScore || 0)) / 100}
                      strokeLinecap="round"
                      className="text-brand-primary transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-brand-primary tracking-tighter">%{matchScore}</span>
                    <span className="text-[10px] font-black text-brand-primary/60 uppercase tracking-widest">Uyum</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h4 className="text-2xl font-black text-brand-900 tracking-tight">Harika Bir Eşleşme!</h4>
                  <p className="text-brand-primary/80 text-sm font-medium leading-relaxed italic">
                    "Analizimize göre bu sektör senin baskın kişilik özelliklerinle yüksek düzeyde örtüşüyor. Özellikle problem çözme yeteneğin burada parlayacak."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experts Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
           <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 tracking-tight">
             <UserCheck className="w-6 h-6 text-brand-primary" /> Uzman Görüşleri & Masterclass
           </h2>
           
           <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm group">
                 <Filter className="w-4 h-4 text-brand-primary" />
                 <select 
                   value={specFilter} 
                   onChange={(e) => setSpecFilter(e.target.value)}
                   className="text-xs font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer"
                 >
                    <option value="all">Tüm Uzmanlıklar</option>
                    {uniqueSpecs.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm group">
                 <Calendar className="w-4 h-4 text-brand-primary" />
                 <select 
                   value={expFilter} 
                   onChange={(e) => setExpFilter(e.target.value)}
                   className="text-xs font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer"
                 >
                    <option value="all">Deneyim (Tümü)</option>
                    <option value="junior">0-5 Yıl (Genç)</option>
                    <option value="mid">6-12 Yıl (Orta)</option>
                    <option value="senior">13-20 Yıl (Kıdemli)</option>
                    <option value="expert">20+ Yıl (Duayen)</option>
                 </select>
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInsights.length > 0 ? filteredInsights.map(insight => (
            <div 
              key={insight.id} 
              onClick={() => setSelectedExpert(insight)}
              className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm relative group cursor-pointer hover:border-brand-200 transition-all hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-[22px] bg-brand-50 border-2 border-brand-50 overflow-hidden group-hover:scale-105 transition-transform">
                  <img src={insight.avatar} className="w-full h-full object-cover" alt={insight.name} />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 leading-tight">{insight.name}</h4>
                  <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-0.5">{insight.title}</p>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm line-clamp-2 italic font-medium">
                "{insight.comment}"
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">
                  <Play className="w-3 h-3 fill-current" /> Videolu Görüşü İzle
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                   <Calendar className="w-3 h-3 text-gray-400" />
                   <span className="text-[9px] font-black text-gray-400 uppercase">{insight.experienceYears} YIL</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-16 text-center bg-white rounded-[40px] border border-dashed border-gray-100">
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Seçilen filtrelere uygun uzman bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* Expert Detail Modal (Video Focused) */}
      {selectedExpert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
            <button 
              onClick={() => { setSelectedExpert(null); setIsPlaying(false); }}
              className="absolute top-6 right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition-all z-30 group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="relative aspect-video bg-black w-full overflow-hidden group/player">
                <video 
                  ref={videoRef}
                  src={selectedExpert.videoUrl} 
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all">
                    <button 
                      onClick={toggleVideo}
                      className="w-20 h-20 bg-brand-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                )}
                
                {isPlaying && (
                   <div className="absolute bottom-6 right-8 opacity-0 group-hover/player:opacity-100 transition-opacity">
                      <button 
                        onClick={toggleVideo}
                        className="p-4 bg-white/10 backdrop-blur-md text-white rounded-2xl hover:bg-white/20"
                      >
                        <Pause className="w-6 h-6 fill-current" />
                      </button>
                   </div>
                )}

                <div className="absolute bottom-6 left-8 z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl border-2 border-white/50 overflow-hidden shadow-xl">
                            <img src={selectedExpert.avatar} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">{selectedExpert.name}</p>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Masterclass: {sector?.name}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>

              <div className="p-10 md:p-14 grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white">
                <div className="lg:col-span-2 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-brand-primary" /> Görüş Özeti
                    </h3>
                    <div className="prose prose-indigo prose-sm text-gray-500 font-medium leading-relaxed italic bg-gray-50 p-8 rounded-[35px] border border-gray-100 relative">
                       <Quote className="absolute -top-3 -left-3 w-10 h-10 text-brand-primary/10" />
                       <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          {selectedExpert.comment} {selectedExpert.bio} Videomda da vurguladığım üzere; bu sektörde kariyer basamaklarını hızla tırmanmak istiyorsanız teknik donanımınızın yanı sıra adaptasyon yeteneğinizi de en üst seviyede tutmalısınız.
                        </p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Kariyer Geçmişi</h4>
                    <div className="flex flex-wrap gap-4">
                      <span className="px-5 py-2.5 bg-gray-50 text-gray-600 text-xs font-black uppercase rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-brand-primary" /> {selectedExpert.experienceYears}+ Yıl Deneyim
                      </span>
                      <span className="px-5 py-2.5 bg-gray-50 text-gray-600 text-xs font-black uppercase rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                         <Award className="w-4 h-4 text-brand-primary" /> {selectedExpert.fieldOfWork} Uzmanı
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scoring Sidebar */}
                <div className="bg-brand-50 p-8 rounded-[40px] border border-brand-100 space-y-8 flex flex-col">
                  <h3 className="font-black text-brand-900 text-sm uppercase tracking-widest flex items-center gap-3">
                    <BarChart4 className="w-5 h-5" /> Video Puanlaması
                  </h3>
                  
                  <div className="space-y-6 flex-1">
                    {selectedExpert.scoringSummary?.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[11px] font-black text-brand-800 uppercase tracking-tight">{item.label}</span>
                          <span className="text-sm font-black text-brand-primary">{item.score}/10</span>
                        </div>
                        <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-brand-100 p-0.5">
                          <div 
                            className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${item.score * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-brand-200/50 mt-auto">
                    <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-brand-primary transition-all shadow-xl shadow-brand-900/10 group overflow-hidden px-2 min-h-[56px]">
                      <Linkedin size={16} className="flex-shrink-0" /> 
                      <span className="truncate whitespace-nowrap">LinkedIn Profiline Git</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorDetailView;
