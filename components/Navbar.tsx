import { Routes } from "@/config/routes";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface ComponentProps {
  user?: Session["user"];
}

export default function Navbar({ user }: ComponentProps) {
  return (
    <nav>
      <Link href={Routes.DASHBOARD}>
        <h1>Blog</h1>
      </Link>
      <Link href={Routes.DASHBOARD}>Dashboard</Link>
      <Link href={Routes.TICKETS}>Tickets</Link>
      <Link href={`${Routes.TICKETS}${Routes.CREATE}`}>Create Ticket</Link>

      {user && <LogoutButton />}
      {user && <span>Hello, {user.email}</span>}
    </nav>
  );
}
