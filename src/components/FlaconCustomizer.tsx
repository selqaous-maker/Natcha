import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { BOTTLE_VARIANTS, MEN_PERFUMES, PRICING, WOMEN_PERFUMES } from '../data/perfumes';
import { BottleColor, Gender, Perfume } from '../types';
import { Sparkles, Check, ShoppingBag, Send, Search } from 'lucide-react';

export const FlaconCustomizer: React.FC = () => {
  const { addToCart, activePerfumeForBuilder, language } = useCart();
  const isAr = language === 'ar';

  // Step 1: Gender / Collection Selection
  const [selectedGender, setSelectedGender] = useState<Gender>('homme');

  // Step 2: Perfume Selection
  const currentCatalog = selectedGender === 'homme' ? MEN_PERFUMES : WOMEN_PERFUMES;
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume>(currentCatalog[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>('all');

  // Step 3: Bottle Color Selection (Blanc, Bleu, Rouge)
  const [selectedBottleColor, setSelectedBottleColor] = useState<BottleColor>('bleu');

  // Step 4: Quantity
  const [quantity, setQuantity] = useState(1);
  const [customEngraving, setCustomEngraving] = useState('');

  // Synchronize when a perfume is chosen from the catalog section
  useEffect(() => {
    if (activePerfumeForBuilder) {
      setSelectedGender(activePerfumeForBuilder.gender);
      setSelectedPerfume(activePerfumeForBuilder);
      setSelectedBottleColor(activePerfumeForBuilder.recommendedBottleColor);
    }
  }, [activePerfumeForBuilder]);

  // When changing gender, update default perfume
  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    const catalog = gender === 'homme' ? MEN_PERFUMES : WOMEN_PERFUMES;
    setSelectedPerfume(catalog[0]);
    if (gender === 'homme') {
      setSelectedBottleColor('bleu');
    } else {
      setSelectedBottleColor('rouge');
    }
  };

  const currentBottle = BOTTLE_VARIANTS.find((b) => b.id === selectedBottleColor) || BOTTLE_VARIANTS[0];

  // Filtering perfumes
  const filteredPerfumes = currentCatalog.filter((perfume) => {
    const matchesSearch =
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFamily =
      selectedFamilyFilter === 'all' || perfume.family === selectedFamilyFilter;
    return matchesSearch && matchesFamily;
  });

  const families = ['all', 'Boisé', 'Oriental', 'Gourmand', 'Floral', 'Frais', 'Épicé', 'Chypré'];

  const unitPrice = PRICING.unitPrice; // 50 DH
  const trios = Math.floor(quantity / 3);
  const rem = quantity % 3;
  const duos = rem === 2 ? 1 : 0;
  const currentDiscount = trios * 20 + duos * 10;
  const totalPrice = quantity * unitPrice - currentDiscount;

  // Handle Add To Cart
  const handleAddToCart = () => {
    addToCart(
      selectedPerfume,
      selectedBottleColor,
      currentBottle.image,
      '50ml',
      quantity,
      customEngraving.trim() ? customEngraving.trim() : undefined
    );
  };

  // Fast direct WhatsApp Order
  const handleDirectWhatsApp = () => {
    const textAr = `سلام تيشا بارفان! بغيت نكوموندي:\n\n` +
      `• العطر: ${selectedPerfume.number} - ${selectedPerfume.name} (${selectedGender === 'homme' ? 'رجالي' : 'نسائي'})\n` +
      `• القنينة: ${currentBottle.nameAr} (${selectedBottleColor.toUpperCase()})\n` +
      `• الكمية: ${quantity} قنينة\n` +
      (currentDiscount > 0 ? `• العرض المفعل: تخفيض -${currentDiscount} درهم!\n` : '') +
      `• الثمن الإجمالي: ${totalPrice} درهم (الدفع عند الاستلام)\n` +
      (customEngraving ? `• نقش الاسم على العلبة: ${customEngraving}\n` : '') +
      `\nشكراً، كنتسنى التأكيد ديالكم!`;

    const textFr = `Bonjour TiCHA Parfums ! Je souhaite commander :\n\n` +
      `• Parfum : ${selectedPerfume.number} - ${selectedPerfume.name} (${selectedGender === 'homme' ? 'Collection Homme' : 'Collection Femme'})\n` +
      `• Flacon : ${currentBottle.name} (${selectedBottleColor.toUpperCase()})\n` +
      `• Quantité : ${quantity} flacon(s)\n` +
      (currentDiscount > 0 ? `• Offre appliquée : Remise de -${currentDiscount} DH !\n` : '') +
      `• Total : ${totalPrice} DH (Paiement à la livraison)\n` +
      (customEngraving ? `• Gravure personnalisée : ${customEngraving}\n` : '') +
      `\nMerci de me confirmer la livraison !`;

    const message = isAr ? textAr : textFr;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="atelier-ticha" className="py-16 lg:py-24 bg-[#F8F5EE] relative border-b border-[#E3D9C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#D9CDBF] rounded-full text-xs font-bold tracking-widest text-[#936B23] uppercase mb-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#B38A38]" />
            <span>{isAr ? 'الأتيليي المخصص' : 'Atelier de Personnalisation'}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1612] uppercase">
            {isAr ? 'صمم قارورتك الاستثنائية' : 'Composez Votre Flacon Signature'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C5346] font-editorial italic">
            {isAr
              ? 'اختر عطرك المفضل من الكاتالوج وطابقه مع لون القنينة الذي يناسب ذوقك (الأبيض، الأزرق، أو الأحمر) بـ 50 درهم فقط للقارورة!'
              : 'Choisissez votre fragrance dans notre catalogue et associez-la au flacon de votre choix parmi nos 3 écrins (50 DH l’unité, 2 pour 90 DH, 3 pour 130 DH).'}
          </p>
        </div>

        {/* 2-Column Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Sticky Column: Real-Time Bottle Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl p-6 relative overflow-hidden shadow-lg">
              
              {/* Badges */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1612] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E3D9C9]">
                  {selectedPerfume.number} · {selectedPerfume.name}
                </span>
                <span className="text-[11px] font-bold text-[#936B23]">
                  50 ML · Extrait
                </span>
              </div>

              {/* Main High-Res Bottle Image */}
              <div className="relative aspect-[3/4] flex items-center justify-center p-4 bg-gradient-to-b from-[#FBF9F5] to-[#F2EDE4] rounded-2xl border border-[#EBE3D7] overflow-hidden">
                <img
                  src={currentBottle.image}
                  alt={`Flacon TiCHA ${currentBottle.name}`}
                  key={currentBottle.id}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all duration-500 transform hover:scale-105"
                />
              </div>

              {/* Flacon Attributes Badge */}
              <div className="mt-4 pt-4 border-t border-[#F0EAE0] relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-cinzel font-bold text-[#1A1612]">
                  <span>{currentBottle.name}</span>
                </div>
                <p className="text-xs text-[#5C5346] mt-1 font-sans">
                  {isAr ? currentBottle.descriptionAr : currentBottle.description}
                </p>

                {/* Scent Pyramid Capsule */}
                <div className="mt-3 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl p-3.5 text-left">
                  <div className="text-[10px] uppercase tracking-wider text-[#936B23] font-bold mb-1">
                    {isAr ? 'هرم العطر Olfactif :' : 'Pyramide Olfactive :'}
                  </div>
                  <div className="text-[11px] text-[#4A433A] space-y-0.5">
                    <p><strong className="text-[#1A1612]">{isAr ? 'القمة:' : 'Tête:'}</strong> {selectedPerfume.topNotes.slice(0, 3).join(', ')}</p>
                    <p><strong className="text-[#1A1612]">{isAr ? 'القلب:' : 'Cœur:'}</strong> {selectedPerfume.heartNotes.slice(0, 3).join(', ')}</p>
                    <p><strong className="text-[#1A1612]">{isAr ? 'القاعدة:' : 'Fond:'}</strong> {selectedPerfume.baseNotes.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Customizer Controls (Steps) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Gender Collection */}
            <div className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'المرحلة 1 : المجموعة' : 'Étape 1 · Choisir la Collection'}
                </span>
                <span className="text-xs text-[#7D7263]">
                  {selectedGender === 'homme' ? '25 Parfums' : '30 Parfums'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGenderChange('homme')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    selectedGender === 'homme'
                      ? 'border-[#B38A38] bg-[#F9F5EC] text-[#1A1612] shadow-xs ring-1 ring-[#B38A38]'
                      : 'border-[#E3D9C9] bg-[#FFFFFF] text-[#5C5346] hover:border-[#B38A38]'
                  }`}
                >
                  <p className="font-cinzel text-sm sm:text-base font-bold">
                    {isAr ? 'مجموعة الرجال' : 'Pour Homme'}
                  </p>
                  <p className="text-[11px] text-[#936B23] mt-0.5 font-medium">25 Signatures Boisées & Fraîches</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleGenderChange('femme')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    selectedGender === 'femme'
                      ? 'border-[#B38A38] bg-[#F9F5EC] text-[#1A1612] shadow-xs ring-1 ring-[#B38A38]'
                      : 'border-[#E3D9C9] bg-[#FFFFFF] text-[#5C5346] hover:border-[#B38A38]'
                  }`}
                >
                  <p className="font-cinzel text-sm sm:text-base font-bold">
                    {isAr ? 'مجموعة النساء' : 'Pour Femme'}
                  </p>
                  <p className="text-[11px] text-[#936B23] mt-0.5 font-medium">30 Signatures Florales & Gourmandes</p>
                </button>
              </div>
            </div>

            {/* Step 2: Select Perfume Scent */}
            <div className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'المرحلة 2 : اختيار العطر' : 'Étape 2 · Choisir la Fragrance'}
                </span>
                <span className="text-xs text-[#1A1612] font-bold">
                  {selectedPerfume.number} — {selectedPerfume.name}
                </span>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7D7263]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'ابحث عن اسم أو رقم العطر (مثال: N1, Sauvage, Libre)...' : 'Rechercher un parfum (ex: N1, Sauvage, Libre, Delina)...'}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {families.map((fam) => (
                    <button
                      key={fam}
                      type="button"
                      onClick={() => setSelectedFamilyFilter(fam)}
                      className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                        selectedFamilyFilter === fam
                          ? 'bg-[#1A1612] text-white'
                          : 'bg-[#FAF7F2] text-[#5C5346] hover:text-[#1A1612] border border-[#E3D9C9]'
                      }`}
                    >
                      {fam === 'all' ? (isAr ? 'الكل' : 'Tous') : fam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Perfume List */}
              <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 divide-y divide-[#F0EAE0]">
                {filteredPerfumes.length === 0 ? (
                  <p className="text-center py-6 text-xs text-[#7D7263]">
                    {isAr ? 'لم يتم العثور على أي عطر بهذا الاسم' : 'Aucun parfum trouvé pour cette recherche.'}
                  </p>
                ) : (
                  filteredPerfumes.map((perfume) => {
                    const isSelected = selectedPerfume.id === perfume.id;
                    return (
                      <button
                        key={perfume.id}
                        type="button"
                        onClick={() => setSelectedPerfume(perfume)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-[#F9F5EC] border border-[#B38A38] text-[#1A1612]'
                            : 'hover:bg-[#FAF7F2] text-[#4A433A]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-cinzel text-xs font-bold ${
                            isSelected ? 'bg-[#1A1612] text-white' : 'bg-[#FAF7F2] text-[#936B23] border border-[#E3D9C9]'
                          }`}>
                            {perfume.number}
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-[#1A1612] tracking-wide">
                              {perfume.name}
                            </p>
                            <p className="text-[10px] text-[#7D7263]">
                              {perfume.category} · {perfume.family}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#936B23] font-medium hidden sm:inline">
                            {perfume.sillage}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#B38A38]" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Step 3: Choose Bottle Packaging Color (Blanc, Bleu, Rouge) */}
            <div className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'المرحلة 3 : لون القنينة والأمبالاج' : 'Étape 3 · Choisir l’Écrin du Flacon'}
                </span>
                <span className="text-xs text-[#1A1612] font-semibold">
                  {currentBottle.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BOTTLE_VARIANTS.map((bottle) => {
                  const isSelected = selectedBottleColor === bottle.id;
                  return (
                    <button
                      key={bottle.id}
                      type="button"
                      onClick={() => setSelectedBottleColor(bottle.id)}
                      className={`relative p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-[#B38A38] bg-[#F9F5EC] shadow-sm ring-1 ring-[#B38A38]'
                          : 'border-[#E3D9C9] bg-[#FAF7F2] hover:border-[#B38A38]'
                      }`}
                    >
                      {/* Bottle Thumbnail */}
                      <div className="w-16 h-20 relative flex items-center justify-center">
                        <img
                          src={bottle.image}
                          alt={bottle.name}
                          className="max-h-full object-contain filter drop-shadow-sm"
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex items-center justify-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: bottle.colorHex }}
                          />
                          <p className="text-xs font-bold text-[#1A1612]">
                            {bottle.id === 'blanc'
                              ? (isAr ? 'أبيض ساتان' : 'Blanc Satin')
                              : bottle.id === 'bleu'
                              ? (isAr ? 'أزرق ليلي' : 'Bleu Nuit')
                              : (isAr ? 'أحمر ياقوتي' : 'Rouge Rubis')}
                          </p>
                        </div>
                        <p className="text-[10px] text-[#7D7263] mt-0.5 truncate font-medium">
                          {bottle.tags.join(' · ')}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#B38A38] text-white rounded-full p-0.5 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Size & Bundle Offers */}
            <div className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#936B23]">
                  {isAr ? 'المرحلة 4 : العروض والباقات الاستثنائية' : 'Étape 4 · Formules & Quantité'}
                </span>
                <span className="text-xs text-[#936B23] font-bold font-mono">
                  50 DH / Flacon
                </span>
              </div>

              {/* 3 Offer Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Single Bottle */}
                <button
                  type="button"
                  onClick={() => setQuantity(1)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    quantity === 1
                      ? 'border-[#B38A38] bg-[#F9F5EC] text-[#1A1612] ring-1 ring-[#B38A38]'
                      : 'border-[#E3D9C9] bg-[#FAF7F2] text-[#5C5346] hover:border-[#B38A38]'
                  }`}
                >
                  <p className="text-xs font-bold">{isAr ? 'قارورة واحدة' : '1 Flacon'}</p>
                  <p className="font-cinzel text-xl font-bold text-[#1A1612] mt-0.5">
                    50 <span className="text-xs text-[#936B23]">DH</span>
                  </p>
                  <p className="text-[10px] text-[#7D7263] mt-0.5">{isAr ? 'سعر القارورة' : 'Prix unitaire'}</p>
                </button>

                {/* Duo Pack: 90 DH instead of 100 */}
                <button
                  type="button"
                  onClick={() => setQuantity(2)}
                  className={`relative p-3.5 rounded-2xl border text-center transition-all ${
                    quantity === 2
                      ? 'border-[#B38A38] bg-[#F9F5EC] text-[#1A1612] ring-1 ring-[#B38A38] shadow-xs'
                      : 'border-[#E3D9C9] bg-[#FAF7F2] text-[#5C5346] hover:border-[#B38A38]'
                  }`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#B38A38] text-white text-[9px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider">
                    {isAr ? 'توفير 10 DH' : '-10 DH'}
                  </span>
                  <p className="text-xs font-bold text-[#936B23]">{isAr ? 'عرض 2 قوارير' : 'Pack 2 Flacons'}</p>
                  <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
                    <span className="font-cinzel text-xl font-bold text-[#1A1612]">90</span>
                    <span className="text-xs text-[#936B23]">DH</span>
                    <span className="text-[11px] text-[#8A8071] line-through">100 DH</span>
                  </div>
                  <p className="text-[10px] text-[#7D7263] mt-0.5">{isAr ? '45 DH فقط للواحدة' : 'Soit 45 DH / unité'}</p>
                </button>

                {/* Trio Pack: 130 DH instead of 150 */}
                <button
                  type="button"
                  onClick={() => setQuantity(3)}
                  className={`relative p-3.5 rounded-2xl border text-center transition-all ${
                    quantity === 3
                      ? 'border-2 border-[#B38A38] bg-[#F9F5EC] text-[#1A1612] shadow-sm'
                      : 'border-[#E3D9C9] bg-[#FAF7F2] text-[#5C5346] hover:border-[#B38A38]'
                  }`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#1A1612] text-[#F3E5AB] text-[9px] font-extrabold px-2.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs">
                    {isAr ? 'الأكثر طلباً (-20 DH)' : 'Top Vente (-20 DH)'}
                  </span>
                  <p className="text-xs font-bold text-[#1A1612]">{isAr ? 'عرض 3 قوارير' : 'Pack 3 Flacons'}</p>
                  <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
                    <span className="font-cinzel text-xl font-bold text-[#1A1612]">130</span>
                    <span className="text-xs text-[#936B23]">DH</span>
                    <span className="text-[11px] text-[#8A8071] line-through">150 DH</span>
                  </div>
                  <p className="text-[10px] text-[#2E7D32] font-bold mt-0.5">{isAr ? 'توفير 20 DH + توصيل مجاني' : 'Économie 20 DH'}</p>
                </button>
              </div>

              {/* Free Mix and Match explanation */}
              <div className="p-3.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl text-xs text-[#1A1612] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#B38A38] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p className="font-bold text-[#1A1612]">
                    {isAr
                      ? '💡 تقدر تخلط الروايح والألوان كما بغيتي!'
                      : '💡 Vous pouvez mixer les parfums et les couleurs librement !'}
                  </p>
                  <p className="text-[11px] text-[#5C5346] mt-0.5">
                    {isAr
                      ? 'ضيف أي عطور وألوان كيعجبوك للسلة، والتخفيض (عرض 2 بـ90 DH وعرض 3 بـ130 DH) كيطبق أوتوماتيكياً فالمجموع النهائي.'
                      : 'Ajoutez vos parfums préférés au panier dans les flacons de votre choix. La réduction de pack (2 pour 90 DH, 3 pour 130 DH) s’applique automatiquement !'}
                  </p>
                </div>
              </div>

              {/* Quantity Stepper & Optional Engraving */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl">
                  <span className="text-xs text-[#5C5346] font-medium">{isAr ? 'الكمية المطلوبة :' : 'Quantité :'}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center bg-white hover:bg-[#E3D9C9] border border-[#D9CDBF] text-[#1A1612] rounded-lg text-sm font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-[#1A1612] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white hover:bg-[#E3D9C9] border border-[#D9CDBF] text-[#1A1612] rounded-lg text-sm font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value)}
                    maxLength={20}
                    placeholder={isAr ? 'اسم أو إهداء على العلبة (اختياري)' : 'Nom / Initiales sur le coffret (optionnel)'}
                    className="w-full h-full px-3 py-2 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions: Total & Buy Buttons */}
            <div className="bg-[#FFFFFF] border-2 border-[#D9CDBF] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <p className="text-[11px] text-[#7D7263] uppercase tracking-wider font-semibold">
                  {isAr ? 'المجموع المستحق :' : 'Total de votre création :'}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-cinzel text-3xl font-extrabold text-[#1A1612] tabular-nums">
                    {totalPrice}
                  </span>
                  <span className="text-base font-bold text-[#936B23]">DH</span>
                  {currentDiscount > 0 && (
                    <span className="text-xs text-[#2E7D32] font-bold ml-1">
                      ({isAr ? `توفير ${currentDiscount} DH!` : `-${currentDiscount} DH`})
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#7D7263]">
                  {quantity >= 3 ? (isAr ? 'توصيل مجاني متضمن' : 'Livraison offerte') : (isAr ? 'الدفع عند الاستلام' : 'Paiement à la livraison')}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAr ? 'إضافة إلى السلة' : 'Ajouter au Panier'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="p-3.5 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                  title="Commander directement via WhatsApp"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
