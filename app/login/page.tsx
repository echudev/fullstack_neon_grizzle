import LoginForm from "./loginForm";

export default function Home() {
  return (
    <main className="flex flex-col m-10 justify-center items-center">
      <h1 className="my-4 text-3xl">Bienvenido!</h1>
      <LoginForm />
    </main>
  );
}
