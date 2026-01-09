
import React, { useState } from 'react';
import { University } from '../types';
import { 
  Search, MapPin, Award, Users, PlusCircle, Check, Filter, Globe, School, Smile, 
  ArrowLeft, Building2, Map, LayoutGrid, Heart, Music, Coffee, Bed, CheckCircle2,
  Trophy, Sparkles, Calendar, Zap, Lightbulb, Camera, Globe2, HeartHandshake,
  Target, BarChart3, Medal, Star, Wallet, BadgePercent, Gift
} from 'lucide-react';

export const universities: University[] = [
  { 
    id: 'itu', 
    name: 'İstanbul Teknik Üniversitesi', 
    logo: 'itu_logo', 
    location: 'İstanbul', 
    researchScore: 92, 
    description: 'Türkiye\'nin en köklü mühendislik okulu, teknik eğitimin öncüsü.', 
    followers: 15400,
    studentCount: 35000,
    faculties: ['Bilgisayar ve Bilişim', 'İnşaat', 'Mimarlık', 'Maden', 'Uçak ve Uzay Bilimleri'],
    campusSize: '2.5 Milyon m²',
    clubCount: 200,
    activityLevel: 'Çok Aktif',
    worldRanking: '#401-500',
    strongestAreas: ['Mühendislik & Teknoloji', 'Mimarlık', 'Ar-Ge'],
    scholarships: [
      { name: 'İTÜ Arı Bursu', coverage: 'Tam + Nakdi Destek', description: 'YKS sıralamasında ilk 1000\'e giren öğrencilere verilen prestijli başarı bursu.' },
      { name: 'Başarı Bursları', coverage: '%100 - %50', description: 'Bölüm bazlı üstün başarı gösteren öğrencilere öğrenim süresince verilir.' },
      { name: 'İTÜ Geliştirme Vakfı Bursu', coverage: 'Yemek + Nakdi', description: 'İhtiyaç sahibi ve başarılı öğrencilere vakıf tarafından sağlanan destek.' }
    ],
    activeClubs: [
      { category: 'Teknik & Bilim', clubs: ['İTÜ Robotik', 'Havacılık Kulübü', 'İTÜ Rover Takımı', 'IEEE İTÜ'] },
      { category: 'Kültür & Sanat', clubs: ['Müzik Kulüpleri Birliği', 'Tiyatro Kulübü', 'Fotoğrafçılık Kulübü'] },
      { category: 'Kariyer & Girişim', clubs: ['Girişimcilik Kulübü', 'Yatırım Kulübü', 'Endüstri Mühendisliği Topluluğu'] },
      { category: 'Sosyal & Yaşam', clubs: ['Gönüllülük Kulübü', 'Doğa Sporları (İTÜDAK)', 'Yelken Kulübü'] }
    ],
    majorEvents: ['İTÜ Arı Günü', 'İTÜ Robot Olimpiyatları (İTÜRO)', 'Back to School Festivali', 'Sektör Günleri'],
    dorms: [
      { type: 'Üniversite', capacity: '2-4 Kişilik', amenities: ['7/24 Sıcak Su', 'Ücretsiz Wi-Fi', 'Çamaşırhane', 'Çalışma Odası'] },
      { type: 'KYK', capacity: '4-6 Kişilik', amenities: ['Yemekhane', 'Spor Alanı', 'Güvenlik'] }
    ]
  },
  { 
    id: 'odtu', 
    name: 'Ortadoğu Teknik Üniversitesi', 
    logo: 'odtu_logo', 
    location: 'Ankara', 
    researchScore: 95, 
    description: 'Uluslararası standartlarda eğitim veren, Türkiye\'nin en prestijli devlet üniversitelerinden biri.', 
    followers: 18200,
    studentCount: 28000,
    faculties: ['Mühendislik', 'Fen Edebiyat', 'İktisadi ve İdari Bilimler', 'Eğitim', 'Mimarlık'],
    campusSize: '4.5 Milyon m²',
    clubCount: 100,
    activityLevel: 'Yüksek',
    worldRanking: '#351-400',
    strongestAreas: ['Temel Bilimler', 'Elektrik-Elektronik', 'ODTÜ Teknokent'],
    scholarships: [
      { name: 'Üstün Başarı Bursu', coverage: 'Tam + Yurt', description: 'YKS\'de ilk 500 içerisindeki öğrencilere ücretsiz konaklama ve nakdi destek sağlar.' },
      { name: 'ODTÜ Geliştirme Vakfı Bursu', coverage: 'Nakdi Destek', description: 'Ekonomik desteğe ihtiyaç duyan başarılı öğrencilere yönelik aylık burs.' },
      { name: 'Kitap & Materyal Bursu', coverage: 'Kısmi Destek', description: 'Akademik materyal alımı için verilen yıllık tek seferlik destek.' }
    ],
    activeClubs: [
      { category: 'Teknik & Bilim', clubs: ['ODTÜ Robot Topluluğu', 'Havacılık ve Uzay', 'Matematik Topluluğu'] },
      { category: 'Kültür & Sanat', clubs: ['Tiyatro Topluluğu', 'Caz Topluluğu', 'Klasik Gitar Topluluğu', 'Sinema Topluluğu'] },
      { category: 'Kariyer & Girişim', clubs: ['Verimlilik Topluluğu', 'İşletme Topluluğu', 'Ekonomi Topluluğu'] },
      { category: 'Sosyal & Yaşam', clubs: ['Dağcılık ve Kış Sporları', 'Eşli Danslar Topluluğu', 'Hayvan Dostları'] }
    ],
    majorEvents: ['ODTÜ Bahar Şenliği', 'Devrim Stadyumu Konserleri', 'ODTÜ Onur Yürüyüşü', 'Uluslararası ODTÜ Robot Günleri'],
    dorms: [
      { type: 'Üniversite', capacity: '1-4 Kişilik', amenities: ['Mutfak', 'Spor Salonu', 'Kütüphane', 'Kafeterya'] }
    ]
  },
  { 
    id: 'bogazici', 
    name: 'Boğaziçi Üniversitesi', 
    logo: 'bogazici_logo', 
    location: 'İstanbul', 
    researchScore: 96, 
    description: 'Eğitim kalitesi ve kampüs kültürü ile öne çıkan, Türkiye\'nin en seçkin kurumlarından.', 
    followers: 14900,
    studentCount: 16000,
    faculties: ['Eğitim', 'Fen-Edebiyat', 'İktisadi ve İdari Bilimler', 'Mühendislik', 'Yönetim Bilimleri'],
    campusSize: '1.2 Milyon m²',
    clubCount: 45,
    activityLevel: 'Kültürel Odaklı',
    worldRanking: '#401-500',
    strongestAreas: ['İşletme & Ekonomi', 'Sosyal Bilimler', 'İngiliz Dili Eğitimi'],
    scholarships: [
      { name: 'Boğaziçi Başarı Bursu', coverage: 'Ücretsiz Yurt + Yemek', description: 'Sıralamada ilk 100\'e giren öğrencilere sağlanan kapsamlı sosyal destek.' },
      { name: 'BÜVAK Başarı Bursu', coverage: 'Aylık Nakdi', description: 'Vakıf tarafından akademik başarıyı teşvik etmek amacıyla verilir.' },
      { name: 'İhtiyaç Bursu', coverage: 'Yemek Bursu', description: 'Üniversite yemekhanelerinden ücretsiz faydalanma imkanı sağlar.' }
    ],
    activeClubs: [
      { category: 'Kültür & Sanat', clubs: ['BÜFOK (Fotoğraf)', 'Edebiyat Kulübü', 'Folklor Kulübü', 'Sinema Kulübü'] },
      { category: 'Kariyer & Girişim', clubs: ['BÜYAK (Yöneylem)', 'İşletme ve Ekonomi Kulübü'] },
      { category: 'Sosyal & Yaşam', clubs: ['BÜKAK (Kadın)', 'Mağara Araştırma', 'Sualtı Sporları (BÜSAS)'] }
    ],
    majorEvents: ['Tasasız Günler', 'Spor Kurulu Ödülleri', 'Kariyer Günleri', 'Uluslararası Boğaziçi Sport Elçileri'],
    dorms: [
      { type: 'Üniversite', capacity: '2-8 Kişilik', amenities: ['Boğaz Manzarası (Bazı odalar)', 'Sosyalleşme Alanları', 'Etüd Odaları'] }
    ]
  },
  { 
    id: 'bilkent', 
    name: 'İhsan Doğramacı Bilkent Üniversitesi', 
    logo: 'bilkent_logo', 
    location: 'Ankara', 
    researchScore: 94, 
    description: 'Türkiye\'nin ilk vakıf üniversitesi, kütüphanesi ve akademik disiplini ile dünya çapında tanınır.', 
    followers: 12100,
    studentCount: 13000,
    faculties: ['Mühendislik', 'İktisadi, İdari ve Sosyal Bilimler', 'Fen', 'Hukuk', 'Güzel Sanatlar'],
    campusSize: '1.6 Milyon m²',
    clubCount: 110,
    activityLevel: 'Akademik & Sosyal Dengeli',
    worldRanking: '#501-600',
    strongestAreas: ['Moleküler Biyoloji', 'Müzik & Sahne Sanatları', 'Hukuk'],
    scholarships: [
      { name: 'Kapsamlı Burs', coverage: 'Tam Ücret Muafiyeti + Cep Harçlığı', description: 'En yüksek puanla yerleşen öğrencilere sağlanan en kapsamlı vakıf bursu.' },
      { name: 'Tam Burs', coverage: '%100 Eğitim Ücreti', description: 'Eğitim ücretinin tamamının üniversite tarafından karşılanmasıdır.' },
      { name: 'Yetenek Bursu', coverage: '%100 - %50', description: 'Güzel Sanatlar ve Müzik fakültelerine yetenek sınavıyla giren öğrencilere verilir.' }
    ],
    activeClubs: [
      { category: 'Teknik & Bilim', clubs: ['Bilkent IEEE', 'ACM Öğrenci Kolu', 'Mühendislik Topluluğu'] },
      { category: 'Kültür & Sanat', clubs: ['Klasik Müzik Topluluğu', 'Tiyatro Kulübü', 'Gastronomi Kulübü'] },
      { category: 'Kariyer & Girişim', clubs: ['Genç Girişimciler Kulübü', 'İşletme ve Ekonomi Topluluğu'] }
    ],
    majorEvents: ['Bilkent Bahar Şenliği', 'Kariyer Günleri', 'Uluslararası Bilkent Tiyatro Festivali'],
    dorms: [
      { type: 'Vakıf', capacity: '1-3 Kişilik', amenities: ['Ücretsiz İnternet', 'Mutfak Üniteleri', 'Oda Temizliği', 'Fitness Merkezi'] }
    ]
  },
  { 
    id: 'hacettepe', 
    name: 'Hacettepe Üniversitesi', 
    logo: 'hacettepe_logo', 
    location: 'Ankara', 
    researchScore: 91, 
    description: 'Tıp ve sağlık bilimlerinde Türkiye\'nin lideri, Beytepe kampüsü ile devasa sosyal imkanlar sunar.', 
    followers: 13200,
    studentCount: 50000,
    faculties: ['Tıp', 'Diş Hekimliği', 'Eczacılık', 'Edebiyat', 'Fen', 'Güzel Sanatlar'],
    campusSize: '5.8 Milyon m²',
    clubCount: 140,
    worldRanking: '#501-600',
    strongestAreas: ['Tıp & Sağlık Bilimleri', 'Güzel Sanatlar', 'Biyomedikal'],
    scholarships: [
      { name: 'Hacettepe Vakfı Bursu', coverage: 'Aylık Destek', description: 'Akademik başarısı yüksek ve maddi desteğe ihtiyaç duyan öğrencilere verilir.' },
      { name: 'Yemek Bursu', coverage: 'Ücretsiz Yemek', description: 'Öğrencilere üniversite yemekhanesinde günde bir öğün ücretsiz yemek sağlar.' },
      { name: 'Sporcu Bursu', coverage: 'Akademik Teşvik', description: 'Üniversite takımlarında aktif rol alan milli sporculara sağlanan destekler.' }
    ],
    activeClubs: [
      { category: 'Sağlık', clubs: ['Tıp Öğrencileri Birliği', 'Kızılay Topluluğu'] },
      { category: 'Kültür & Sanat', clubs: ['Modern Dans Topluluğu', 'Hacettepe Rock Topluluğu'] }
    ],
    majorEvents: ['Hacettepe Bahar Şenliği', 'Sıhhiye Sanat Günleri', 'Beytepe Festivali'],
    dorms: [
      { type: 'Üniversite', capacity: '2-4 Kişilik', amenities: ['Sıcak Su', 'Wi-Fi', 'Okuma Salonu'] },
      { type: 'KYK', capacity: '4-8 Kişilik', amenities: ['Yemekhane', 'Spor Kompleksi'] }
    ]
  },
  { 
    id: 'koc', 
    name: 'Koç Üniversitesi', 
    logo: 'koc_logo', 
    location: 'İstanbul', 
    researchScore: 89, 
    description: 'Dünya standartlarında araştırma imkanları ve mükemmeliyetçi eğitim anlayışı.', 
    followers: 9200,
    studentCount: 10000,
    faculties: ['Tıp', 'Hukuk', 'Mühendislik', 'İnsani Bilimler ve Edebiyat', 'Fen'],
    campusSize: '230 Bin m²',
    clubCount: 85,
    activityLevel: 'Çok Yoğun',
    worldRanking: '#351-400',
    strongestAreas: ['Uluslararası İlişkiler', 'Tıp', 'İşletme Araştırmaları'],
    scholarships: [
      { name: 'Anadolu Bursiyerleri', coverage: 'Tam Burs + Konaklama + Cep Harçlığı', description: 'Anadolu\'nun dört bir yanındaki dezavantajlı ama üstün başarılı öğrencilere yönelik vizyoner program.' },
      { name: 'Destek Bursu', coverage: '%100 - %50', description: 'Mali güçlük çeken öğrencilere yönelik eğitim ücreti indirimi.' },
      { name: 'Akademik Başarı Bursu', coverage: 'Kısmi Ücret İndirimi', description: 'Üniversite içindeki GPA ortalamasına göre her yıl yenilenen başarı ödülü.' }
    ],
    activeClubs: [
      { category: 'Teknik & Bilim', clubs: ['Society of Engineers', 'KocAI (Yapay Zeka)', 'Fizik Kulübü'] },
      { category: 'Kültür & Sanat', clubs: ['Tiyatro Kulübü', 'Müzik Kulübü', 'Dans Kulübü', 'Gastronomi'] },
      { category: 'Kariyer & Girişim', clubs: ['Yatırım Kulübü', 'Pazarlama Kulübü', 'Hukuk Kulübü'] },
      { category: 'Sosyal & Yaşam', clubs: ['KU Global Aid', 'Sosyal Sorumluluk', 'Outdoor Sporları'] }
    ],
    majorEvents: ['Spring Festival', 'KU Global Aid', 'Founder\'s Day', 'Sports Gala'],
    dorms: [
      { type: 'Vakıf', capacity: '1-3 Kişilik', amenities: ['Banyo (Oda içinde)', 'Haftalık Temizlik', 'Yüksek Hızlı Fiber', 'Sinema Odası'] }
    ]
  },
  { 
    id: 'sabanci', 
    name: 'Sabancı Üniversitesi', 
    logo: 'sabanci_logo', 
    location: 'İstanbul', 
    researchScore: 90, 
    description: 'Bölüm seçme özgürlüğü ve disiplinlerarası eğitim modeli ile farklılaşan yenilikçi vakıf üniversitesi.', 
    followers: 8800,
    studentCount: 5500,
    faculties: ['Mühendislik ve Doğa Bilimleri', 'Sanat ve Sosyal Bilimler', 'Yönetim Bilimleri'],
    campusSize: '1.3 Milyon m²',
    clubCount: 60,
    worldRanking: '#401-500',
    strongestAreas: ['Veri Analitiği', 'Malzeme Mühendisliği', 'Sanat ve Sosyal Bilimler'],
    scholarships: [
      { name: 'Onur Bursu', coverage: 'Tam Ücret Muafiyeti + Yurt', description: 'YKS sıralamasında en üst dilimdeki öğrencilere verilir.' },
      { name: 'Başarı Bursu', coverage: '%100 - %25', description: 'Puan türlerine göre değişkenlik gösteren eğitim desteği.' },
      { name: 'Ders Muafiyet Ödülü', coverage: 'Kitap & Harçlık', description: 'Üstün akademik performans gösteren mevcut öğrencilere yönelik yıllık ödüller.' }
    ],
    activeClubs: [
      { category: 'Kariyer', clubs: ['Management Club', 'Finans Kulübü'] },
      { category: 'Teknoloji', clubs: ['IEEE Sabancı', 'Siber Güvenlik Kulübü'] }
    ],
    majorEvents: ['Offtown Festival', 'Kariyer Haftası', 'Civic Involvement Projects'],
    dorms: [
      { type: 'Vakıf', capacity: '2-4 Kişilik', amenities: ['Her odaya özel banyo', 'Haftalık temizlik', '24 saat kütüphane erişimi'] }
    ]
  },
  { 
    id: 'gsu', 
    name: 'Galatasaray Üniversitesi', 
    logo: 'gsu_logo', 
    location: 'İstanbul', 
    researchScore: 88, 
    description: 'Ortaköy sahilindeki eşsiz kampüsü ve Fransızca eğitim geleneği ile prestijli bir butik üniversite.', 
    followers: 6500,
    studentCount: 3000,
    faculties: ['Hukuk', 'İktisadi ve İdari Bilimler', 'İletişim', 'Fen-Edebiyat', 'Mühendislik ve Teknoloji'],
    campusSize: '15 Bin m²',
    clubCount: 30,
    activityLevel: 'Butik & Sosyal',
    worldRanking: '#801-1000',
    strongestAreas: ['Uluslararası Hukuk', 'İletişim', 'Siyaset Bilimi'],
    scholarships: [
      { name: 'GSÜ Eğitim Vakfı Bursu', coverage: 'Nakdi + Yemek', description: 'Başarılı ve maddi desteğe ihtiyacı olan öğrencilere vakıf aracılığıyla sağlanan destek.' },
      { name: 'Fransız Hükümeti Bursları', coverage: 'Yurt Dışı Eğitim', description: 'Başarılı öğrencilerin Fransa\'da staj veya yüksek lisans yapmaları için sağlanan özel fonlar.' },
      { name: 'Sosyal Destek Bursu', coverage: 'Ulaşım & Kitap', description: 'Öğrencilerin eğitim giderlerine katkı sunan dönemlik ödemeler.' }
    ],
    activeClubs: [
      { category: 'Sosyal', clubs: ['Denizcilik Kulübü', 'GSU Lions (Amerikan Futbolu)', 'Yelken Kulübü'] },
      { category: 'Kültür', clubs: ['Tiyatro Topluluğu', 'Sinema Kulübü'] }
    ],
    majorEvents: ['Le Sud (GSU Bahar Şenliği)', 'Ortaköy Kariyer Günleri'],
    dorms: [
      { type: 'Üniversite', capacity: '2-6 Kişilik', amenities: ['Tarihi Bina', 'Deniz Manzarası', 'Sosyalleşme Alanları'] }
    ]
  },
  { 
    id: 'ytu', 
    name: 'Yıldız Teknik Üniversitesi', 
    logo: 'ytu_logo', 
    location: 'İstanbul', 
    researchScore: 87, 
    description: 'Beşiktaş ve Davutpaşa yerleşkeleriyle mühendislik ve mimarlık alanında güçlü bir ekol.', 
    followers: 11000,
    studentCount: 35000,
    faculties: ['Elektrik-Elektronik', 'İnşaat', 'Makine', 'Kimya-Metalurji', 'Mimarlık'],
    campusSize: '1.2 Milyon m²',
    clubCount: 90,
    worldRanking: '#601-800',
    strongestAreas: ['Makine Mühendisliği', 'Mimarlık', 'Teknopark Ekosistemi'],
    scholarships: [
      { name: 'Yıldız Başarı Bursu', coverage: 'Nakdi Destek', description: 'Bölüm birincilerine ve yüksek puanla yerleşenlere sağlanan teşvik bursu.' },
      { name: 'Yıldız Mezunlar Derneği Bursu', coverage: 'Kariyer & Eğitim', description: 'Mezunların mevcut öğrencilere yönelik sağladığı finansal ve mentorluk desteği.' },
      { name: 'Yemek Bursu', coverage: 'Günlük 1 Öğün', description: 'Öğrenci konseyi ve üniversite iş birliği ile sağlanan beslenme desteği.' }
    ],
    activeClubs: [
      { category: 'Teknik', clubs: ['Yıldız Robotik', 'Sky Lab (Bilgisayar)'] },
      { category: 'Kültür', clubs: ['YTU Dans', 'YTU Fotoğraf'] }
    ],
    majorEvents: ['Yılın Yıldızları Ödül Töreni', 'YTU Robot Olimpiyatları', 'Davutpaşa Bahar Şenliği'],
    dorms: [
      { type: 'Üniversite', capacity: '2-4 Kişilik', amenities: ['Sıcak Su', 'Wi-Fi', 'Spor Kompleksi'] }
    ]
  },
  { 
    id: 'ege', 
    name: 'Ege Üniversitesi', 
    logo: 'ege_logo', 
    location: 'İzmir', 
    researchScore: 85, 
    description: 'Ege bölgesinin en büyük ve köklü üniversitesi, canlı kampüs hayatı ve geniş akademik yelpazesi.', 
    followers: 12500,
    studentCount: 65000,
    faculties: ['Tıp', 'Ziraat', 'Fen', 'Edebiyat', 'Mühendislik', 'İletişim'],
    campusSize: '3.4 Milyon m²',
    clubCount: 120,
    worldRanking: '#601-800',
    strongestAreas: ['Ziraat', 'Tıp', 'Edebiyat & Dil Bilimi'],
    scholarships: [
      { name: 'Ege Güçlendirme Vakfı Bursu', coverage: 'Aylık Nakdi', description: 'Üniversitenin gelişim vakfı tarafından öğrencilere sunulan başarı ve destek fonu.' },
      { name: 'İzmir Büyükşehir Belediyesi Desteği', coverage: 'Ulaşım & Sosyal', description: 'Belediye ile yapılan protokol kapsamında sağlanan sosyal kart destekleri.' },
      { name: 'Kültür & Sanat Başarı Bursu', coverage: 'Materyal Desteği', description: 'Sanat bölümlerinde derece yapan öğrencilere ekipman alımı için sağlanan katkı.' }
    ],
    activeClubs: [
      { category: 'Spor', clubs: ['Ege Dağcılık', 'Su Sporları'] },
      { category: 'Kültür', clubs: ['Ege Sanat Topluluğu', 'Edebiyat Topluluğu'] }
    ],
    majorEvents: ['Ege Bahar Şenlikleri', 'Tiyatro Günleri', 'Uluslararası Ege Sanat Günleri'],
    dorms: [
      { type: 'Üniversite', capacity: '2-4 Kişilik', amenities: ['Havuz', 'Tenis Kortu', '7/24 Güvenlik'] }
    ]
  }
];

