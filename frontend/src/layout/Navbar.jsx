import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/scanner") return "QR Scanner";
    return "Imbentaryo";
  };

  return (
    <div className="bg-white shadow px-6 py-4">
      <h2 className="text-lg font-semibold text-[var(--color-primary)]">
        {getTitle()}
      </h2>
    </div>
  );
}