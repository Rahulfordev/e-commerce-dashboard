"use client";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import PaginationControls from "@/components/ui/PaginationControls";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SortDropdown from "@/components/ui/SortDropdown";

export default function Products() {
  const { data: products, isLoading, isError } = useProducts();
  const { data: categories = [] } = useCategories();

  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [sortBy, setSortBy] = useState<"default" | "price" | "rating">(
    "default"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  let filtered = products?.filter(
    (p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selected === "all" || p.category === selected)
  );

  if (sortBy === "price") {
    filtered = filtered?.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filtered = filtered?.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  const paginated = filtered?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <Loader />;
  if (isError || !products) return <ErrorMessage />;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-black">
          Discover Top Products
        </h1>
        <p className="text-black text-sm md:text-base">
          Handpicked items across all categories for your needs
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-pastelLavender px-10 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-pastelLavender transition"
          />
          <span className="absolute left-3 top-2.5 text-gray-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </span>
        </div>
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <CategoryFilter
        selected={selected}
        onSelect={(cat) => {
          setSelected(cat);
          setCurrentPage(1);
        }}
        categories={categories}
      />

      {filtered?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginated?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalItems={filtered?.length || 0}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
