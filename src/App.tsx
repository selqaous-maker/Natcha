import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackOffersSection } from './components/PackOffersSection';
import { FlaconCustomizer } from './components/FlaconCustomizer';
import { CatalogSection } from './components/CatalogSection';
import { PackagingShowcase } from './components/PackagingShowcase';
import { StoryAndCraft } from './components/StoryAndCraft';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogPosterModal } from './components/CatalogPosterModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F8F5EE] text-[#1E1915] flex flex-col font-sans selection:bg-[#B38A38] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <PackOffersSection />
          <FlaconCustomizer />
          <CatalogSection />
          <PackagingShowcase />
          <StoryAndCraft />
        </main>
        <Footer />

        {/* Interactive Overlays (No video) */}
        <CartDrawer />
        <CheckoutModal />
        <CatalogPosterModal />
        <FragranceQuizModal />
      </div>
    </CartProvider>
  );
}
