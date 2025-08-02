"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { StarIcon } from "@heroicons/react/20/solid";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative border border-pastelLavender rounded-xl p-4 bg-white hover:shadow-xl transition duration-200 ease-in-out flex flex-col"
    >
      <div className="relative w-full h-52 flex items-center justify-center mb-4 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h2 className="text-sm font-semibold mb-1 text-black line-clamp-2">
        {product.title}
      </h2>

      <span className="text-xs text-gray-500 mb-2 capitalize">
        {product.category}
      </span>

      <div className="flex justify-between items-center mt-auto">
        <strong className="text-secondary text-base font-bold">
          ${product.price.toFixed(2)}
        </strong>
        {product.rating && (
          <span className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
            <StarIcon className="w-4 h-4" />
            {product.rating.rate.toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
}
