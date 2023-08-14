"use client";
import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserButton() {
	const { data, status } = useSession();

	if (status === "unauthenticated") {
		redirect("/signin");
	}

	if (!data || !data.user) return null;

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage
							alt={data.user.name || data.user.email || ""}
							src={data.user.image || ""}
						/>
						<AvatarFallback>{data.user.name || data.user.email || "Avatar"}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
            <p>{data.user.name}</p>
            <p className="text-sm font-normal mt-2">{data.user.email}</p>
            </DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
