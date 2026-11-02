import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO, MEN_PERFUMES, WOMEN_PERFUMES } from '../data/perfumes';
import { X, ZoomIn } from 'lucide-react';

export const CatalogPosterModal: React.FC = () => {
  const { isCatalogModalOpen, closeCatalogModal, catalogModalTab, selectPerfumeForBuilder, language } = useCart();
  const [currentTab, setCurrentTab] = useState<'homme' | 'femme'>(catalogModalTab || 'homme');
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isCatalogModalOpen) return null;

  const isAr = language === 'ar';
  const posterSrc = currentTab === 'homme' ? BRAND_INFO.menCatalogPoster : BRAND_INFO.womenCatalogPoster;
  const currentPerfumes = currentTab === 'homme' ? MEN_PERFUMES : WOMEN_PERFUMES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3D9C9] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-base font-bold text-[#1A1612]">
              {isAr ? 'الكاتالوج الأصلي للماركة' : 'Catalogue Officiel TiCHA Parfums'}
            </span>
            <div className="flex items-center bg-[#FFFFFF] border border-[#D9CDBF] p-0.5 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => { setCurrentTab('homme'); setIsZoomed(false); }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  currentTab === 'homme'
                    ? 'bg-[#1A1612] text-white font-bold'
                    : 'text-[#5C5346] hover:text-[#1A1612]'
                }`}
              >
                Pour Homme (25)
              </button>
              <button
                type="button"
                onClick={() => { setCurrentTab('femme'); setIsZoomed(false); }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  currentTab === 'femme'
                    ? 'bg-[#1A1612] text-white font-bold'
                    : 'text-[#5C5346] hover:text-[#1A1612]'
                }`}
              >
                Pour Femme (30)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 text-[#7D7263] hover:text-[#1A1612] bg-[#FFFFFF] border border-[#D9CDBF] rounded-xl transition-colors shadow-xs"
              title="Agrandir / Réduire"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={closeCatalogModal}
              className="p-2 text-[#7D7263] hover:text-[#1A1612] bg-[#FFFFFF] border border-[#D9CDBF] rounded-xl transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Poster Image Body */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#F2EDE4]">
          <div className={`transition-all duration-300 ${isZoomed ? 'scale-125 my-12' : 'max-h-[62vh]'}`}>
            <img
              src={posterSrc}
              alt={`Catalogue ${currentTab === 'homme' ? 'Pour Homme' : 'Pour Femme'} TiCHA Parfums`}
              className="max-h-[62vh] object-contain rounded-xl border border-[#D9CDBF] shadow-xl mx-auto cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>
        </div>

        {/* Quick Perfume Picker Strip */}
        <div className="px-6 py-3.5 border-t border-[#E3D9C9] bg-[#FAF7F2] flex items-center justify-between gap-4">
          <p className="text-xs text-[#5C5346] truncate">
            {isAr
              ? 'اضغط على أي عطر للانتقال فوراً لتخصيص القنينة (50 DH فقط):'
              : 'Sélectionnez une référence pour composer votre flacon (50 DH) :'}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <select
              onChange={(e) => {
                const found = currentPerfumes.find((p) => p.id === e.target.value);
                if (found) {
                  selectPerfumeForBuilder(found);
                  closeCatalogModal();
                }
              }}
              defaultValue=""
              aria-label={isAr ? 'اختر عطراً من القائمة' : 'Sélectionner une référence'}
              className="bg-[#FFFFFF] border border-[#D9CDBF] text-[#1A1612] text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#B38A38] shadow-xs"
            >
              <option value="" disabled>
                {isAr ? '-- اختر عطراً من القائمة --' : '-- Choisir une référence --'}
              </option>
              {currentPerfumes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.number} - {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
