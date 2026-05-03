import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import ForecastChart from "../components/charts/ForecastChart";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tableRef = useRef(null);

  const [item, setItem] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const itemsRes = await API.get("/items");
      const transRes = await API.get("/transactions");
      const forecastRes = await API.get("/forecast");

      const foundItem = itemsRes.data.find(
        (i) => String(i.id) === String(id)
      );

      if (!foundItem) return;

      setItem(foundItem);

      const filtered = transRes.data.filter(
        (t) => t.item === foundItem.name
      );

      setTransactions(filtered);

      const itemForecast = forecastRes.data.priority_list?.find(
        (f) => f.item === foundItem.name
      );

      setForecast(itemForecast);

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  // 🔥 EDIT
  const handleEdit = async () => {
    const newName = prompt("Item Name", item.name);
    const newQR = prompt("QR Code", item.qr_code);
    const newQty = prompt("Quantity", item.qty);

    if (!newName || !newQR || newQty === null) return;

    try {
      await API.put(`/items/${item.id}`, {
        name: newName,
        qr_code: newQR,
        qty: Number(newQty),
      });

      alert("✅ Updated!");
      fetchData();
    } catch {
      alert("❌ Update failed");
    }
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    if (!confirm("Delete this item?")) return;

    try {
      await API.delete(`/items/${item.id}`);
      alert("Deleted!");
      navigate("/inventory");
    } catch {
      alert("❌ Delete failed");
    }
  };

  // 🔥 SCROLL HISTORY
  const scrollToHistory = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!item) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading item details...</p>
      </div>
    );
  }

  const stock = item.qty || 0;

  const chartData = transactions.map((t, index) => ({
    name: t.time || `T${index + 1}`,
    value: t.qty_change
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/inventory")}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Inventory
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-400 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TOP CARD */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 grid grid-cols-3 gap-6">

        {/* IMAGE + QR */}
        <div className="space-y-4">
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            Image
          </div>

          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            QR: {item.qr_code}
          </div>
        </div>

        {/* INFO */}
        <div className="col-span-2 space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[var(--color-primary)]">
              {item.name}
            </h2>

            <p className="text-sm text-gray-500">
              ID: {item.id}
            </p>
          </div>

          {/* STOCK */}
          <div>
            <div className="flex justify-between text-sm">
              <span>Current Stock</span>
              <span>{stock} units</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded mt-2">
              <div
                className="h-3 bg-[var(--color-pink)] rounded"
                style={{ width: `${Math.min(stock, 100)}%` }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/scanner?qr=${item.qr_code}`)}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
            >
              Scan In/Out
            </button>

            <button
              onClick={scrollToHistory}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              View History
            </button>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-semibold mb-4">Stock Movement</h3>

        {chartData.length > 0 ? (
          <ForecastChart data={chartData} />
        ) : (
          <p className="text-gray-400">No transaction data</p>
        )}
      </div>

      {/* FORECAST */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-semibold mb-3">Forecast</h3>

        {forecast ? (
          <div className="space-y-2 text-sm text-gray-600">
            <p>⚠️ Priority: {forecast.status}</p>
            <p>📦 Suggested Order: {forecast.suggested_qty}</p>
          </div>
        ) : (
          <p className="text-gray-400">No forecast available</p>
        )}
      </div>

      {/* TRANSACTIONS */}
      <div ref={tableRef} className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Date</th>
              <th>Qty Change</th>
              <th>Dept</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{t.time}</td>
                <td>{t.qty_change}</td>
                <td>{t.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}