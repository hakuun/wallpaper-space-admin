import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prismadb from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const data = await request.json();

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!data.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!data.description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
