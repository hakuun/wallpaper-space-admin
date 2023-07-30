"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type WallpaperColumn = {
  id: string;
  url: string;
  isPublished: boolean;
  createdAt: string;
};

export const columns: ColumnDef<WallpaperColumn>[] = [
  {
    accessorKey: "url",
    header: "Image",
    cell: ({ row }) => (
      <Image
        width={100}
        height={100}
        src={row.original.url}
        alt={row.original.url}
      />
    ),
  },
  {
    accessorKey: "isPublished",
    header: "IsPublished",
    cell: ({ row }) => (row.original.isPublished ? "Yes" : "No"),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
