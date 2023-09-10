import { Routes } from "@/config/routes";
import { Ticket } from "@/typings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from 'next/headers'

async function getTickets(): Promise<Ticket[]> {
  const supabase = createServerComponentClient<Ticket[]>({ cookies });

  const { data, error } = await supabase.from('tickets').select();

  if (error) {
    console.warn(error)
  }

  return data as unknown as Ticket[];
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
