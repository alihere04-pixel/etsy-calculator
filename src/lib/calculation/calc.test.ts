import { describe, it, expect, vi } from "vitest";
import {
  calculateFees,
  calculateBreakEven,
  calculateProfitMargin,
  type Input,
} from "./engine";

vi.mock("../../data/rates/etsy.json", () => ({
  default: {
    US: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 3.0,
      payment_processing_fixed: 0.25,
      currency: "USD",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 0,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
    UK: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 4.0,
      payment_processing_fixed: 0.2,
      currency: "GBP",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 0.48,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
    EU: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 4.0,
      payment_processing_fixed: 0.3,
      currency: "EUR",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 1.0,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
    CA: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 3.0,
      payment_processing_fixed: 0.25,
      currency: "CAD",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 0.5,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
    AU: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 3.0,
      payment_processing_fixed: 0.25,
      currency: "AUD",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 0,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
    IN: {
      listing_fee: 0.2,
      transaction_fee_percent: 6.5,
      payment_processing_percent: 5.0,
      payment_processing_fixed: 25.0,
      currency: "INR",
      offsite_ads_percent: 15,
      regulatory_fee_percent: 0.05,
      currency_conversion_percent: 2.5,
      last_updated: "2026-10-06",
      source_name: "Test Fixture",
    },
  },
}));

const baseInput: Input = {
  productPrice: 10,
  shippingCharged: 0,
  cogs: 5,
  shippingCostPaid: 0,
  quantity: 1,
  country: "US",
  offsiteAds: "off",
  taxInclusive: false,
  giftWrap: 0,
};

describe("calculateProfitMargin", () => {
  it("returns percentage when netRevenue > 0", () => {
    expect(calculateProfitMargin(50, 200)).toBeCloseTo(25);
  });
  it("returns 0 when netRevenue <= 0", () => {
    expect(calculateProfitMargin(10, 0)).toBe(0);
    expect(calculateProfitMargin(10, -5)).toBe(0);
  });
});

describe("input validation", () => {
  it("throws when price = 0", () => {
    expect(() => calculateFees({ ...baseInput, productPrice: 0 })).toThrow("Price must be greater than 0");
  });

  it("throws when price is negative", () => {
    expect(() => calculateFees({ ...baseInput, productPrice: -50 })).toThrow("Price must be greater than 0");
  });

  it("throws when quantity = 0", () => {
    expect(() => calculateFees({ ...baseInput, quantity: 0 })).toThrow("Quantity must be at least 1");
  });

  it("throws when quantity is fractional", () => {
    expect(() => calculateFees({ ...baseInput, quantity: 2.5 })).toThrow("Quantity must be at least 1");
  });

  it("throws when cogs is negative", () => {
    expect(() => calculateFees({ ...baseInput, cogs: -1 })).toThrow("COGS cannot be negative");
  });

  it("throws when shipping is negative", () => {
    expect(() => calculateFees({ ...baseInput, shippingCharged: -5 })).toThrow("Shipping cannot be negative");
    expect(() => calculateFees({ ...baseInput, shippingCostPaid: -5 })).toThrow("Shipping cannot be negative");
  });

  it("throws when giftWrap is negative", () => {
    expect(() => calculateFees({ ...baseInput, giftWrap: -1 })).toThrow("Gift wrap cannot be negative");
  });

  it("throws on NaN / empty fields", () => {
    expect(() => calculateFees({ ...baseInput, productPrice: NaN })).toThrow("Please enter valid numbers");
    expect(() => calculateFees({ ...baseInput, quantity: NaN })).toThrow("Please enter valid numbers");
  });

  it("warns (does not throw) when cogs > price", () => {
    const r = calculateFees({ ...baseInput, productPrice: 10, cogs: 100 });
    expect(r.netProfit).toBeLessThan(0);
    expect(r.warnings).toContain("COGS is higher than price. You will lose money on this sale.");
  });

  it("valid input works without warnings", () => {
    const r = calculateFees(baseInput);
    expect(r.totalFees).toBeGreaterThan(0);
    expect(r.netProfit).toBeGreaterThan(0);
    expect(r.warnings).toHaveLength(0);
  });
});

