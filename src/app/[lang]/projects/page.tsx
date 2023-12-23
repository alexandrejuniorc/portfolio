"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CardProject from "@/../public/card-project.avif";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";

type RepoProps = {
  id: number;
  name: string;
  description: string;
  language: string | string[];
  html_url: string;
}[];

export default function Projects() {
  const githubUser = "alexandrejuniorc";
  const { data } = useQuery<RepoProps>({
    queryKey: ["projects"],
    queryFn: () =>
      axios
        .get(
          `https://api.github.com/users/${githubUser}/repos?sort=created_at&order=asc`
        )
        .then((res) => res.data),
  });

  const [filter, setFilter] = React.useState<RepoProps>([]);

  const filterProject = (filter: string) => {
    const filterLower = filter.toLowerCase();

    const payload = data?.map((project) => {
      return {
        id: project.id,
        name: project.name.toLowerCase(),
        description: project.description,
        language: project.language,
        html_url: project.html_url,
      };
    });

    const filteredData = payload!.filter((project) =>
      project.name.includes(filterLower)
    );

    setFilter(filteredData);
  };

  const { lang } = useParams();
  const { dictionary, interpolation } = getDictionaryUseClient(lang as Locale);

  return (
    <>
      <div className="flex flex-col gap-5 w-full px-1">
        <h1 className="flex font-bold items-start text-4xl">{interpolation(dictionary.pages.projects.title, { name: "Projects" })}</h1>

        <p className="text-base text-[#888]">
          {interpolation(dictionary.pages.projects["description-1"], {
            name: "This page lists",
          })}{" "}
          <span className="text-primary dark:text-white">{data?.length}</span>{" "}
          {interpolation(dictionary.pages.projects["description-2"], {
            name: "the most popular projects I've been working on during my career. Check out other projects on my",
          })}{" "}
          <Link
            href="https://github.com/alexandrejuniorc"
            className="underline text-primary dark:text-white"
          >
            Github
          </Link>
        </p>

        <Input
          placeholder={interpolation(
            dictionary.pages.projects["input-search"],
            {
              name: "Search for a project",
            }
          )}
          onChange={(e) => filterProject(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-10 items-center px-5 pt-5">
        {filter?.length > 0 &&
          filter?.map((project) => {
            return (
              <TooltipProvider key={project.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="flex flex-col items-center"
                      href={project.html_url}
                      target="_blank"
                    >
                      <Image
                        className="rounded w-full h-full m-0 hover:scale-105 transform transition-all duration-500 ease-in-out"
                        width={300}
                        height={300}
                        src={CardProject}
                        alt={project.name}
                      />

                      <h2 className="font-bold text-base md:text-lg mt-1">
                        {project.name}
                      </h2>
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="text-center text-sm max-w-[250px]">
                      {project.description || "Sem descrição"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}

        {data &&
          filter.length === 0 &&
          data?.map((project) => {
            return (
              <TooltipProvider key={project.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="flex flex-col items-center"
                      href={project.html_url}
                      target="_blank"
                    >
                      <Image
                        className="rounded w-full h-full m-0 hover:scale-105 transform transition-all duration-500 ease-in-out"
                        width={300}
                        height={300}
                        src={CardProject}
                        alt={project.name}
                      />

                      <h2 className="font-bold text-base md:text-lg mt-1">
                        {project.name}
                      </h2>
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="text-center text-sm max-w-[250px]">
                      {project.description || "Sem descrição"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
      </div>
    </>
  );
}
