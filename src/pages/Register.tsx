import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    setFile(files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      // upload image
      const date = Date.now();
      const fileName = inputs.username + date + file!.name;
      const storageRef = ref(storage, fileName);

    
      await uploadBytesResumable(storageRef, file!).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            // update profile
            await updateProfile(response.user, {
              displayName: inputs.username,
              photoURL: downloadURL,
            });

            // create user on firestore
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: inputs.username,
              email: inputs.email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setIsLoading(false);
          }
        });
      });

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
        <h1 className="my-4 text-center text-2xl">Register</h1>

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
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="border p-3"
              name="username"
              onChange={handleOnChange}
              value={inputs.username}
              required
            />
          </div>

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
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="file">Image</label>
            <input
              id="file"
              type="file"
              className="border file:cursor-pointer file:border-none file:bg-blue-500 file:p-3 file:text-white"
              onChange={handleFileOnChange}
              required
            />
          </div>

          <div className="mt-8 flex w-full flex-col gap-6">
            <button
              className="bg-blue-500 p-3 uppercase text-white"
              disabled={isLoading}
            >
              {isLoading ? "creating account..." : "register"}
            </button>
            <span className="self-center">
              Have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
