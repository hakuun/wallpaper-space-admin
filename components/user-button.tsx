"use client";
import Image from "next/image";
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
          <Image
            src={data.user.image || ""}
            alt={data.user.name || data.user.email || ""}
            width={50}
            height={50}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{data.user.name}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
