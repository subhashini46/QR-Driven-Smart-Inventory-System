import { useEffect, useState } from "react";
import API from "../api/api";
import { Html5Qrcode } from "html5-qrcode";

export default function Scanner() {
  const [scannedItem, setScannedItem] = useState(null);
  const [action, setAction] = useState("in");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let html5Qr = null;
    let isMounted = true;

    const startScanner = async () => {
      try {
        html5Qr = new Html5Qrcode("reader");

        await html5Qr.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            if (!isMounted || showModal) return;

            try {
              const res = await API.get(`/items?qr=${decodedText}`);

              if (!res.data || !res.data[0]) {
                setMsg("❌ Item not found");
                return;
              }

              setScannedItem(res.data[0]);
              setShowModal(true);
              setMsg("✅ Item scanned");

            } catch {
              setMsg("❌ Item not found");
            }
          }
        );
      } catch (err) {
        console.error("Scanner error:", err);
        setMsg("❌ Camera failed");
      }
    };

    setTimeout(startScanner, 300);

    return () => {
      isMounted = false;

      if (html5Qr && html5Qr.isScanning) {
        html5Qr.stop().catch(() => {});
      }
    };
  }, [showModal]);

  const handleConfirm = async () => {
    if (!scannedItem) return;

    setLoading(true);

    try {
      await API.post("/items/scan", {
        qr: scannedItem.qr_code,
        qty: action === "in" ? qty : -qty,
        dept_id: scannedItem.dept_id || 1,
      });

      setMsg("✅ Updated successfully");
      setScannedItem(null);
      setQty(1);
      setShowModal(false); // 🔥 CLOSE MODAL

    } catch {
      setMsg("❌ Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        QR Scanner
      </h1>

      <div className="grid grid-cols-2 gap-6">

        {/* CAMERA */}
        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <h3 className="mb-3 font-semibold">Camera</h3>

          <div
            id="reader"
            className="w-full h-[300px] rounded-lg overflow-hidden"
          />

          <p className="text-sm text-gray-400 mt-3">
            Align QR code inside box
          </p>
        </div>

        {/* SIDE PANEL */}
        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <h3 className="mb-4 font-semibold">Scanner Status</h3>

          <p className="text-gray-400 text-sm">
            Scan a QR code to trigger action
          </p>

          {msg && (
            <p className="mt-4 text-sm text-green-500">{msg}</p>
          )}
        </div>

      </div>

      {/* 🔥 MODAL */}
      {showModal && scannedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">

            <h2 className="text-lg font-bold mb-4 text-[var(--color-primary)]">
              ✅ Item Scanned
            </h2>

            {/* ITEM INFO */}
            <div className="mb-4">
              <p className="font-semibold text-lg">{scannedItem.name}</p>
              <p className="text-sm text-gray-500">
                Current Stock: {scannedItem.qty}
              </p>
            </div>

            {/* ACTION */}
            <div className="mb-4">
              <p className="text-sm mb-2 font-medium">Select Action</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setAction("in")}
                  className={`px-3 py-2 rounded-lg ${
                    action === "in"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  + Stock IN
                </button>

                <button
                  onClick={() => setAction("out")}
                  className={`px-3 py-2 rounded-lg ${
                    action === "out"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  - Stock OUT
                </button>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-4">
              <p className="text-sm mb-1 font-medium">Quantity</p>

              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}