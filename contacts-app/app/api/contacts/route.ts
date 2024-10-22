import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { name, phone, email, address, notes } = await req.json();
  try {
    const newContact = await prisma.contact.create({
      data: { name, phone, email, address, notes },
    });
    return NextResponse.json({ contact: newContact });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, name, phone, email, address, notes } = await req.json();
  try {
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { name, phone, email, address, notes },
    });
    return NextResponse.json({ contact: updatedContact });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
