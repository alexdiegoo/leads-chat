const BASE_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;

export async function evolutionRequest(
  action: string,
  data?: Record<string, any>,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  let url = `${BASE_URL}/${action}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': API_KEY || '',
    },
  };

  if (method === 'GET' && data) {
    const params = new URLSearchParams(data as Record<string, string>).toString();
    url += `?${params}`;
  } else if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Evolution API error: ${text}`);
  }

  return res.json();
}
