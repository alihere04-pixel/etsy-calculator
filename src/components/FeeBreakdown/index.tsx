import { currencySymbol, type Result } from "@/lib/calculation/engine";

interface FeeBreakdownProps {
  result: Result | null;
}

export default function FeeBreakdown({ result }: FeeBreakdownProps) {
  if (!result) return null;
  const sym = currencySymbol(result.currency);

  const rows: { label: string; amount: number }[] = [
    { label: "Listing fee", amount: result.listingFee },
    { label: "Transaction fee", amount: result.transactionFee },
    { label: "Payment processing fee", amount: result.paymentProcessingFee },
    { label: "Offsite Ads fee", amount: result.offsiteAdsFee },
    { label: "Regulatory operating fee", amount: result.regulatoryFee },
    { label: "Currency conversion fee", amount: result.currencyConversionFee },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Fee Breakdown</h2>
      <table className="mt-4 w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100">
              <td className="py-2 text-gray-600">{row.label}</td>
              <td className="py-2 text-right font-medium text-gray-900">{sym}{row.amount.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="bg-orange-50">
            <td className="py-2 font-semibold text-gray-900">Total fees</td>
            <td className="py-2 text-right font-bold text-orange-700">{sym}{result.totalFees.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

