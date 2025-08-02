"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-10 md:py-16 text-gray-500">
          🛒 Your cart is currently empty.
          <div className="mt-4">
            <Link
              href="/"
              className="inline-block text-sm text-secondary hover:underline"
            >
              Continue shopping →
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-pastelLavender pb-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-white border border-pastelLavender rounded">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold text-black line-clamp-2">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 border border-pastelLavender rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 border border-pastelLavender rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-medium text-secondary mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-3 sm:mt-0 text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mt-10">
            <h2 className="text-xl font-bold text-black">
              Total: <span className="text-secondary">${total}</span>
            </h2>
            <button
              disabled
              className="mt-4 px-6 py-2 rounded bg-gray-300 text-white font-semibold cursor-not-allowed"
            >
              Checkout (Coming Soon)
            </button>
          </div>
        </>
      )}
    </main>
  );
}
