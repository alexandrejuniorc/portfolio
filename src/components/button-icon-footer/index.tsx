import Link from "next/link";
import { Button } from "../ui/button";

export const ButtonIconFooter = ({
  children,
  url,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border border-zinc-200 hover:bg-primary/90 hover:text-zinc-900 dark:border-zinc-800 dark:bg-white dark:hover:bg-primary dark:hover:text-zinc-50 h-10 w-10">
      <Link href={url}>{children}</Link>
    </Button>
  );
};
