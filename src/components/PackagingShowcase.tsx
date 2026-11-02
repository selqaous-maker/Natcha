import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BOTTLE_VARIANTS } from '../data/perfumes';
import { Sparkles, Star, Droplet } from 'lucide-react';

export const PackagingShowcase: React.FC = () => {
  const { language } = useCart();
  const isAr = language === 'ar';

  const [activeBottleIndex, setActiveBottleIndex] = useState(0);
  const activeBottle = BOTTLE_VARIANTS[activeBottleIndex];

  return (
    <section id="ecrins" className="py-16 lg:py-24 bg-[#F8F5EE] border-b border-[#E3D9C9] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#D9CDBF] rounded-full text-xs font-bold tracking-widest text-[#936B23] uppercase mb-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#B38A38]" />
            <span>{isAr ? 'الأمبالاج الفاخر بـ 3 ألوان' : 'Le Flaconnage d’Exception'}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1612] uppercase">
            {isAr ? '3 قوارير ملكية، فخامة مطلقة' : 'Les 3 Écrins Royaux TiCHA'}
          </h2>
          <p className="mt-3 text-sm text-[#5C5346] font-editorial italic">
            {isAr
              ? 'كل قنينة صُممت بعناية فائقة، بزجاج مات مخملي، غطاء ذهبي محفور، وبلاك تيشا المذهب في الواجهة.'
              : 'Verre dépoli satiné au toucher soyeux, bouchon or lourd facetté et médaillon d’or gravé en relief au blason TiCHA.'}
          </p>
        </div>

        {/* 3 Color Selector Tabs with Live Miniatures */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#FFFFFF] border border-[#D9CDBF] rounded-2xl gap-2 shadow-xs max-w-full overflow-x-auto">
            {BOTTLE_VARIANTS.map((bottle, idx) => {
              const isSelected = activeBottleIndex === idx;
              return (
                <button
                  key={bottle.id}
                  type="button"
                  onClick={() => setActiveBottleIndex(idx)}
                  className={`flex items-center gap-3 px-3.5 sm:px-5 py-2.5 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#1A1612] text-white shadow-sm ring-1 ring-[#B38A38]'
                      : 'text-[#5C5346] hover:text-[#1A1612] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="w-7 h-9 rounded-md overflow-hidden bg-[#FAF7F2] border border-[#D9CDBF]/60 flex items-center justify-center shrink-0">
                    <img
                      src={bottle.image}
                      alt={bottle.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-left rtl:text-right">
                    <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wide block">
                      {bottle.id === 'blanc'
                        ? (isAr ? 'الأبيض الملكي' : 'Blanc Pur')
                        : bottle.id === 'bleu'
                        ? (isAr ? 'الأزرق الليلي' : 'Bleu Nuit')
                        : (isAr ? 'الأحمر الياقوتي' : 'Rouge Rubis')}
                    </span>
                    <span className={`text-[10px] block ${isSelected ? 'text-[#D4AF37]' : 'text-[#7D7263]'}`}>
                      50 ML · Extrait
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spotlight Showcase of the Selected Bottle */}
        <div className="bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: High-Definition Bottle Image View */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center p-6 bg-gradient-to-b from-[#FAF7F2] to-[#F0EAE0] border border-[#E3D9C9] rounded-2xl group">
                <img
                  src={activeBottle.image}
                  alt={activeBottle.name}
                  key={activeBottle.id}
                  className="max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-all duration-700 transform group-hover:scale-105"
                />

                {/* Floating Gold Plaque Callout */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#B38A38]/50 px-3 py-1.5 rounded-lg text-[11px] font-cinzel text-[#1A1612] flex items-center gap-1.5 shadow-xs">
                  <Star className="w-3 h-3 text-[#B38A38] fill-[#B38A38]" />
                  <span>{isAr ? 'لوغو محفور في المعدن المذهب' : 'Blason Or Gravé TiCHA'}</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Craftsmanship & Features */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#936B23]">
                  {isAr ? 'تفاصيل الصنع الفاخر' : 'Haute Précision Artisanale'}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1A1612] mt-1">
                  {isAr ? activeBottle.nameAr : activeBottle.name}
                </h3>
                <p className="font-editorial italic text-base text-[#936B23] mt-0.5">
                  {isAr ? activeBottle.subtitleAr : activeBottle.subtitle}
                </p>
                <p className="text-sm text-[#5C5346] mt-3 leading-relaxed">
                  {isAr ? activeBottle.descriptionAr : activeBottle.description}
                </p>
              </div>

              {/* 3 High-End Details */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#D9CDBF] flex items-center justify-center text-[#936B23] shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1612] uppercase tracking-wide">
                      {isAr ? 'غطاء ثقيل مذهب مصقول' : 'Bouchon Or Lourd Facetté'}
                    </h4>
                    <p className="text-[11px] text-[#5C5346] mt-0.5">
                      {isAr
                        ? 'معدن مصقول عالي الكثافة مع غلق محكم يحافظ على تركيز العطر لسنوات.'
                        : 'Métal noble au poids substantiel pour un geste de vaporisation majestueux et hermétique.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#D9CDBF] flex items-center justify-center text-[#936B23] shrink-0 shadow-xs">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1612] uppercase tracking-wide">
                      {isAr ? 'بلاك تيشا مذهب في الواجهة' : 'Blason Métallique TiCHA en Relief'}
                    </h4>
                    <p className="text-[11px] text-[#5C5346] mt-0.5">
                      {isAr
                        ? 'شعار الماركة محفور بدقة على لوح معدني ذهبي لامع يُضفي قيمة وهيبة للقنينة.'
                        : 'Plaque or embossée avec précision joaillière, signature d’authenticité de la maison.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#D9CDBF] flex items-center justify-center text-[#936B23] shrink-0 shadow-xs">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1612] uppercase tracking-wide">
                      {isAr ? 'رشاش ميكروني سحابي' : 'Diffuseur Micro-Brume Haute Pression'}
                    </h4>
                    <p className="text-[11px] text-[#5C5346] mt-0.5">
                      {isAr
                        ? 'توزيع ناعم ومتجانس للعطر يضمن ثبات الرائحة على الملابس والجلد طوال اليوم.'
                        : 'Nébulisation fine et homogène qui enveloppe les vêtements et la peau d’un voile invisible longue durée.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <a
                  href="#atelier-ticha"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  {isAr ? 'اختيار هذا اللون في عطري (50 DH)' : `Sélectionner le ${activeBottle.name} (50 DH)`}
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
