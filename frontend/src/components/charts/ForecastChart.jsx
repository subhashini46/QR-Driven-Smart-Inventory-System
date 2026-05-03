import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ForecastChart({ data }) {

  const getColor = (status) => {
    if (status === "high") return "#BA6E8F";   // red-ish
    if (status === "medium") return "#9F6496"; // purple
    return "#5D3C64"; // dark
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg h-full">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[var(--color-primary)]">
          Forecast Analysis
        </h3>
        <p className="text-xs text-gray-400">
            Based on recent transaction patterns
        </p>

        <span className="text-xs text-gray-400">
          Reorder Prediction
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <XAxis
            dataKey="item"
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip
            contentStyle={{
                backgroundColor: "#0C0420",
                border: "none",
                borderRadius: "12px",
            }}
            labelStyle={{
                color: "#D391B0",
                fontWeight: "600",
                fontSize: "14px"
            }}
            itemStyle={{
                color: "#ffffff",
                fontSize: "13px"
            }}
            formatter={(value) => [`Reorder: ${value}`, ""]}
            />

          <Bar dataKey="reorder" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.status)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}