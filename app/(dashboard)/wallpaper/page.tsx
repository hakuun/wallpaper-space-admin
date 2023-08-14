import { format } from "date-fns";

import prisma from "@/lib/prisma";

import { WallpaperColumn } from "./components/columns";
import { WallpaperClient } from "./components/client";

const WallpaperPage = async () => {
  const wallpaper = await prisma.wallpaper.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedWallpaper: WallpaperColumn[] = wallpaper.map((item) => ({
    id: item.id,
    url: item.url,
    isPublished: item.isPublished,
    updatedAt: format(item.updatedAt, "yyyy-MM-dd hh:mm:ss"),
    createdAt: format(item.createdAt, "yyyy-MM-dd hh:mm:ss"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WallpaperClient data={formattedWallpaper} />
      </div>
    </div>
  );
};

export default WallpaperPage;
