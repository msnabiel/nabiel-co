// src/data/coupon.ts

export type Coupon = {
  code: string
  discount: number // e.g., 0.1 for 10%
}

export const validCoupons: Coupon[] = [
  { code: "NABIEL10", discount: 0.1 },
  { code: "FREESHIP", discount: 0.05 },
  { code: "SUMMER20", discount: 0.2 },
]
