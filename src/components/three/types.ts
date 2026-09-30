/** ค่าที่อัปเดตทุกเฟรม (เก็บใน ref เพื่อไม่ให้ React re-render) */
export type MotionState = {
  intensity: number;
  /** ความบิดเบี้ยวเพิ่มเติมตามความเร็วการ scroll */
  distort: number;
};

export type Quality = 'high' | 'low';
