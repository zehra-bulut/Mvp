
import React, { useState, useMemo } from 'react';
import { Resource, Comment } from '../types';
// Added missing BookOpen import from lucide-react
import { Search, Star, Book, MessageSquare, Send, Bookmark, BookmarkCheck, Filter, X, ChevronDown, Sparkles, BookOpen } from 'lucide-react';

export const initialResources: Resource[] = [
  { 
    id: 'res-1', title: 'Fizik: Modern Yaklaşımlar', subject: 'Fizik', style: 'İspat Odaklı', rating: 4.8, difficulty: 4, reviewCount: 2,
    comments: [
      { id: 'c1', userName: 'Melis K.', text: 'Formüllerin nereden geldiğini anlamak için mükemmel bir kaynak.', date: '2 gün önce', isAnonymous: false },
      { id: 'c2', userName: 'Anonim', text: 'Biraz ağır bir dili var ama kesinlikle ufuk açıcı.', date: '1 hafta önce', isAnonymous: true }
    ]
  },
  { 
    id: 'res-2', title: 'Kalkülüs I: Temel Analiz', subject: 'Matematik', style: 'Uygulama Odaklı', rating: 4.5, difficulty: 3, reviewCount: 1,
    comments: [
      { id: 'c3', userName: 'Emre Ç.', text: 'Soru bankası gibi ama her sorunun çözümü çok detaylı.', date: '3 gün önce', isAnonymous: false }
    ]
  },
  { id: 'res-3', title: 'Algoritma Tasarımı', subject: 'Bilgisayar', style: 'Örnek Tabanlı', rating: 4.9, difficulty: 5, reviewCount: 0, comments: [] },
  { id: 'res-4', title: 'Biyoloji Temelleri', subject: 'Biyoloji', style: 'Anlaşılması Kolay', rating: 4.2, difficulty: 2, reviewCount: 0, comments: [] },
  { id: 'res-5', title: 'Kimya: Maddenin Doğası', subject: 'Kimya', style: 'Konu Anlatımlı', rating: 4.0, difficulty: 3, reviewCount: 0, comments: [] },
  { id: 'res-6', title: 'İleri Seviye Geometri', subject: 'Matematik', style: 'İspat Odaklı', rating: 4.7, difficulty: 5, reviewCount: 0, comments: [] }
];

interface Props {
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const ResourcesView: React.FC<Props> = ({ savedIds, onToggleSave }) => {
  const [activeCommentsId, setActiveCommentsId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const [resData, setResData] = useState(initialResources);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Hepsi');
  const [selectedStyle, setSelectedStyle] = useState('Hepsi');
  const [minRating, setMinRating] = useState(0);
  const [maxDifficulty, setMaxDifficulty] = useState(5);
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique categories for filters
  const subjects = useMemo(() => ['Hepsi', ...new Set(initialResources.map(r => r.subject))], []);
  const styles = useMemo(() => ['Hepsi', ...new Set(initialResources.map(r => r.style))], []);

  const handleAddComment = (resId: string) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      userName: isAnon ? 'Anonim' : 'Can Yılmaz',
      text: newComment,
      date: 'Şimdi',
      isAnonymous: isAnon
    };

    setResData(prev => prev.map(r => r.id === resId ? { ...r, comments: [comment, ...r.comments], reviewCount: r.reviewCount + 1 } : r));
    setNewComment('');
  };

