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

      <div className="flex flex-col gap-6 md:max-w-3xl"></div>
    </>
  );
}
