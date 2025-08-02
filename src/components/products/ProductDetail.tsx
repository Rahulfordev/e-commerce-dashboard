"use client";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useProductDetail(id as string);

  if (isLoading) return <Loader />;
  if (isError || !product) return <ErrorMessage message="Product not found" />;

  const handleAdd = () => dispatch(addToCart(product));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image section */}
        <div className="relative w-full h-[400px] bg-white border border-pastelLavender rounded-lg p-4 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Details section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-black">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mb-2 capitalize">
              Category: {product.category}
            </p>

            <p className="text-xl sm:text-2xl text-secondary font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-2 text-yellow-500 text-sm mb-6">
              <StarIcon className="w-5 h-5" />
              {product.rating?.rate.toFixed(1)} ({product.rating?.count}{" "}
              ratings)
            </div>

            <p className="text-black text-sm leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto px-6 py-2 bg-primary cursor-pointer text-white font-medium rounded shadow hover:bg-primarySecondary transition"
            >
              Add to Cart
            </button>
            <Link
              href="/cart"
              className="w-full sm:w-auto px-6 py-2 bg-secondary text-white font-medium rounded shadow hover:bg-secondarySecondary transition text-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
