"use client";
import Link from "next/link";

import Coding from "../../../public/Coding.webp";
import { CardDrop } from "@/components/card-drop";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionary-server-only";
import { Locale } from "@/config/i18n.config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RepoProps } from "./projects/page";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

export default function Home({ params }: { params: { lang: Locale } }) {
  const { dictionary, interpolation } = getDictionaryUseClient(params.lang);

  const { data } = useQuery<RepoProps>({
    queryKey: ["projects"],
    queryFn: () =>
      axios
        .get(
          `https://api.github.com/users/alexandrejuniorc/repos?sort=created_at&order=asc`
        )
        .then((res) => res.data),
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-6 md:max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold md:leading-relaxed">
            {interpolation(dictionary.pages.home.title, {
              name: "Hey, I'm Alexandre Junior - Software Engineer",
            })}
          </h1>

          <div className="flex flex-col gap-6 md:max-w-2xl">
            <h2 className="text-lg font-medium text-[#888]">
              {interpolation(dictionary.pages.home.description, {
                name: "Combining design and code, I'm creating unique projects.",
              })}
            </h2>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-5 p-1">
        <div>
          <h1 className="font-bold uppercase">
            {interpolation(
              dictionary.pages.home["section-recent-drops"].title,
              {
                name: "Recent Drops",
              }
            )}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href={"/projects"}>
            <CardDrop
              image={Coding}
              title={interpolation(
                dictionary.components["card-recent-drops"].projects,
                {
                  name: "Projects",
                }
              )}
              description={
                data
                  ? `${data.length.toString()} ${interpolation(
                      dictionary.components["card-recent-drops"].items,
                      {
                        name: "Items",
                      }
                    )}`
                  : `0 ${interpolation(
                      dictionary.components["card-recent-drops"].items,
                      {
                        name: "Items",
                      }
                    )}`
              }
            />
          </Link>
        </div>
      </div>
    </>
  );
}
