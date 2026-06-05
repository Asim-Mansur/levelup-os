import Login from "./Login";
import Dashboard from "./Dashboard";
import CharacterPage from "./CharacterPage";
import HistoryPage from "./HistoryPage";
import SkillsPage from "./SkillsPage";

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
      }}
    >
      <h1>LevelUp OS</h1>

      <nav
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/character">
          Character
        </Link>

        <Link to="/skills">
          Skills
        </Link>

        <Link to="/history">
          History
        </Link>
      </nav>

      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/character"
          element={<CharacterPage />}
        />

        <Route
          path="/skills"
          element={<SkillsPage />}
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />
      </Routes>
    </div>
  );
}

export default App;