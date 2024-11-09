"use client";

import LoginForm from "./loginForm";

export default function Home() {
  return (
    <main className="flex flex-col m-10 justify-center items-center">
      <h1 className="my-4 text-3xl">Bienvenido!</h1>

      <LoginForm />

      <button
        className="my-3 max-w-40 bg-violet-900 border border-violet-700 rounded-md px-2 hover:bg-violet-700 transition-all"
        onClick={() => (window.location.href = "/admin")}
      >
        Admin page
      </button>
    </main>
  );
}
