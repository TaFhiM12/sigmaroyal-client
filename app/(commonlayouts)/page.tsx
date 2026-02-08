import Image from "next/image";

export default function Home() {
  return (
    <section className="relative w-full h-screen">
      {/* Banner Image */}
      <Image
        src="https://vaecontrols.cz/wp-content/uploads/2022/03/Obrazek1.jpg"
        alt="banner"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-5 md:left-30 -translate-y-1/2">
        <h1 className="bg-red-600 text-white text-2xl md:text-5xl font-bold px-6 py-4 mb-4">
          WORLDWIDE PARTNER <br /> FOR OIL & GAS
        </h1>

        <h2 className="bg-red-600 text-white text-2xl md:text-5xl font-bold px-6 py-4">
          AND WATER SOLUTIONS
        </h2>
      </div>
    </section>
  );
}
