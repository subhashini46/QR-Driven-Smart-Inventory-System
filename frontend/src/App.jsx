import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Inventory from "./pages/Inventory";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">

        <Sidebar />

        <div className="flex-1 bg-gray-100">
          <Navbar />

          <div className="p-4">

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>

          </div>

        </div>

      </div>
    </Router>
  );
}

export default App;