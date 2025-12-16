export default function Jumbotron() {
  return (
    <div
      className="w-full h-100 bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: "url('/thumbnail.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Sama<span className="text-blue-400">an</span>
        </h1>

        <h2 className="mt-6 text-base md:text-lg opacity-100 text-white">
          Find events. Book tickets. Show up together
        </h2>
      </div>
    </div>
  );
}