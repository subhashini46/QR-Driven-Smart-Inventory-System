import { useEffect, useState } from "react";
import API from "../api/api";
import StatCard from "../components/cards/StatCard";
import ForecastChart from "../components/charts/ForecastChart";
import TransactionsTable from "../components/tables/TransactionsTable";
import UrgentAlerts from "../components/cards/UrgentAlerts";

export default function Dashboard() {

  const [items, setItems] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [depts, setDepts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const itemsRes = await API.get("/items");
      const forecastRes = await API.get("/forecast");
      const deptRes = await API.get("/depts");
      const transRes = await API.get("/transactions");

      setItems(itemsRes.data);
      setForecast(forecastRes.data.priority_list || []);
      setDepts(deptRes.data);
      setTransactions(transRes.data);

    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  // 🔥 calculations
  const totalItems = items.length;
  const lowStock = forecast.filter(f => f.status === "high").length;
  const totalDepts = depts.length;

  return (
  <div className="p-6 space-y-6">

    {/* 🔥 STAT CARDS */}
    <div className="grid grid-cols-3 gap-5">
      <StatCard title="Total Items" value={totalItems} color={["#5D3C64", "#9F6496"]} />
      <StatCard title="High Priority" value={lowStock} color={["#BA6E8F", "#D391B0"]} />
      <StatCard title="Departments" value={totalDepts} color={["#78466A", "#5D3C64"]} />
    </div>

    {/* 🔥 CHART + ALERTS */}
    <div className="grid grid-cols-3 gap-5">

      {/* Chart */}
      <div className="col-span-2">
        <ForecastChart data={forecast} />
      </div>

      {/* Alerts */}
      <UrgentAlerts data={forecast} />

    </div>

    {/* 🔥 TRANSACTIONS (BOTTOM FULL WIDTH) */}
    <TransactionsTable data={transactions} />

  </div>
);
}