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

    const wallpaper = await prisma.wallpaper.create({
      data,
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[WALLPAPER_POST]", error);
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

    const wallpaper = await prisma.wallpaper.findMany({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[WALLPAPER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
