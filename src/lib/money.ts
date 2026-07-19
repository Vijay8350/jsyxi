// Money = integer minor units (paise). No float money (INV-9). Rates = 4 dp fractions.

const CURRENCY_SYMBOL: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

/** Format minor units for display with 2 decimals (A1-09). */
export function formatMoney(minor: number, currency = "INR"): string {
  const sym = CURRENCY_SYMBOL[currency] ?? `${currency} `;
  const major = minor / 100;
  return `${sym}${major.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * F-GST (A1-07): prices are GST-INCLUSIVE.
 * gst_amount = round(total × rate / (1 + rate)) in paise; taxable = total − gst.
 * `rate` is a 4-dp fraction (e.g. 0.18 for 18%).
 */
export function gstBreakdownInclusive(totalMinor: number, rate: number): {
  total: number;
  gstAmount: number;
  taxable: number;
} {
  const gstAmount = Math.round((totalMinor * rate) / (1 + rate));
  return { total: totalMinor, gstAmount, taxable: totalMinor - gstAmount };
}

/** F-ANNUAL (A1-09): annual_price = monthly×12 − annual_discount (all minor units). */
export function annualPrice(monthlyMinor: number, annualDiscountMinor = 0): number {
  return monthlyMinor * 12 - annualDiscountMinor;
}

/** Parse an S-GST-RATE string ("0.1800") to a 4-dp number. */
export function parseRate(value: string | number): number {
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? Math.round(n * 10000) / 10000 : 0;
}
