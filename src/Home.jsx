import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Willkommen zum Deutschprüfung</h1>
      <p>Bereiten Sie sich auf Ihre Deutschprüfung vor</p>
      <Link to="/lesen/teil1">
        <button>Prüfung starten</button>
      </Link>
    </div>
  );
}
