import 'dotenv/config';

type User = {
  id: number;
  name: string;
};

export default async function Home() {
  // Realiza la solicitud `fetch` directamente
  const response = await fetch('http://localhost:3000/api/users', {
    // Esta opción permite revalidar los datos cada vez que se accede a la página
    cache: 'no-store',
  });
  
  const users: Array<User> = await response.json();

  return (
    <main>
      <h1>Hola, soy una app de Next.js</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </ul>
    </main>
  );
}
