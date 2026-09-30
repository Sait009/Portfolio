import type { ComponentProps } from 'react';

import styles from './Button.module.css';

type Props = ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({ variant = 'primary', className, children, ...props }: Props) {
  return (
    <a className={[styles.button, styles[variant], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </a>
  );
}
