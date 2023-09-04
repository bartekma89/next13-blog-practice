import { Routes } from "@/config/routes";
import { Ticket } from "@/typings";
import Link from "next/link";

async function getTickets() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}

export default async function TicketList() {
  const tickets: Ticket[] = await getTickets();

  if (tickets.length === 0) {
    return <p className="text-center">There are no open tickets!</p>;
  }

  return (
    <>
      {tickets.map((ticket) => {
        return (
          <div key={ticket.id} className="card my-5">
            <Link href={`${Routes.TICKETS}/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
