import type { Metadata } from "next";
import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";

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
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
