"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Code } from "lucide-react";
import { ModeToggle } from "../mode-toogle";
import { Lang } from "../nav-test/Lang";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";
import { useParams } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
];

export function Header() {
  const { lang } = useParams();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  return (
    // <header className="mx-auto flex max-w-5xl items-center justify-between gap-20 px-5 py-4 xl:px-0 flex-row-reverse lg:flex-row">
    <header className="mx-auto items-center px-5 gap-20 py-4 xl:px-0 md:flex md:flex-row md:justify-between max-w-5xl">
      <Link href="/" className="hidden md:flex items-center gap-2">
        <Code />
        <h2>alexandrejuniorc</h2>
      </Link>

      <div className="flex justify-between space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {interpolation(
                  dictionary.components.header.navbar.about.title,
                  {
                    name: "About",
                  }
                )}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="flex flex-col w-[300px] gap-3 p-4">
                  <ListItem
                    href="/about"
                    title={interpolation(
                      dictionary.components.header.navbar.about["about-me"]
                        .title,
                      { name: "About" }
                    )}
                  >
                    {interpolation(
                      dictionary.components.header.navbar.about["about-me"]
                        .description,
                      { name: "Get to know more about me and what I do." }
                    )}
                  </ListItem>

                  <ListItem
                    href="/projects"
                    title={interpolation(
                      dictionary.components.header.navbar.about.projects.title,
                      { name: "Projects" }
                    )}
                  >
                    {interpolation(
                      dictionary.components.header.navbar.about.projects
                        .description,
                      {
                        name: "All the projects I've been working on during my career.",
                      }
                    )}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {interpolation(
                    dictionary.components.header.navbar.contact.title,
                    { name: "Contact" }
                  )}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Lang />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
