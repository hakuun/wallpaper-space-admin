import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { wallpaperId: string } }
) {
  try {
    if (!params.wallpaperId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const wallpaper = await prisma.wallpaper.findUnique({
      where: {
        id: params.wallpaperId,
      },
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { wallpaperId: string } }
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.wallpaperId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const wallpaper = await prisma.wallpaper.delete({
      where: {
        id: params.wallpaperId,
      },
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { wallpaperId: string; storeId: string } }
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const data = await request.json();

    if (!params.wallpaperId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const wallpaper = await prisma.wallpaper.update({
      where: {
        id: params.wallpaperId,
      },
      data,
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
