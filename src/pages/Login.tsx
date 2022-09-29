import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-blue-500 p-4">
      <div className="w-full max-w-md bg-white py-4">
        <h1 className="my-4 text-center text-2xl">Login</h1>

        <form className="m-auto flex max-w-sm flex-col items-center gap-2 px-4">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="border p-3" />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="border p-3" />
          </div>
          <div className="mt-8 flex w-full flex-col gap-6">
            <button className="bg-blue-500 p-3 uppercase text-white">
              login
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
