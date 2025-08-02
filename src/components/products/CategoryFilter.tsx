"use client";

interface Props {
  selected: string;
  onSelect: (category: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  selected,
  onSelect,
  categories,
}: Props) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex gap-3 snap-x snap-mandatory overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSelect("all")}
          className={`px-4 py-2 rounded-full cursor-pointer border whitespace-nowrap text-sm transition shrink-0 snap-start ${
            selected === "all"
              ? "bg-primary hover:bg-primarySecondary text-white font-semibold"
              : "bg-white text-black border-pastelLavender"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap text-sm capitalize transition shrink-0 snap-start ${
              selected === cat
                ? "bg-primary text-white font-semibold hover:bg-primarySecondary"
                : "bg-white text-black border-pastelLavender"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
