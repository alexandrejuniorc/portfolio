"use client";
import { useParams, usePathname } from "next/navigation";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { flag, FlagKey, locales } from "@/utils/locales";

export const LanguageToogle = () => {
  const { lang } = useParams();
  const pathname = usePathname();

  const getPathname = (lng: string) => {
    const path = pathname.split("/" + lang).join("");
    return "/" + lng + path;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {flag[lang as FlagKey]}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((lng) => {
          if (lng.code === lang) return null;

          return (
            <DropdownMenuItem key={lng.code}>
              <Link
                href={getPathname(lng.code)}
                className="flex justify-center w-full"
              >
                {lng.ico}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
