export default function ItemsTable({ items }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg">

      <h3 className="mb-4 font-semibold text-[var(--color-primary)]">
        Inventory Items
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Item</th>
              <th>Quantity</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {items.map((item) => {
              const isLow = item.qty < 5;

              return (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium">{item.name}</td>

                  <td>{item.qty}</td>

                  <td>{item.dept_name || "—"}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isLow
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {isLow ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}