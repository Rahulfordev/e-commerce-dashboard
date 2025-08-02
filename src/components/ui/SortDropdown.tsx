import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price (Low to High)", value: "price" },
  { label: "Rating (High to Low)", value: "rating" },
];

export default function SortDropdown({
  sortBy,
  setSortBy,
  setCurrentPage,
}: {
  sortBy: "default" | "price" | "rating";
  setSortBy: React.Dispatch<
    React.SetStateAction<"default" | "price" | "rating">
  >;
  setCurrentPage: (page: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative block text-left w-full md:w-auto">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center whitespace-nowrap w-full md:w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pastelLavender"
      >
        {sortOptions.find((opt) => opt.value === sortBy)?.label ?? "Sort by"}
        <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  setSortBy(option.value as "default" | "price" | "rating");
                  setCurrentPage(1);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 whitespace-nowrap ${
                  sortBy === option.value ? "bg-blue-100 font-medium" : ""
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
