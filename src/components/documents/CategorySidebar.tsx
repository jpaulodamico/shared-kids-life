
interface Category {
  name: string;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySidebar = ({
  categories,
  activeCategory,
  onCategoryChange
}: CategorySidebarProps) => {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.name}
          className={`w-full flex justify-between items-center px-4 py-2 text-left hover:bg-muted ${
            activeCategory === category.name ? "bg-muted" : ""
          }`}
          onClick={() => onCategoryChange(category.name)}
        >
          <span>{category.name}</span>
          <span className="text-sm bg-muted rounded-full px-2 py-0.5">
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};
