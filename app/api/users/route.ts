import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db/connection';
import { usersTable } from '../../../db/schema'; 

export async function GET() {
  const allUsers = await db.select().from(usersTable);
  return NextResponse.json(allUsers);
}

export async function POST(req: NextRequest) {
  const { name, age, email } = await req.json();
  await db.insert(usersTable).values({ name, age, email });
  return NextResponse.json({ message: 'Usuario creado' });
}
