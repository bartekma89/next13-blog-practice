"use client";
import { deleteTicket } from "@/app/_actions";
import { useTransition } from "react";
import { TiDelete } from "react-icons/ti";

interface ComponentProps {
  id: string;
}

export default function DeleteButton({ id }: ComponentProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="btn-primary"
      disabled={isPending}
      onClick={() => startTransition(() => deleteTicket(id))}
    >
      <>
        <TiDelete />
        {isPending ? "Deleting..." : "Delete Ticket"}
      </>
    </button>
  );
}
