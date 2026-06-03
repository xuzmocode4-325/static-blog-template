const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RECEIVER_EMAIL = Deno.env.get('CONTACT_RECEIVER_EMAIL') ?? 'delivered@resend.dev';
const SENDER_EMAIL = Deno.env.get('CONTACT_SENDER_EMAIL') ?? 'onboarding@resend.dev';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const handler = async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing RESEND_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload = await request.json().catch(() => null);

  const name = payload?.name?.trim();
  const email = payload?.email?.trim();
  const phone = payload?.phone?.trim();
  const message = payload?.message?.trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const html = `
    <h1>New contact form submission</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone ?? 'N/A')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: RECEIVER_EMAIL,
      subject: `Contact form submission from ${name}`,
      html,
      reply_to: email,
    }),
  });

  const data = await res.json().catch(() => null);

  return new Response(JSON.stringify({ success: true, resend: data }), {
    status: res.ok ? 200 : 502,
    headers: { 'Content-Type': 'application/json' },
  });
};

Deno.serve(handler);
