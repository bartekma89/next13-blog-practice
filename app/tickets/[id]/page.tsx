export const dynamicParams = true; // Dynamic segments not included in generateStaticParams are generated on demand.

import { notFound } from "next/navigation";
import { Ticket } from "@/typings";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets: Ticket[] = await res.json();

  return tickets.map((ticket) => ({ id: ticket.id }));
}

async function getTicket(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }: Props) {
  const ticket: Ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
