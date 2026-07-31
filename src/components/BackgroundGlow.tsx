import Image from "next/image";

export function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[#020303]">
      <Image
        src="/design/bg-texture.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom opacity-40"
      />
    </div>
  );
}
