
import React, { useState, useMemo, useRef } from 'react';
import { 
  MessageSquare, 
  Video, 
  Quote, 
  Star, 
  School, 
  Home, 
  Music, 
  ChevronRight, 
  ChevronLeft,
  Users,
  GraduationCap,
  Play,
  Pause,
  X,
  LayoutGrid,
  MapPin,
  Building2,
  Bed,
  Sparkles,
  Award,
  BookOpen,
  MonitorPlay
} from 'lucide-react';
import { universities } from './UniversitiesView';
import { AcademicMember, StudentVlog, Grade, CampusVlog } from '../types';

type MainSection = 'none' | 'faculty-about' | 'campus-about';
type CornerType = 'academic' | 'student';
type ReviewCategory = 'yurt' | 'kampus' | 'sosyal';

const DEPARTMENTS: Record<string, string[]> = {
  'Bilgisayar ve Bilişim': ['Bilgisayar Mühendisliği', 'Yapay Zeka ve Veri Mühendisliği', 'Yazılım Mühendisliği'],
  'İnşaat': ['İnşaat Mühendisliği', 'Geomatik Mühendisliği'],
  'Mimarlık': ['Mimarlık', 'Şehir ve Bölge Planlama', 'Endüstriyel Tasarım'],
  'Maden': ['Maden Mühendisliği', 'Jeoloji Mühendisliği', 'Petrol ve Doğalgaz Mühendisliği'],
  'Uçak ve Uzay Bilimleri': ['Uçak Mühendisliği', 'Uzay Mühendisliği', 'Meteoroloji Mühendisliği'],
  'Mühendislik': ['Makine Mühendisliği', 'Elektrik Mühendisliği', 'Endüstri Mühendisliği', 'Kimya Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'İnşaat Mühendisliği', 'Bilgisayar Mühendisliği'],
  'Fen Edebiyat': ['Fizik', 'Matematik', 'Biyoloji', 'Kimya', 'Sosyoloji', 'Psikoloji'],
  'Fen-Edebiyat': ['Fizik', 'Matematik', 'Biyoloji', 'Kimya', 'Sosyoloji', 'Psikoloji'],
  'İktisadi ve İdari Bilimler': ['İktisat', 'İşletme', 'Siyaset Bilimi ve Uluslararası İlişkiler', 'Uluslararası Ticaret'],
  'Eğitim': ['Bilgisayar ve Öğretim Teknolojileri', 'Rehberlik ve Psikolojik Danışmanlık', 'Okul Öncesi Eğitimi'],
  'Yönetim Bilimleri': ['Yönetim Bilişim Sistemleri', 'Turizm İşletmeciliği', 'Ekonomi'],
  'Tıp': ['Tıp', 'Temel Tıp Bilimleri', 'Cerrahi Tıp Bilimleri'],
  'Hukuk': ['Hukuk', 'Kamu Hukuku', 'Özel Hukuk'],
  'İnsani Bilimler ve Edebiyat': ['Felsefe', 'Tarih', 'İngiliz Dili ve Edebiyatı', 'Arkeoloji'],
  'Fen': ['Fizik', 'Kimya', 'Matematik', 'Moleküler Biyoloji ve Genetik'],
  'İletişim': ['Gazetecilik', 'Radyo, Televizyon ve Sinema', 'Halkla İlişkiler'],
  'Sanat ve Sosyal Bilimler': ['Psikoloji', 'Siyaset Bilimi', 'Görsel Sanatlar'],
  'Güzel Sanatlar': ['Resim', 'Heykel', 'Grafik Tasarım'],
  'Ziraat': ['Bahçe Bitkileri', 'Tarla Bilkileri', 'Zootekni']
};

const MOCK_ACADEMICS: AcademicMember[] = [
  { 
    id: 'a-odtu-1', 
    name: 'Prof. Dr. Bilge Demirköz', 
    title: 'Fizik Bölümü Öğretim Üyesi', 
    faculty: 'Fen-Edebiyat', 
    department: 'Fizik', 
    avatar: '', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    publications: 210, 
    citations: 8400, 
    hIndex: 52, 
    bio: 'CERN projelerinde aktif rol alan Demirköz, yüksek enerji fiziği ve uzay radyasyonu ölçümleri üzerine dünya çapında araştırmalar yürütmektedir.' 
  },
  { 
    id: 'a-odtu-2', 
    name: 'Prof. Dr. Haluk Külah', 
    title: 'Elektrik-Elektronik Müh. Öğretim Üyesi', 
    faculty: 'Mühendislik', 
    department: 'Elektrik-Elektronik Mühendisliği', 
    avatar: '', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
    publications: 200, 
    citations: 7850, 
    hIndex: 44, 
    bio: 'Mikro-elektromekanik sistemler (MEMS) ve biyomedikal mikro-cihazlar (BioMEMS) konusunda dünya çapında otoritedir. ODTÜ-MEMS Merkezi bünyesinde kanserli hücre tespiti ve gelişmiş koklear implantlar üzerine çığır açan projeler yürütmektedir.' 
  },
  { 
    id: 'a-odtu-3', 
    name: 'Prof. Dr. Ahmet Cevdet Yalçıner', 
    title: 'İnşaat Mühendisliği Öğretim Üyesi', 
    faculty: 'Mühendislik', 
    department: 'İnşaat Mühendisliği', 
    avatar: '', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 
    publications: 150, 
    citations: 4100, 
    hIndex: 34, 
    bio: 'Deniz ve kıyı mühendisliği uzmanı Yalçıner, tsunami modelleme ve risk analizi konularında Birleşmiş Milletler ve UNESCO projelerinde görev almaktadır.' 
  },
  { 
    id: 'a-odtu-4', 
    name: 'Doç. Dr. Şeyda Ertekin', 
    title: 'Bilgisayar Mühendisliği Öğretim Üyesi', 
    faculty: 'Mühendislik', 
    department: 'Bilgisayar Mühendisliği', 
    avatar: '', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 
    publications: 65, 
    citations: 1200, 
    hIndex: 19, 
    bio: 'Yapay zeka, makine öğrenmesi ve veri madenciliği üzerine yoğunlaşan Ertekin, büyük veri analitiği laboratuvarında yenilikçi algoritmalar geliştirmektedir.' 
  },
  { id: 'a1', name: 'Prof. Dr. Ahmet Yılmaz', title: 'Bölüm Başkanı', faculty: 'Bilgisayar ve Bilişim', department: 'Bilgisayar Mühendisliği', avatar: '', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', publications: 124, citations: 3500, hIndex: 42, bio: 'Yapay zeka ve büyük veri analitiği üzerine 20 yıllık araştırma deneyimine sahiptir.' },
  { id: 'a2', name: 'Doç. Dr. Elif Gök', title: 'Öğretim Üyesi', faculty: 'Mimarlık', department: 'Mimarlık', avatar: '', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', publications: 56, citations: 1200, hIndex: 18, bio: 'Sürdürülebilir mimari ve kentsel dönüşüm stratejileri uzmanıdır.' }
];

const MOCK_STUDENTS: StudentVlog[] = [
  { id: 's1', name: 'Can Mert', universityId: 'itu', faculty: 'Bilgisayar ve Bilişim', department: 'Bilgisayar Mühendisliği', grade: '3. Sınıf', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', description: 'İTÜ Bilgisayar\'da bir günüm nasıl geçiyor? Dersler, laboratuvarlar ve sosyal yaşam.' },
  { id: 's2', name: 'İpek Yıldız', universityId: 'bogazici', faculty: 'İktisadi ve İdari Bilimler', department: 'İşletme', grade: '2. Sınıf', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', description: 'Güney Kampüs\'te işletme öğrencisi olmak. Kulüp faaliyetleri ve kariyer hedeflerim.' },
  { id: 's3', name: 'Mert Aksoy', universityId: 'odtu', faculty: 'Mühendislik', department: 'Elektrik-Elektronik Mühendisliği', grade: '4. Sınıf', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', description: 'Mezuniyet projesi sürecimiz ve ODTÜ EE kütüphanesindeki sabahlamalarımız.' },
  { id: 's5', name: 'Bora Yılmaz', universityId: 'koc', faculty: 'Tıp', department: 'Tıp', grade: 'Mezun', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', description: 'Koç Tıp mezunu olarak kariyer yolculuğum. TUS süreci ve Rumeli Feneri kampüsündeki hastane stajları.' }
];

const MOCK_CAMPUS_VLOGS: CampusVlog[] = [
  { id: 'cv1', universityId: 'itu', category: 'yurt', studentName: 'Ahmet Arı', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', description: 'İTÜ Ayazağa Yerleşkesi yurtlarının oda koşulları ve imkanlarını detaylıca geziyoruz.' },
  { id: 'cv2', universityId: 'itu', category: 'kampus', studentName: 'Selin Su', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', description: 'İTÜ Kampüs turu: Merkezi kütüphane, spor salonları ve favori kahve mekanlarımız.' },
  { id: 'cv3', universityId: 'itu', category: 'sosyal', studentName: 'Kaan Gök', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', description: 'İTÜ kulüp kültürü: Robot Olimpiyatları hazırlıkları ve kampüs festivalleri.' },
  { id: 'cv4', universityId: 'odtu', category: 'kampus', studentName: 'Ece Kar', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', thumbnailUrl: 'https://images.unsplash.com/photo-1523240715632-d984bb4b9156?auto=format&fit=crop&q=80&w=1200', description: 'ODTÜ Devrim Stadyumu ve kampüs ormanında bir gün. Doğa ve okul iç içe!' },
  { id: 'cv5', universityId: 'bogazici', category: 'kampus', studentName: 'Caner Deniz', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', description: 'Güney Kampüsün tarihi binaları ve Boğaz manzaralı çalışma alanları turu.' },
  { id: 'cv9', universityId: 'koc', category: 'kampus', studentName: 'Barış Su', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', description: 'Koç Üniversitesi Rumeli Feneri kampüsü yaşamı, sosyal olanaklar ve kütüphane kültürü.' },
  { id: 'cv10', universityId: 'koc', category: 'yurt', studentName: 'Melis Aydın', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', description: 'Koç Üniversitesi Batı Kampüsü yurt yaşamı ve shuttle sistemi incelemesi.' }
];

const allUniversities = universities.map(u => u.id);
const allCategories: ReviewCategory[] = ['yurt', 'kampus', 'sosyal'];

const mockCampusReviews: Record<string, Record<ReviewCategory, { id: string, userName: string, role: string, text: string, rating: number, date: string }[]>> = {};

allUniversities.forEach(uniId => {
  mockCampusReviews[uniId] = {
    yurt: [
      { id: `${uniId}-y1`, userName: 'Mehmet A.', role: 'Öğrenci', text: 'Konaklama imkanları yeterli, oda arkadaşlığı kültürü gelişmiş.', rating: 4, date: '1 ay önce' },
      { id: `${uniId}-y2`, userName: 'Seda K.', role: 'Öğrenci', text: 'Isınma ve internet hızı oldukça iyi.', rating: 5, date: '2 hafta önce' }
    ],
    kampus: [
      { id: `${uniId}-k1`, userName: 'Ali V.', role: 'Öğrenci', text: 'Kütüphane kaynakları ve çalışma alanları geniş.', rating: 5, date: '3 hafta önce' },
      { id: `${uniId}-k2`, userName: 'Burcu S.', role: 'Öğrenci', text: 'Peyzaj ve ulaşım kolaylığı dikkat çekici.', rating: 4, date: '1 ay önce' }
    ],
    sosyal: [
      { id: `${uniId}-s1`, userName: 'Ceren T.', role: 'Öğrenci', text: 'Kulüpler çok aktif, her hafta bir etkinlik var.', rating: 5, date: '2 ay önce' },
      { id: `${uniId}-s2`, userName: 'Caner L.', role: 'Öğrenci', text: 'Öğrenci toplulukları sayesinde çok sosyalleşebiliyorum.', rating: 5, date: '1 hafta önce' }
    ]
  };
});

mockCampusReviews['odtu']['kampus'] = [
  { id: 'odtu-k1', userName: 'Melis Yıldız', role: '4. Sınıf', text: 'Devrim stadyumunda gün batımı izlemek paha biçilemez. Kampüsün büyüklüğü bazen yorucu olsa da ring seferleri gerçekten hayat kurtarıyor.', rating: 5, date: '2 gün önce' },
  { id: 'odtu-k2', userName: 'Burak Can', role: '2. Sınıf', text: 'Kütüphane sınav haftalarında 24 saat açık ve atmosferi gerçekten ders çalışmaya itiyor. Sosyal tesislerdeki yemekler de Ankara şartlarına göre gayet uygun.', rating: 4, date: '1 hafta önce' },
  { id: 'odtu-k3', userName: 'Aslı Güneş', role: 'Mezun', text: 'Kampüs içinde o kadar çok ağaç var ki kendinizi şehirde değil ormanda hissediyorsunuz. Mimarlık binasının tasarımı zaten bir efsane, mutlaka gezilmeli.', rating: 5, date: '3 hafta önce' },
  { id: 'odtu-k4', userName: 'Murat Deniz', role: '3. Sınıf', text: 'Çarşı bölgesi kampüsün kalbi gibi. Bankadan terziye, marketten kitapçıya her türlü ihtiyacınızı kampüsten hiç çıkmadan karşılayabiliyorsunuz.', rating: 5, date: '1 ay önce' },
  { id: 'odtu-k5', userName: 'Ege Kaan', role: '1. Sınıf', text: 'Bisikletle gezmek için Türkiye\'deki en uygun kampüslerden biri olabilir. Ankara\'nın meşhur ayazında bile kampüsün havası ve ruhu bir başka hissettiriyor.', rating: 4, date: '2 ay önce' },
  { id: 'odtu-k6', userName: 'Deniz Alp', role: '4. Sınıf', text: 'Spor tesisleri inanılmaz gelişmiş. Olimpik havuzdan tenis kortlarına kadar her şey elimizin altında. Tek eksisi ringlerin bazen çok dolu olması.', rating: 4, date: '3 ay önce' },
  { id: 'odtu-k7', userName: 'Selin Doğan', role: '3. Sınıf', text: 'ODTÜ kampüsü bir okuldan ziyade bir şehir gibi. Her bölgenin kendine has bir ruhu var. Hazırlık binalarından Yalıncak tepesine kadar her yer hatıra dolu.', rating: 5, date: '5 gün önce' },
  { id: 'odtu-k8', userName: 'Caner Deniz', role: '2. Sınıf', text: 'Yurtlardan bölümlere yürümek bazen sabah sporu gibi oluyor ama o çam ağaçlarının kokusunu içinize çekmek tüm yorgunluğu alıyor. Sosyallik her yerde!', rating: 5, date: '12 gün önce' }
];

const ReviewsView: React.FC = () => {
  const [mainSection, setMainSection] = useState<MainSection>('none');
  const [cornerMode, setCornerMode] = useState<CornerType | null>(null);
  const [step, setStep] = useState(0); 

  const [selectedUni, setSelectedUni] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('1. Sınıf');
  const [activeCategory, setActiveCategory] = useState<ReviewCategory | null>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetFlow = () => {
    setMainSection('none');
    setCornerMode(null);
    setStep(0);
    setSelectedUni('');
    setSelectedFaculty('');
    setSelectedDept('');
    setSelectedGrade('1. Sınıf');
    setActiveCategory(null);
  };

  const currentUniData = universities.find(u => u.id === selectedUni);
  const faculties = currentUniData?.faculties || [];
  const depts = selectedFaculty ? (DEPARTMENTS[selectedFaculty] || []) : [];

  const filteredAcademics = useMemo(() => {
    let matches = MOCK_ACADEMICS.filter(a => {
        const isMETU = selectedUni === 'odtu' && a.id.startsWith('a-odtu');
        const isDeptMatch = a.department === selectedDept;
        return isMETU && isDeptMatch;
    });

    if (matches.length > 0) return matches;

    matches = MOCK_ACADEMICS.filter(a => {
        return selectedUni === 'odtu' && a.id.startsWith('a-odtu') && a.faculty === selectedFaculty;
    });

    if (matches.length > 0) return matches;

    const generic = MOCK_ACADEMICS.filter(a => a.faculty === selectedFaculty && !a.id.startsWith('a-odtu'));
    return generic.length > 0 ? generic : MOCK_ACADEMICS.slice(0, 3);
  }, [selectedUni, selectedFaculty, selectedDept]);

  const filteredStudents = useMemo(() => {
    const uniMatch = MOCK_STUDENTS.filter(s => s.universityId === selectedUni);
    if (uniMatch.length > 0) {
        const deptMatch = uniMatch.filter(s => s.department === selectedDept);
        return deptMatch.length > 0 ? deptMatch : uniMatch;
    }
    return [];
  }, [selectedUni, selectedDept]);

  const filteredCampusVlogs = useMemo(() => {
    const uniMatch = MOCK_CAMPUS_VLOGS.filter(v => v.universityId === selectedUni);
    if (uniMatch.length > 0) {
        const categoryMatch = uniMatch.filter(v => v.category === activeCategory);
        return categoryMatch.length > 0 ? categoryMatch : [uniMatch[0]];
    }
    return [];
  }, [selectedUni, activeCategory]);

  const getAvgRating = (uniId: string, category: ReviewCategory) => {
    const reviews = mockCampusReviews[uniId]?.[category] || [];
    if (reviews.length === 0) return "-";
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const campusCategories = [
    { id: 'yurt' as ReviewCategory, label: 'Yurt Koşulları', icon: Bed, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { id: 'kampus' as ReviewCategory, label: 'Kampüs Koşulları', icon: School, color: 'text-brand-primary', bgColor: 'bg-brand-50' },
    { id: 'sosyal' as ReviewCategory, label: 'Sosyal Aktivite', icon: Music, color: 'text-pink-500', bgColor: 'bg-pink-50' },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div onClick={() => { setMainSection('faculty-about'); setStep(1); }} className="group bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-primary transition-all cursor-pointer text-center space-y-8">
              <div className="w-24 h-24 bg-brand-50 rounded-[35px] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                <Building2 className="w-10 h-10 text-brand-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Fakülte ve Bölüm Hakkında</h3>
                <p className="text-gray-400 text-sm font-medium">Bölüm başkanları ve mevcut öğrencilerden akademik detaylar.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">Giriş Yap <ChevronRight className="w-4 h-4" /></div>
            </div>
            <div onClick={() => { setMainSection('campus-about'); setStep(2); }} className="group bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-500 transition-all cursor-pointer text-center space-y-8">
              <div className="w-24 h-24 bg-indigo-50 rounded-[35px] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                <Home className="w-10 h-10 text-indigo-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Kampüs ve Yurtlar Hakkında</h3>
                <p className="text-gray-400 text-sm font-medium">Üniversite hayatı, konaklama ve yerleşke imkanlarına dair görüşler.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">Giriş Yap <ChevronRight className="w-4 h-4" /></div>
            </div>
          </div>
        );
      case 1: 
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
             <div onClick={() => { setCornerMode('academic'); setStep(2); }} className="p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-brand-primary hover:shadow-xl transition-all cursor-pointer group text-center space-y-6">
               <div className="w-20 h-20 bg-brand-50 rounded-[28px] flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-brand-primary" />
               </div>
               <h4 className="text-xl font-black text-gray-800">Akademisyen Görüşleri</h4>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Bölüm başkanları ve profesörler</p>
             </div>
             <div onClick={() => { setCornerMode('student'); setStep(2); }} className="p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer group text-center space-y-6">
               <div className="w-20 h-20 bg-indigo-50 rounded-[28px] flex items-center justify-center mx-auto">
                <GraduationCap className="w-10 h-10 text-indigo-500" />
               </div>
               <h4 className="text-xl font-black text-gray-800">Öğrenci Görüşleri</h4>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Akran deneyimi ve vloglar</p>
             </div>
          </div>
        );
      case 2: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Üniversite Seçin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map(uni => (
                <div key={uni.id} onClick={() => { setSelectedUni(uni.id); if (mainSection === 'faculty-about') setStep(3); else setStep(6); }} className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <School className="w-7 h-7 text-brand-primary" />
                  </div>
                  <span className="font-black text-gray-700 tracking-tight">{uni.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 3: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Fakülte Seçin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculties.map(faculty => (
                <div key={faculty} onClick={() => { setSelectedFaculty(faculty); setStep(4); }} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center justify-between group">
                  <span className="font-bold text-gray-700">{faculty} Fakültesi</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );
      case 4: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Bölüm Seçin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {depts.map(dept => (
                <div key={dept} onClick={() => { setSelectedDept(dept); if (cornerMode === 'student') setStep(5); else setStep(7); }} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center justify-between group">
                  <span className="font-bold text-gray-700">{dept}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );
      case 5: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Sınıf Seçin</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Hazırlık', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Mezun'].map(grade => (
                <div key={grade} onClick={() => { setSelectedGrade(grade as Grade); setStep(7); }} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-indigo-500 transition-all cursor-pointer text-center group">
                  <span className="font-black text-gray-700 group-hover:text-indigo-600">{grade}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 6: 
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campusCategories.map((cat) => {
                  const avg = getAvgRating(selectedUni, cat.id);
                  return (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`p-8 rounded-[45px] border transition-all flex flex-col items-center text-center gap-5 relative group ${activeCategory === cat.id ? 'bg-brand-primary border-brand-primary text-white shadow-2xl shadow-brand-200 -translate-y-2' : 'bg-white border-gray-100 text-gray-500 hover:border-brand-200'}`}>
                      <div className={`p-5 rounded-3xl ${activeCategory === cat.id ? 'bg-white/20' : cat.bgColor} group-hover:scale-110 transition-transform`}>
                        <cat.icon className={`w-8 h-8 ${activeCategory === cat.id ? 'text-white' : cat.color}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                          <Star className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white fill-current' : 'text-yellow-400 fill-current'}`} />
                          <span className={`text-sm font-black ${activeCategory === cat.id ? 'text-white' : 'text-gray-700'}`}>{avg}/5</span>
                        </div>
                      </div>
                      <div className={`mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-white/80' : 'text-brand-primary'}`}><Play className="w-3 h-3 fill-current" /> Deneyimi İzle</div>
                    </button>
                  );
                })}
              </div>
              {activeCategory && (
                <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                       <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3"><Sparkles className="w-6 h-6 text-brand-primary" /> {campusCategories.find(c => c.id === activeCategory)?.label} Video İncelemesi</h3>
                       {filteredCampusVlogs.length > 0 ? filteredCampusVlogs.map(vlog => (
                         <div key={vlog.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group mb-6">
                           <div className="relative aspect-video bg-gray-900">
                             <img 
                              src={vlog.thumbnailUrl || `https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800`} 
                              className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" 
                              alt="" 
                             />
                             <button onClick={() => setActiveVideo(vlog.videoUrl)} className="absolute inset-0 m-auto w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><Play className="w-8 h-8 fill-current ml-1" /></button>
                           </div>
                           <div className="p-8 flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-brand-50 shadow-md flex-shrink-0">
                                <img src={vlog.avatar} alt={vlog.studentName} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-black text-gray-800">{vlog.studentName}</h5>
                                <p className="text-sm text-gray-500 font-medium italic">"{vlog.description}"</p>
                              </div>
                           </div>
                         </div>
                       )) : (
                        <div className="bg-white p-20 rounded-[45px] border-2 border-dashed border-gray-100 text-center">
                            <MonitorPlay className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Bu üniversite için video henüz eklenmedi.</p>
                        </div>
                       )}
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                       <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3"><MessageSquare className="w-6 h-6 text-brand-primary" /> Öğrenci Yorumları</h3>
                       <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {(mockCampusReviews[selectedUni]?.[activeCategory] || []).map(r => (
                          <div key={r.id} className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm relative group">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">{r.userName[0]}</div>
                                <div>
                                  <p className="font-black text-gray-800 text-xs">{r.userName}</p>
                                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{r.role}</p>
                                </div>
                              </div>
                              <div className="flex text-yellow-400">{Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} />)}</div>
                            </div>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed italic">"{r.text}"</p>
                          </div>
                        ))}
                       </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        );
      case 7: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-brand-50 rounded-[28px] flex items-center justify-center shadow-inner">{cornerMode === 'academic' ? <Users className="w-8 h-8 text-brand-primary" /> : <GraduationCap className="w-8 h-8 text-indigo-500" />}</div>
                   <div>
                      <h4 className="font-black text-xl text-gray-800 tracking-tight">{currentUniData?.name}</h4>
                      <p className="text-brand-primary text-xs font-black uppercase tracking-widest">{selectedDept || 'Genel Bakış'} • {cornerMode === 'academic' ? 'Akademisyen Portalı' : `${selectedGrade} Deneyimi`}</p>
                   </div>
                </div>
                <button onClick={() => setStep(1)} className="text-brand-primary font-black text-xs uppercase tracking-widest hover:underline border border-brand-100 px-6 py-2 rounded-full hover:bg-brand-50 transition-all">Seçimi Sıfırla</button>
             </div>
             {cornerMode === 'academic' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAcademics.map(academic => (
                    <div key={academic.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      {/* Video Arka Plan Alanı - Fotoğraf ve Simge Tamamen Kaldırıldı */}
                      <div className="relative aspect-video bg-gradient-to-br from-brand-900 to-indigo-900 group-hover:brightness-110 transition-all flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900/60 backdrop-blur-[2px]">
                          <div className="text-center px-10 animate-in fade-in zoom-in duration-700">
                              <span className="text-2xl md:text-3xl font-black text-white/95 block mb-3 leading-tight drop-shadow-xl">{academic.name}</span>
                              <span className="text-[11px] font-black text-brand-200 uppercase tracking-[0.4em] opacity-90 drop-shadow-md">{academic.title}</span>
                          </div>
                        </div>
                        <button onClick={() => setActiveVideo(academic.videoUrl)} className="absolute inset-0 m-auto w-24 h-24 bg-white/10 hover:bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20 hover:scale-110 transition-all z-10 group/play">
                          <Play className="w-10 h-10 fill-current ml-1 group-hover/play:scale-110 transition-transform" />
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                      </div>
                      <div className="p-10 space-y-8">
                        <div className="space-y-4"><h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Quote className="w-3 h-3 text-brand-primary" /> Akademik Vizyon</h5><p className="text-gray-500 italic font-medium leading-relaxed">"{academic.bio}"</p></div>
                        <div className="grid grid-cols-3 gap-4">
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100"><p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Yayın</p><p className="text-xl font-black text-brand-primary">{academic.publications}</p></div>
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100"><p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Atıf</p><p className="text-xl font-black text-brand-primary">{academic.citations}</p></div>
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100"><p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">H-Index</p><p className="text-xl font-black text-brand-primary">{academic.hIndex}</p></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredStudents.length > 0 ? filteredStudents.map(student => (
                    <div key={student.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-video bg-gray-900">
                        <img 
                          src={student.thumbnailUrl || `https://images.unsplash.com/photo-1523240715632-d984bb4b9156?auto=format&fit=crop&q=80&w=800`} 
                          className="w-full h-full object-cover opacity-40" 
                          alt="" 
                        />
                        <button onClick={() => setActiveVideo(student.videoUrl)} className="absolute inset-0 m-auto w-20 h-20 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><Play className="w-8 h-8 fill-current ml-1" /></button>
                      </div>
                      <div className="p-10 space-y-6">
                         <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[22px] overflow-hidden border-2 border-indigo-50 shadow-md flex-shrink-0">
                              <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <h5 className="font-black text-xl text-gray-800 tracking-tight">{student.name}</h5>
                               <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-xl border border-indigo-100">{student.grade}</span>
                            </div>
                         </div>
                         <p className="text-gray-500 font-medium leading-relaxed italic">"{student.description}"</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full bg-white p-20 rounded-[45px] border-2 border-dashed border-gray-100 text-center">
                        <MonitorPlay className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Bu bölüm/sınıf için öğrenci videosu henüz eklenmedi.</p>
                    </div>
                  )}
                </div>
             )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">Görüşler & Deneyimler</h1>
          <p className="text-gray-500 font-medium text-lg">Gerçek hayat, gerçek deneyim. Doğru tercihi içeriden dinle.</p>
        </div>
        {step > 0 && (
          <button onClick={resetFlow} className="flex items-center gap-3 text-brand-primary font-black text-sm uppercase tracking-widest hover:gap-4 transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Ana Menüye Dön
          </button>
        )}
      </div>
      {renderStepContent()}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[50px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <button onClick={() => { setActiveVideo(null); setIsPlaying(false); }} className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white z-20 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
              <video ref={videoRef} src={activeVideo} className="w-full h-full object-contain" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls={false} />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button onClick={() => videoRef.current?.play()} className="w-28 h-28 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><Play className="w-12 h-12 fill-current ml-1" /></button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsView;
