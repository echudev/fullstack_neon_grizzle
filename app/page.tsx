"use client";

export default function Home() {
  return (
    <main className="flex flex-col m-10">
      <h1>Hola, soy una app de Next.js</h1>
      <p>
        Ingresa a la página de administración para ver los usuarios registrados.
      </p>
      <button
        className="max-w-40 bg-violet-900 border border-violet-700 rounded-md px-2 hover:bg-violet-700 transition-all"
        onClick={() => (window.location.href = "/admin")}
      >
        Admin page
      </button>
    </main>
  );
}
