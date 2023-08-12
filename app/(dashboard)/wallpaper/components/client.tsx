"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { columns, WallpaperColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface WallpaperClientProps {
  data: WallpaperColumn[];
}

export const WallpaperClient: React.FC<WallpaperClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDeleteSelected(selection: WallpaperColumn[]) {
    const ids = selection.map((row) => row.id);
    try {
      setLoading(true);
      const res = await fetch(`/api/wallpaper`, {
        method: "DELETE",
        body: JSON.stringify(ids),
      });
      if (!res.ok) {
        const { message } = await res.json();
        return toast.error(message || "something went wrong!");
      }
      toast.success("Wallpaper deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this wallpaper first."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Wallpaper (${data.length})`}
          description="Manage wallpaper"
        />
      </div>
      <Separator />
      <DataTable
        page="wallpaper"
        loading={loading}
        onDeleteSelected={handleDeleteSelected}
        searchKey="url"
        columns={columns}
        data={data}
      />
      <Heading title="API" description="API Calls for Wallpaper" />
      <Separator />
      <ApiList entityName="wallpaper" entityIdName="wallpaperId" />
    </>
  );
};