describe("SPEC §13 test cases", () => {
  it("1. Simple US sale, Q=1", () => {
    const r = calculateFees(baseInput);
    expect(r.listingFee).toBeCloseTo(0.2);
    expect(r.transactionFee).toBeCloseTo(0.65);
    expect(r.paymentProcessingFee).toBeCloseTo(0.55);
    expect(r.totalFees).toBeCloseTo(1.4);
    expect(r.netRevenue).toBeCloseTo(8.6);
    expect(r.netProfit).toBeCloseTo(3.6);
  });

  it("2. US sale with shipping, Q=1", () => {
    const r = calculateFees({
      ...baseInput,
      productPrice: 30,
      shippingCharged: 5,
      cogs: 15,
      shippingCostPaid: 2,
    });
    expect(r.transactionFee).toBeCloseTo(0.065 * 35);
    expect(r.paymentProcessingFee).toBeCloseTo(0.03 * 35 + 0.25);
    expect(r.netRevenue).toBeCloseTo(35 - (0.2 + 0.065 * 35 + 0.03 * 35 + 0.25));
    expect(r.netProfit).toBeCloseTo(r.netRevenue - 17);
  });

  it("3. US sale, Q=5 (multi-quantity)", () => {
    const r = calculateFees({
      ...baseInput,
      productPrice: 10,
      shippingCharged: 2,
      cogs: 5,
      shippingCostPaid: 1,
      quantity: 5,
    });
    expect(r.listingFee).toBeCloseTo(1.0);
    expect(r.transactionFee).toBeCloseTo(0.065 * 12 * 5);
    // fixed counted ONCE
    expect(r.paymentProcessingFee).toBeCloseTo(0.03 * 60 + 0.25);
    expect(r.netProfit).toBeCloseTo(r.netRevenue - 30);
  });

  it("4. UK sale with VAT-inclusive price", () => {
    const r = calculateFees({
      ...baseInput,
      productPrice: 50,
      shippingCharged: 0,
      cogs: 20,
      shippingCostPaid: 0,
      country: "UK",
      taxInclusive: true,
    });
    expect(r.transactionFee).toBeCloseTo(0.065 * 50);
    expect(r.paymentProcessingFee).toBeCloseTo(0.04 * 50 + 0.2);
    expect(r.regulatoryFee).toBeCloseTo(0.0048 * 50);
    expect(r.totalFees).toBeCloseTo(0.2 + 3.25 + 2.2 + 0.24);
  });

  it("5. Offsite Ads triggered, under $100 cap", () => {
    const r = calculateFees({
      ...baseInput,
      productPrice: 100,
      shippingCharged: 0,
      offsiteAds: "15%",
    });
    expect(r.offsiteAdsFee).toBeCloseTo(15);
  });

  it("6. Offsite Ads triggered, over $100 cap", () => {
    const r = calculateFees({
      ...baseInput,
      productPrice: 1000,
      shippingCharged: 0,
      offsiteAds: "15%",
    });
    expect(r.offsiteAdsFee).toBeCloseTo(100);
  });

  it("7. Break-even calculation for each case", () => {
    const cases: Input[] = [
      baseInput,
      { ...baseInput, productPrice: 30, shippingCharged: 5, cogs: 15, shippingCostPaid: 2 },
      { ...baseInput, productPrice: 10, shippingCharged: 2, cogs: 5, shippingCostPaid: 1, quantity: 5 },
      { ...baseInput, productPrice: 50, shippingCharged: 0, cogs: 20, shippingCostPaid: 0, country: "UK", taxInclusive: true },
      { ...baseInput, productPrice: 100, shippingCharged: 0, offsiteAds: "15%" },
      { ...baseInput, productPrice: 1000, shippingCharged: 0, offsiteAds: "15%" },
    ];
    for (const input of cases) {
      const P = calculateBreakEven(input);
      const testInput = { ...input, productPrice: P };
      const result = calculateFees(testInput);
      expect(result.netProfit).toBeCloseTo(0, 1);
    }
  });
});

