import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from("tickets").delete().eq("id", id);

  return NextResponse.json({ error });
}

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   const res = await fetch(`http://localhost:4000/tickets/${params.id}`);

//   const ticket = await res.json();

//   if (!res.ok) {
//     return NextResponse.json(
//       { error: "can not find the ticket" },
//       {
//         status: 404,
//       }
//     );
//   }

//   return NextResponse.json(ticket, {
//     status: 200,
//   });
// }
