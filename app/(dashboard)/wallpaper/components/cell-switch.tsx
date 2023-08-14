import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { WallpaperColumn } from "./columns";
import { useRouter } from "next/navigation";

interface CellSwitchProps {
	data: WallpaperColumn;
}

export function CellSwitch({ data }: CellSwitchProps) {
	const [isLoadong, setIsLoading] = useState(false);
	const router = useRouter();

	const onCheckedChange = async (value: boolean) => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/wallpaper/${data.id}`, {
				method: "PATCH",
				body: JSON.stringify({
					isPublished: value,
				}),
			});
			if (!res.ok) {
				const { message } = await res.json();
				return toast.error(message || `something went wrong!`);
			}
			toast.success(`success!`);
			router.refresh();
		} catch (error) {
			toast.error(`something went wrong!`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Switch
			disabled={isLoadong}
			checked={data.isPublished}
			onCheckedChange={onCheckedChange}
		/>
	);
}
