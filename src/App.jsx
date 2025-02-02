import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/layouts/Header";
import { Home } from "./components/Home";
import { Register } from "./components/user/Register";
import { Login } from "./components/user/Login";
import { Ask } from "./components/questions/Ask";
import { Question } from "./components/questions/Question";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/question/:slug" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
