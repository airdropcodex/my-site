import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold">ElectroStore</span>
            </div>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Premium electronics for premium lifestyles. We curate the finest home appliances with cutting-edge
              technology and superior performance.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-neutral-800 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className="h-5 w-5 group-hover:text-white transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {["About Us", "Products", "Deals", "Warranty", "Careers"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-8">Customer Service</h4>
            <ul className="space-y-4">
              {["Contact Us", "Shipping Info", "Returns", "Support", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-8">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-indigo-400" />
                </div>
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <span className="text-neutral-400">support@electrostore.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                </div>
                <span className="text-neutral-400">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 lg:mb-0">
              © 2024 ElectroStore. All rights reserved. Crafted with ❤️ for premium experiences.
            </p>
            <div className="flex items-center space-x-8">
              <span className="text-neutral-400 text-sm">Secure payments:</span>
              <div className="flex space-x-3">
                {["VISA", "MC", "AMEX", "PAYPAL"].map((payment) => (
                  <div
                    key={payment}
                    className="bg-white text-neutral-900 px-3 py-2 rounded-lg text-xs font-bold shadow-sm"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
