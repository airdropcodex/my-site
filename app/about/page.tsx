import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">About ElectroStore</h1>
          <div className="prose prose-lg mx-auto">
            <p>
              Welcome to ElectroStore, your premier destination for high-quality electronics and home appliances. We are
              committed to providing our customers with the latest technology and exceptional service.
            </p>
            <p>
              Founded with a vision to make premium electronics accessible to everyone, we offer a carefully curated
              selection of products from trusted brands at competitive prices.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
