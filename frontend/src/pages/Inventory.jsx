import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("grid");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          Inventory Management
        </h1>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-1 rounded ${
              view === "grid"
                ? "bg-[var(--color-pink)] text-white"
                : "text-gray-600"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-4 py-1 rounded ${
              view === "table"
                ? "bg-[var(--color-pink)] text-white"
                : "text-gray-600"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-4 gap-6">

          {items.map((item) => {
            const stock = item.qty || 0;

            return (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-soft)] text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                {/* IMAGE */}
                <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  Image
                </div>

                {/* NAME */}
                <h3 className="font-semibold text-lg">{item.name}</h3>

                {/* QR */}
                <p className="text-sm text-gray-200">
                  QR: {item.qr_code}
                </p>

                {/* STOCK */}
                <p className="text-sm mt-2">
                  Stock: {stock}
                </p>

                {/* BAR */}
                <div className="w-full h-2 bg-white/20 rounded mt-2">
                  <div
                    className="h-2 bg-green-400 rounded"
                    style={{ width: `${Math.min(stock, 100)}%` }}
                  />
                </div>

                {/* STATUS */}
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-green-500">
                  {stock > 0 ? "In Stock" : "Out"}
                </span>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/scanner");
                  }}
                  className="w-full mt-3 bg-black/20 py-1 rounded hover:bg-black/30"
                >
                  Scan
                </button>
              </div>
            );
          })}

        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>QR</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                const stock = item.qty || 0;

                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2">{item.name}</td>
                    <td>{item.qr_code}</td>
                    <td>{stock}</td>

                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          stock > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {stock > 0 ? "In Stock" : "Out"}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="text-[var(--color-soft)] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}