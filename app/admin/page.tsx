"use client";

import { useEffect, useState } from "react";
import { UserSelect } from "../../db/schema";
import RegisterForm from "./form";

export default function AdminPage() {
  const [users, setUsers] = useState<UserSelect[]>([]);

  useEffect(() => {
    // Cargar los usuarios desde la API
    const fetchUsers = async () => {
      const response = await fetch("/api/users"); // Ruta para obtener todos los usuarios
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <main className="dark">
      <h1>Admin - Gestión de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li
            className="w-fit border border-teal-500 shadow-sm shadow-teal-400 rounded-md my-2 p-3"
            key={user.id}
          >
            <p>name: {user.name} </p>
            <p>email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>
              createdAt: {new Date(user.createdAt).toISOString().split("T")[0]}
            </p>
            <p>Password: {user.passwordHash}</p>
          </li>
        ))}
      </ul>
      <RegisterForm />
      <button
        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-all"
        onClick={() => (window.location.href = "/")}
      >
        Volver
      </button>
    </main>
  );
}
