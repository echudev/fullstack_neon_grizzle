// src/app/api/register/route.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../../db/connection';
import { usersTable } from '../../../db/schema';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export async function POST(req: NextRequest) {
  // Verifica el token en la cookie
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Decodifica el token para verificar el rol
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET) as { role: string };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  // Verifica que el usuario sea admin
  if (decodedToken.role !== 'admin') {
    return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
  }

  // Procede con el registro del nuevo usuario
  const { name, email, password } = await req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({ name, email, passwordHash });
  return NextResponse.json({ message: 'Usuario registrado' });
}
