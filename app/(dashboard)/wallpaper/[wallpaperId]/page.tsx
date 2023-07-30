import prisma from "@/lib/prisma";

import { WallpaperForm } from "@/components/form/wallpaper-form";
import { WallpaperFormInitialData } from "@/types/image";

export const revalidate = 10;

const WallpaperPage = async ({
  params,
}: {
  params: { wallpaperId: string };
}) => {
  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      id: params.wallpaperId,
    },
  });

  if (!wallpaper) return null;

  const initialData: WallpaperFormInitialData = {
    ...wallpaper,
    images: [
      {
        assetId: wallpaper.assetId,
        publicid: wallpaper.publicid,
        height: wallpaper.height,
        width: wallpaper.width,
        secureUrl: wallpaper.secureUrl,
        url: wallpaper.url,
        format: wallpaper.format,
      },
    ],
  };

  const categories = await prisma.category.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WallpaperForm categories={categories} initialData={initialData} />
      </div>
    </div>
  );
};

export default WallpaperPage;
