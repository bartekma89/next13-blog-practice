import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <h1>Blog</h1>
        <Link href={"/signup"}>Sign up</Link>
        <Link href={"/login"}>Log in</Link>
      </nav>
      {children}
    </>
  );
}
