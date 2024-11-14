import bcrypt from "bcrypt";
import { db } from "../../../db/connection";
import { usersTable } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { name, password } = await req.json();

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name));
  const user = result.length > 0 ? result[0] : null;

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ message: "Login exitoso" });
  return response;
}
