import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO, MEN_PERFUMES, WOMEN_PERFUMES } from '../data/perfumes';
import { Perfume } from '../types';
import { Sparkles, Search, Eye, ArrowUpRight, BookOpen } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const { selectPerfumeForBuilder, openCatalogModal, language } = useCart();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'homme' | 'femme'>('homme');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedPerfumeForQuickView, setSelectedPerfumeForQuickView] = useState<Perfume | null>(null);

  const perfumes = activeTab === 'homme' ? MEN_PERFUMES : WOMEN_PERFUMES;
  const families = ['all', 'Boisé', 'Oriental', 'Gourmand', 'Floral', 'Frais', 'Épicé', 'Chypré'];

  const filtered = perfumes.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFamily = selectedFamily === 'all' || p.family === selectedFamily;
    return matchesSearch && matchesFamily;
  });

  return (
    <section id="catalogues" className="py-16 lg:py-24 bg-[#F2EDE4] border-b border-[#E3D9C9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#D9CDBF] rounded-full text-xs font-bold tracking-widest text-[#936B23] uppercase mb-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#B38A38]" />
              <span>{isAr ? 'الكاتالوجات الرسمية' : 'Catalogues Officiels'}</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1612] uppercase">
              {isAr ? '55 ابتكاراً من أرقى العطور' : '55 Signatures Olfactives'}
            </h2>
            <p className="mt-2 text-sm text-[#5C5346] font-editorial italic max-w-xl">
              {isAr
                ? 'تصفح قائمة العطور المستوحاة من أشهر الدور العالمية، بـ 50 درهم فقط للقارورة مع إمكانية خلط أي عطور في الباقات.'
                : 'Explorez nos 55 créations inspirées des plus grandes icônes mondiales à 50 DH le flacon.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-[#FFFFFF] border border-[#D9CDBF] p-1.5 rounded-2xl shrink-0 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('homme')}
              className={`px-5 py-2.5 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'homme'
                  ? 'bg-[#1A1612] text-white shadow-xs'
                  : 'text-[#5C5346] hover:text-[#1A1612]'
              }`}
            >
              {isAr ? 'مجموعة الرجال (25)' : 'Collection Homme (25)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('femme')}
              className={`px-5 py-2.5 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'femme'
                  ? 'bg-[#1A1612] text-white shadow-xs'
                  : 'text-[#5C5346] hover:text-[#1A1612]'
              }`}
            >
              {isAr ? 'مجموعة النساء (30)' : 'Collection Femme (30)'}
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D7263]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث بالرقم أو الاسم (مثال: N1 Sauvage, N3 Black Opium, N13 Bleu Chanel)...'
                  : 'Rechercher par numéro ou par nom (ex: N1 Sauvage, N3 Black Opium, N21 Libre YSL)...'
              }
              className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38] shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {families.map((fam) => (
              <button
                key={fam}
                type="button"
                onClick={() => setSelectedFamily(fam)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedFamily === fam
                    ? 'bg-[#1A1612] text-white'
                    : 'bg-[#FFFFFF] border border-[#D9CDBF] text-[#5C5346] hover:text-[#1A1612]'
                }`}
              >
                {fam === 'all' ? (isAr ? 'جميع العائلات' : 'Toutes les familles') : fam}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openCatalogModal(activeTab)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FFFFFF] border border-[#D9CDBF] hover:border-[#1A1612] text-[#1A1612] rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4 text-[#B38A38]" />
            <span>{isAr ? 'عرض بوستر الكاتالوج الأصلي' : 'Voir le Poster Officiel'}</span>
          </button>
        </div>

        {/* Perfumes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((perfume) => (
            <div
              key={perfume.id}
              className="bg-[#FFFFFF] border border-[#E3D9C9] hover:border-[#B38A38] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative shadow-xs hover:shadow-md"
            >
              {/* Top Row: Number & Family */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E3D9C9] flex items-center justify-center font-cinzel text-xs font-bold text-[#1A1612] group-hover:bg-[#1A1612] group-hover:text-white transition-colors">
                    {perfume.number}
                  </span>
                  <span className="text-[11px] font-semibold text-[#936B23] tracking-wider uppercase">
                    {perfume.family}
                  </span>
                </div>

                <h3 className="font-cinzel text-base font-bold text-[#1A1612] tracking-wide mb-1 group-hover:text-[#B38A38] transition-colors">
                  {perfume.name}
                </h3>
                <p className="text-xs text-[#7D7263] mb-3 line-clamp-1 font-medium">
                  {perfume.category}
                </p>

                <p className="text-xs text-[#5C5346] italic line-clamp-2 mb-4 font-sans leading-relaxed">
                  {isAr ? perfume.descriptionAr : perfume.description}
                </p>
              </div>

              {/* Bottom: Price & Selection Trigger */}
              <div className="pt-3 border-t border-[#F0EAE0] space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#7D7263]">{isAr ? 'السعر الفردي :' : 'Prix unitaire :'}</span>
                  <span className="font-bold text-[#1A1612] font-mono">50 DH</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => selectPerfumeForBuilder(perfume)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#1A1612] border border-[#D9CDBF] hover:border-[#1A1612] text-[#1A1612] hover:text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all"
                  >
                    <span>{isAr ? 'تخصيص' : 'Choisir'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPerfumeForQuickView(perfume)}
                    className="p-2.5 bg-[#FFFFFF] border border-[#D9CDBF] hover:border-[#1A1612] text-[#7D7263] hover:text-[#1A1612] rounded-xl transition-colors shadow-xs"
                    title={isAr ? 'عرض التفاصيل' : 'Voir les notes'}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Perfume Modal */}
        {selectedPerfumeForQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                type="button"
                onClick={() => setSelectedPerfumeForQuickView(null)}
                className="absolute top-4 right-4 text-[#7D7263] hover:text-[#1A1612] p-1 text-lg"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#1A1612] text-white font-cinzel text-sm font-bold flex items-center justify-center shadow-xs">
                  {selectedPerfumeForQuickView.number}
                </span>
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#1A1612]">
                    {selectedPerfumeForQuickView.name}
                  </h3>
                  <p className="text-xs text-[#936B23] font-semibold">
                    {selectedPerfumeForQuickView.category} · {selectedPerfumeForQuickView.gender === 'homme' ? 'Pour Homme' : 'Pour Femme'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#4A433A] mb-5 font-editorial italic leading-relaxed">
                {isAr ? selectedPerfumeForQuickView.descriptionAr : selectedPerfumeForQuickView.description}
              </p>

              <div className="bg-[#FAF7F2] border border-[#E3D9C9] rounded-2xl p-4 space-y-2 mb-6 text-xs">
                <div>
                  <span className="font-bold text-[#1A1612]">{isAr ? 'نوتات القمة :' : 'Notes de Tête :'} </span>
                  <span className="text-[#5C5346]">{selectedPerfumeForQuickView.topNotes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1A1612]">{isAr ? 'نوتات القلب :' : 'Notes de Cœur :'} </span>
                  <span className="text-[#5C5346]">{selectedPerfumeForQuickView.heartNotes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1A1612]">{isAr ? 'نوتات القاعدة :' : 'Notes de Fond :'} </span>
                  <span className="text-[#5C5346]">{selectedPerfumeForQuickView.baseNotes.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    selectPerfumeForBuilder(selectedPerfumeForQuickView);
                    setSelectedPerfumeForQuickView(null);
                  }}
                  className="flex-1 py-3.5 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  {isAr ? 'صمم هذا العطر (50 DH)' : 'Composer avec ce Parfum (50 DH)'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
