import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/perfumes';
import { Instagram, Send, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openCatalogModal, language } = useCart();
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#17130E] border-t border-[#2C241B] pt-16 pb-12 text-[#B8AF9F] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C241B]">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_INFO.logoImage}
                alt="TiCHA Logo"
                className="w-10 h-10 object-contain rounded-full border border-[#D4AF37]/40 p-0.5"
              />
              <div>
                <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#F3E5AB]">
                  TiCHA
                </span>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#A89F91]">
                  Parfums & Fragrances
                </p>
              </div>
            </div>

            <p className="text-xs text-[#D6CEC1] leading-relaxed font-sans">
              {isAr
                ? 'علامة مغربية راقية متخصصة في صناعة العطور الفاخرة ذات الثبات الطويل، في ثلاث قوارير مذهبة ملكية.'
                : 'Maison de haute parfumerie au Maroc. 55 créations d’exception déclinées dans nos flacons Blanc Satin, Bleu Nuit et Rouge Rubis.'}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-[#241D15] border border-[#382E22] hover:border-[#D4AF37] flex items-center justify-center text-[#EDE8DF] hover:text-[#F3E5AB] transition-colors"
                title="Instagram @ticha_perfumes"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-[#241D15] border border-[#382E22] hover:border-[#25D366] flex items-center justify-center text-[#EDE8DF] hover:text-[#25D366] transition-colors"
                title="Service Client WhatsApp"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Collections */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
              {isAr ? 'المجموعات' : 'Nos Collections'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#offres-packs" className="hover:text-[#F3E5AB] transition-colors font-semibold text-[#D4AF37]">
                  {isAr ? 'عروض الباقات (50-130 DH)' : 'Formules Packs (50-130 DH)'}
                </a>
              </li>
              <li>
                <button
                  onClick={() => openCatalogModal('homme')}
                  className="hover:text-[#F3E5AB] transition-colors text-left"
                >
                  {isAr ? 'مجموعة عطور الرجال (25)' : 'Collection Pour Homme (25 Références)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCatalogModal('femme')}
                  className="hover:text-[#F3E5AB] transition-colors text-left"
                >
                  {isAr ? 'مجموعة عطور النساء (30)' : 'Collection Pour Femme (30 Références)'}
                </button>
              </li>
              <li>
                <a href="#atelier-ticha" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'تخصيص القنينة (Atelier)' : 'Atelier de Personnalisation'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Packaging & Flaconnage */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
              {isAr ? 'الأمبالاج والأسعار' : 'Écrins & Tarifs'}
            </h4>
            <ul className="space-y-2 text-xs text-[#D6CEC1]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFFFFF]" />
                <span>Blanc Pur Satin (Plaque Or TiCHA)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#142850]" />
                <span>Bleu Nuit Impérial (Verre Dépoli)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#801323]" />
                <span>Rouge Rubis Passion (Bouchon Or Lourd)</span>
              </li>
              <li className="text-[11px] text-[#D4AF37] pt-1 font-bold">
                1 Flacon = 50 DH · Pack 2 = 90 DH · Pack 3 = 130 DH
              </li>
            </ul>
          </div>

          {/* Col 4: Moroccan Services & Direct Order */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
              {isAr ? 'خدمة الزبناء بالمغرب' : 'Service Client & Maroc'}
            </h4>
            <p className="text-xs text-[#D6CEC1] leading-relaxed">
              {isAr
                ? 'التوصيل متوفر في جميع مدن المغرب مع الدفع عند الاستلام. خلط الروايح والألوان بحرية كاملة والتخفيض أوتوماتيكي.'
                : 'Livraison express partout au Maroc sous 24h à 48h avec Paiement à la réception (COD). Mixez parfums et flacons librement.'}
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'تواصل عبر الواتساب' : 'Commander via WhatsApp'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A89F91]">
          <p>© {new Date().getFullYear()} TiCHA Parfums & Fragrances. {isAr ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}.</p>
          <div className="flex items-center gap-4">
            <span>Paiement à la livraison (COD)</span>
            <span>·</span>
            <span>Casablanca · Rabat · Marrakech · Tanger · Fès · Agadir</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
