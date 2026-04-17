import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePublic from "./Pages/Home/home";
import Admin from "./Pages/Admin/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePublic />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;