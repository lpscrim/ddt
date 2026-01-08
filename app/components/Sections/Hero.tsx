import Image from 'next/image';

export function Hero() {
  return (
    <section id="home" className="min-h-svh flex flex-col items-center justify-center sm:px-4">
      {/* Top image strip */}
      <div className="w-full relative h-120 overflow-hidden">
        <Image 
          src="/tree1.JPG" 
          alt="Tree background" 
          fill 
          className="object-cover object-top"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-7xl sm:text-[236px] font-mono tracking-widest font-bold text-white/60">
          DAYDREAMTEAM
        </h2>
      </div>

    </section>
  );
}
