import Link from "next/link";
import { Routes } from "@/config/routes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect(Routes.DASHBOARD);
  }

  return (
    <>
      <nav>
        <Link href={Routes.DASHBOARD}>
          <h1>Blog</h1>
        </Link>
        <Link href={Routes.SIGNUP}>Sign up</Link>
        <Link href={Routes.LOGIN}>Log in</Link>
      </nav>
      {children}
    </>
  );
}
