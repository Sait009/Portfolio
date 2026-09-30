'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  email: string;
  className?: string;
};

/** คัดลอกอีเมล — ถ้า Clipboard API ใช้ไม่ได้ จะเปิด mail client แทน */
export default function CopyEmailButton({ email, className }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
    </button>
  );
}
