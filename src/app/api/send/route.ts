import { NextResponse } from 'next/server';
import { evolutionRequest } from '@/utils/evolution/evolutionRequest';

export async function POST(req: Request) {
  const { instance, remoteJid, message } = await req.json();

  if (!instance || !remoteJid || !message) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  try {
    const result = await evolutionRequest(
      `message/sendText/${instance}`,
      {
        number: String(remoteJid).split('@')[0],
        text: message,
        delay: 100
      },
      'POST'
    );

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
