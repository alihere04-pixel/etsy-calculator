"use client";

import { useState } from "react";
import { calculateFees, type Input, type Result } from "@/lib/calculation/engine";

interface CalculatorProps {
  onResult: (result: Result | null) => void;
}

export default function Calculator({ onResult }: CalculatorProps) {
  const [productPrice, setProductPrice] = useState("");
  const [shippingCharged, setShippingCharged] = useState("0");
  const [cogs, setCogs] = useState("0");
  const [shippingCostPaid, setShippingCostPaid] = useState("0");
  const [quantity, setQuantity] = useState("1");
  const [country, setCountry] = useState<Input["country"]>("US");
  const [offsiteAds, setOffsiteAds] = useState<Input["offsiteAds"]>("off");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [giftWrap, setGiftWrap] = useState("0");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: Input = {
      productPrice: Number(productPrice),
      shippingCharged: Number(shippingCharged),
      cogs: Number(cogs),
      shippingCostPaid: Number(shippingCostPaid),
      quantity: Number(quantity),
      country,
      offsiteAds,
      taxInclusive,
      giftWrap: Number(giftWrap),
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
        <label className="block text-sm font-medium text-gray-700">Product price</label>
        <input type="number" step="0.01" min="0" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping charged to buyer</label>
        <input type="number" step="0.01" min="0" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">COGS (cost of goods)</label>
        <input type="number" step="0.01" min="0" value={cogs} onChange={(e) => setCogs(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping cost paid by seller</label>
        <input type="number" step="0.01" min="0" value={shippingCostPaid} onChange={(e) => setShippingCostPaid(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
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
        <label className="block text-sm font-medium text-gray-700">Gift wrap (optional)</label>
        <input type="number" step="0.01" min="0" value={giftWrap} onChange={(e) => setGiftWrap(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
        Calculate
      </button>
    </form>
  );
}

