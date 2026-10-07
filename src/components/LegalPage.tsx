export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-xs text-gray-500">Last reviewed: {updated}</p>
      {children}
    </main>
  );
}
