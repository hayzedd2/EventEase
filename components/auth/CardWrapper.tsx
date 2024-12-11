"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  semiButtonLabel: string;
  showSocials?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  headerDescription,
  semiButtonLabel,
  backButtonHref,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-lg shadow-zinc-500/10 ">
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <div className="w-full text-center">
            <h1 className="text-3xl text-indigo-600 font-[500]">EventEase</h1>
          </div>
          <p className="text-subtle text-[14px] font-[500]">
            {headerDescription}
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <button className="w-full flex items-center justify-center">
          <Link
            className=" text-subtle flex gap-1"
            href={backButtonHref}
          >
            {backButtonLabel}
            <span className="text-regular "> {semiButtonLabel}</span>
          </Link>
        </button>
      </CardFooter>
    </Card>
  );
};
