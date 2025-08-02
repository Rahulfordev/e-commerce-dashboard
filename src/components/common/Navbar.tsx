"use client";

import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import type { RootState } from "../../lib/store";
import Link from "next/link";

const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <nav className="bg-white border-b border-pastelLavender sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold text-primary">MyShop</h1>
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCartIcon className="w-6 h-6 text-black hover:text-secondary transition" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] px-1.5 py-0.5 rounded-full font-medium">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
