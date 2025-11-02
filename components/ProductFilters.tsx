"use client"

import { useRouter, useSearchParams } from 'next/navigation'

interface ProductFiltersProps {
  currentSort?: string
  currentFilter?: string
  totalProducts: number
  trendingCount: number
}

const ProductFilters = ({ 
  currentSort, 
  currentFilter, 
  totalProducts,
  trendingCount 
}: ProductFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasActiveFilters = currentSort || currentFilter

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter by Type */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Product Type</h4>
        <div className="space-y-2">
          <button
            onClick={() => updateParams({ filter: currentFilter === 'trending' ? null : 'trending' })}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentFilter === 'trending' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>Trending Deals</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {trendingCount}
              </span>
            </div>
          </button>
          
          <button
            onClick={() => updateParams({ filter: null })}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentFilter 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>All Products</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {totalProducts}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Sort by</h4>
        <div className="space-y-2">
          {[
            { value: 'price-drop', label: 'Biggest Price Drop' },
            { value: 'price-low-high', label: 'Price: Low to High' },
            { value: 'price-high-low', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest First' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateParams({ sort: option.value })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentSort === option.value
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Categories</h4>
        <div className="space-y-2">
          {[
            'electronics',
            'fashion', 
            'home',
            'sports',
            'books'
          ].map((category) => (
            <button
              key={category}
              onClick={() => updateParams({ category })}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductFilters