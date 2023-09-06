import { Routes } from "@/config/routes";
import { Ticket } from "@/typings";
import Link from "next/link";

async function getTickets() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:3000/api/tickets", {
    next: {
      // revalidate: 60,
      revalidate: 0, // page is always dynamically rendered
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
