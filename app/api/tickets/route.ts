import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();

  return NextResponse.json(tickets, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const ticket = await req.json();

  const res = await fetch("http://localhost:4000/tickets", {
    method: "POST",
    body: JSON.stringify(ticket),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newTicket = await res.json();

  return NextResponse.json(newTicket, {
    status: 201,
  });
}
