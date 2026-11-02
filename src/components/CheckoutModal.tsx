import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MOROCCAN_CITIES } from '../data/perfumes';
import { OrderFormData } from '../types';
import { X, CheckCircle, Send, Truck, Phone, MapPin, User } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    clearCart,
    shipping,
    discount,
    total,
    language,
  } = useCart();

  const isAr = language === 'ar';

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    notes: '',
    preferredContact: 'whatsapp',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(isAr ? 'يرجى كتابة الاسم الكامل' : 'Veuillez saisir votre nom complet.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg(isAr ? 'يرجى إدخال رقم هاتف صحيح (مثال: 0612345678)' : 'Veuillez saisir un numéro de téléphone valide.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg(isAr ? 'يرجى كتابة العنوان للتوصيل' : 'Veuillez saisir votre adresse de livraison.');
      return;
    }

    const generatedId = `TCH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const itemsSummary = items
      .map(
        (it) =>
          `• ${it.perfume.number} - ${it.perfume.name} [Flacon: ${it.bottleColor.toUpperCase()} | 50ml] x${it.quantity} = ${it.price * it.quantity} DH`
      )
      .join('\n');

    const message = isAr
      ? `طلب جديد TiCHA Parfums (الدفع عند الاستلام):\n\n` +
        `👤 الاسم: ${formData.fullName}\n` +
        `📱 الهاتف: ${formData.phone}\n` +
        `📍 المدينة: ${formData.city}\n` +
        `🏠 العنوان: ${formData.address}\n` +
        (formData.notes ? `📝 ملاحظة: ${formData.notes}\n` : '') +
        `\n🛒 تفاصيل الطلب:\n${itemsSummary}\n\n` +
        (discount > 0 ? `🎁 التخفيض المطبق: -${discount} درهم\n` : '') +
        `💰 المجموع الإجمالي: ${total} درهم (توصيل ${shipping === 0 ? 'مجاني' : `${shipping} DH`})\n\n` +
        `يرجى تأكيد الطلبية للإرسال في أقرب وقت. شكراً!`
      : `Bonjour TiCHA Parfums, voici ma commande (Paiement à la livraison) :\n\n` +
        `👤 Nom : ${formData.fullName}\n` +
        `📱 Téléphone : ${formData.phone}\n` +
        `📍 Ville : ${formData.city}\n` +
        `🏠 Adresse : ${formData.address}\n` +
        (formData.notes ? `📝 Note : ${formData.notes}\n` : '') +
        `\n🛒 Parfums commandés :\n${itemsSummary}\n\n` +
        (discount > 0 ? `🎁 Remise pack : -${discount} DH\n` : '') +
        `💰 Total à régler à la livraison : ${total} DH (${shipping === 0 ? 'Livraison Gratuite' : `Livraison: ${shipping} DH`})\n\n` +
        `Merci de me contacter pour la confirmation et l'expédition !`;

    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleFinishAndClose = () => {
    clearCart();
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#D9CDBF] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 text-[#7D7263] hover:text-[#1A1612] p-1 text-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#936B23] font-bold">
                {isAr ? 'تم تسجيل الطلبية بنجاح' : 'Commande Enregistrée avec Succès'}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#1A1612] mt-1">
                {isAr ? 'شكراً لثقتكم في تيشا بارفان' : 'Merci pour votre confiance'}
              </h3>
              <p className="text-xs text-[#7D7263] mt-1 font-mono">
                Référence : <span className="text-[#1A1612] font-bold">{orderId}</span>
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E3D9C9] rounded-2xl p-4 text-xs text-[#4A433A] text-left space-y-2">
              <div className="flex justify-between border-b border-[#F0EAE0] pb-2">
                <span>{isAr ? 'العميل :' : 'Client :'}</span>
                <span className="font-bold text-[#1A1612]">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between border-b border-[#F0EAE0] pb-2">
                <span>{isAr ? 'التوصيل إلى :' : 'Livraison à :'}</span>
                <span className="font-bold text-[#1A1612]">{formData.city}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>{isAr ? 'المبلغ عند الاستلام :' : 'Montant à la livraison :'}</span>
                <span className="font-cinzel text-base font-bold text-[#936B23] tabular-nums">{total} DH</span>
              </div>
            </div>

            <p className="text-xs text-[#5C5346] max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'سيتصل بكم مستشار تيشا عبر الهاتف أو الواتساب خلال ساعتين لتأكيد الشحن الفوري لباب منزلكم (التوصيل خلال 24 إلى 48 ساعة).'
                : 'Notre équipe TiCHA vous contactera par téléphone ou WhatsApp sous 2 heures pour confirmer l’expédition de votre colis (délai : 24h à 48h).'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'إرسال التأكيد عبر الواتساب' : 'Envoyer Confirmation WhatsApp'}</span>
              </button>

              <button
                type="button"
                onClick={handleFinishAndClose}
                className="py-3.5 px-6 bg-[#FAF7F2] hover:bg-[#F2EDE4] border border-[#D9CDBF] text-[#1A1612] text-xs font-bold uppercase rounded-xl transition-colors"
              >
                {isAr ? 'تم / إغلاق' : 'Terminer'}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#936B23] uppercase tracking-widest mb-1">
                <Truck className="w-4 h-4 text-[#B38A38]" />
                <span>{isAr ? 'الدفع عند الاستلام بالمغرب' : 'Livraison Sécurisée & Cash on Delivery'}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1A1612]">
                {isAr ? 'معلومات التوصيل والاستلام' : 'Finaliser votre Commande'}
              </h3>
              <p className="text-xs text-[#5C5346] mt-1">
                {isAr
                  ? 'الدفع نقداً بعد استلام القارورة والتأكد من مطابقتها لاختياركم.'
                  : 'Réglez en espèces à la réception de votre colis après vérification.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1612] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B38A38]" />
                  <span>{isAr ? 'الاسم الكامل :' : 'Nom et Prénom :'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={isAr ? 'مثال: يوسف العلمي / مريم بناني' : 'Ex: Karim Benali'}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                />
              </div>

              {/* Phone & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1612] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B38A38]" />
                    <span>{isAr ? 'رقم الهاتف (الواتساب) :' : 'Téléphone (WhatsApp) :'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1612] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B38A38]" />
                    <span>{isAr ? 'المدينة :' : 'Ville :'}</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] focus:outline-none focus:border-[#B38A38]"
                  >
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city} className="bg-white">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1612] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B38A38]" />
                  <span>{isAr ? 'عنوان التسليم بالتفصيل :' : 'Adresse complète de livraison :'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={isAr ? 'الحي، رقم المنزل / الشقة، الشارع...' : 'Quartier, N° rue, immeuble, résidence...'}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                />
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1612] mb-1.5">
                  {isAr ? 'ملاحظات إضافية للموزع (اختياري) :' : 'Instructions pour le livreur (optionnel) :'}
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isAr ? 'مثال: التسليم في المساء بعد العمل...' : 'Ex: Horaires de préférence, point de repère...'}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9CDBF] rounded-xl text-xs text-[#1A1612] placeholder-[#8A8071] focus:outline-none focus:border-[#B38A38]"
                />
              </div>

              {/* Order Summary Strip */}
              <div className="bg-[#FAF7F2] border border-[#E3D9C9] rounded-2xl p-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C5346]">
                  <span>{isAr ? 'عدد القوارير :' : 'Nombre de flacons :'}</span>
                  <span className="font-bold text-[#1A1612]">{items.reduce((acc, it) => acc + it.quantity, 0)} {isAr ? 'قارورة' : 'flacon(s)'}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold bg-[#E8F5E9] px-2 py-1 rounded-lg">
                    <span>{isAr ? 'تخفيض العرض التلقائي :' : 'Remise pack appliquée :'}</span>
                    <span className="tabular-nums font-bold">-{discount} DH</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5C5346]">
                  <span>{isAr ? 'التوصيل :' : 'Frais de livraison :'}</span>
                  <span>{shipping === 0 ? <strong className="text-[#2E7D32]">{isAr ? 'مجاني' : 'Offerte'}</strong> : `${shipping} DH`}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E3D9C9] font-cinzel font-bold text-sm text-[#1A1612]">
                  <span>{isAr ? 'المجموع المستحق :' : 'Total à payer à la livraison :'}</span>
                  <span className="text-[#936B23] text-lg tabular-nums">{total} DH</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md text-center"
                >
                  {isAr ? 'تأكيد الطلبية (الدفع عند التسليم)' : 'Confirmer la Commande (COD)'}
                </button>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                  title="Commander directement via WhatsApp"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
