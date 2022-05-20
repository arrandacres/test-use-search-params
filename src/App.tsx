import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import PersonTable from "./components/PersonTable";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<PersonTable />} />
      </Routes>
    </Router>
  );
}
