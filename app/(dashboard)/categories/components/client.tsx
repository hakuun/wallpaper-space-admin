"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CategoryColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleDeleteSelected(selection: CategoryColumn[]) {
    const ids = selection.map((row) => row.id);
    try {
      setLoading(true);
      await fetch(`/api/categories`, {
        method: "DELETE",
        body: JSON.stringify(ids),
      });
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
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
      </div>
      <Separator />
      <DataTable loading={loading} onDeleteSelected={handleDeleteSelected} searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
