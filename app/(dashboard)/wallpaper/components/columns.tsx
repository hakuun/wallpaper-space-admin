"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { CellSwitch } from "./cell-switch";
import { Checkbox } from "@/components/ui/checkbox";

export type WallpaperColumn = {
	id: string;
	url: string;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
};

export const columns: ColumnDef<WallpaperColumn>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
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
		cell: ({ row }) => <CellSwitch data={row.original} />,
	},
	{
		accessorKey: "updatedAt",
		header: "Update Date",
	},
	{
		accessorKey: "createdAt",
		header: "Created Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
