// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { db } from '../../../db/connection';
// import { usersTable } from '../../../db/schema';
// import { NextRequest, NextResponse } from 'next/server';
// import { eq } from 'drizzle-orm';

// const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
//   const user = result.length > 0 ? result[0] : null;

//   if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
//     return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
//   }

//   // Incluye el rol en el token JWT
//   const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

//   const response = NextResponse.json({ message: 'Login exitoso' });
//   response.cookies.set('auth_token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 3600,
//     path: '/',
//   });

//   return response;
// }
