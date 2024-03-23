import Link from "next/link";

export default function Navbar() {
    return (
    <div className="flex justify-between pb-4 border-b mb-4">
        <div>        
            <Link href={"/"}><h1 className="text-dark text-4xl font-bold tracking-tighter">My Journey</h1></Link>
            <p className="text-sm">Explore my Journey now! <br /> You only live once!</p>
        </div>
        <div className="flex items-center">
            <Link className="btn" href={"/introduction"}>My introduction</Link>
        </div>

    </div>
    );
}