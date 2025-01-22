import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/layouts/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
