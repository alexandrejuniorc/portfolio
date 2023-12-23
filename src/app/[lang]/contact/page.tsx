"use client";
import React from "react";
import memoji from "@/../public/memoji.png";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/config/i18n.config";
import { useParams } from "next/navigation";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

export default function Contact() {
  const { lang } = useParams();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  const encodedPhoneNumber = encodeURIComponent("553597814017");
  const whatsAppUrl = `https://wa.me/${encodedPhoneNumber}`;

  return (
    <div className="flex flex-col justify-center md:flex-row md:items-center h-full">
      <section className="rounded-lg border border-zinc-200 text-zinc-950 shadow-sm dark:border-zinc-800 dark:text-zinc-50 md:max-w-lg bg-inherit items-center justify-center flex flex-col">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl leading-none tracking-tight font-bold flex justify-start">
            {interpolation(dictionary.pages.contact.title, {
              name: "Hello, I'm Alexandre Junior!",
            })}
          </h3>
        </div>

        <div className="p-6 pt-0 flex flex-col gap-2">
          <Image
            src={memoji}
            width={200}
            height={200}
            alt="memoji"
            className="rounded-full"
          />
        </div>

        <div className="flex items-center p-6 pt-0">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            {interpolation(dictionary.pages.contact.description, {
              name: "Building high performance and digital experiences that help increase your online presence and improve user experience.",
            })}
          </p>
        </div>
      </section>

      <section className="flex flex-col cursor-pointer flex-1 md:pr-5 h-full justify-center">
        <Link href={whatsAppUrl} target="_blank">
          <div className="text-black font-bold flex justify-between bg-[#4BD64E] rounded-full p-5 items-center lg:w-full hover:scale-105 transform transition-all duration-500 ease-in-out h-full">
            <span>
              {interpolation(dictionary.pages.contact.cards.whatsApp, {
                name: "WhatsApp",
              })}
            </span>
          </div>
        </Link>

        <Link href="mailto:alejunior.dev@gmail.com" target="_blank">
          <div className="text-black font-bold flex justify-between bg-[#D9FC00] rounded-full p-5 items-center lg:w-full hover:scale-105 transform transition-all duration-500 ease-in-out h-full">
            <span>
              {interpolation(dictionary.pages.contact.cards.email, {
                name: "E-mail",
              })}
            </span>
          </div>
        </Link>

        <Link href="https://twitter.com/alejuniorc" target="_blank">
          <div className="text-black font-bold flex justify-between bg-[#06A5F2] rounded-full p-5 items-center lg:w-full hover:scale-105 transform transition-all duration-500 ease-in-out h-full">
            <span>
              {interpolation(dictionary.pages.contact.cards.twitter, {
                name: "Twitter",
              })}
            </span>
          </div>
        </Link>

        <Link href="https://www.facebook.com/Juniorts7/" target="_blank">
          <div className="text-black font-bold flex justify-between bg-[#1442A1] rounded-full p-5 items-center lg:w-full hover:scale-105 transform transition-all duration-500 ease-in-out h-full">
            <span>
              {interpolation(dictionary.pages.contact.cards.facebook, {
                name: "Facebook",
              })}
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
