
import { useState } from "react";
import { categories } from "../data/mockData";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
}

export default function CategorySelector({ 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) {
  return (
    <div className="overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-4 py-2 text-sm rounded-full transition-all",
            selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary hover:bg-secondary/80 text-foreground"
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-all",
              selectedCategory === category.slug
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
