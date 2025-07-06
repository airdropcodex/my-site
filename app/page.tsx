import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import CategorySection from "./components/CategorySection"
import FeaturedProducts from "./components/FeaturedProducts"
import TrustIndicators from "./components/TrustIndicators"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 antialiased">
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  )
}
