import * as z from "zod";
import { Wallpaper } from "@prisma/client";

export const Image = z.object({
  assetId: z.string(),
  publicid: z.string(),
  height: z.number(),
  width: z.number(),
  secureUrl: z.string(),
  url: z.string(),
  format: z.string(),
});

export type ImageType = z.infer<typeof Image>;

export interface WallpaperFormInitialData extends Wallpaper {
  images: ImageType[];
}
