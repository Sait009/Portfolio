'use client';

import { Send } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';

import { sendContactMessage, type ContactState } from '@/app/actions/contact';
import styles from './ContactForm.module.css';

const initialState: ContactState = { status: 'idle' };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const startedAt = useRef<HTMLInputElement>(null);

  // เวลาที่เริ่มกรอก (ใช้กัน bot ที่ส่งฟอร์มทันที) — ตั้งใหม่หลังส่งแต่ละครั้ง
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, [state]);

  const fieldProps = (name: 'name' | 'email' | 'message') => {
    const error = state.errors?.[name];
    return {
      id: `contact-${name}`,
      name,
      defaultValue: state.status === 'error' ? state.values?.[name] : undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `contact-${name}-error` : undefined,
    };
  };

  const fieldError = (name: 'name' | 'email' | 'message') =>
    state.errors?.[name] && (
      <p id={`contact-${name}-error`} className={styles.error}>
        {state.errors[name]}
      </p>
    );

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input {...fieldProps('name')} type="text" autoComplete="name" required maxLength={100} />
          {fieldError('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
          {fieldError('email')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea {...fieldProps('message')} rows={5} required maxLength={5000} />
        {fieldError('message')}
      </div>

      {/* กัน bot: คนมองไม่เห็นช่องนี้ */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
          <Send size={16} aria-hidden />
        </button>
        <p className={styles.status} data-status={state.status} role="status" aria-live="polite">
          {state.message}
        </p>
      </div>
    </form>
  );
}
