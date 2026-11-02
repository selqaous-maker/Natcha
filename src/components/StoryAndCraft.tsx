import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/perfumes';
import { Sparkles, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StoryAndCraft: React.FC = () => {
  const { language } = useCart();
  const isAr = language === 'ar';

  const reviews = [
    {
      author: 'Yassine M.',
      city: 'Casablanca (Gauthier)',
      rating: 5,
      perfume: 'N1 Sauvage · Flacon Bleu Nuit',
      comment: isAr
        ? 'تبارك الله العطر كيبقى لاصق فالحوايج حتى لليوم الموالي، والقنينة الزرقاء مع الغطا الذهبي كتعطي هيبة خيالية فالمكتب!'
        : 'La tenue est incroyable (+24h sur mes vestes). Le flacon bleu nuit dépoli avec la plaque en or a fait sensation auprès de mes collègues.',
    },
    {
      author: 'Kawtar B.',
      city: 'Rabat (Agdal)',
      rating: 5,
      perfume: 'N9 Delina · Flacon Rouge Rubis',
      comment: isAr
        ? 'العطر فخم بزاف ونوتات الورد والليتشي كتحمق، والأمبالاج الأحمر جا رائع فالصالون ديالي. خدمة التوصيل سريعة ومحترفة.'
        : 'Un coup de cœur absolu pour Delina dans l’écrin rouge velours. Sillage raffiné qui reçoit des compliments toute la journée.',
    },
    {
      author: 'Amine K.',
      city: 'Marrakech (Guéliz)',
      rating: 5,
      perfume: 'N23 Khamrah Qahwa · Flacon Blanc Satin',
      comment: isAr
        ? 'ريحة القهوة مع القرفة والفانيليا ممتازة، والتوصيل وصلني فـ 24 ساعة لمراكش والدفع عند الاستلام. أحسن تجربة عطور فالمغرب.'
        : 'Livré en 24h à Marrakech avec paiement à la réception. Le parfum Khamrah Qahwa est chaud et sophistiqué. Bravo TiCHA !',
    },
  ];

  return (
    <section id="savoir-faire" className="py-16 lg:py-24 bg-[#F2EDE4] border-b border-[#E3D9C9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Brand Emblem & Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D9CDBF] bg-[#FFFFFF] p-8 text-center shadow-md">
              <div className="w-24 h-24 mx-auto rounded-full border border-[#B38A38]/50 p-1 mb-5 flex items-center justify-center bg-[#FAF7F2] shadow-xs">
                <img
                  src={BRAND_INFO.logoImage}
                  alt="TiCHA Logo Emblème"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <h3 className="font-cinzel text-xl font-bold text-[#1A1612] uppercase tracking-wider">
                TiCHA Parfums & Fragrances
              </h3>
              <p className="font-editorial italic text-sm text-[#936B23] mt-1">
                « Plus qu’un parfum, Une signature »
              </p>

              <p className="text-xs text-[#5C5346] mt-4 leading-relaxed max-w-sm mx-auto">
                {isAr
                  ? 'رؤية مغربية طموحة تُعيد صياغة الفخامة العطرية العالمية. نجمع بين أجود الزيوت الأساسية المركزة والتصميم الراقي الذي يليق بك.'
                  : 'Née de l’ambition d’offrir à chacun le privilège d’une haute parfumerie accessible sans compromis sur la tenue, la concentration et la noblesse des matières.'}
              </p>

              <div className="mt-6 pt-6 border-t border-[#F0EAE0]">
                <a
                  href="#offres-packs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#D9CDBF] text-[#936B23] text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B38A38]" />
                  <span>{isAr ? 'عروض الباقات (50-130 DH)' : 'Découvrir les Packs (50-130 DH)'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#936B23]">
                {isAr ? 'سر التميز والجودة' : 'L’Excellence TiCHA'}
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1A1612] mt-1 uppercase">
                {isAr ? 'عطور بتركيز إكستري دو بارفان' : 'Une Signature Indélébile'}
              </h2>
              <p className="text-sm text-[#5C5346] mt-2 font-editorial italic leading-relaxed">
                {isAr
                  ? 'لا نكتفي بإنتاج عطور عادية، بل نصنع تجارب حسية فريدة تدوم معك طوال اليوم وفي كل مناسباتك المميزة.'
                  : 'Chaque goutte est formulée selon des normes strictes de maturation pour garantir un sillage puissant, enveloppant et mémorable.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1612] uppercase">
                  <Award className="w-4 h-4 text-[#B38A38]" />
                  <span>{isAr ? 'تركيز 25% إلى 30%' : 'Concentration Extrême'}</span>
                </div>
                <p className="text-xs text-[#5C5346]">
                  {isAr ? 'زيوت عطرية نقية تُعطي ثباتاً مبهراً لأكثر من 24 ساعة.' : 'Formulation Extrait de Parfum garantissant une persistance olfactive remarquable.'}
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1612] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#B38A38]" />
                  <span>{isAr ? 'ضمان الرضا والثبات' : 'Satisfaction Garantie'}</span>
                </div>
                <p className="text-xs text-[#5C5346]">
                  {isAr ? 'تأكد من طلبيتك عند الاستلام بكل راحة وأمان.' : 'Paiement à la livraison après inspection de votre colis.'}
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1612] uppercase">
                  <Sparkles className="w-4 h-4 text-[#B38A38]" />
                  <span>{isAr ? '3 ألوان قوارير ملكية' : '3 Écrins Iconiques'}</span>
                </div>
                <p className="text-xs text-[#5C5346]">
                  {isAr ? 'الأبيض والأزرق والأحمر المات مع بوشون مذهب.' : 'Blanc Satin, Bleu Nuit & Rouge Rubis au choix sans surcoût.'}
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1612] uppercase">
                  <HeartHandshake className="w-4 h-4 text-[#B38A38]" />
                  <span>{isAr ? 'توصيل سريع بالمغرب' : 'Livraison Express Maroc'}</span>
                </div>
                <p className="text-xs text-[#5C5346]">
                  {isAr ? 'توصيل من 24 إلى 48 ساعة حتى باب دارك.' : 'Expédition soignée en 24h à 48h dans toutes les villes du Royaume.'}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Testimonials */}
        <div className="pt-6 border-t border-[#E3D9C9]">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#936B23]">
              {isAr ? 'آراء زبنائنا الكرام' : 'Témoignages Vérifiés'}
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1A1612] mt-1">
              {isAr ? 'ثقة أكثر من 1 200 عميل بالمغرب' : 'Ce que disent nos clients'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="p-6 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl flex flex-col justify-between space-y-4 shadow-xs hover:shadow-sm transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#1A1612] font-cinzel">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-[#7D7263]">{rev.city}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-2">
                    {'★'.repeat(rev.rating)}
                  </div>

                  <p className="text-xs text-[#4A433A] font-sans leading-relaxed italic">
                    « {rev.comment} »
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EAE0] text-[11px] text-[#936B23] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rev.perfume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
