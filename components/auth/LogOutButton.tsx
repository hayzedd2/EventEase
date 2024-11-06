"use client";

import React from "react";
import { generateGradient } from "@/utils/generateGradients";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { logOut } from "@/actions/logOut";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LogOutButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout =  () => {
    logOut();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/login");
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="w-9 h-9 cursor-pointer rounded-full"
            style={{
              background: generateGradient(id),
            }}
          ></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            <span className="mt-1">Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LogOutButton;
