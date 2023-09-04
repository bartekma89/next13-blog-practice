"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Ticket } from "@/typings";

type PriorityType = "low" | "medium" | "high";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<PriorityType>("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const ticket = {
      title: formData.get("title"),
      body: formData.get("body"),
      priority: formData.get("priority"),
      user_email: "bartol@bartol.com",
    } as Ticket;

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <label>
        <span>Title:</span>
        <input
          name="title"
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          name="body"
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as PriorityType)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
      </button>
    </form>
  );
}
