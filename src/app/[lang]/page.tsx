import Link from "next/link";

import Coding from "../../../public/Coding.webp";
import { CardDrop } from "@/components/card-drop";
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
            <CardDrop
              image={Coding}
              title={"Projects"}
              description={"45 itens"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
