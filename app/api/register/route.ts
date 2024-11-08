import bcrypt from "bcrypt";
import { db } from "../../../db/connection";
import { usersTable } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Procede con el registro del nuevo usuario
  const { name, email, password } = await req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({ name, email, passwordHash });
  return NextResponse.json({ message: "Usuario registrado" });
}
