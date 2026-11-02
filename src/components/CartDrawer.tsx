import React from 'react';
import { useCart } from '../context/CartContext';
import { PRICING } from '../data/perfumes';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    discount,
    total,
    totalItemsCount,
    setIsCheckoutOpen,
    language,
  } = useCart();

  if (!isCartOpen) return null;

  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#D9CDBF] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3D9C9] bg-[#FFFFFF]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#936B23]" />
              <h3 className="font-cinzel text-base font-bold text-[#1A1612] uppercase">
                {isAr ? 'سلة التسوق' : 'Votre Panier TiCHA'}
              </h3>
              <span className="text-xs text-[#1A1612] bg-[#F2EDE4] px-2.5 py-0.5 rounded-full border border-[#D9CDBF] font-mono font-bold tabular-nums">
                {totalItemsCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#7D7263] hover:text-[#1A1612] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Promotion / Free Shipping Banner */}
          <div className="bg-[#1A1612] text-[#F3E5AB] px-6 py-2.5 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5C378] shrink-0" />
            {totalItemsCount === 1 ? (
              <span>
                {isAr
                  ? 'أضف قارورة ثانية واستفد من عرض 2 بـ 90 درهم فقط (عوض 100 درهم)!'
                  : 'Ajoutez 1 flacon pour activer l’offre 2 pour 90 DH (au lieu de 100 DH) !'}
              </span>
            ) : totalItemsCount === 2 ? (
              <span className="font-semibold text-[#86EFAC]">
                {isAr 
                  ? 'تم تفعيل عرض 2 بـ 90 DH (-10 DH)! أضف قارورة 3 للحصول على عرض 3 بـ 130 DH!'
                  : 'Offre 2 flacons activée (90 DH au lieu de 100 DH) ! Ajoutez-en un 3ème pour 130 DH !'}
              </span>
            ) : totalItemsCount >= 3 ? (
              <span className="font-semibold text-[#86EFAC]">
                {isAr 
                  ? `🎉 تم تفعيل تخفيض الباقات التلقائي (-${discount} درهم) + توصيل مجاني!`
                  : `🎉 Remise de pack activée (-${discount} DH) + Livraison offerte !`}
              </span>
            ) : (
              <span>
                {isAr
                  ? 'القارورة بـ 50 DH · عرض 2 بـ 90 DH · عرض 3 بـ 130 DH (خلط الروايح والألوان)'
                  : '50 DH le flacon · Pack 2 = 90 DH · Pack 3 = 130 DH (mixez librement)'}
              </span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#D9CDBF] flex items-center justify-center text-[#7D7263]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-[#1A1612]">
                    {isAr ? 'السلة فارغة حالياً' : 'Votre panier est vide'}
                  </h4>
                  <p className="text-xs text-[#5C5346] mt-1 max-w-xs">
                    {isAr
                      ? 'اختر عطرك المفضل ولون القنينة للبدء في تجهيز طلبيتك بـ 50 DH.'
                      : 'Explorez nos 55 fragrances et composez votre flacon à 50 DH.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#1A1612] hover:bg-[#B38A38] text-white text-xs font-bold uppercase rounded-xl transition-colors shadow-xs"
                >
                  {isAr ? 'تصفح العطور' : 'Découvrir la collection'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-[#FFFFFF] border border-[#E3D9C9] rounded-2xl p-4 flex gap-4 shadow-xs">
                  {/* Bottle image preview */}
                  <div className="w-16 h-22 bg-[#FAF7F2] border border-[#EBE3D7] rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img
                      src={item.bottleImage}
                      alt={item.perfume.name}
                      className="max-h-full object-contain filter drop-shadow-xs"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#1A1612]">
                          {item.perfume.number} · {item.perfume.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7D7263] hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#5C5346] space-y-0.5 mt-0.5">
                        <p>
                          {isAr ? 'القنينة :' : 'Flacon :'} <span className="text-[#936B23] font-bold uppercase">{item.bottleColor}</span> · 50ml
                        </p>
                        {item.engraving && (
                          <p className="text-[10px] text-[#7D7263] italic">
                            « {item.engraving} »
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-[#D9CDBF] rounded-lg bg-[#FAF7F2] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#5C5346] hover:text-[#1A1612] text-xs px-1 font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-[#1A1612] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#5C5346] hover:text-[#1A1612] text-xs px-1 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-cinzel text-sm font-bold text-[#1A1612] tabular-nums">
                        {item.price * item.quantity} <span className="text-xs text-[#936B23]">DH</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E3D9C9] bg-[#FFFFFF] space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C5346]">
                  <span>{isAr ? 'المجموع الجزئي :' : 'Sous-total :'}</span>
                  <span className="text-[#1A1612] font-semibold tabular-nums">{subtotal + discount} DH</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold bg-[#E8F5E9] border border-[#C8E6C9] px-2.5 py-1.5 rounded-xl">
                    <span>
                      {totalItemsCount === 2
                        ? (isAr ? 'عرض 2 قوارير (90 DH عوض 100) :' : 'Offre Pack 2 Flacons :')
                        : totalItemsCount === 3
                        ? (isAr ? 'عرض 3 قوارير (130 DH عوض 150) :' : 'Offre Pack 3 Flacons :')
                        : (isAr ? 'تخفيض الباقات التلقائي :' : 'Remise Automatique Packs :')}
                    </span>
                    <span className="tabular-nums font-bold">-{discount} DH</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5C5346]">
                  <span>{isAr ? 'التوصيل في المغرب :' : 'Livraison partout au Maroc :'}</span>
                  <span className="text-[#1A1612] font-semibold tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-[#2E7D32] font-bold">{isAr ? 'مجاني' : 'Gratuite'}</span>
                    ) : (
                      `${shipping} DH`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-cinzel font-bold text-[#1A1612] pt-2 border-t border-[#F0EAE0]">
                  <span>{isAr ? 'المجموع النهائي :' : 'Total à régler :'}</span>
                  <span className="text-[#936B23] text-xl tabular-nums">{total} DH</span>
                </div>
                <p className="text-[10px] text-[#7D7263] text-center">
                  {isAr ? 'الدفع نقداً عند استلام الطلبية والتأكد منها' : 'Paiement à la livraison après vérification'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 bg-[#1A1612] hover:bg-[#B38A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'متابعة الطلب (الدفع عند الاستلام)' : 'Commander (Paiement à la Livraison)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
