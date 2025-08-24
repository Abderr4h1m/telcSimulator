import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home";
import Schreiben from "./components/Schreiben/Schreiben";
import Teil1 from "./components/Lesen/Teil1";
import Teil2 from "./components/Lesen/Teil2";
import Teil3 from "./components/Lesen/Teil3";
import SprachbausteineTeil1 from "./components/Sprachbausteine/SprachbausteineTeil1";
import SprachbausteineTeil2 from "./components/Sprachbausteine/SprachbausteineTeil2";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import HorenTeil1 from "./components/Horen/HorenTeil1";
import HorenTeil2 from "./components/Horen/HorenTeil2";
import HorenTeil3 from "./components/Horen/HorenTeil3";
import Zertifikat from "./components/Zertifikat/Zertifikat";
import Horen from "./components/Horen/Horen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (or replace with actual fetch calls)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="app">
      <Navbar />
      <Routes>
        {/* lessen */}
        <Route path="/" element={<Home />} />
        <Route path="/lesen/teil1" element={<Teil1 />} />
        <Route path="/lesen/teil2" element={<Teil2 />} />
        <Route path="/lesen/teil3" element={<Teil3 />} />
        {/* spachbaustaine */}
        <Route
          path="/sprachbausteine/teil1"
          element={<SprachbausteineTeil1 />}
        />
        <Route
          path="/sprachbausteine/teil2"
          element={<SprachbausteineTeil2 />}
        />
        {/* horen */}
        <Route path="/horen" element={<Horen />} />
        <Route path="/horen/teil1" element={<HorenTeil1 />} />
        <Route path="/horen/teil2" element={<HorenTeil2 />} />
        <Route path="/horen/teil3" element={<HorenTeil3 />} />
        {/* schrieben */}
        <Route path="/schreiben" element={<Schreiben />} />
        {/* Zertifikat */}
        <Route path="/zertifikat" element={<Zertifikat />} />
      </Routes>
    </div>
  );
}

export default App;
