import { Routes } from "@/config/routes";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>Blog</h1>
      <Link href={Routes.DASHBOARD}>Dashboard</Link>
      <Link href={Routes.TICKETS}>Tickets</Link>
      <Link href={`${Routes.TICKETS}${Routes.CREATE}`}>Create Ticket</Link>
    </nav>
  );
}
