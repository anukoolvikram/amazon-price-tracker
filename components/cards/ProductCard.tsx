// components/ProductCard.tsx
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  product: Product;
}
 
const ProductCard = ({ product }: Props) => {
  // Use a default image if none is provided
  const imageSrc = product.image || '/assets/icons/logo.svg';

  return (
    <Link 
      href={`/products/${product._id}`} 
      // Replaced 'product-card' with a full Tailwind card design
      className="group flex w-full flex-col gap-4
                p-4 border border-gray-200 rounded-lg
                bg-white shadow-sm transition-all duration-300
                hover:shadow-lg hover:-translate-y-1"
    >
      <div 
        // Replaced 'product-card_img-container'
        className="relative flex h-48 w-full items-center justify-center 
                  rounded-md bg-gray-50 p-4"
      >
        <Image 
          src={imageSrc}
          alt={product.title}
          width={200}
          height={200}
          // Replaced 'product-card_img'
          className="h-full max-h-44 w-auto object-contain
                    group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        {/* Replaced 'product-title' */}
        <h3 className="text-lg font-semibold text-secondary truncate">
          {product.title}
        </h3>

        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm capitalize">
            {/* Provide a fallback if category is missing */}
            {product.category || 'Category'}
          </p>

          <p className="text-lg font-bold text-secondary">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard