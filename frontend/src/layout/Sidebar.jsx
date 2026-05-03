import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen ... bg-[var(--color-primary)] text-white flex flex-col p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-[var(--color-pink)]">
        Imbentaryo
      </h1>

      {/* Menu */}
      <nav className="flex flex-col gap-3 text-sm">

      <NavLink
        to="/"
        className={({ isActive }) =>
        `px-3 py-2 rounded-lg ${isActive ? "bg-[var(--color-secondary)]" : "hover:bg-[var(--color-secondary)]"}`
        }
       >
    📊 Dashboard
      </NavLink>

      <NavLink
        to="/scanner"
        className={({ isActive }) =>
        `px-3 py-2 rounded-lg ${isActive ? "bg-[var(--color-secondary)]" : "hover:bg-[var(--color-secondary)]"}`
         }
        >
    📷 Scanner
        </NavLink>

        <NavLink
        to="/inventory" 
        className={({ isActive }) =>
        `px-3 py-2 rounded-lg ${isActive ? "bg-[var(--color-secondary)]" : "hover:bg-[var(--color-secondary)]"}`
         }
        >
    📦 Inventory
        </NavLink>
    
      </nav>

      {/* Bottom Section (PROFILE + SETTINGS) */}
      <div className="mt-auto border-t border-gray-600 pt-4">

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-soft)] flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs opacity-60">admin@company.com</p>
          </div>
        </div>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition text-sm">
          ⚙ Settings
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500 transition text-sm">
          🚪 Logout
        </button>

      </div>
    </div>
  );
}