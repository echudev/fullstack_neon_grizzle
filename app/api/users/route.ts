import {  NextResponse } from 'next/server';
import { db } from '../../../db/connection';
import { usersTable } from '../../../db/schema'; 

export async function GET() {
  const allUsers = await db.select().from(usersTable);
  return NextResponse.json(allUsers);
}