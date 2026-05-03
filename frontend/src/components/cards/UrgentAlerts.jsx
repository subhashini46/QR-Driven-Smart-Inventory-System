export default function UrgentAlerts({ data }) {

  const urgent = data.filter(item => item.status === "high");

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg h-full max-h-[300px] overflow-y-auto">

      <h3 className="mb-4 font-semibold text-red-500">
        🚨 Urgent Alerts
      </h3>

      {urgent.length > 0 ? (
        urgent.map((item, i) => (
          <div
            key={i}
            className="mb-3 p-3 rounded-lg bg-red-50 border border-red-100"
          >
            <p className="font-medium text-sm">{item.item}</p>
            <p className="text-xs text-gray-500">
              Reorder: {item.reorder}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">
          No urgent alerts 🎉
        </p>
      )}

    </div>
  );
}