
import React, { useState, useMemo } from 'react';
import { View } from '../types';
import { sectors } from './SectorsView';
import { getCareerRoadmap } from '../geminiService';
import { 
  Crown, CheckCircle2, Star, Zap, Users, BarChart3, 
  MessageSquareText, ShieldCheck, Sparkles, Brain, 
  Search, SlidersHorizontal, ArrowRight, Target, 
  TrendingUp, DollarSign, Wand2, Loader2, Info, X,
  ThumbsUp, GraduationCap, Quote, PlayCircle, Map,
  Globe, Briefcase, ChevronDown, ListFilter, SortAsc,
  Lock, Settings2, Rocket, Globe2, Wallet, Monitor, Lightbulb, Shield, Palette
} from 'lucide-react';

const testimonials = [
  {
    name: "Selin Yıldız",
    school: "Boğaziçi Üniversitesi",
    text: "Geleceğimi planlarken Guidely'nin sunduğu veriler ve mentorluk desteği en büyük yardımcım oldu.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Mert Demir",
    school: "İTÜ Mezun",
    text: "Kendi yeteneklerimi keşfetmemi ve doğru sektöre yönelmemi sağladı. Harika bir deneyim.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Ece Korkmaz",
    school: "Koç Üniversitesi",
    text: "Kariyer yol haritası özelliği sayesinde yurt dışı staj başvurularımda hangi adımları atmam gerektiğini netleştirdim.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

interface PremiumViewProps {
  testResult: string | null;
  onNavigate: (view: View) => void;
}

const PremiumView: React.FC<PremiumViewProps> = ({ testResult, onNavigate }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSmartResults, setShowSmartResults] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); 

  // Explorer Strategy States - Multi-select
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>(['all']);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [explorerSortBy, setExplorerSortBy] = useState<'match' | 'salary' | 'growth'>('match');

  // Career Roadmap States
  const [roadmapGoal, setRoadmapGoal] = useState('');
  const [roadmapStatus, setRoadmapStatus] = useState('');
  const [roadmapResult, setRoadmapResult] = useState<string | null>(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);

  const plans = [
    {
      name: "Aylık Plan",
      price: "₺300.00",
      period: "/ay",
      desc: "Kısa süreli deneme ve tüm özelliklere erişim.",
      features: ["Premium Canlı Yayınlar", "AI Kariyer Koçu", "Detaylı Sektör Analizleri"],
      popular: false
    },
    {
      name: "Yıllık Plan",
      price: "₺199.90",
      period: "/ay",
      desc: "Geleceğini şekillendirirken en karlı seçenek.",
      features: ["Tüm Premium Özellikler", "1:1 Mentorluk Desteği", "Öncelikli Destek Hattı", "%33 Tasarruf Sağla"],
      popular: true
    }
  ];

  const industries = ['Teknoloji', 'Sağlık', 'Finans', 'Yaratıcı', 'Mühendislik'];

  const strategies = [
    { id: 'all', label: 'Genel Bakış', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'fast', label: 'Hızlı İstihdam', icon: <Rocket className="w-4 h-4" /> },
    { id: 'growth', label: 'Maks. Büyüme', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'global', label: 'Global Kariyer', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'salary', label: 'Yüksek Gelir', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'remote', label: 'Uzaktan Çalışma', icon: <Monitor className="w-4 h-4" /> },
    { id: 'innovation', label: 'İnovasyon & Ar-Ge', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'stability', label: 'Düşük Risk', icon: <Shield className="w-4 h-4" /> },
    { id: 'creative', label: 'Yaratıcı Özgürlük', icon: <Palette className="w-4 h-4" /> },
  ];

  const toggleStrategy = (id: string) => {
    setSelectedStrategies(prev => {
      if (id === 'all') return ['all'];
      const filtered = prev.filter(s => s !== 'all');
      if (filtered.includes(id)) {
        const next = filtered.filter(s => s !== id);
        return next.length === 0 ? ['all'] : next;
      }
      return [...filtered, id];
    });
  };

  const calculateCompatibility = (sectorName: string) => {
    if (!testResult) return null;
    let hash = 0;
    const str = sectorName + testResult;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(70 + (hash % 26)); 
  };

  const filteredRecommendations = useMemo(() => {
    let result = sectors.map(s => {
      const matchScore = calculateCompatibility(s.name);
      const avgEase = s.specializations?.reduce((acc, curr) => acc + curr.jobFindingEase, 0) || 5;
      const avgGrowth = s.specializations?.reduce((acc, curr) => acc + (parseInt(s.growth) || 5), 0) || 5;
      const avgGlobal = s.specializations?.reduce((acc, curr) => acc + curr.internationalOpportunities, 0) || 5;
      const count = s.specializations?.length || 1;
      
      return {
        ...s,
        matchScore,
        avgEase: avgEase / count,
        avgGrowth: avgGrowth / count,
        avgGlobal: avgGlobal / count,
        numericSalary: parseInt(s.salary.match(/\d+/)?.[0] || '0')
      };
    });

    if (!selectedStrategies.includes('all')) {
      result = result.filter(s => {
        return selectedStrategies.some(strat => {
          if (strat === 'fast') return s.avgEase >= 7;
          if (strat === 'growth') return s.avgGrowth >= 7;
          if (strat === 'global') return s.avgGlobal >= 7;
          if (strat === 'salary') return s.numericSalary >= 50;
          if (strat === 'remote') return s.category === 'Teknoloji' || s.category === 'Yaratıcı';
          if (strat === 'innovation') return s.category === 'Teknoloji' || s.category === 'Mühendislik';
          if (strat === 'stability') return s.category === 'Sağlık' || s.category === 'Finans';
          if (strat === 'creative') return s.category === 'Yaratıcı';
          return true;
        });
      });
    }

    if (selectedIndustries.length > 0) {
      result = result.filter(s => selectedIndustries.includes(s.category));
    }

    if (aiQuery) {
      result = result.filter(s => s.name.toLowerCase().includes(aiQuery.toLowerCase()));
    }

    result.sort((a, b) => {
      if (explorerSortBy === 'salary') return b.numericSalary - a.numericSalary;
      if (explorerSortBy === 'growth') return b.avgGrowth - a.avgGrowth;
      return (b.matchScore || 0) - (a.matchScore || 0);
    });

    return result.slice(0, 3);
  }, [testResult, aiQuery, selectedStrategies, selectedIndustries, explorerSortBy]);

  const handleAiSmartFilter = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSmartResults(true);
    }, 1200);
  };

  const handleGenerateRoadmap = async () => {
    if (!isSubscribed) {
      alert("Bu özelliği kullanmak için lütfen Premium plana geçiş yapın.");
      return;
    }
    if (!roadmapGoal.trim() || !roadmapStatus.trim()) return;
    setIsRoadmapLoading(true);
    const result = await getCareerRoadmap(roadmapGoal, roadmapStatus);
    setRoadmapResult(result || "Yol haritası oluşturulamadı.");
    setIsRoadmapLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-20 animate-in fade-in duration-700 pb-24">
      {/* Hero Header */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-100">
          <Crown className="w-4 h-4" /> Guidely Premium
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight tracking-tighter">
          Potansiyelini <span className="text-brand-primary">Gerçeğe Dönüştür</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
          Sadece sana özel kariyer rotası, yapay zeka desteği ve sektör profesyonelleriyle tanışma fırsatı.
        </p>
      </section>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`bg-white rounded-[45px] p-10 border transition-all relative flex flex-col ${
              plan.popular 
              ? 'border-brand-primary shadow-2xl shadow-brand-100 scale-105 z-10' 
              : 'border-gray-100 shadow-sm hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                En Popüler Seçenek
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-black text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-xs text-gray-400 font-bold mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                <span className="text-gray-400 font-bold text-sm">{plan.period}</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-bold text-gray-600">
                  <CheckCircle2 className={`w-4 h-4 ${plan.popular ? 'text-brand-primary' : 'text-green-500'}`} /> {feat}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setIsSubscribed(true)}
              className={`w-full py-5 rounded-[22px] font-black uppercase tracking-widest text-xs transition-all ${
                plan.popular 
                ? 'bg-brand-primary text-white shadow-xl shadow-brand-200 hover:bg-brand-700' 
                : 'bg-gray-50 text-gray-400 hover:bg-brand-50 hover:text-brand-primary'
              }`}
            >
              {isSubscribed ? 'Paketin Aktif' : 'Hemen Başlat'}
            </button>
          </div>
        ))}
      </div>

      {/* AI Dashboards Row - Height Synchronized */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
        
        {/* AI Sector Explorer */}
        <section className="bg-[#0D0D12] rounded-[60px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 flex flex-col">
          <div className="relative z-10 space-y-10 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">
                  <Zap className="w-3.5 h-3.5" /> Akıllı Analiz
                </div>
                <h2 className="text-3xl font-black tracking-tight">AI <span className="text-yellow-500">Sektör Kaşifi</span></h2>
                <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-sm">
                  Profesyonel kariyer stratejini belirle, hedeflerine en yakın sektörleri anında listele.
                </p>
              </div>
              <Settings2 className="w-6 h-6 text-gray-700" />
            </div>

            <div className="space-y-8 flex-1 flex flex-col">
              {/* Strategy Selector */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center justify-between">
                   <div className="flex items-center gap-2"><Target className="w-3 h-3" /> Kariyer Stratejilerin</div>
                   <span className="text-[9px] text-yellow-500/50 italic lowercase">Çoklu seçim</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {strategies.map(strat => (
                    <button
                      key={strat.id}
                      onClick={() => toggleStrategy(strat.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-[11px] font-bold text-left ${
                        selectedStrategies.includes(strat.id) 
                        ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20' 
                        : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${selectedStrategies.includes(strat.id) ? 'bg-black/10' : 'bg-white/5'}`}>
                        {strat.icon}
                      </div>
                      <span className="truncate">{strat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Filter */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">İlgi Alanları</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map(ind => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustries(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind])}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                        selectedIndustries.includes(ind)
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-auto">
                <div className="flex-1 bg-white/5 rounded-2xl px-4 flex items-center border border-white/5 focus-within:border-yellow-500/50 transition-all">
                  <Search className="w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    placeholder="Sektör ara..."
                    className="w-full bg-transparent p-4 text-xs font-medium text-white outline-none"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleAiSmartFilter}
                  className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-yellow-500/10"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Analiz <Zap className="w-3.5 h-3.5" /></>}
                </button>
              </div>

              {showSmartResults && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 border-t border-white/5 pt-8 mt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">Önerilen Rotalar</h4>
                    <div className="flex items-center gap-2">
                       <SortAsc className="w-3 h-3 text-gray-600" />
                       <select 
                        value={explorerSortBy} 
                        onChange={(e) => setExplorerSortBy(e.target.value as any)}
                        className="bg-transparent text-[9px] font-black text-gray-400 uppercase outline-none cursor-pointer"
                       >
                         <option value="match">AI Uyumu</option>
                         <option value="salary">Maaş</option>
                         <option value="growth">Trend</option>
                       </select>
                    </div>
                  </div>
                  {filteredRecommendations.map(rec => (
                    <div key={rec.id} className="bg-white/5 p-6 rounded-[35px] border border-white/5 hover:bg-white/10 hover:border-yellow-500/30 transition-all group cursor-pointer flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{rec.icon}</span>
                          <div>
                            <h4 className="font-black text-sm text-gray-200 group-hover:text-yellow-500 transition-colors">{rec.name}</h4>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{rec.category}</p>
                          </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-yellow-500">%{rec.matchScore || '--'}</span>
                        <span className="text-[7px] font-black text-gray-600 block uppercase tracking-widest">Match Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        </section>

        {/* AI Career Roadmap */}
        <section className="bg-[#0D0D12] rounded-[60px] p-10 text-white border border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="relative z-10 space-y-10 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">
                <Crown className="w-3.5 h-3.5" /> Premium Yol Haritası
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">AI <span className="text-yellow-500">Kariyer Yol Haritası</span></h2>
              <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-sm">
                Nihai hedefini yaz; yapay zekamız senin için global kabul şartlarını ve burs imkanlarını araştırsın.
              </p>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nihai Hedefin Ne?</label>
                  <textarea 
                    value={roadmapGoal}
                    onChange={(e) => setRoadmapGoal(e.target.value)}
                    placeholder="Örn: Yurt dışında burslu mühendislik eğitimi..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-xs font-bold text-gray-200 outline-none focus:ring-4 focus:ring-yellow-500/10 transition-all min-h-[120px] resize-none placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Şu Anki Durumun / Yetkinliklerin</label>
                  <input 
                    type="text"
                    value={roadmapStatus}
                    onChange={(e) => setRoadmapStatus(e.target.value)}
                    placeholder="Örn: 11. Sınıf, B2 İngilizce, 90+ Ortalama"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold text-gray-200 outline-none focus:ring-4 focus:ring-yellow-500/10 transition-all placeholder:text-gray-600"
                  />
                </div>
                <button 
                  onClick={handleGenerateRoadmap}
                  disabled={isRoadmapLoading || !roadmapGoal.trim()}
                  className="w-full bg-yellow-500 text-black py-5 rounded-[22px] font-black uppercase text-xs tracking-widest shadow-xl shadow-yellow-500/10 hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] mt-4"
                >
                  {isRoadmapLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Planı Hazırla <Wand2 className="w-4 h-4" /></>}
                </button>
              </div>

              {roadmapResult && (
                <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-6 animate-in zoom-in-95 duration-500 mt-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-black text-white text-sm uppercase tracking-widest">Kişisel Yol Haritan</h4>
                    </div>
                    <button className="text-[10px] font-black text-yellow-500 uppercase hover:underline">PDF İndir</button>
                  </div>
                  <div className="prose prose-invert prose-yellow prose-sm max-w-none text-gray-400 font-medium leading-relaxed overflow-y-auto max-h-[400px] pr-4 custom-scrollbar whitespace-pre-wrap">
                    {roadmapResult}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
        </section>
      </div>

      {/* Why Premium Feature Cards */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black text-gray-800 text-center tracking-tight">Premium Avantajları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Users className="w-6 h-6 text-orange-500" />, title: "1:1 Mentorluk", desc: "Sektör uzmanları ve üst sınıf öğrencilerle birebir canlı görüşme hakkı." },
            { icon: <MessageSquareText className="w-6 h-6 text-indigo-500" />, title: "AI Kariyer Koçu", desc: "7/24 aktif, sana özel eğitilmiş yapay zeka ile anlık kariyer tavsiyeleri." },
            { icon: <BarChart3 className="w-6 h-6 text-green-500" />, title: "Akademik Strateji", desc: "Üniversitelerin detaylı akademik verileri, kampüs kritikleri ve öğrenci memnuniyet analizlerine kapsamlı erişim sağla." },
            { icon: <PlayCircle className="w-6 h-6 text-brand-primary" />, title: "Özel Yayınlar", desc: "Herkesten önce erişebileceğin özel masterclass serileri ve workshoplar." }
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="font-black text-gray-800 mb-3 text-sm">{f.title}</h3>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Reverted and Diversified */}
      <section className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ThumbsUp className="w-3.5 h-3.5" /> %98 Memnuniyet
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">Geleceğini <span className="text-brand-primary">Guidely</span> ile Şekillendirenler</h2>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <p className="text-3xl font-black text-brand-primary">10k+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aktif Üye</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-indigo-500">500+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mentorluk</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-4">
             {testimonials.map((t, idx) => (
               <div key={idx} className={`${idx === 0 ? 'bg-brand-50 border-brand-100' : 'bg-gray-50 border-gray-100'} rounded-[35px] p-6 border relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                  <Quote className={`absolute top-4 right-6 w-12 h-12 ${idx === 0 ? 'text-brand-primary/10' : 'text-gray-200'}`} />
                  <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                     <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="text-gray-700 text-sm font-medium leading-relaxed italic mb-3">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                           <p className="font-black text-gray-800 text-xs">{t.name}</p>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t.school}</p>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <div className="text-center p-12 bg-gray-50 rounded-[40px] border border-gray-100">
         <h4 className="font-black text-gray-800 mb-2">Hala soruların mı var?</h4>
         <p className="text-gray-500 text-sm font-medium mb-6">Canlı destek ekibimiz kafandaki tüm soru işaretlerini gidermek için burada.</p>
         <button className="text-brand-primary font-black uppercase tracking-widest text-xs hover:underline">Destekle İletişime Geç</button>
      </div>
    </div>
  );
};

export default PremiumView;
