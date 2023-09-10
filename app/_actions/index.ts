"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(formData: FormData) {
  const body = Object.fromEntries(formData);

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { error } = await supabase
    .from("tickets")
    .insert({ ...body, user_email: session?.user.email });

  if (error) {
    throw new Error("Could not add new ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from("tickets").delete().eq("id", id);

  if (error) {
    throw new Error("Could not delete the ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
