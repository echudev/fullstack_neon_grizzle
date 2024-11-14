import LoginForm from "./form";

export default function LoginPage() {
  return (
    <main className="flex flex-col m-10 justify-center items-center">
      <h1 className="my-4 text-3xl">Ingresa con tus datos</h1>
      <LoginForm />
    </main>
  );
}
