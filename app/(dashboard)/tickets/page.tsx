import type { Metadata } from "next";
import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";
import { Routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Blog Practice | Tickets",
};

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href={`${Routes.TICKETS}${Routes.CREATE}`} className="ml-auto">
          <button className="btn-primary">Create Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
