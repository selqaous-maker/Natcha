import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/perfumes';
import { ShoppingBag, Instagram, Sparkles, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen, openCatalogModal, setIsQuizOpen, language, setLanguage } = useCart();
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#E3D9C9]">
      {/* Top micro-announcement banner */}
      <div className="bg-[#1A1612] text-[#F3E5AB] px-4 py-2 text-center text-xs flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
          {isAr 
            ? 'القارورة بـ 50 DH · عرض 2 بـ 90 DH (عوض 100) · عرض 3 بـ 130 DH (عوض 150) · خلط الروايح والألوان كما تحب!' 
            : '50 DH le flacon · Pack 2 = 90 DH (au lieu de 100) · Pack 3 = 130 DH (au lieu de 150) · Mixez librement !'}
        </span>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark / Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <img
            src={BRAND_INFO.logoImage}
            alt="TiCHA Logo"
            className="w-10 h-10 object-contain rounded-full border border-[#B38A38]/50 p-0.5 group-hover:border-[#B38A38] transition-colors shadow-xs"
          />
          <div className="flex flex-col">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1A1612] group-hover:text-[#B38A38] transition-colors">
              TiCHA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#7D7263] -mt-0.5 font-sans font-medium">
              Parfums & Fragrances
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wider text-[#4A433A]">
          <a
            href="#offres-packs"
            className="text-[#936B23] font-bold hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>{isAr ? 'عروض الباقات' : 'Offres Packs'}</span>
            <span className="text-[10px] bg-[#E3D9C9] text-[#1A1612] px-1.5 py-0.2 rounded font-bold">50-130 DH</span>
          </a>
          <a
            href="#atelier-ticha"
            className="hover:text-[#936B23] transition-colors whitespace-nowrap shrink-0"
          >
            {isAr ? 'تخصيص عطرك' : 'Atelier Flacon'}
          </a>
          <button
            onClick={() => openCatalogModal('homme')}
            className="hover:text-[#936B23] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-left"
          >
            <span>{isAr ? 'كاتالوج الرجال (25)' : 'Collection Homme'}</span>
            <span className="text-[10px] text-[#7D7263]">(25)</span>
          </button>
          <button
            onClick={() => openCatalogModal('femme')}
            className="hover:text-[#936B23] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-left"
          >
            <span>{isAr ? 'كاتالوج النساء (30)' : 'Collection Femme'}</span>
            <span className="text-[10px] text-[#7D7263]">(30)</span>
          </button>
          <a
            href="#ecrins"
            className="hover:text-[#936B23] transition-colors whitespace-nowrap shrink-0"
          >
            {isAr ? 'الألوان الـ 3' : 'Les 3 Écrins'}
          </a>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1612] border border-[#D9CDBF] hover:border-[#B38A38] bg-[#FFFFFF] rounded-lg hover:bg-[#F2EDE4] transition-colors shadow-xs"
            title="Trouvez votre signature olfactive"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B38A38]" />
            <span className="whitespace-nowrap font-medium">{isAr ? 'اختبار العطر' : 'Quiz Parfum'}</span>
          </button>

          {/* Instagram Link */}
          <a
            href={BRAND_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#7D7263] hover:text-[#B38A38] transition-colors"
            title="Instagram @ticha_perfumes"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Language Toggle (FR / AR) */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            className="px-2.5 py-1 text-xs font-semibold text-[#1A1612] hover:text-[#B38A38] border border-[#D9CDBF] hover:border-[#B38A38] bg-[#FFFFFF] rounded-lg transition-colors"
            title="Changer de langue / تغيير اللغة"
          >
            {language === 'fr' ? 'العربية' : 'FR'}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1A1612] hover:bg-[#B38A38] rounded-xl transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'السلة' : 'Panier'}</span>
            {totalItemsCount > 0 && (
              <span className="bg-[#B38A38] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
