// export const dynamicParams = true; // Dynamic segments not included in generateStaticParams are generated on demand.

import { notFound } from "next/navigation";
import { Ticket } from "@/typings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase
    .from("tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Blog | ${ticket?.title || "Ticket not found"}`,
  };
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }: Props) {
  const ticket: Ticket = await getTicket(params.id);

  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        {
          <div className="ml-auto">
            {data.session?.user.email === ticket.user_email && (
              <DeleteButton id={params.id} />
            )}
          </div>
        }
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
