"use client";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex gap-2 mt-6 justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded cursor-pointer ${
            currentPage === i + 1
              ? "bg-secondary text-white"
              : "bg-white text-black border border-pastelLavender"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
