export default function TransactionsTable({ data }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <h3 className="mb-4 font-semibold text-[var(--color-primary)]">
        Recent Transactions
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th>Time</th>
            <th>Item</th>
            <th>Action</th>
            <th>Qty</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td>{t.time || "--"}</td>

              <td>{t.item}</td>

              <td>
                <span className={`px-2 py-1 rounded text-xs ${
                  t.qty_change > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {t.qty_change > 0 ? "IN" : "OUT"}
                </span>
              </td>

              <td>{t.qty_change}</td>

              <td>{t.dept || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}