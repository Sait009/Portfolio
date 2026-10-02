'use server';

import { siteConfig } from '@/config/site';

type Field = 'name' | 'email' | 'message';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Record<Field, string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** ส่งเร็วกว่านี้หลังเปิดหน้า = น่าจะเป็น bot */
const MIN_FILL_MS = 3000;
const SUCCESS_MESSAGE = "Thanks! Your message is on its way. I'll get back to you soon.";

const read = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();

/**
 * ส่งข้อความจากฟอร์มติดต่อเข้าอีเมลผ่าน Resend
 * env: RESEND_API_KEY (จำเป็น), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (ไม่บังคับ)
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    message: read(formData, 'message'),
  };

  // กัน bot: ช่อง honeypot ถูกกรอก หรือส่งเร็วผิดปกติ → ตอบว่าสำเร็จแต่ไม่ส่งจริง
  const startedAt = Number(formData.get('startedAt'));
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (read(formData, 'company') || tooFast) {
    return { status: 'success', message: SUCCESS_MESSAGE };
  }

  const errors: ContactState['errors'] = {};
  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = 'Please enter your name (2–100 characters).';
  }
  if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = 'Your message should be 10–5,000 characters.';
  }
  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please check the highlighted fields.', errors, values };
  }

  const fallback = `Sorry, the message couldn't be sent. Please email me at ${siteConfig.email}.`;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return { status: 'error', message: fallback, values };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
        reply_to: values.email,
        subject: `Portfolio contact from ${values.name.replace(/\s+/g, ' ')}`,
        // ส่งเป็น plain text เท่านั้น — ไม่ต้อง escape HTML
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error('[contact] Resend error', response.status, await response.text());
      return { status: 'error', message: fallback, values };
    }
  } catch (error) {
    console.error('[contact] Request failed', error);
    return { status: 'error', message: fallback, values };
  }

  return { status: 'success', message: SUCCESS_MESSAGE };
}
