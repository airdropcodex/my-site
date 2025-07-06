import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong> +880 1234-567890
                </p>
                <p>
                  <strong>Email:</strong> info@electrostore.com
                </p>
                <p>
                  <strong>Address:</strong> Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