interface Props {
  followedIds: string[];
  onToggleFollow: (id: string) => void;
}

const UniversitiesView: React.FC<Props> = ({ followedIds, onToggleFollow }) => {
  const [minSatisfaction, setMinSatisfaction] = useState(0);
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);

  const selectedUni = universities.find(u => u.id === selectedUniId);
  const filtered = universities.filter(u => u.researchScore >= minSatisfaction);

  const UniversityLogo: React.FC<{ name: string; size?: string }> = ({ name, size = "w-24 h-24" }) => {
    return (
      <div className={`${size} bg-white rounded-3xl flex-shrink-0 flex items-center justify-center p-3 border border-brand-100 shadow-inner group-hover:border-brand-200 transition-all duration-300 relative`}>
        <School className="w-12 h-12 text-brand-primary group-hover:scale-110 transition-transform" />
        <div className="absolute -bottom-1 -right-1 bg-brand-primary text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <Globe className="w-2.5 h-2.5" />
        </div>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Teknik & Bilim': return <Lightbulb className="w-4 h-4" />;
      case 'Kültür & Sanat': return <Camera className="w-4 h-4" />;
      case 'Kariyer & Girişim': return <Target className="w-4 h-4" />;
      case 'Sosyal & Yaşam': return <HeartHandshake className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teknik & Bilim': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Kültür & Sanat': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Kariyer & Girişim': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Sosyal & Yaşam': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-brand-50 text-brand-primary border-brand-100';
    }
  };

  if (selectedUni) {
    return (
      <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
        <button 
          onClick={() => setSelectedUniId(null)}
          className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all group"
        >
          <ArrowLeft className="w-5 h-5" /> Üniversite Listesine Dön
        </button>

        {/* Profile Hero */}
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            <UniversityLogo name={selectedUni.name} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">{selectedUni.name}</h1>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Smile className="w-3 h-3" /> %{selectedUni.researchScore} Memnuniyet
                </span>
                {selectedUni.worldRanking && (
                  <span className="px-3 py-1 bg-brand-50 text-brand-primary text-xs font-black rounded-full flex items-center gap-1 uppercase tracking-wider border border-brand-100">
                    <Globe2 className="w-3 h-3" /> Dünya Sıralaması: {selectedUni.worldRanking}
                  </span>
                )}
              </div>
              <p className="text-gray-500 leading-relaxed text-lg font-medium max-w-2xl">{selectedUni.description}</p>
              
              {/* Added Strongest Areas Bar */}
              {selectedUni.strongestAreas && (
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block w-full mb-1">En Güçlü Olduğu Alanlar:</span>
                  {selectedUni.strongestAreas.map((area, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-[11px] font-black border border-gray-100 flex items-center gap-2">
                      <Medal className="w-3 h-3 text-brand-primary" /> {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => onToggleFollow(selectedUni.id)}
              className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                followedIds.includes(selectedUni.id) 
                  ? 'bg-brand-50 text-brand-primary border border-brand-100' 
                  : 'bg-brand-primary text-white shadow-xl shadow-brand-200 hover:bg-brand-600'
              }`}
            >
              {followedIds.includes(selectedUni.id) ? 'Takibi Bırak' : 'Takip Et'}
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2 group hover:border-brand-primary transition-all">
            <div className="w-12 h-12 bg-brand-50 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Globe2 className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dünya Sıralaması</p>
            <p className="text-xl font-black text-brand-primary">{selectedUni.worldRanking || 'Veri Yok'}</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Öğrenci Sayısı</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.studentCount?.toLocaleString()}+</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Map className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kampüs Alanı</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.campusSize}</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Öğrenci Kulübü</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.clubCount}+ Kulüp</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Etkinlik Seviyesi</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.activityLevel}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-8">
            {/* Faculties and Departments Section - Added purple top border */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm border-t-8 border-t-brand-primary">
              <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-brand-primary" /> Fakülteler ve Bölümler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUni.faculties?.map((faculty, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-brand-200 transition-all flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-gray-700">{faculty} Fakültesi</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships Section - Already has top border */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8 border-t-8 border-t-brand-primary">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <Wallet className="w-6 h-6 text-brand-primary" /> Burs İmkanları & Destekler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedUni.scholarships?.map((scholarship, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-[30px] border border-gray-100 hover:border-brand-200 transition-all group flex flex-col gap-3 relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm">
                        <BadgePercent className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-black text-brand-primary bg-brand-100 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-200">
                        {scholarship.coverage}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-black text-gray-800 text-sm mb-1">{scholarship.name}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{scholarship.description}</p>
                    </div>
                    <div className="absolute bottom-[-10px] right-[-10px] opacity-5 text-brand-primary group-hover:scale-110 transition-transform">
                       <Gift className="w-20 h-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Life Section - Added purple top border */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10 border-t-8 border-t-brand-primary">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                  <Music className="w-6 h-6 text-brand-primary" /> Sosyal Yaşam & Kampüs Kültürü
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <div className="space-y-8">
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-[0.15em] flex items-center gap-3 border-b border-gray-100 pb-4">
                    <Zap className="w-5 h-5 text-brand-primary" /> Kategorilere Göre Öğrenci Kulüpleri
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedUni.activeClubs?.map((group, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getCategoryColor(group.category)}`}>
                          {getCategoryIcon(group.category)} {group.category}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.clubs.map((club, cIdx) => (
                            <span key={cIdx} className="px-3 py-1.5 bg-white text-gray-600 rounded-xl text-[11px] font-bold border border-gray-100 hover:border-brand-200 hover:text-brand-primary transition-all cursor-default">
                              {club}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Köklü Etkinlikler
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUni.majorEvents?.map((event, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-brand-200 transition-all">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dorms Section - Added purple top border */}
          <section className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8 h-fit sticky top-8 border-t-8 border-t-brand-primary">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
              <Bed className="w-6 h-6 text-brand-primary" /> Konaklama (Yurtlar)
            </h3>
            <div className="space-y-6">
              {selectedUni.dorms?.map((dorm, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase rounded-lg">
                      {dorm.type} YURDU
                    </span>
                    <span className="text-xs font-bold text-gray-400">{dorm.capacity}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {dorm.amenities.map((amenity, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {amenity}
                      </div>
                    ))}
                  </div>
                  {idx < selectedUni.dorms!.length - 1 && <div className="border-b border-gray-100 pt-2"></div>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Üniversite Rehberi</h1>
          <p className="text-gray-500 font-medium">Hedeflediğin kampüsü ve öğrenci memnuniyetini detaylı incele.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 text-sm font-bold shadow-sm">
             <Smile className="w-4 h-4 text-brand-primary" /> 
             <span className="text-gray-400 font-black">Memnuniyet:</span>
             <span className="text-brand-primary w-8">%{minSatisfaction}+</span>
             <input 
              type="range" 
              min="0" max="100" 
              value={minSatisfaction} 
              onChange={(e) => setMinSatisfaction(Number(e.target.value))}
              className="accent-brand-primary ml-2 cursor-pointer w-24 h-1.5 bg-gray-100 rounded-lg appearance-none"
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((uni) => (
          <div key={uni.id} className="bg-white rounded-[40px] p-7 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500">
            <UniversityLogo name={uni.name} />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-gray-800 leading-tight group-hover:text-brand-primary transition-colors">{uni.name}</h3>
                {uni.worldRanking && (
                  <span className="text-[10px] font-black text-brand-primary bg-brand-50 px-2 py-1 rounded-lg border border-brand-100">
                    Sıralama: {uni.worldRanking}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-wider mb-6">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors border border-gray-100"><MapPin className="w-3.5 h-3.5" /> {uni.location}</span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-xl text-yellow-600 border border-yellow-100"><Smile className="w-3.5 h-3.5" /> %{uni.researchScore} Memnuniyet</span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 rounded-xl text-brand-600 border border-brand-100"><Users className="w-3.5 h-3.5" /> {uni.followers.toLocaleString()} Takipçi</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 {uni.strongestAreas?.slice(0, 2).map((area, i) => (
                   <span key={i} className="text-[9px] font-black text-brand-primary/60 bg-brand-50/50 px-2 py-0.5 rounded border border-brand-100 flex items-center gap-1.5">
                     <Medal className="w-2.5 h-2.5" /> {area}
                   </span>
                 ))}
                 {uni.scholarships && uni.scholarships.length > 0 && (
                   <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1.5">
                     <Wallet className="w-2.5 h-2.5" /> {uni.scholarships.length} Burs Türü
                   </span>
                 )}
              </div>

              <p className="text-sm text-gray-500 mb-8 leading-relaxed line-clamp-2 font-medium">
                {uni.description}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => onToggleFollow(uni.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    followedIds.includes(uni.id) 
                      ? 'bg-brand-50 text-brand-primary border border-brand-100' 
                      : 'bg-brand-primary text-white shadow-xl shadow-brand-200 hover:bg-brand-600 active:scale-[0.98]'
                  }`}
                >
                  {followedIds.includes(uni.id) ? <><Check className="w-4 h-4" /> Takip Ediliyor</> : <><PlusCircle className="w-4 h-4" /> Takip Et</>}
                </button>
                <button 
                  onClick={() => setSelectedUniId(uni.id)}
                  className="px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-white hover:text-brand-primary hover:border-brand-200 transition-all active:scale-[0.98]"
                >
                  Profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesView;
