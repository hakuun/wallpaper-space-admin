import prisma from "@/lib/prisma";

import { WallpaperForm } from "@/components/form/wallpaper-form";

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

  const categories = await prisma.category.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WallpaperForm categories={categories} initialData={wallpaper} />
      </div>
    </div>
  );
};

export default WallpaperPage;
