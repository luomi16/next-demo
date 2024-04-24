import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

// Get all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    }catch (error) {
        console.log(error);
        return NextResponse.json("Oops, something went wrong.")
    }
}