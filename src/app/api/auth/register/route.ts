import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: { id: user.id } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error parsing request", error: error.message }, { status: 500 });
  }
}
