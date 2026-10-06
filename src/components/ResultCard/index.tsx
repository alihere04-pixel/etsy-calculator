import type { Result } from "@/lib/calculation/engine";

interface ResultCardProps {
  result: Result | null;
}

export default function ResultCard({ result }: ResultCardProps) {
  if (!result) return null;

  return (
    <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {result.warnings.length > 0 && (
        <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
          {result.warnings.map((w, i) => (
            <p key={i}>{w}</p>
          ))}
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-900">Results</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-orange-50 p-4">
          <p className="text-sm text-gray-600">Net Profit</p>
          <p className="text-3xl font-bold text-orange-700">${result.netProfit.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-orange-50 p-4">
          <p className="text-sm text-gray-600">Profit Margin</p>
          <p className="text-3xl font-bold text-orange-700">{result.profitMargin.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">Break-even Price</p>
          <p className="text-xl font-bold text-gray-900">${result.breakEvenPrice.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">Effective Fee Rate</p>
          <p className="text-xl font-bold text-gray-900">{result.effectiveFeeRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

