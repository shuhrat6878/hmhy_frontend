export const HMHYText = () => {
  return (
    <h1
      className="relative inline-flex items-center gap-1
                 text-5xl md:text-6xl font-extrabold italic tracking-wide
                 text-white"
    >
      {/* ASOSIY MATN */}
      <span className="text-white">HM</span>
      <span className="text-emerald-400">H</span>
      <span className="text-cyan-400">Y</span>

      {/* TEAL SHINE (o‘ngdan chapga) */}
      <span
        className="absolute inset-0 flex items-center gap-1
                   bg-gradient-to-l from-transparent via-[#14b8a6] to-transparent
                   bg-[length:200%_100%] bg-clip-text text-transparent
                   pointer-events-none"
        style={{ animation: "shine-rtl 2s ease-in-out infinite" }}
        aria-hidden="true"
      >
        <span>HM</span>
        <span>H</span>
        <span>Y</span>
      </span>
    </h1>
  );
};
