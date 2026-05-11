import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const filePath = path.join(process.cwd(), "data", "contact-messages.json");

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.message) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // ✅ 1. Save to JSON file (as before)
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const current = await fs.readFile(filePath, "utf8").catch(() => "[]");
  const list = JSON.parse(current) as unknown[];
  list.unshift({ ...body, createdAt: new Date().toISOString() });
  await fs.writeFile(filePath, JSON.stringify(list, null, 2));

  // ✅ 2. Send email notification
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `📩 New message from ${body.name || "Someone"} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #0ea5e9; margin-bottom: 4px;">New Portfolio Message</h2>
          <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Received via your portfolio contact form</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p><strong>Name:</strong> ${body.name || "N/A"}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9fafb; border-radius: 8px; padding: 14px; color: #374151; white-space: pre-wrap;">${body.message}</div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">Sent from Shivam Dubey Portfolio — ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      `,
    });
  } catch (err) {
    // Email failed but message is saved — don't crash the response
    console.error("Email send error:", err);
  }

  return NextResponse.json({ ok: true });
}