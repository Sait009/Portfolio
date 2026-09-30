'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/** ถ้า WebGL ใช้ไม่ได้ ให้ซ่อน 3D ไปเงียบๆ — พื้นหลัง CSS ยังแสดงอยู่ */
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[3D scene] disabled:', error);
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
