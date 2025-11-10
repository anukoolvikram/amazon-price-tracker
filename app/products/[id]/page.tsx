import PriceInfoCard from "@/components/cards/PriceInfoCard";
import ProductCard from "@/components/cards/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  // Handle the potential null/undefined response
  const productData = await getProductById(id);

  if (!productData) redirect('/')

  // Type assertion or transformation if needed
  const product = productData as Product;

  const similarProducts = await getSimilarProducts(id);

  // Calculate discount percentage with safe access
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
    : 0;

  // Calculate days since tracking started with safe access
  const daysTracked = product.createdAt 
    ? Math.ceil((new Date().getTime() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>›</span>
          <span className="text-gray-900 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex gap-8 xl:flex-row flex-col p-8">
            {/* Product Image Section */}
            <div className="xl:flex-1 flex justify-center">
              <div className="relative group">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <Image 
                    src={product.image}
                    alt={product.title}
                    width={580}
                    height={400}
                    className="mx-auto object-contain max-h-[400px] transition-transform group-hover:scale-105 duration-300"
                    priority
                  />
                </div>
                
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {discountPercentage}% OFF
                  </div>
                )}
                
                {/* Out of Stock Badge */}
                {product.isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Out of Stock
                  </div>
                )}

                {/* Tracking Status Badge */}
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Image 
                    src="/assets/icons/check.svg"
                    alt="tracking"
                    width={12}
                    height={12}
                    className="filter brightness-0 invert"
                  />
                  Price Tracking Active
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="xl:flex-1 flex flex-col">
              {/* Header Section */}
              <div className="flex justify-between items-start gap-5 flex-wrap pb-6 border-b border-gray-200">
                <div className="flex flex-col gap-3 flex-1 min-w-[300px]">
                  <h1 className="text-3xl lg:text-4xl font-bold font-space-grotesk text-gray-900 leading-tight">
                    {product.title}
                  </h1>

                  <Link
                    href={product.url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group w-fit"
                  >
                    Visit Product on Amazon
                    <Image 
                      src="/assets/icons/external-link.svg"
                      alt="external link"
                      width={16}
                      height={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group">
                    <Image 
                      src="/assets/icons/red-heart.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>

                  <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <Image 
                      src="/assets/icons/bookmark.svg"
                      alt="bookmark"
                      width={24}
                      height={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>

                  <button className="p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                    <Image 
                      src="/assets/icons/share.svg"
                      alt="share"
                      width={24}
                      height={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="py-6 border-b border-gray-200">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-4xl lg:text-5xl font-bold text-gray-900">
                      {product.currency} {formatNumber(product.currentPrice)}
                    </p>
                    
                    {product.originalPrice && product.originalPrice > product.currentPrice && (
                      <div className="flex flex-col">
                        <p className="text-xl text-gray-500 line-through">
                          {product.currency} {formatNumber(product.originalPrice)}
                        </p>
                        <span className="text-sm text-green-600 font-semibold">
                          You save {product.currency} {formatNumber(product.originalPrice - product.currentPrice)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <Image 
                          src="/assets/icons/star.svg"
                          alt="star"
                          width={18}
                          height={18}
                        />
                        <span className="text-sm font-semibold text-orange-600">
                          {product.stars || '4.5'}/5
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Image 
                        src="/assets/icons/comment.svg"
                        alt="comment"
                        width={18}
                        height={18}
                      />
                      <span className="text-sm font-medium">
                        {product.reviewsCount} Reviews
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-green-600">
                      <Image 
                        src="/assets/icons/check.svg"
                        alt="check"
                        width={18}
                        height={18}
                      />
                      <span className="text-sm font-medium">
                        <span className="font-bold">93%</span> recommended
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Status Section */}
              <div className="py-6 border-b border-gray-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Image 
                      src="/assets/icons/bell.svg"
                      alt="notifications"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800">Price Tracking Active</h4>
                    <p className="text-sm text-green-700">
                      You'll receive email alerts when the price drops. 
                      Tracked for {daysTracked} day{daysTracked > 1 ? 's' : ''}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price History Cards */}
              <div className="py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Insights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PriceInfoCard 
                    title="Current Price"
                    iconSrc="/assets/icons/price-tag.svg"
                    value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                    trend="current"
                  />
                  <PriceInfoCard 
                    title="Average Price"
                    iconSrc="/assets/icons/chart.svg"
                    value={`${product.currency} ${formatNumber(product.averagePrice || 0)}`}
                    trend="average"
                  />
                  <PriceInfoCard 
                    title="Highest Price"
                    iconSrc="/assets/icons/arrow-up.svg"
                    value={`${product.currency} ${formatNumber(product.highestPrice || 0)}`}
                    trend="high"
                  />
                  <PriceInfoCard 
                    title="Lowest Price"
                    iconSrc="/assets/icons/arrow-down.svg"
                    value={`${product.currency} ${formatNumber(product.lowestPrice || 0)}`}
                    trend="low"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="px-8 py-8 border-t border-gray-200 bg-gray-50">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-bold font-space-grotesk text-gray-900 mb-6">
                Product Description
              </h3>

              <div className="prose prose-lg max-w-none">
                {product?.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Buy Now Button */}
              {!product.isOutOfStock && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                  <Link 
                    href={product.url}
                    target="_blank"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 group"
                  >
                    <Image 
                      src="/assets/icons/bag.svg"
                      alt="check"
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                    Buy Now on Amazon
                    <Image 
                      src="/assets/icons/external-link.svg"
                      alt="external link"
                      width={20}
                      height={20}
                      className="filter brightness-0 invert group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  
                  <span className="text-sm text-gray-500">
                    Free shipping • 30-day returns
                  </span>
                </div>
              )}

              {/* Out of Stock Message */}
              {product.isOutOfStock && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/assets/icons/alert.svg"
                      alt="alert"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="font-semibold text-yellow-800">Currently Out of Stock</p>
                      <p className="text-yellow-700 text-sm">We'll notify you when it's back in stock</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts && similarProducts?.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk text-gray-900">
                  Similar Products
                </h2>
                <p className="text-gray-600 mt-2">Other products you might like</p>
              </div>
              <Link 
                href="/products"
                className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors group"
              >
                View All
                <Image 
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product:any) => (
                <ProductCard key={product._id} product={product as Product} />
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="flex justify-center mt-8 sm:hidden">
              <Link 
                href="/products"
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              >
                View All Products
                <Image 
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails