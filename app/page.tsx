import 'dotenv/config';
import { usersTable } from '../db/schema';
import { db } from '../db/connection';
  
// Tipo para una fila de `usersTable`
type User = typeof usersTable.$inferSelect;

export default async function Home() {
  const users: Array<User> = await db.select().from(usersTable);

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
          <p>Loading...</p>
        )}
      </ul>
    </main>
  );
}