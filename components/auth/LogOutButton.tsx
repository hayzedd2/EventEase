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
import { logOut } from "@/lib/actions/logOut";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LogOutButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/events/discover");
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
        <DropdownMenuContent className="w-40 cursor-pointer">
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>
              <LogOutIcon width={15} height={15} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LogOutButton;
