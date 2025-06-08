"use client";

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Blob 1 */}
      <div className="blob absolute w-[400px] h-[400px] bg-cyan-700 opacity-30 top-[-100px] left-[-100px] rounded-full blur-3xl animate-blob" />
      {/* Blob 2 */}
      <div className="blob absolute w-[300px] h-[300px] bg-purple-300 opacity-20 bottom-[-50px] right-[-10px] rounded-full blur-2xl animate-blob animation-delay-2000" />
      {/* Blob 3 */}
      <div className="blob absolute w-[300px] h-[500px] bg-green-500 opacity-20 top-[-120px] right-[-50px] rounded-full blur-2xl animate-blob animation-delay-4000" />
    </div>
  );
}
