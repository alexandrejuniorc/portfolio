import Link from "next/link";

import Coding from "@/../public/Coding.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-5xl flex-col justify-start gap-4 overflow py-8 xl:px-0">
        <div className="flex flex-col gap-6 md:max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold md:leading-relaxed">
            Hey,{"I'm"} Alexandre Junior - Software Engineer
          </h1>

          <div className="flex flex-col gap-6 md:max-w-2xl">
            <h2 className="text-lg font-medium text-[#888]">
              Unindo design e código, sigo criando projetos únicos.
            </h2>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-5 p-1">
        <div>
          <h1 className="font-bold uppercase">Últimos Drops</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href={"/projects"}>
            <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 hover:scale-105 transform transition-all duration-500 ease-in-out hover:bg-[#121212] relative">
              <Image
                src={Coding}
                alt={"Coding"}
                className={
                  "object-cover w-full transition rounded-lg aspect-video group-hover:opacity-90 bg-gray-50 hover:filter hover:backdrop-blur-sm opacity-30"
                }
              />

              <div className="absolute bottom-0 m-2 text-lg">Projects</div>

              <div className="absolute top-0 left-0 m-2 text-lg ">
                <Button className="focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border border-zinc-200 hover:bg-primary/90 hover:text-zinc-900 dark:border-zinc-800 dark:bg-white dark:hover:bg-primary dark:hover:text-zinc-50">
                  <Code
                    fill="none"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width={24}
                    height={24}
                    
                  />
                </Button>
              </div>

              <div className="absolute top-0 right-0 m-2 text-lg">45 itens</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
