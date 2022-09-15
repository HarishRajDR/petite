import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const surl = req.nextUrl.pathname.split("/").pop();

  const link = await fetch(`${req.nextUrl.origin}/api/get-url/${surl}`);

  if (link.status === 404) {
    return;
  }

  const data = await link.json();
  console.log("Actual URL from prisma" + data.url);

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matchers: `/:surl`,
};
