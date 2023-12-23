"use client";
import { Github, Instagram, InstagramIcon, Linkedin, Send } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";
import { ButtonIconFooter } from "../button-icon-footer";

export const Footer = () => {
  const { lang } = useParams();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  return (
    <footer className="mx-auto flex max-w-5xl flex-col justify-start gap-4 overflow-hidden py-8 px-5 lg:px-0">
      <div className="rounded-lg border border-zinc-200 text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-primary-950 dark:text-zinc-50">
        <div className="space-y-1.5 p-6 flex flex-col gap-2">
          <span className="uppercase font-bold text-lg">
            {interpolation(dictionary.components.footer.title, {
              name: "Let's build something together?",
            })}
          </span>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <span>
              {interpolation(dictionary.components.footer.description, {
                name: "If you have something in mind, feel free to send me a message.",
              })}
            </span>
          </p>
        </div>

        <div className="p-6 pt-0">
          <Link href="/contact">
            <Button
              variant={"default"}
              className="dark:bg-white hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <span>
                {interpolation(dictionary.components.footer.button, {
                  name: "Contact me",
                })}
              </span>
              <Send
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
              />
            </Button>
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="items-center m-0 flex justify-center p-5">
          <div className="flex justify-between items-center gap-3 md:gap-2">
            <ButtonIconFooter url="https://www.instagram.com/alexandrejuniorc/">
              <Instagram
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
              />
            </ButtonIconFooter>

            <ButtonIconFooter url="https://github.com/alexandrejuniorc">
              <Github
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
              />
            </ButtonIconFooter>

            <ButtonIconFooter url="https://www.linkedin.com/in/alexandrejuniorc/">
              <Linkedin
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
              />
            </ButtonIconFooter>
          </div>
        </div>
      </div>
    </footer>
  );
};
