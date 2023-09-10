import Navbar from "@/components/Navbar";
import { Routes } from "@/config/routes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect(Routes.LOGIN);
  }

  return (
    <>
      <Navbar user={data?.session?.user} />
      {children}
    </>
  );
}
