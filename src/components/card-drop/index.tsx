import { Code } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";

type CardDropProps = {
  image: string | StaticImageData;
  title: string;
  description: string;
};

export const CardDrop = ({ image, title, description }: CardDropProps) => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950  shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 hover:scale-105 transform transition-all duration-500 ease-in-out hover:bg-[#121212] hover:text-zinc-50 relative">
      <Image
        src={image}
        alt={"Coding"}
        className={
          "object-cover w-full transition rounded-lg aspect-video group-hover:opacity-90 bg-gray-50 hover:filter hover:backdrop-blur-sm opacity-30"
        }
      />

      <div className="absolute bottom-0 m-2 text-lg">{title}</div>

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

      <div className="absolute top-0 right-0 m-2 text-lg">{description}</div>
    </div>
  );
};
