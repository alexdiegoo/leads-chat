import { NextResponse } from 'next/server';
import { evolutionRequest } from '@/utils/evolution/evolutionRequest';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const instance = searchParams.get('instance');

  if (!instance) {
    return NextResponse.json({ error: 'Instance ID is required' }, { status: 400 });
  }

  try {
    const response = await evolutionRequest(`chat/findContacts/${instance}`, {}, 'POST');

    const filtered = Array.isArray(response)
      ? response.filter((contact) => contact.type !== 'group')
      : [];

    return NextResponse.json(filtered);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
