import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-blue-500 p-4">
      <div className="w-full max-w-md bg-white py-4">
        <h1 className="my-4 text-center text-2xl">Login</h1>

        {error && (
          <span className="mb-6 block text-center text-red-500">
            Something went wrong...
          </span>
        )}

        <form
          className="m-auto flex max-w-sm flex-col items-center gap-2 px-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="border p-3"
              name="email"
              onChange={handleOnChange}
              value={inputs.email}
              required
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="border p-3"
              name="password"
              onChange={handleOnChange}
              value={inputs.password}
              required
            />
          </div>
          <div className="mt-8 flex w-full flex-col gap-6">
            <button
              className="bg-blue-500 p-3 uppercase text-white"
              disabled={isLoading}
            >
              {isLoading ? "logging in..." : "login"}
            </button>
            <span className="self-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
