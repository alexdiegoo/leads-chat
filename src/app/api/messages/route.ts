import { NextResponse } from "next/server";
import { evolutionRequest } from "@/utils/evolution/evolutionRequest";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const instance = searchParams.get("instance");
  const remoteJid = searchParams.get("remoteJid");

  if (!instance || !remoteJid) {
    return NextResponse.json({ error: "Missing instance or remoteJid" }, { status: 400 });
  }

  try {
    const response = await evolutionRequest(
      `chat/findMessages/${instance}`,
      {
        where: {
          key: {
            remoteJid,
          },
        },
      },
      "POST"
    );

    return NextResponse.json(response.messages?.records || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
