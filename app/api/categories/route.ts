import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    const data = await request.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!data.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!data.description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const category = await prisma.category.create({
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("id is required", { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
