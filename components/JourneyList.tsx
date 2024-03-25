import { categoriesData } from "@/data";
import Link from "next/link";

export default function JourneyList() {
    return (
        <div className="flex text-sm gap-2 flex-warp">
            {categoriesData && categoriesData.map((category) => (
                <Link className="px-4 py-1 rounded-md bg-slate-800 text-white" key={category.id} href = {`/categories/${category.name}`}>{category.name}</Link>
            ))}
        </div>
    )
}