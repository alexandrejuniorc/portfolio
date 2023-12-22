"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";

export function ModeToggle() {
  const { lang } = useParams();
  const { setTheme } = useTheme();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">
            {interpolation(dictionary.components["mode-toggle"].title, {
              name: "Change theme",
            })}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {interpolation(dictionary.components["mode-toggle"].light, {
            name: "Light",
          })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {interpolation(dictionary.components["mode-toggle"].dark, {
            name: "Dark",
          })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {interpolation(dictionary.components["mode-toggle"].system, {
            name: "System",
          })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
