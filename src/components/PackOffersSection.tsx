import React from 'react';
import { useCart } from '../context/CartContext';
import { PRICING, BOTTLE_VARIANTS } from '../data/perfumes';
import { Sparkles, Check, ArrowRight, ShieldCheck, Truck, Gift } from 'lucide-react';

export const PackOffersSection: React.FC = () => {
  const { language } = useCart();
  const isAr = language === 'ar';

  const handleSelectOffer = (count: number) => {
    const builderEl = document.getElementById('atelier-ticha');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="offres-packs" className="py-16 lg:py-24 bg-[#F2EDE4] border-b border-[#E3D9C9] relative overflow-hidden">
      
      {/* Background delicate gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#D9CDBF] rounded-full text-xs font-bold tracking-widest text-[#936B23] uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A38]" />
            <span>{isAr ? 'عروض وباقات استثنائية' : 'Formules & Packs Avantageux'}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1612] uppercase tracking-wide">
            {isAr ? 'عروض تيشا الخاصة' : 'Nos Offres Signatures'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C5346] font-editorial italic max-w-2xl mx-auto">
            {isAr
              ? 'اختر باقتك المفضلة بأسعار حصرية. يمكنك خلط أي عطور من بين 55 عطراً عالمياً وأي ألوان قوارير (الأبيض، الأزرق، والأحمر) بحرية تامة!'
              : 'Profitez de nos tarifs exclusifs. Vous pouvez combiner librement vos fragrances parmi 55 créations et choisir vos flacons parmi nos 3 couleurs !'}
          </p>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Single Bottle */}
          <div className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7D7263]">
                  {isAr ? 'قارورة واحدة' : 'Formule Découverte'}
                </span>
                <span className="text-[11px] bg-[#F5F0E6] text-[#7D7263] px-2.5 py-1 rounded-full font-medium">
                  1 Flacon
                </span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-[#1A1612]">
                {isAr ? 'قارورة فردية' : 'Le Flacon Individuel'}
              </h3>
              <p className="text-xs text-[#5C5346] mt-1">
                {isAr ? 'مثالية لتجربة عطر وتحديد بصمتك الخاصة.' : 'Idéal pour découvrir votre nouvelle signature olfactive.'}
              </p>

              {/* Price */}
              <div className="my-6 pb-6 border-b border-[#F0EAE0]">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-cinzel text-4xl font-extrabold text-[#1A1612] tabular-nums">
                    50
                  </span>
                  <span className="text-lg font-bold text-[#936B23]">DH</span>
                </div>
                <p className="text-[11px] text-[#7D7263] mt-1">
                  {isAr ? 'سعر القارورة الواحدة (50 مل)' : 'Flacon 50ml Eau de Parfum Intense'}
                </p>
              </div>

              {/* Perks list */}
              <ul className="space-y-3 text-xs text-[#4A433A] mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'عطر واحد من اختيارك من 55 عطراً' : '1 parfum au choix parmi les 55 du catalogue'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'لون القنينة من اختيارك (أبيض، أزرق، أحمر)' : 'Choix du flacon (Blanc, Bleu ou Rouge)'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'غطاء مذهب وبلاك محفور باسم تيشا' : 'Bouchon lourd sculpté & blason doré'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'الدفع نقداً عند الاستلام' : 'Paiement à la livraison'}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectOffer(1)}
              className="w-full py-3.5 bg-[#FAF7F2] hover:bg-[#F0EAE0] border border-[#D9CDBF] text-[#1A1612] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'طلب قارورة واحدة (50 DH)' : 'Choisir 1 Flacon'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Pack 2 (Duo) */}
          <div className="bg-[#FFFFFF] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all hover:-translate-y-1 relative">
            
            {/* Savings Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B38A38] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{isAr ? 'توفير 10 دراهم' : 'Économie de 10 DH'}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'عرض 2 قوارير' : 'Pack Duo'}
                </span>
                <span className="text-[11px] bg-[#F5F0E6] text-[#936B23] font-bold px-2.5 py-1 rounded-full">
                  2 Flacons
                </span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-[#1A1612]">
                {isAr ? 'باقة القارورتين' : 'Le Pack Duo'}
              </h3>
              <p className="text-xs text-[#5C5346] mt-1">
                {isAr ? 'الأمثل للتنويع بين عطر يومي وعطر للمناسبات.' : 'Idéal pour alterner entre parfum quotidien et soirée.'}
              </p>

              {/* Price */}
              <div className="my-6 pb-6 border-b border-[#F0EAE0]">
                <div className="flex items-baseline gap-2">
                  <span className="font-cinzel text-4xl font-extrabold text-[#1A1612] tabular-nums">
                    90
                  </span>
                  <span className="text-lg font-bold text-[#936B23]">DH</span>
                  <span className="text-sm text-[#7D7263] line-through ml-1 tabular-nums">
                    100 DH
                  </span>
                </div>
                <p className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                  {isAr ? '45 درهم فقط للقارورة الواحدة!' : 'Soit seulement 45 DH par flacon !'}
                </p>
              </div>

              {/* Perks list */}
              <ul className="space-y-3 text-xs text-[#4A433A] mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span><strong>{isAr ? 'خلط حر للروائح:' : 'Mixez 2 parfums:'}</strong> {isAr ? 'اختر أي عطرين مختلفين' : '2 fragrances au choix'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span><strong>{isAr ? 'خلط ألوان القوارير:' : 'Mixez les couleurs:'}</strong> {isAr ? 'أبيض + أزرق أو أحمر...' : '2 écrins au choix'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'تخفيض 10 دراهم يطبق أوتوماتيكياً فالسلة' : 'Remise de 10 DH appliquée automatiquement'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'الدفع نقداً عند الاستلام بعد المعاينة' : 'Paiement à la livraison après vérification'}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectOffer(2)}
              className="w-full py-3.5 bg-[#B38A38] hover:bg-[#996F26] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'اختيار باقة 2 قوارير (90 DH)' : 'Commander le Pack Duo (90 DH)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Pack 3 (Trio) - The Ultimate Highlight */}
          <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFFFFF] to-[#FAF6EE] border-2 border-[#B38A38] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative ring-2 ring-[#B38A38]/30 hover:-translate-y-1 transition-all">
            
            {/* Top Best-Seller Ribbon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#996F26] via-[#B38A38] to-[#996F26] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
              <span>{isAr ? 'الأكثر طلباً · توصيل مجاني' : 'Top Vente · Offre Reine'}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'عرض 3 قوارير' : 'Pack Trio Collector'}
                </span>
                <span className="text-[11px] bg-[#936B23] text-white font-bold px-2.5 py-1 rounded-full">
                  3 Flacons
                </span>
              </div>

              <h3 className="font-cinzel text-2xl font-bold text-[#1A1612]">
                {isAr ? 'باقة الـ 3 قوارير الملكية' : 'Le Pack Trio Prestige'}
              </h3>
              <p className="text-xs text-[#5C5346] mt-1 font-medium">
                {isAr ? 'احصل على الألوان الثلاثة معاً (أبيض، أزرق، أحمر) أو 3 عطور من اختيارك!' : 'Les 3 flacons iconiques réunis avec vos 3 parfums préférés !'}
              </p>

              {/* Price */}
              <div className="my-6 pb-6 border-b border-[#F0EAE0]">
                <div className="flex items-baseline gap-2">
                  <span className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#1A1612] tabular-nums">
                    130
                  </span>
                  <span className="text-xl font-bold text-[#936B23]">DH</span>
                  <span className="text-base text-[#7D7263] line-through ml-1 tabular-nums">
                    150 DH
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-[#2E7D32] font-bold">
                    {isAr ? 'توفير 20 درهم كاملة!' : 'Économie immédiate de 20 DH !'}
                  </span>
                  <span className="text-[11px] text-[#7D7263]">·</span>
                  <span className="text-xs text-[#936B23] font-semibold">
                    {isAr ? 'توصيل مجاني متضمن' : 'Livraison offerte'}
                  </span>
                </div>
              </div>

              {/* Perks list */}
              <ul className="space-y-3 text-xs text-[#4A433A] mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span><strong>{isAr ? 'حرية خلط 3 عطور:' : '3 parfums au choix:'}</strong> {isAr ? 'من بين 55 عطراً رجالية ونسائية' : 'mixez hommes & femmes librement'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span><strong>{isAr ? '3 ألوان مميزة:' : '3 couleurs au choix:'}</strong> {isAr ? 'الأبيض الملكي + الأزرق الليلي + الأحمر الياقوتي' : 'Blanc Satin + Bleu Nuit + Rouge Rubis'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span><strong className="text-[#2E7D32]">{isAr ? 'توصيل مجاني 100%:' : 'Livraison 100% Gratuite:'}</strong> {isAr ? 'في جميع مدن المغرب' : 'partout au Maroc'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'تغليف هدايا ملكي فاخر مجاناً' : 'Coffret cadeau prestige offert'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B38A38] shrink-0" />
                  <span>{isAr ? 'الدفع نقداً عند الاستلام والتأكد' : 'Paiement à la livraison après inspection'}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectOffer(3)}
              className="w-full py-4 bg-gradient-to-r from-[#996F26] via-[#B38A38] to-[#996F26] hover:from-[#B38A38] hover:to-[#7A5314] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'اطلب باقة 3 قوارير بـ 130 DH فقط' : 'Commander le Pack 3 (130 DH)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Reassurance Banner under cards */}
        <div className="mt-12 p-4 bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#936B23] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1612]">
                {isAr ? 'كيف يتم احتساب التخفيض التلقائي؟' : 'Comment fonctionne le calcul automatique ?'}
              </p>
              <p className="text-[11px] text-[#7D7263]">
                {isAr
                  ? 'بمجرد إضافة 2 قوارير إلى سلتك يتم تطبيق تخفيض 10 DH، وعند إضافة 3 قوارير يتم تطبيق تخفيض 20 DH + التوصيل المجاني، حتى لو كانت العطور والألوان مختلفة!'
                  : 'Dès que vous ajoutez 2 ou 3 flacons dans le panier, la remise s’applique immédiatement, quelle que soit votre combinaison de fragrances et d’écrins !'}
              </p>
            </div>
          </div>

          <a
            href="#atelier-ticha"
            className="px-5 py-2.5 bg-[#1A1612] hover:bg-[#332A22] text-[#F8F5EE] text-xs font-bold uppercase rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            {isAr ? 'صمم باقتك الآن' : 'Composer ma Sélection'}
          </a>
        </div>

      </div>
    </section>
  );
};