  const filteredResources = useMemo(() => {
    return resData.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            res.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'Hepsi' || res.subject === selectedSubject;
      const matchesStyle = selectedStyle === 'Hepsi' || res.style === selectedStyle;
      const matchesRating = res.rating >= minRating;
      const matchesDifficulty = res.difficulty <= maxDifficulty;

      return matchesSearch && matchesSubject && matchesStyle && matchesRating && matchesDifficulty;
    });
  }, [resData, searchTerm, selectedSubject, selectedStyle, minRating, maxDifficulty]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSubject('Hepsi');
    setSelectedStyle('Hepsi');
    setMinRating(0);
    setMaxDifficulty(5);
  };

  const activeFilterCount = (selectedSubject !== 'Hepsi' ? 1 : 0) + 
                            (selectedStyle !== 'Hepsi' ? 1 : 0) + 
                            (minRating > 0 ? 1 : 0) + 
                            (maxDifficulty < 5 ? 1 : 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Akademik Kaynaklar</h1>
          <p className="text-gray-500 font-medium">Öğrenci puanlamalarıyla sana en uygun kitabı bul.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Kitap veya konu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none w-full shadow-sm font-medium"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${showFilters || activeFilterCount > 0 ? 'bg-brand-primary text-white shadow-xl shadow-brand-200' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-200 hover:text-brand-primary'}`}
          >
            <Filter className="w-4 h-4" /> 
            Filtrele {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      </div>

      {/* Modern Filter Bar */}
      {showFilters && (
        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-xl animate-in slide-in-from-top-4 duration-300 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" /> Arama Filtreleri
            </h3>
            <button 
              onClick={resetFilters}
              className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Subject Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Konu Alanı</label>
              <div className="relative">
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary appearance-none cursor-pointer"
                >
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Style Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Anlatım Tarzı</label>
              <div className="relative">
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary appearance-none cursor-pointer"
                >
                  {styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Minimum Puan (★)</label>
              <div className="flex bg-gray-50 border border-gray-100 rounded-xl p-1">
                {[0, 3, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${minRating === rating ? 'bg-white shadow-sm text-brand-primary' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {rating === 0 ? 'Hepsi' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maks. Zorluk: {maxDifficulty}/5</label>
              <input 
                type="range" 
                min="1" max="5" 
                value={maxDifficulty}
                onChange={(e) => setMaxDifficulty(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-300 px-1 uppercase tracking-tighter">
                <span>Kolay</span>
                <span>Zor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredResources.length > 0 ? filteredResources.map((res) => (
          <div key={res.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 group border-b-8 border-b-transparent hover:border-b-brand-primary">
            <div className="p-7 md:p-10 flex flex-col md:flex-row gap-8">
              <div className="w-36 h-48 bg-gray-50 rounded-[30px] flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Book className="w-16 h-16 text-brand-100 group-hover:text-brand-primary group-hover:scale-110 transition-all duration-500 relative z-10" />
                <button 
                  onClick={() => onToggleSave(res.id)}
                  className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm text-gray-300 hover:text-brand-primary hover:scale-110 transition-all z-20"
                >
                  {savedIds.includes(res.id) ? <BookmarkCheck className="w-5 h-5 fill-current text-brand-primary" /> : <Bookmark className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-brand-50 text-brand-primary text-[10px] font-black rounded-xl uppercase tracking-widest border border-brand-100">{res.subject}</span>
                    <h3 className="text-2xl font-black text-gray-800 mt-3 tracking-tight group-hover:text-brand-primary transition-colors">{res.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-2xl border border-yellow-100">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-black text-yellow-700">{res.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Anlatım Tarzı</span>
                    <span className="text-sm font-bold text-gray-700">{res.style}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Zorluk Seviyesi</span>
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map(d => (
                        <div key={d} className={`h-1.5 rounded-full transition-all duration-500 ${d <= res.difficulty ? 'w-4 bg-brand-primary shadow-[0_0_8px_rgba(99,36,240,0.3)]' : 'w-2 bg-gray-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Görüşler</span>
                    <span className="text-sm font-bold text-gray-700">{res.reviewCount} Değerlendirme</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => setActiveCommentsId(activeCommentsId === res.id ? null : res.id)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeCommentsId === res.id ? 'bg-brand-primary text-white shadow-xl shadow-brand-200' : 'bg-gray-50 text-gray-500 hover:bg-brand-50 hover:text-brand-primary border border-transparent hover:border-brand-100'}`}
                  >
                    <MessageSquare className="w-4 h-4" /> 
                    {activeCommentsId === res.id ? 'Yorumları Gizle' : 'Yorumları Oku'}
                  </button>
                  <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-brand-primary transition-all active:scale-95">
                    Kitaplığa Ekle
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {activeCommentsId === res.id && (
              <div className="border-t border-gray-50 bg-gray-50/30 p-8 md:p-10 animate-in slide-in-from-top-4 duration-500">
                <div className="space-y-5 mb-10 max-w-3xl">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Öğrenci Deneyimleri</h4>
                  {res.comments.length > 0 ? res.comments.map(c => (
                    <div key={c.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 relative group/comment">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-brand-50 flex items-center justify-center text-xs font-black text-brand-primary border border-brand-100 shadow-inner group-hover/comment:scale-110 transition-transform">
                            {c.userName[0]}
                          </div>
                          <div>
                            <span className="text-xs font-black text-gray-800 block">{c.userName}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{c.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium italic">"{c.text}"</p>
                    </div>
                  )) : (
                    <div className="text-center py-10 bg-white/50 rounded-[35px] border border-dashed border-gray-200">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">İlk yorumu sen yaparak arkadaşlarına yol göster!</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 max-w-3xl">
                  <div className="relative group/input">
                    <textarea 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Bu kaynak hakkındaki deneyimini paylaş..."
                      className="w-full bg-white border border-gray-200 rounded-[30px] p-6 pr-16 text-sm font-medium focus:ring-4 focus:ring-brand-primary/10 outline-none resize-none h-32 shadow-sm transition-all focus:border-brand-primary"
                    />
                    <button 
                      onClick={() => handleAddComment(res.id)}
                      className="absolute bottom-6 right-6 p-3 bg-brand-primary text-white rounded-2xl hover:bg-brand-700 shadow-xl shadow-brand-200 transition-all active:scale-90"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 px-4">
                    <input 
                      type="checkbox" 
                      id={`anon-${res.id}`}
                      checked={isAnon} 
                      onChange={(e) => setIsAnon(e.target.checked)}
                      className="w-5 h-5 accent-brand-primary rounded-lg cursor-pointer"
                    />
                    <label htmlFor={`anon-${res.id}`} className="text-xs text-gray-500 font-bold cursor-pointer uppercase tracking-widest select-none">Anonim olarak paylaş</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-32 bg-white rounded-[50px] border-4 border-dashed border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
               <BookOpen className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Eşleşen Kaynak Bulunamadı</h3>
            <p className="text-gray-400 font-bold max-w-xs mx-auto">Filtreleri sıfırlayarak veya farklı bir anahtar kelimeyle tekrar dene.</p>
            <button 
              onClick={resetFilters}
              className="mt-8 text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-50 px-8 py-3 rounded-full transition-all"
            >
              Tümünü Gör
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesView;
