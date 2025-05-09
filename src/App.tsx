import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import NavBar from "./components/navBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
