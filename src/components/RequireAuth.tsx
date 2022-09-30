import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import useAuthStore from "../hooks/useAuthStore";

const RequireAuth = () => {
  const { setUser } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (!user) return;

        const { displayName, photoURL, uid } = user;
        setUser({ displayName, photoURL, uid });
        setIsLoggedIn(true);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  if (isLoading)
    return (
      <div className="grid h-screen place-items-center">
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-5 w-5 animate-bounce rounded-full bg-blue-500"
            />
          ))}
        </div>
      </div>
    );

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
