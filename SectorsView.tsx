
import React, { useState, useMemo } from 'react';
import { Sector } from '../types';
import { 
  Search, TrendingUp, DollarSign, Bookmark, BookmarkCheck, 
  Filter, Sparkles, ChevronDown, SlidersHorizontal, X, 
  Zap, Brain, Target, BarChart3, ArrowUpDown, ArrowUp, ArrowDown,
  Cpu, Gauge, Lightbulb
} from 'lucide-react';

export const sectors: Sector[] = [
  { 
    id: 'sec-1', 
    name: 'Yazılım Geliştirme', 
    category: 'Teknoloji',
    growth: '%25', 
    difficulty: 'Yüksek', 
    salary: '50k - 150k TL', 
    icon: '💻',
    description: 'Yazılım geliştirme, günümüz dünyasının en dinamik ve hızlı büyüyen sektörlerinden biridir. Sürekli öğrenme ve problem çözme becerisi gerektirir.',
    hardSkills: ['Python', 'JavaScript', 'Cloud'],
    softSkills: ['Analitik Düşünme', 'Problem Çözme', 'Ekip Çalışması', 'Zaman Yönetimi', 'Sürekli Öğrenme'],
    trends: ['Yapay Zeka Entegrasyonu', 'Bulut Bilişim', 'Düşük Kodlu Platformlar (No-Code/Low-Code)'],
    expertInsights: [
      { 
        id: 'ex-1', 
        name: 'Dr. Selin Ak', 
        title: 'Senior Software Engineer @ TechGiant', 
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', 
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        comment: 'Bu sektörde başarının anahtarı asla "öğrendim" dememektir. Teknoloji her 6 ayda bir değişiyor.',
        fieldOfWork: 'Yazılım Mühendisliği',
        experienceYears: 12,
        bio: 'Büyük ölçekli dağıtık sistemler üzerinde uzmanlaşmış bir mühendisim. Kariyerim boyunca dünya çapındaki teknoloji devlerinde kritik altyapı projelerini yönettim.',
        scoringSummary: [
          { label: 'İş Tatmini', score: 9 },
          { label: 'Giriş Zorluğu', score: 8 },
          { label: 'Gelecek Potansiyeli', score: 10 }
        ]
      },
      { 
        id: 'ex-2', 
        name: 'Mert Kaan Er', 
        title: 'Full Stack Architect', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', 
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        comment: 'Sadece kod yazmak yetmez, yazdığınız kodun işletme değerini anlamanız gerekir.',
        fieldOfWork: 'Sistem Mimarisi',
        experienceYears: 15,
        bio: 'Avrupa çapında birçok e-ticaret platformunun altyapısını kurdum ve modern yazılım mimarileri üzerine danışmanlık vermekteyim.',
        scoringSummary: [
          { label: 'Yaratıcılık', score: 8 },
          { label: 'Maaş Düzeyi', score: 9 },
          { label: 'Uzaktan Çalışma', score: 10 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Frontend Developer', 
        description: 'Web sitelerinin kullanıcı tarafından görülen arayüzlerini ve etkileşimli bileşenlerini geliştirir.', 
        workplace: 'Teknoloji şirketleri, dijital ajanslar, e-ticaret platformları.', 
        jobFindingEase: 9, 
        growthPotential: 8, 
        internationalOpportunities: 9
      },
      { 
        title: 'Backend Developer', 
        description: 'Sunucu tarafı mantığını, veritabanı yönetimini ve API entegrasyonlarını yönetir.', 
        workplace: 'Banka altyapıları, büyük ölçekli yazılım evleri, bulut bilişim şirketleri.', 
        jobFindingEase: 9, 
        growthPotential: 9, 
        internationalOpportunities: 8
      },
      { 
        title: 'Mobile App Developer', 
        description: 'iOS and Android platformları için yerel veya hibrit mobil uygulamalar geliştirir.', 
        workplace: 'Start-up\'lar, oyun stüdyoları, mobil odaklı teknoloji firmaları.', 
        jobFindingEase: 8, 
        growthPotential: 9, 
        internationalOpportunities: 10
      }
    ]
  },
  {
    id: 'sec-6',
    name: 'Yapay Zeka Uzmanı',
    category: 'Teknoloji',
    growth: '%65',
    difficulty: 'Çok Yüksek',
    salary: '80k - 250k TL',
    icon: '🤖',
    description: 'Geleceğinin dünyasını inşa eden, makinelerin öğrenmesini sağlayan ileri teknoloji.',
    hardSkills: ['Deep Learning', 'Math', 'NLP'],
    trends: ['Üretken Yapay Zeka', 'Otonom Sistemler'],
    expertInsights: [
      { 
        id: 'ex-ai-1', 
        name: 'Doç. Dr. Ömer Aras', 
        title: 'AI Research Director', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', 
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        comment: 'LLM modelleri ve derin öğrenme, sadece bir trend değil; yeni bir endüstriyel devrimdir.',
        fieldOfWork: 'Derin Öğrenme',
        experienceYears: 14,
        bio: 'Silikon Vadisi\'ndeki laboratuvarlarda NLP üzerine çalışmalar yürüttüm ve şu an yapay zeka araştırma projelerine liderlik etmekteyim.',
        scoringSummary: [
          { label: 'Akademik Derinlik', score: 10 },
          { label: 'Gelecek Vizyonu', score: 10 },
          { label: 'Etki Gücü', score: 9 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Machine Learning Engineer', 
        description: 'Verileri kullanarak tahmin modelleri ve algoritmalar tasarlar ve üretim sistemlerine entegre eder.', 
        workplace: 'Yapay zeka laboratuvarları, otonom araç şirketleri, büyük veri firmaları.', 
        jobFindingEase: 7, 
        growthPotential: 10, 
        internationalOpportunities: 10
      },
      { 
        title: 'Data Scientist', 
        description: 'Karmaşık verilerden anlamlı içgörüler çıkararak işletmelerin stratejik kararlar almasına yardımcı olur.', 
        workplace: 'Finans kurumları, perakende devleri, pazarlama analitiği şirketleri.', 
        jobFindingEase: 8, 
        growthPotential: 9, 
        internationalOpportunities: 9
      },
      { 
        title: 'Computer Vision Expert', 
        description: 'Makinelerin dijital görüntüleri ve videoları tanıması, işlemesi ve analiz etmesi üzerine çalışır.', 
        workplace: 'Savunma sanayi, sağlık teknolojileri, güvenlik sistemleri.', 
        jobFindingEase: 6, 
        growthPotential: 9, 
        internationalOpportunities: 9
      }
    ]
  },
  { 
    id: 'sec-2', 
    name: 'Sağlık ve Tıp', 
    category: 'Sağlık',
    growth: '%15', 
    difficulty: 'Çok Yüksek', 
    salary: '40k - 120k TL', 
    icon: '🏥',
    description: 'İnsan hayatına dokunan, teknik bilgiyle yüksek empatinin birleştiği bir alan.',
    hardSkills: ['Anatomi', 'Teşhis', 'İletişim'],
    trends: ['Dijital Sağlık', 'Robotik Cerrahi'],
    expertInsights: [
      { 
        id: 'ex-med-1', 
        name: 'Prof. Dr. Ayşe Nur', 
        title: 'Kardiyoloji Uzmanı', 
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200', 
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        comment: 'Tıp eğitimi bir maratondur, asla bitmeyen bir öğrencilik sürecine hazır olmalısınız.',
        fieldOfWork: 'Akademik Tıp',
        experienceYears: 25,
        bio: 'Dünya Sağlık Örgütü projelerinde danışmanlık yapmış kıdemli bir hekimim. Akademik kariyerim boyunca binlerce hekim adayı yetiştirdim.',
        scoringSummary: [
          { label: 'Sosyal Fayda', score: 10 },
          { label: 'Giriş Zorluğu', score: 10 },
          { label: 'Statü', score: 9 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Genel Cerrahi', 
        description: 'Ameliyat gerektiren hastalıkların teşhisi ve cerrahi tedavisi üzerine uzmanlaşmıştır.', 
        workplace: 'Devlet hastaneleri, özel klinikler, üniversite hastaneleri.', 
        jobFindingEase: 9, 
        growthPotential: 7, 
        internationalOpportunities: 7
      },
      { 
        title: 'Genetik Danışmanı', 
        description: 'Kalıtımsal hastalıklar ve riskler konusunda bireylere ve ailelere bilgi ve destek sağlar.', 
        workplace: 'Genetik merkezleri, araştırma enstitüleri, büyük hastaneler.', 
        jobFindingEase: 6, 
        growthPotential: 9, 
        internationalOpportunities: 9
      },
      { 
        title: 'Radyoloji Uzmanı', 
        description: 'MR, Tomografi gibi tıbbi görüntüleme tekniklerini kullanarak teşhis koyar.', 
        workplace: 'Görüntüleme merkezleri, onkoloji klinikleri, acil servisler.', 
        jobFindingEase: 8, 
        growthPotential: 8, 
        internationalOpportunities: 8
      }
    ]
  },
  {
    id: 'sec-4',
    name: 'Finans ve Yatırım',
    category: 'Finans',
    growth: '%12',
    difficulty: 'Yüksek',
    salary: '45k - 180k TL',
    icon: '📈',
    description: 'Küresel ekonominin kalbi. Analitik zeka ve piyasa takibi odaklı.',
    hardSkills: ['Analiz', 'Strateji', 'Modelleme'],
    trends: ['Blockchain', 'Fintech Devrimi'],
    expertInsights: [
      { 
        id: 'ex-fin-1', 
        name: 'Selçuk Bak', 
        title: 'Investment Banker', 
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200', 
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        comment: 'Piyasa dalgalanmalarını okumak bir sanattır. Veri okuryazarlığı en büyük silahınız olacak.',
        fieldOfWork: 'Yatırım Bankacılığı',
        experienceYears: 18,
        bio: 'Global fonların yönetimi ve halka arz süreçlerinde liderlik yaptım. Uluslararası piyasalarda yatırım stratejileri üzerine uzmanlaştım.',
        scoringSummary: [
          { label: 'Maaş', score: 10 },
          { label: 'Rekabet', score: 10 },
          { label: 'Network', score: 9 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Portfolio Manager', 
        description: 'Yatırımcıların varlıklarını piyasa koşullarına göre yöneterek getiri maksimizasyonu sağlar.', 
        workplace: 'Portföy yönetim şirketleri, aile ofisleri, özel bankalar.', 
        jobFindingEase: 6, 
        growthPotential: 8, 
        internationalOpportunities: 9
      },
      { 
        title: 'Risk Analyst', 
        description: 'Finansal piyasalardaki veya operasyonel süreçlerdeki riskleri belirler ve raporlar.', 
        workplace: 'Bankalar, sigorta şirketleri, enerji firmaları.', 
        jobFindingEase: 8, 
        growthPotential: 7, 
        internationalOpportunities: 8
      },
      { 
        title: 'Fintech Developer', 
        description: 'Finansal hizmetleri teknoloji ile birleştiren yazılımlar ve platformlar geliştirir.', 
        workplace: 'Start-up\'lar, dijital bankalar, blockchain firmaları.', 
        jobFindingEase: 9, 
        growthPotential: 10, 
        internationalOpportunities: 10
      }
    ]
  },
  { 
    id: 'sec-7', 
    name: 'Elektrik Elektronik', 
    category: 'Mühendislik',
    growth: '%18', 
    difficulty: 'Yüksek', 
    salary: '35k - 120k TL', 
    icon: '⚡',
    description: 'Elektrik, elektronik ve elektromanyetizma ile ilgili sistemlerin tasarımı ve geliştirilmesi.',
    hardSkills: ['Devre Tasarımı', 'Sinyal İşleme', 'PCB'],
    trends: ['5G Teknolojileri', 'Akıllı Şehirler'],
    specializations: [
      { 
        title: 'Embedded Systems Engineer', 
        description: 'Cihazların içindeki gömülü yazılımları ve mikroişlemci tabanlı donanımları tasarlar.', 
        workplace: 'Otomotiv sektörü, beyaz eşya üreticileri, savunma sanayi.', 
        jobFindingEase: 9, 
        growthPotential: 8, 
        internationalOpportunities: 9
      },
      { 
        title: 'Telecommunications Expert', 
        description: 'Kablosuz iletişim sistemleri, ağ protokolleri ve uydu teknolojileri üzerinde çalışır.', 
        workplace: 'GSM operatörleri, haberleşme şirketleri, uydu merkezleri.', 
        jobFindingEase: 7, 
        growthPotential: 8, 
        internationalOpportunities: 8
      },
      { 
        title: 'Power Systems Engineer', 
        description: 'Elektrik üretimi, iletimi ve dağıtımı sistemlerinin verimliliği üzerine odaklanır.', 
        workplace: 'Enerji santralleri, elektrik dağıtım şirketleri, ağır sanayi tesisleri.', 
        jobFindingEase: 8, 
        growthPotential: 7, 
        internationalOpportunities: 7
      }
    ]
  },
  { 
    id: 'sec-3', 
    name: 'Yenilenebilir Enerji', 
    category: 'Mühendislik',
    growth: '%40', 
    difficulty: 'Orta', 
    salary: '35k - 90k TL', 
    icon: '🌱',
    description: 'Sürdürülebilir bir gelecek için kritik öneme sahip mühendislik alanı.',
    hardSkills: ['Solar Panel', 'Enerji Depolama', 'CAD'],
    trends: ['Yeşil Hidrojen', 'Karbon Yakalama'],
    specializations: [
      { 
        title: 'Solar Energy Specialist', 
        description: 'Güneş paneli tarlaları ve bireysel sistemlerin kurulumu, bakımı ve tasarımı.', 
        workplace: 'Enerji firmaları, inşaat şirketleri, danışmanlık ofisleri.', 
        jobFindingEase: 8, 
        growthPotential: 9, 
        internationalOpportunities: 8
      },
      { 
        title: 'Wind Turbine Designer', 
        description: 'Rüzgar enerjisi sistemleri için türbin kanatları ve jeneratör mekanizmaları tasarlar.', 
        workplace: 'Üretim tesisleri, rüzgar çiftlikleri, Ar-Ge merkezleri.', 
        jobFindingEase: 6, 
        growthPotential: 10, 
        internationalOpportunities: 9
      },
      { 
        title: 'Battery Storage Expert', 
        description: 'Yenilenebilir enerjinin depolanması için yeni nesil batarya teknolojileri geliştirir.', 
        workplace: 'Batarya fabrikaları, elektrikli araç üreticileri, teknoloji devleri.', 
        jobFindingEase: 7, 
        growthPotential: 10, 
        internationalOpportunities: 10
      }
    ]
  },
  {
    id: 'sec-5',
    name: 'Dijital Tasarım & UX',
    category: 'Yaratıcı',
    growth: '%22',
    difficulty: 'Orta',
    salary: '30k - 100k TL',
    icon: '🎨',
    description: 'Kullanıcıların dijital dünyadaki deneyimini tasarlayan yaratıcı alan.',
    hardSkills: ['Figma', 'User Research', 'HTML/CSS'],
    trends: ['AI Tasarım Araçları', 'Kapsayıcı Tasarım'],
    specializations: [
      { 
        title: 'UX Researcher', 
        description: 'Kullanıcı davranışlarını analiz ederek dijital ürünlerin işlevselliğini artıracak stratejiler belirler.', 
        workplace: 'Yazılım şirketleri, bankalar, büyük ölçekli start-up\'lar.', 
        jobFindingEase: 7, 
        growthPotential: 8, 
        internationalOpportunities: 9
      },
      { 
        title: 'UI/Visual Designer', 
        description: 'Uygulamaların ve web sitelerinin estetik, renk ve tipografi gibi görsel unsurlarını tasarlar.', 
        workplace: 'Tasarım ajansları, reklam şirketleri, ürün odaklı teknoloji firmaları.', 
        jobFindingEase: 8, 
        growthPotential: 7, 
        internationalOpportunities: 8
      },
      { 
        title: 'Motion Designer', 
        description: 'Arayüz etkileşimleri, animasyonlar ve videolar için hareketli grafikler oluşturur.', 
        workplace: 'Oyun stüdyoları, medya kuruluşları, post-prodüksiyon evleri.', 
        jobFindingEase: 6, 
        growthPotential: 9, 
        internationalOpportunities: 9
      }
    ]
  }
];

interface Props {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSeeDetail: (id: string) => void;
  hasTestResult: boolean;
}

type SortOption = 'default' | 'salary' | 'growth' | 'compatibility';

const SectorsView: React.FC<Props> = ({ savedIds, onToggleSave, onSeeDetail, hasTestResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced Filter States
  const [minGrowth, setMinGrowth] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [minCompatibility, setMinCompatibility] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const categories = ['Hepsi', 'Teknoloji', 'Sağlık', 'Finans', 'Yaratıcı', 'Mühendislik'];
  const difficulties = ['Orta', 'Yüksek', 'Çok Yüksek'];

  const getMinSalaryValue = (salaryStr: string) => {
    const match = salaryStr.match(/(\d+)k/);
    return match ? parseInt(match[1]) : 0;
  };

  const getGrowthValue = (growthStr: string) => {
    return parseInt(growthStr.replace('%', ''));
  };

  const getMockScore = (sectorName: string) => {
    const testResult = localStorage.getItem('guidely_test_result');
    if (!testResult) return 0;
    let hash = 0;
    const str = sectorName + testResult;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(65 + (hash % 31));
  };

  const filteredAndSortedSectors = useMemo(() => {
    let result = sectors.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Hepsi' || s.category === selectedCategory;
      const matchesGrowth = getGrowthValue(s.growth) >= minGrowth;
      const matchesSalary = getMinSalaryValue(s.salary) >= minSalary;
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(s.difficulty);
      const matchesSaved = !onlySaved || savedIds.includes(s.id);
      const matchesAI = !hasTestResult || getMockScore(s.name) >= minCompatibility;

      return matchesSearch && matchesCategory && matchesGrowth && matchesSalary && matchesDifficulty && matchesSaved && matchesAI;
    });

    if (sortBy === 'salary') {
      result.sort((a, b) => getMinSalaryValue(b.salary) - getMinSalaryValue(a.salary));
    } else if (sortBy === 'growth') {
      result.sort((a, b) => getGrowthValue(b.growth) - getGrowthValue(a.growth));
    } else if (sortBy === 'compatibility' && hasTestResult) {
      result.sort((a, b) => getMockScore(b.name) - getMockScore(a.name));
    }

    return result;
  }, [searchTerm, selectedCategory, minGrowth, minSalary, selectedDifficulties, onlySaved, savedIds, minCompatibility, hasTestResult, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Hepsi');
    setMinGrowth(0);
    setMinSalary(0);
    setSelectedDifficulties([]);
    setOnlySaved(false);
    setMinCompatibility(0);
    setSortBy('default');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Sektör Keşif Merkezi</h1>
          <p className="text-gray-500 font-medium">Potansiyeline en uygun profesyonel dünyayı filtrele.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Sektör ara..."
              className="pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none w-full sm:w-64 shadow-sm font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              showAdvancedFilters ? 'bg-brand-primary text-white shadow-xl shadow-brand-200' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-primary hover:text-brand-primary shadow-sm'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtrele
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl animate-in slide-in-from-top-4 duration-300 space-y-8 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Range Filters */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" /> Min. Büyüme
                  </label>
                  <span className="text-xs font-black text-brand-primary bg-brand-50 px-2 py-0.5 rounded-lg">%{minGrowth}</span>
                </div>
                <input 
                  type="range" min="0" max="60" step="5"
                  value={minGrowth} onChange={(e) => setMinGrowth(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-brand-primary" /> Min. Maaş
                  </label>
                  <span className="text-xs font-black text-brand-primary bg-brand-50 px-2 py-0.5 rounded-lg">{minSalary}k TL</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="10"
                  value={minSalary} onChange={(e) => setMinSalary(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
              </div>
            </div>

            {/* Sorting & Difficulty */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sıralama Ölçütü
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'default', label: 'Varsayılan' },
                    { id: 'salary', label: 'En Yüksek Maaş' },
                    { id: 'growth', label: 'En Hızlı Büyüme' },
                    { id: 'compatibility', label: 'AI Uyumluluğu' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSortBy(opt.id as SortOption)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        sortBy === opt.id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Zorluk
                </label>
                <div className="flex gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulties(prev => prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff])}
                      className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${
                        selectedDifficulties.includes(diff) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Special & Reset */}
            <div className="space-y-6">
              {hasTestResult && (
                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-brand-700 uppercase tracking-widest flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5" /> AI Uyumluluğu: %{minCompatibility}
                    </label>
                  </div>
                  <input 
                    type="range" min="0" max="95" step="5"
                    value={minCompatibility} onChange={(e) => setMinCompatibility(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-brand-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                </div>
              )}
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setOnlySaved(!onlySaved)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${onlySaved ? 'bg-brand-100 border-brand-primary text-brand-primary' : 'bg-white border-gray-100 text-gray-400'}`}
                >
                  <Bookmark className="w-4 h-4" /> Sadece Kaydedilenler
                </button>
                <button 
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase text-red-400 hover:text-red-500 transition-colors py-2"
                >
                  Tüm Filtreleri Sıfırla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Bar */}
      <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              selectedCategory === cat 
              ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-100' 
              : 'bg-white border-gray-100 text-gray-400 hover:border-brand-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedSectors.map((sector) => (
          <div key={sector.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 group relative flex flex-col">
            <button 
              onClick={() => onToggleSave(sector.id)}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-gray-300 hover:text-brand-primary transition-all z-10"
            >
              {savedIds.includes(sector.id) ? <BookmarkCheck className="w-5 h-5 fill-current text-brand-primary" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <div className="p-8 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-start gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-50 rounded-[22px] flex-shrink-0 flex items-center justify-center text-4xl shadow-inner border border-brand-100">
                  {sector.icon}
                </div>
                <div className="flex flex-col items-start gap-1 overflow-hidden">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 text-[9px] font-black uppercase rounded-lg whitespace-nowrap">
                    {sector.category}
                  </span>
                  {hasTestResult && (
                    <span className="text-[10px] font-black text-indigo-500 whitespace-nowrap">%{getMockScore(sector.name)} Uyum</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight">{sector.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">{sector.description}</p>
              
              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><DollarSign className="w-2.5 h-2.5" /> Maaş</p>
                  <p className="text-[10px] font-black text-brand-primary">{sector.salary.split(' - ')[0]}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><TrendingUp className="w-2.5 h-2.5" /> Büyüme</p>
                  <p className="text-[10px] font-black text-green-600">{sector.growth}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Gauge className="w-2.5 h-2.5" /> Zorluk</p>
                  <p className="text-[10px] font-black text-orange-500">{sector.difficulty}</p>
                </div>
              </div>

              {/* Skills Preview */}
              {(sector.hardSkills && sector.hardSkills.length > 0) && (
                <div className="mb-6 space-y-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em] flex items-center gap-1.5"><Cpu className="w-3 h-3" /> Kritik Beceriler</p>
                  <div className="flex flex-wrap gap-2">
                    {sector.hardSkills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-brand-50/50 text-brand-600 text-[9px] font-bold rounded-lg border border-brand-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trend Snippet */}
              {(sector.trends && sector.trends.length > 0) && (
                <div className="mb-8 p-3 bg-indigo-50/30 rounded-xl border border-indigo-100/50">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Lightbulb className="w-3 h-3" /> Trend</p>
                  <p className="text-[10px] text-gray-600 font-medium italic line-clamp-1">{sector.trends[0]}</p>
                </div>
              )}

              <button 
                onClick={() => onSeeDetail(sector.id)}
                className="w-full mt-auto bg-brand-primary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-600 shadow-xl shadow-brand-100 active:scale-[0.98] transition-all"
              >
                Analizi Gör
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorsView;
