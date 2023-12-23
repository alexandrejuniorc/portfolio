"use client";
import { Locale } from "@/config/i18n.config";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function About() {
  const { lang } = useParams();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  return (
    <>
      <h1 className="flex font-bold items-start text-4xl">
        {interpolation(dictionary.pages.about.title, {
          name: "About Me",
        })}
      </h1>

      <div className="flex flex-col md:flex-row align-center justify-between w-full gap-5">
        <Image
          className="rounded-md"
          src={"https://github.com/alexandrejuniorc.png"}
          width={400}
          height={400}
          alt="Alexandre Junior"
        />

        <div className="flex flex-col gap-5 max-w-lg text-[#A1A1AA] text-base leading-relaxed">
          <p>
            {interpolation(dictionary.pages.about.description[0][0], {
              name: "My name is Alexandre, known as",
            })}{" "}
            <i className="text-primary dark:text-white">
              {interpolation(dictionary.pages.about.description[0].surname, {
                name: "Juninho",
              })}
            </i>{" "}
            {interpolation(dictionary.pages.about.description[0][1], {
              name: "and I have",
            })}{" "}
            <span className="text-primary dark:text-white">
              {" "}
              {interpolation(dictionary.pages.about.description[0].age, {
                name: "22",
              })}
            </span>{" "}
            {interpolation(dictionary.pages.about.description[0][2], {
              name: "years old.",
            })}
          </p>

          <p>
            {interpolation(dictionary.pages.about.description[1][0], {
              name: "I am a Front-end developer with an average",
            })}{" "}
            <span className="italic font-bold">
              {interpolation(dictionary.pages.about.description[1].experience, {
                name: "2",
              })}
            </span>{" "}
            {interpolation(dictionary.pages.about.description[1][1], {
              name: "years of experience with these technologies:",
            })}{" "}
            <span className="italic">
              {interpolation(dictionary.pages.about.description[1][2], {
                name: "HTML, CSS, JavaScript, TypeScript, Tailwind CSS, ReactJS, Next.js, Tailwind CSS, Git and GitHub and more.",
              })}
            </span>
          </p>

          <p>
            {interpolation(dictionary.pages.about.description[2][0], {
              name: "Throughout my career as a technical instructor and front-end programmer, I have acquired experience in agile methodologies such as Scrum and Kanban. I am available to contribute my expertise in JS, TS, React, Next.js and Node.js to your team.",
            })}
          </p>
        </div>
      </div>

      <div>
        {/* <h2 className="text-2xl font-bold text-white">Carreira</h2>
        <div className="flex flex-col gap-3 max-w-md text-[#A1A1AA] text-base">
          <h3 className="font-bold text-white mt-5"></h3>
          <p className="margin:0"></p>
          <p className="margin:0"></p>
        </div>
        <div className="flex flex-col gap-3 max-w-md text-[#A1A1AA] text-base">
          <h3 className="font-bold text-white mt-5"></h3>
          <p className="margin:0"></p>
          <p className="margin:0"></p>
        </div>
        <div className="flex flex-col gap-3 max-w-md text-[#A1A1AA] text-base">
          <h3 className="font-bold text-white mt-5"></h3>
          <p className="margin:0"></p>
          <p className="margin:0"></p>
        </div> */}
      </div>
    </>
  );
}
