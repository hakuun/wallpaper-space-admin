"use client";

import { Plus } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, WallpaperColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface WallpaperClientProps {
  data: WallpaperColumn[];
}

export const WallpaperClient: React.FC<WallpaperClientProps> = ({ data }) => {
  const router = useRouter();

  function handleDeleteSelected() {}

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Wallpaper (${data.length})`}
          description="Manage wallpaper"
        />
        <div>
          <Button
            className="mr-4"
            variant="destructive"
            onClick={handleDeleteSelected}
          >
            <RiDeleteBin5Line className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
          <Button onClick={() => router.push(`/wallpaper/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="url" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Wallpaper" />
      <Separator />
      <ApiList entityName="wallpaper" entityIdName="wallpaperId" />
    </>
  );
};
