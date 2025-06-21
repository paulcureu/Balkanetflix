import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
