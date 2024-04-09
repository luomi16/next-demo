import Link from "next/link";

export type TCategory = {
    id: string;
    catName: string;
}

const getCategories = async(): Promise<TCategory[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/`);
        if(res.ok) {
            const categories = await res.json();
            return categories;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export default async function CategoriesList() {
    const categories = await getCategories();
  return (
    <div className="flex text-sm gap-2 flex-warp">
      {categories &&
        categories.map((category) => (
          <Link
            className="px-4 py-1 rounded-md bg-slate-800 text-white"
            key={category.id}
            href={`/categories/${category.catName}`}
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
