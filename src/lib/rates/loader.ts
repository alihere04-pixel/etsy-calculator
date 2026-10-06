import ratesData from "../../data/rates/etsy.json";
import type { CountryRates, RatesData } from "./schema";

const data = ratesData as RatesData;

export function getRates(country: string): CountryRates {
  const rates = data[country] as CountryRates | undefined;
  if (!rates) {
    throw new Error(`Rates not loaded for ${country}. Please fill /src/data/rates/etsy.json.`);
  }
  const required: (keyof CountryRates)[] = [
    "listing_fee",
    "transaction_fee_percent",
    "payment_processing_percent",
    "payment_processing_fixed",
  ];
  for (const key of required) {
    if (rates[key] === null || rates[key] === undefined) {
      throw new Error(`Rates not loaded for ${country}. Please fill /src/data/rates/etsy.json.`);
    }
  }
  return rates;
}

