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

export async function GET(request: NextRequest) {
  try {
    const wallpaper = await prisma.wallpaper.findMany({
      where: {},
    });

    return NextResponse.json(wallpaper);
  } catch (error) {
    console.log("[WALLPAPER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
