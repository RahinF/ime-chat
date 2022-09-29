import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { auth } from "./firebase";
import useAuthStore from "./hooks/useAuthStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({ displayName, photoURL, uid });
      }
    });
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
