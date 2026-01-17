// Astro API route (runs server-side)
export const prerender = false;
import type { APIRoute } from "astro";
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }
  // Do something with the data, then return a success response
  const telegramMessage = `
 🚀 New Contact Form Submission:
 👤 Name: ${name}
 📧 Email: ${email}
 📝 Message: ${message}
   `;

  const botToken = import.meta.env.SECRET_BOT_TOKEN;
  const chatId = import.meta.env.SECRET_CHAT_ID;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const res = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage,
    }),
  });

  if (res.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
