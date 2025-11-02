import HeroCarousel from "@/components/sections/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import TrendingSection from "@/components/sections/TrendingSection"
import { Product } from "@/types"
import WorkProcess from "@/components/sections/WorkProcess"

const Home = async () => {
  const allProducts = await getAllProducts();

  interface PriceHistory {
    price: number;
    date: string;
  }

  interface ProductData {
    _id: string;
    name: string;
    currentPrice: number;
    priceHistory: PriceHistory[];
    createdAt: string;
  }

  const trendingProductData: ProductData[] = allProducts
    ?.filter((product: ProductData) => product.priceHistory.length > 1)
    ?.sort((a: ProductData, b: ProductData) => {
      const aPriceDrop = ((a.priceHistory[0]?.price - a.currentPrice) / a.priceHistory[0]?.price) * 100;
      const bPriceDrop = ((b.priceHistory[0]?.price - b.currentPrice) / b.priceHistory[0]?.price) * 100;
      return bPriceDrop - aPriceDrop;
    })
    ?.slice(0, 8);

  const trendingProducts: Product[] = trendingProductData?.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt.toString(),
  })) || []; 
  
  return (
    <div className="min-h-screen">
      {/* Hero Section - This is all good */}
      <section className="px-6 py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex max-xl:flex-col gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <p className="text-sm font-medium">
                  Smart Shopping Starts Here
                </p>
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                  className="filter brightness-0 invert"
                />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-space-grotesk leading-tight">
                Unleash the Power of
                <span className="text-yellow-300 block mt-2">YourPrice</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                Track prices, get alerts, and save money effortlessly. Never overpay for your favorite products again.
              </p>

              <div className="pt-4">
                <Searchbar />
              </div>
            </div>

            <div className="flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - This is all good */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 font-space-grotesk">50K+</div>
              <p className="text-gray-600 text-sm md:text-base">Products Tracked</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-green-600 font-space-grotesk">$2.1M+</div>
              <p className="text-gray-600 text-sm md:text-base">Total Savings</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 font-space-grotesk">95%</div>
              <p className="text-gray-600 text-sm md:text-base">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 font-space-grotesk">24/7</div>
              <p className="text-gray-600 text-sm md:text-base">Price Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      <TrendingSection products={trendingProducts || []} />
      <WorkProcess/>
    </div>
  )
}

export default Home