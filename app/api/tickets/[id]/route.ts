import { NextResponse } from "next/server";

export const dynamic = "fore-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:4000/tickets/${params.id}`);

  const ticket = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "can not find the ticket" },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(ticket, {
    status: 200,
  });
}
