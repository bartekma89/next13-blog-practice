import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// export async function GET() {
//   const res = await fetch("http://localhost:4000/tickets");
//   const tickets = await res.json();

//   return NextResponse.json(tickets, {
//     status: 200,
//   });
// }

export async function POST(req: NextRequest) {
  const ticket = await req.json();

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      ...ticket,
      user_email: session?.user.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
