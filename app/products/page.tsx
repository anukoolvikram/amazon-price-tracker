export const dynamic = 'force-dynamic'; 
import {
  getTrendingProductsCount,
  getTotalProductsCount,
  getMyTrackedProducts
} from '@/lib/actions'
import ProductCard from '@/components/cards/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import { Product } from '@/types'

interface SearchParams {
  sort?: string
  filter?: string
  category?: string
  search?: string
}

const ProductsPage = async ({
  searchParams
}: {
  searchParams: SearchParams
}) => {

  const productsData = await getMyTrackedProducts(searchParams);
  const totalProductsCount = await getTotalProductsCount();
  const trendingCount = await getTrendingProductsCount();
  const productsFound = productsData?.length || 0;

  const filteredProducts: Product[] = productsData?.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt.toString(),
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold font-space-grotesk text-gray-900">
                All Products
              </h1>
              <p className="mt-2 text-gray-600">
                {searchParams.filter === 'trending'
                  ? `Showing ${productsFound} trending products`
                  : `Browse all products`
                }
              </p>
            </div>

            {/* Results Summary */}
            <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm text-gray-500">
              {searchParams.filter === 'trending' && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                  Trending Deals
                </span>
              )}
              {/* Show the count of products *found* */}
              <span>{productsFound} products found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters
              currentSort={searchParams.sort}
              currentFilter={searchParams.filter}
              // Pass the counts to the filter component
              totalProducts={totalProductsCount}
              trendingCount={trendingCount}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product} />
                ))}
              </div>
            ) : (
              // ... (your 'No products found' UI is perfect) ...
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No products found</div>
                <p className="text-gray-500">
                  {searchParams.search
                    ? `No products matching "${searchParams.search}"`
                    : 'Try adjusting your filters or search terms'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage