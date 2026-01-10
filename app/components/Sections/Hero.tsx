import Image from 'next/image';

export function Hero() {
  return (
    <section id="home" className="min-h-svh flex flex-col justify-center ">
      {/* Top image strip */}
      <div className="hidden md:block w-full relative h-[27lvw]  overflow-hidden">
        <Image 
          src="/tree1.JPG" 
          alt="Tree background" 
          fill 
          className="object-cover object-top"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] font-mono tracking-widest font-bold text-background">
          DAYDREAMTEAM
        </h2>
      </div>
      <div className="block md:hidden w-full relative h-[27lvw]  overflow-hidden">
        <Image 
          src="/pic1.JPG" 
          alt="Tree background" 
          fill 
          className="object-cover object-top"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] font-mono tracking-widest font-bold text-background">
          DAYDREAMTEAM
        </h2>
      </div>

    </section>
  );
}
