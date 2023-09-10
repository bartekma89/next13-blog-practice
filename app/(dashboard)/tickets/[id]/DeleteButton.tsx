"use client";
import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

interface ComponentProps {
  id: string;
}

export default function DeleteButton({ id }: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    setIsLoading(false);

    if (json.error) {
      console.warn(json.error);
    }

    if (!json.error) {
      router.refresh();
      router.push(Routes.TICKETS);
    }
  };

  return (
    <button className="btn-primary" disabled={isLoading} onClick={handleClick}>
      {isLoading ? (
        <>
          <TiDelete />
          Deleting...
        </>
      ) : (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  );
}
