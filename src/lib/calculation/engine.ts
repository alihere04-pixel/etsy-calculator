import { getRates } from "../rates/loader";

export interface Input {
  productPrice: number;
  shippingCharged: number;
  cogs: number;
  shippingCostPaid: number;
  quantity: number;
  country: "US" | "UK" | "EU" | "CA" | "AU" | "IN";
  offsiteAds: "off" | "15%" | "12%";
  taxInclusive: boolean;
  giftWrap: number;
}

export interface Result {
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  offsiteAdsFee: number;
  regulatoryFee: number;
  currencyConversionFee: number;
  totalFees: number;
  netRevenue: number;
  netProfit: number;
  profitMargin: number;
  breakEvenPrice: number;
  effectiveFeeRate: number;
  warnings: string[];
}

/**
 * Calculates profit margin as a percentage.
 * Returns 0 if netRevenue is zero or negative.
 */
export function calculateProfitMargin(netProfit: number, netRevenue: number): number {
  if (netRevenue <= 0) return 0;
  return (netProfit / netRevenue) * 100;
}

/**
 * Calculates all Etsy fees, net revenue, net profit, margin,
 * break-even price, and effective fee rate for a given input.
 * Follows SPEC.md Section 6.
 */
export function calculateFees(input: Input): Result {
  const rates = getRates(input.country);
  const P = input.productPrice;
  const S = input.shippingCharged;
  const G = input.giftWrap;
  const Q = input.quantity;

  // Listing fee: flat per unit
  const listingFee = (rates.listing_fee as number) * Q;

  // Transaction fee base: P + S + G (US excludes tax; UK/EU includes VAT —
  // with no separate tax input in MVP, the base is P + S + G either way).
  const transactionBase = P + S + G;
  const transactionFee = ((rates.transaction_fee_percent as number) / 100) * transactionBase * Q;

  // Payment processing fee: percent × orderTotal, fixed once per order.
  const orderTotal = (P + S + G) * Q;
  const paymentProcessingFee =
    ((rates.payment_processing_percent as number) / 100) * orderTotal +
    (rates.payment_processing_fixed as number);

  // Offsite Ads fee: percent × orderTotalExclTax, capped at $100 per ORDER.
  let offsiteAdsFee = 0;
  if (input.offsiteAds !== "off") {
    if (rates.offsite_ads_percent === null || rates.offsite_ads_percent === undefined) {
      throw new Error(`Rates not loaded for ${input.country}. Please fill /lib/rates.json.`);
    }
    const orderTotalExclTax = (P + S + G) * Q;
    const rate = input.offsiteAds === "15%" ? 0.15 : 0.12;
    offsiteAdsFee = Math.min(rate * orderTotalExclTax, 100);
  }

  // Regulatory operating fee: 0 if rate is null, 0, or "UNVERIFIED" (string)
  const warnings: string[] = [];
  let regulatoryFee = 0;
  if (rates.regulatory_fee_percent === "UNVERIFIED") {
    warnings.push(
      "EU regulatory fee varies by country. Calculation uses 0. Verify your country's rate."
    );
  } else if (typeof rates.regulatory_fee_percent === "number" && rates.regulatory_fee_percent !== 0) {
    regulatoryFee = (rates.regulatory_fee_percent / 100) * transactionBase * Q;
  }

  // Currency conversion fee: 0 for MVP (rate null → skip)
  const currencyConversionFee = 0;

  const totalFees =
    listingFee +
    transactionFee +
    paymentProcessingFee +
    offsiteAdsFee +
    regulatoryFee +
    currencyConversionFee;

  const netRevenue = (P + S) * Q - totalFees;
  const netProfit = netRevenue - (input.cogs + input.shippingCostPaid) * Q;
  const profitMargin = calculateProfitMargin(netProfit, netRevenue);
  const breakEvenPrice = calculateBreakEven(input);
  const grossRevenue = (P + S) * Q;
  const effectiveFeeRate = grossRevenue > 0 ? (totalFees / grossRevenue) * 100 : 0;

  return {
    listingFee,
    transactionFee,
    paymentProcessingFee,
    offsiteAdsFee,
    regulatoryFee,
    currencyConversionFee,
    totalFees,
    netRevenue,
    netProfit,
    profitMargin,
    breakEvenPrice,
    effectiveFeeRate,
    warnings,
  };
}

/**
 * Calculates the break-even item price per unit using SPEC.md Section 9:
 * P_breakeven = (L + f/Q + C + r×G) / (1 − r) − S
 * Returns 0 if r >= 1 (invalid rates).
 */
export function calculateBreakEven(input: Input): number {
  const rates = getRates(input.country);
  const S = input.shippingCharged;
  const G = input.giftWrap;
  const Q = input.quantity;
  const C = input.cogs + input.shippingCostPaid;
  const L = rates.listing_fee as number;
  const f = rates.payment_processing_fixed as number;

  const tp = (rates.transaction_fee_percent as number) / 100;
  const pp = (rates.payment_processing_percent as number) / 100;
  const oa =
    input.offsiteAds === "off"
      ? 0
      : input.offsiteAds === "15%"
        ? 0.15
        : 0.12;
  const rg =
    typeof rates.regulatory_fee_percent === "number" && rates.regulatory_fee_percent !== 0
      ? rates.regulatory_fee_percent / 100
      : 0;

  const r = tp + pp + oa + rg;
  if (r >= 1) return 0;

  return (L + f / Q + C + r * G) / (1 - r) - S;
}

