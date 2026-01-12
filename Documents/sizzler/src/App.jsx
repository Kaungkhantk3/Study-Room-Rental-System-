import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivilegesPage from "./pages/PrivilegesPage";
import CouponsPage from "./pages/CouponsPage";
import MorePage from "./pages/MorePage";
import LuckyWheel from "./pages/LuckyWheel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privileges" element={<PrivilegesPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/luckywheel" element={<LuckyWheel />} />
      </Routes>
    </Router>
  );
}

export default App;
