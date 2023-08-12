import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    console.log("session =========", session);

    const data = await request.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const wallpaper = await prisma.wallpaper.create({
      data,
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[WALLPAPER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const page = params.get("page") ? Number(params.get("page")) : 1;
    const pageSize = params.get("pageSize")
      ? Number(params.get("pageSize"))
      : 20;
    const categoryId = params.get("categoryId") || undefined;

    const where = {
      categoryId,
    };

    const [count, records] = await prisma.$transaction([
      prisma.wallpaper.count({ where }),
      prisma.wallpaper.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where,
      }),
    ]);

    const data = {
      records,
      count,
      page,
      pageSize,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.log("[WALLPAPER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();

    const data = await request.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!data) return new NextResponse("data is required", { status: 400 });

    const res = await prisma.wallpaper.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("[WALLPAPER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
