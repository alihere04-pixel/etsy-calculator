"use client";

import { useState } from "react";
import { calculateFees, currencySymbol, type Input, type Result } from "@/lib/calculation/engine";
import rates from "@/data/rates/etsy.json";

interface CalculatorProps {
  onResult: (result: Result | null) => void;
  country?: Input["country"];
}

export default function Calculator({ onResult, country: initialCountry = "US" }: CalculatorProps) {
  const [productPrice, setProductPrice] = useState("");
  const [shippingCharged, setShippingCharged] = useState("");
  const [cogs, setCogs] = useState("");
  const [shippingCostPaid, setShippingCostPaid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState<Input["country"]>(initialCountry);
  const [offsiteAds, setOffsiteAds] = useState<Input["offsiteAds"]>("off");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [giftWrap, setGiftWrap] = useState("");
  const [error, setError] = useState<string | null>(null);

  const symbol = currencySymbol(rates[country].currency);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Empty fields become NaN so the engine reports "Please enter valid numbers"
    // instead of silently treating them as 0.
    const num = (raw: string): number => (raw.trim() === "" ? NaN : Number(raw));
    const input: Input = {
      productPrice: num(productPrice),
      shippingCharged: num(shippingCharged),
      cogs: num(cogs),
      shippingCostPaid: num(shippingCostPaid),
      quantity: num(quantity),
      country,
      offsiteAds,
      taxInclusive,
      giftWrap: num(giftWrap),
    };
    try {
      const result = calculateFees(input);
      onResult(result);
    } catch (e) {
      onResult(null);
      setError(e instanceof Error ? e.message : `Rates coming soon for ${country}.`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product price ({symbol})</label>
        <input type="number" step="0.01" min="0" value={productPrice} placeholder="0.00" onChange={(e) => setProductPrice(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping charged to buyer ({symbol})</label>
        <input type="number" step="0.01" min="0" value={shippingCharged} placeholder="0.00" onChange={(e) => setShippingCharged(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">COGS (cost of goods) ({symbol})</label>
        <input type="number" step="0.01" min="0" value={cogs} placeholder="0.00" onChange={(e) => setCogs(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping cost paid by seller ({symbol})</label>
        <input type="number" step="0.01" min="0" value={shippingCostPaid} placeholder="0.00" onChange={(e) => setShippingCostPaid(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" min="1" value={quantity} placeholder="1" onChange={(e) => setQuantity(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value as Input["country"])} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="EU">EU</option>
          <option value="CA">CA</option>
          <option value="AU">AU</option>
          <option value="IN">IN</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Offsite Ads</label>
        <select value={offsiteAds} onChange={(e) => setOffsiteAds(e.target.value as Input["offsiteAds"])} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="off">off</option>
          <option value="15%">15%</option>
          <option value="12%">12%</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input id="taxInclusive" type="checkbox" checked={taxInclusive} onChange={(e) => setTaxInclusive(e.target.checked)} className="h-4 w-4" />
        <label htmlFor="taxInclusive" className="text-sm font-medium text-gray-700">Tax-inclusive price (UK/EU)</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gift wrap (optional) ({symbol})</label>
        <input type="number" step="0.01" min="0" value={giftWrap} placeholder="0.00" onChange={(e) => setGiftWrap(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
        Calculate
      </button>
    </form>
  );
}

