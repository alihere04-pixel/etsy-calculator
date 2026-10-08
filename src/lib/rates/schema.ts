export interface CountryRates {
  listing_fee: number | null;
  transaction_fee_percent: number | null;
  payment_processing_percent: number | null;
  payment_processing_fixed: number | null;
  /** Published second tier, e.g. Etsy AU/CA/NZ international orders. */
  payment_processing_note?: string;
  currency: string;
  offsite_ads_percent: number | null;
  regulatory_fee_percent: number | string | null;
  regulatory_fee_note?: string;
  currency_conversion_percent: number | null;
  last_updated: string;
  source_name: string;
}

export type RatesData = Record<string, CountryRates>;

export function validateRates(rates: RatesData): boolean {
  const requiredNumeric: (keyof CountryRates)[] = [
    "listing_fee",
    "transaction_fee_percent",
    "payment_processing_percent",
    "payment_processing_fixed",
  ];
  for (const country of Object.keys(rates)) {
    const r = rates[country];
    if (!r) return false;
    for (const key of requiredNumeric) {
      if (typeof r[key] !== "number" || r[key] === null) return false;
    }
    if (typeof r.currency !== "string" || r.currency.length === 0) return false;
    if (typeof r.last_updated !== "string" || typeof r.source_name !== "string") return false;
  }
  return true;
}

