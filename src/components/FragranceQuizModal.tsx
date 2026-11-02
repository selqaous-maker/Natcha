import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MEN_PERFUMES, WOMEN_PERFUMES } from '../data/perfumes';
import { Perfume } from '../types';
import { Sparkles, X, ArrowRight, RotateCcw } from 'lucide-react';

export const FragranceQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, selectPerfumeForBuilder, language } = useCart();
  const isAr = language === 'ar';

  const [step, setStep] = useState(1);
  const [targetGender, setTargetGender] = useState<'homme' | 'femme'>('homme');
  const [selectedVibe, setSelectedVibe] = useState<'frais' | 'oriental' | 'gourmand' | 'boise'>('oriental');
  const [selectedIntensity, setSelectedIntensity] = useState<'modere' | 'intense'>('intense');
  const [quizResults, setQuizResults] = useState<Perfume[]>([]);

  if (!isQuizOpen) return null;

  const calculateResults = () => {
    const pool = targetGender === 'homme' ? MEN_PERFUMES : WOMEN_PERFUMES;
    let matched: Perfume[] = [];

    if (selectedVibe === 'frais') {
      matched = pool.filter((p) => p.family === 'Frais' || p.family === 'Floral');
    } else if (selectedVibe === 'oriental') {
      matched = pool.filter((p) => p.family === 'Oriental' || p.family === 'Épicé');
    } else if (selectedVibe === 'gourmand') {
      matched = pool.filter((p) => p.family === 'Gourmand');
    } else {
      matched = pool.filter((p) => p.family === 'Boisé' || p.family === 'Chypré');
    }

    if (matched.length === 0) matched = pool.slice(0, 3);
    setQuizResults(matched.slice(0, 3));
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setQuizResults([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3D9C9] mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B38A38]" />
            <h3 className="font-cinzel text-base font-bold text-[#1A1612]">
              {isAr ? 'اختبار النوتات العطرية' : 'Diagnostic Olfactif TiCHA'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsQuizOpen(false)}
            className="text-[#7D7263] hover:text-[#1A1612] p-1 text-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#936B23] uppercase tracking-widest">
                Question 1 / 3
              </span>
              <h4 className="font-cinzel text-lg font-bold text-[#1A1612] mt-1">
                {isAr ? 'لمن تبحث عن هذا العطر؟' : 'Pour qui est destiné ce parfum ?'}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setTargetGender('homme');
                  setStep(2);
                }}
                className="p-5 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#E3D9C9] hover:border-[#1A1612] rounded-2xl text-center transition-all group shadow-xs"
              >
                <p className="font-cinzel text-base font-bold text-[#1A1612] group-hover:text-[#B38A38]">
                  {isAr ? 'عطر رجالي' : 'Pour Homme'}
                </p>
                <p className="text-xs text-[#7D7263] mt-1">Élégance masculine & charisme</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTargetGender('femme');
                  setStep(2);
                }}
                className="p-5 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#E3D9C9] hover:border-[#1A1612] rounded-2xl text-center transition-all group shadow-xs"
              >
                <p className="font-cinzel text-base font-bold text-[#1A1612] group-hover:text-[#B38A38]">
                  {isAr ? 'عطر نسائي' : 'Pour Femme'}
                </p>
                <p className="text-xs text-[#7D7263] mt-1">Sensualité, douceur & mystère</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vibe & Atmosphere */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#936B23] uppercase tracking-widest">
                Question 2 / 3
              </span>
              <h4 className="font-cinzel text-lg font-bold text-[#1A1612] mt-1">
                {isAr ? 'ما هو الطابع العطري الذي تفضله؟' : 'Quelle est votre signature préférée ?'}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { id: 'oriental', title: isAr ? 'شرقي ودافئ' : 'Ambré & Oriental', desc: 'Épices, vanille, bois précieux' },
                { id: 'frais', title: isAr ? 'منعش ومائي' : 'Frais & Vivifiant', desc: 'Agrumes, notes marines, lavande' },
                { id: 'gourmand', title: isAr ? 'سكري وحلو' : 'Gourmand Addictif', desc: 'Caramel, chocolat, praline, café' },
                { id: 'boise', title: isAr ? 'خشبي وكلاسيكي' : 'Boisé Magnétique', desc: 'Cèdre, santal, patchouli, cuir' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedVibe(opt.id as any);
                    setStep(3);
                  }}
                  className="p-4 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#E3D9C9] hover:border-[#1A1612] rounded-2xl text-left transition-all shadow-xs"
                >
                  <p className="font-bold text-[#1A1612] text-sm">{opt.title}</p>
                  <p className="text-[11px] text-[#7D7263] mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Intensity & Sillage */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#936B23] uppercase tracking-widest">
                Question 3 / 3
              </span>
              <h4 className="font-cinzel text-lg font-bold text-[#1A1612] mt-1">
                {isAr ? 'ما هي قوة الفوحان المطلوبة؟' : 'Quel niveau de sillage désirez-vous ?'}
              </h4>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedIntensity('intense');
                  calculateResults();
                }}
                className="w-full p-4 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#E3D9C9] hover:border-[#1A1612] rounded-2xl flex items-center justify-between text-left transition-all shadow-xs"
              >
                <div>
                  <p className="font-bold text-[#1A1612] text-sm">
                    {isAr ? 'فوحان مكثف وحضور طاغٍ' : 'Sillage Puissant & Majestueux'}
                  </p>
                  <p className="text-xs text-[#7D7263] mt-0.5">
                    {isAr ? 'يثبت أكثر من 24 ساعة ويترك أثراً في كل مكان' : 'Concentration maximale Extrait de Parfum (+24H)'}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B38A38]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedIntensity('modere');
                  calculateResults();
                }}
                className="w-full p-4 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#E3D9C9] hover:border-[#1A1612] rounded-2xl flex items-center justify-between text-left transition-all shadow-xs"
              >
                <div>
                  <p className="font-bold text-[#1A1612] text-sm">
                    {isAr ? 'فوحان متوازن وأنيق يومي' : 'Sillage Modéré & Raffiné'}
                  </p>
                  <p className="text-xs text-[#7D7263] mt-0.5">
                    {isAr ? 'مثالي للمكتب والاستعمال اليومي' : 'Élégance discrète et tenue enveloppante'}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B38A38]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#936B23] uppercase tracking-widest">
                Recommandation Personnalisée
              </span>
              <h4 className="font-cinzel text-xl font-bold text-[#1A1612] mt-1">
                {isAr ? 'عطورك المثالية من تيشا' : 'Vos 3 Signatures Idéales'}
              </h4>
            </div>

            <div className="space-y-2.5">
              {quizResults.map((perfume) => (
                <div
                  key={perfume.id}
                  className="p-3.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-2xl flex items-center justify-between gap-3 hover:border-[#1A1612] transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#1A1612] text-white font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                      {perfume.number}
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#1A1612] font-cinzel">
                        {perfume.name}
                      </h5>
                      <p className="text-[11px] text-[#7D7263]">
                        {perfume.category} · {perfume.sillage}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      selectPerfumeForBuilder(perfume);
                      setIsQuizOpen(false);
                    }}
                    className="px-4 py-2 bg-[#1A1612] hover:bg-[#B38A38] text-white text-xs font-bold uppercase rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
                  >
                    {isAr ? 'صمم هذا العطر (50 DH)' : 'Composer (50 DH)'}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={resetQuiz}
                className="text-xs text-[#7D7263] hover:text-[#1A1612] inline-flex items-center gap-1.5 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة الاختبار' : 'Recommencer le diagnostic'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
