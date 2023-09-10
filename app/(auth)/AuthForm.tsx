"use client";
import { FormEvent, useState } from "react";

interface ComponentProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
}

export default function AuthForm({ handleSubmit }: ComponentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <label htmlFor="email">
        <span>Email:</span>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
        />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
      </label>
      <button className="btn-primary">Submit</button>
    </form>
  );
}
