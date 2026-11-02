import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/perfumes';
import { Sparkles, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openCatalogModal, language } = useCart();
  const isAr = language === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#F8F5EE] border-b border-[#E3D9C9] pt-8 pb-16 lg:py-20">
      
      {/* Delicate ambient gold warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial & Brand Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#D9CDBF] rounded-full self-center lg:self-start text-xs tracking-widest text-[#936B23] uppercase font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B38A38]" />
              <span>{isAr ? 'دار العطور الفاخرة بالمغرب' : 'Haute Parfumerie Marocaine'}</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1612] leading-[1.15] text-balance">
                {isAr ? (
                  <span>
                    أكثر من مجرد عطر، <br />
                    <span className="gold-gradient-text">بصمة وأناقة لا تُنسى</span>
                  </span>
                ) : (
                  <span>
                    PLUS QU’UN PARFUM, <br />
                    <span className="gold-gradient-text">UNE SIGNATURE</span>
                  </span>
                )}
              </h1>
              
              <p className="font-editorial italic text-lg sm:text-xl text-[#5C5346] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isAr
                  ? '55 عطراً عالمياً بتركيز استثنائي وثبات يدوم طويلاً، في 3 قوارير ملكية مصممة خصيصاً لشخصيتك.'
                  : '55 créations olfactives haute tenue dans trois flacons d’exception : Blanc Satin, Bleu Nuit et Rouge Impérial.'}
              </p>

              {/* Outstanding Pack Offers Banner */}
              <div className="p-3.5 bg-[#FFFFFF] border border-[#D9CDBF] rounded-2xl shadow-xs text-left max-w-xl mx-auto lg:mx-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#936B23] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B38A38]" />
                  <span>{isAr ? 'عروض الأسعار الخاصة (خلط الروايح والألوان بحرية):' : 'Nos Tarifs & Offres Packs Spéciales :'}</span>
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EBE3D7]">
                    <span className="text-[10px] text-[#7D7263] block font-medium">{isAr ? 'القارورة' : '1 Flacon'}</span>
                    <span className="font-cinzel text-base font-bold text-[#1A1612]">50 DH</span>
                  </div>
                  <div className="p-2 bg-[#F7F2E7] rounded-xl border border-[#D4AF37]/50 relative">
                    <span className="text-[9px] bg-[#B38A38] text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-tight block -mt-3 mb-1 mx-auto w-max">
                      -10 DH
                    </span>
                    <span className="text-[10px] text-[#7D7263] block font-medium">{isAr ? 'عرض 2' : 'Pack 2'}</span>
                    <span className="font-cinzel text-base font-bold text-[#936B23]">90 DH</span>
                  </div>
                  <div className="p-2 bg-[#FFFDF9] rounded-xl border-2 border-[#B38A38] relative shadow-xs">
                    <span className="text-[9px] bg-[#1A1612] text-[#F3E5AB] px-1.5 py-0.2 rounded font-extrabold uppercase tracking-tight block -mt-3 mb-1 mx-auto w-max">
                      -20 DH
                    </span>
                    <span className="text-[10px] text-[#7D7263] block font-medium">{isAr ? 'عرض 3' : 'Pack 3'}</span>
                    <span className="font-cinzel text-base font-extrabold text-[#1A1612]">130 DH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-3 pb-3 border-y border-[#E3D9C9] text-left">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <Award className="w-4 h-4 text-[#B38A38]" />
                <span className="text-xs font-semibold text-[#1A1612]">
                  {isAr ? 'مكونات استثنائية' : 'Ingrédients d’exception'}
                </span>
                <span className="text-[11px] text-[#7D7263]">
                  {isAr ? 'تركيز عالي' : 'Extrait de Parfum'}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <Clock className="w-4 h-4 text-[#B38A38]" />
                <span className="text-xs font-semibold text-[#1A1612]">
                  {isAr ? 'ثبات يدوم طويلاً' : 'Longue tenue'}
                </span>
                <span className="text-[11px] text-[#7D7263]">
                  {isAr ? '+24 ساعة فوحان' : 'Sillage +24 Heures'}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#B38A38]" />
                <span className="text-xs font-semibold text-[#1A1612]">
                  {isAr ? 'أناقة يومية' : 'Élégance au quotidien'}
                </span>
                <span className="text-[11px] text-[#7D7263]">
                  {isAr ? 'تصميم مذهب فريد' : 'Flacon or & mat'}
                </span>
              </div>
            </div>

            {/* Action buttons (Cleaned up: No Video) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
              <a
                href="#atelier-ticha"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs tracking-wider rounded-xl transition-all shadow-md text-center uppercase"
              >
                {isAr ? 'صمم قنينتك الآن' : 'Composer Mon Flacon'}
              </a>

              <a
                href="#offres-packs"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F2EDE4] border border-[#D9CDBF] text-[#936B23] font-bold text-xs tracking-wider rounded-xl transition-colors uppercase text-center"
              >
                {isAr ? 'تفاصيل عروض الباقات' : 'Voir les Offres Packs'}
              </a>

              <button
                onClick={() => openCatalogModal('homme')}
                className="w-full sm:w-auto px-5 py-3.5 border border-[#D9CDBF] hover:border-[#1A1612] bg-[#FFFFFF] text-[#1A1612] text-xs font-semibold tracking-wider rounded-xl transition-colors uppercase"
              >
                {isAr ? 'الكاتالوجات (55)' : 'Catalogues (55)'}
              </button>
            </div>

            {/* Social Trust Markers */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#7D7263]">
              <span>★ 4.9/5 sur plus de 1 200 commandes</span>
              <span aria-hidden="true">·</span>
              <span>Paiement à la livraison (COD)</span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Trio Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              <div className="relative rounded-2xl overflow-hidden border border-[#D9CDBF] bg-[#FFFFFF] shadow-xl">
                <img
                  src={BRAND_INFO.trioImage}
                  alt="TiCHA Parfums - Flacons Rouge, Bleu et Blanc sur socle de marbre"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating caption tag on image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#E3D9C9] p-3 rounded-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={BRAND_INFO.logoImage}
                      alt="Logo"
                      className="w-8 h-8 rounded-full border border-[#B38A38]/50 object-contain p-0.5"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1612] font-cinzel">
                        COLLECTION ROYALE TiCHA
                      </p>
                      <p className="text-[10px] text-[#936B23] font-medium">
                        Blanc Satin · Bleu Nuit · Rouge Rubis
                      </p>
                    </div>
                  </div>
                  <a
                    href="#atelier-ticha"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white bg-[#1A1612] hover:bg-[#B38A38] rounded-lg transition-colors"
                  >
                    <span>{isAr ? 'اختيار' : 'Choisir'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
