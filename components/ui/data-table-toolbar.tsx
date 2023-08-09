"use client";

import { useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	searchKey: string;
	loading: boolean;
	onDeleteSelected: (selection: TData[]) => void;
}

export function DataTableToolbar<TData>({
	table,
	searchKey,
	loading,
	onDeleteSelected,
}: DataTableToolbarProps<TData>) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	function onConfirm() {
		const selection = table
			.getSelectedRowModel()
			.rows.map((row) => row.original);
		table.resetRowSelection();
		onDeleteSelected(selection);
		setOpen(false);
	}

	function onDeleteClick() {
		if(!table.getSelectedRowModel().rows.length) {
			return toast.error("Please select at least one row.");
		}
		setOpen(true)
	}

	return (
		<div className="flex items-center justify-between">
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
				loading={loading}
			/>
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Search"
					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn(searchKey)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div>
				<Button
					className="mr-4"
					variant="destructive"
					onClick={onDeleteClick}
				>
					<RiDeleteBin5Line className="mr-2 h-4 w-4" /> Delete Selected
				</Button>
				<Button onClick={() => router.push(`/wallpaper/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
		</div>
	);
}
