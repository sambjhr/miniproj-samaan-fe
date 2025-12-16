import Link from "next/link";

export interface Category {
  id: number | string;
  name: string;
  image?: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.id}`} className="group block">
      <div className="flex h-full flex-col items-center gap-4 rounded-xl p-4 transition hover:shadow-2xl">
        {/* Circle Image */}
        <div className="h-40 w-40 overflow-hidden rounded-full bg-slate-300">
          <img
            src={category.image || "/thumbnail.jpeg"}
            alt={category.name}
            className="block h-full w-full rounded-full object-cover"
          />
        </div>

        {/* Label */}
        <p className="text-lg font-medium text-slate-900">
          {category.name}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;