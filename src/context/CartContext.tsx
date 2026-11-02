import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRICING } from '../data/perfumes';
import { BottleColor, CartItem, Perfume } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (perfume: Perfume, bottleColor: BottleColor, bottleImage: string, size: '50ml' | '100ml', quantity?: number, engraving?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCatalogModalOpen: boolean;
  setIsCatalogModalOpen: (open: boolean) => void;
  catalogModalTab: 'homme' | 'femme';
  openCatalogModal: (gender: 'homme' | 'femme') => void;
  closeCatalogModal: () => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  activePerfumeForBuilder: Perfume | null;
  selectPerfumeForBuilder: (perfume: Perfume) => void;
  language: 'fr' | 'ar';
  setLanguage: (lang: 'fr' | 'ar') => void;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ticha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogModalTab, setCatalogModalTab] = useState<'homme' | 'femme'>('homme');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activePerfumeForBuilder, setActivePerfumeForBuilder] = useState<Perfume | null>(null);
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    try {
      localStorage.setItem('ticha_cart', JSON.stringify(items));
    } catch {
      // storage error ignored
    }
  }, [items]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const addToCart = (
    perfume: Perfume,
    bottleColor: BottleColor,
    bottleImage: string,
    size: '50ml' | '100ml' = '50ml',
    quantity: number = 1,
    engraving?: string
  ) => {
    const unitPrice = PRICING.unitPrice;
    const itemId = `${perfume.id}-${bottleColor}-${size}${engraving ? `-${engraving}` : ''}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          perfume,
          bottleColor,
          bottleImage,
          size,
          price: unitPrice,
          quantity,
          engraving,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const selectPerfumeForBuilder = (perfume: Perfume) => {
    setActivePerfumeForBuilder(perfume);
    const builderEl = document.getElementById('atelier-ticha');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCatalogModal = (gender: 'homme' | 'femme') => {
    setCatalogModalTab(gender);
    setIsCatalogModalOpen(true);
  };

  const closeCatalogModal = () => {
    setIsCatalogModalOpen(false);
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = totalItemsCount * PRICING.unitPrice;

  // Calcul automatique des réductions de packs:
  // القارورة بـ50 درهم، عرض 3 بـ130 درهم عوض 150 (توفير 20 درهم)، وعرض 2 بـ90 درهم عوض 100 (توفير 10 دراهم)
  // الزبون يقدر يخلط الروايح والألوان، والتخفيض كيتحسب أوتوماتيكياً
  const numTrios = Math.floor(totalItemsCount / 3);
  const remainder = totalItemsCount % 3;
  const numDuos = remainder === 2 ? 1 : 0;
  const discount = numTrios * 20 + numDuos * 10;

  const subtotal = Math.max(0, rawSubtotal - discount);
  const shipping = totalItemsCount >= 3 || subtotal >= PRICING.freeShippingThreshold || totalItemsCount === 0 ? 0 : PRICING.standardShippingFee;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCatalogModalOpen,
        setIsCatalogModalOpen,
        catalogModalTab,
        openCatalogModal,
        closeCatalogModal,
        isQuizOpen,
        setIsQuizOpen,
        activePerfumeForBuilder,
        selectPerfumeForBuilder,
        language,
        setLanguage,
        subtotal,
        shipping,
        discount,
        total,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
