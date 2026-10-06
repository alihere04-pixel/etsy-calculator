"use client";

import { useState } from "react";
import Calculator from "@/components/Calculator";
import ResultCard from "@/components/ResultCard";
import FeeBreakdown from "@/components/FeeBreakdown";
import type { Result } from "@/lib/calculation/engine";

export default function CalculatorPage() {
  const [result, setResult] = useState<Result | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Etsy Fee &amp; Profit Calculator</h1>
      <p className="max-w-xl text-center text-gray-600">
        Enter your item details below to instantly see Etsy fees, net profit,
        margin, and break-even price.
      </p>
      <Calculator onResult={setResult} />
      <ResultCard result={result} />
      <FeeBreakdown result={result} />
    </main>
  );
}

