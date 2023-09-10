"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import AuthForm from "../AuthForm";
import { Routes } from "@/config/routes";

export default function Login() {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setError("");

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push(Routes.DASHBOARD);
    }

    if (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <h2 className="text-center">Log in</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
