import { Button } from "@/components/ui/button"

export default function PromoBanner() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-light mb-6">
            Premium Electronics
            <span className="block text-3xl font-normal mt-2 text-gray-300">Up to 30% Off Selected Items</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of high-quality home appliances designed to enhance your everyday life with
            cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
            >
              View Deals
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
