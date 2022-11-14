import { useToast } from "context/ToastContext";
import { auth } from "firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface User {
  email: string;
  password: string;
}

const AuthPage = () => {
  const [signUpPage, setSignUpPage] = useState(false);
  const { register, handleSubmit } = useForm<User>();
  const Toast = useToast();

  const onLogin = (data: User) => {
    // e.preventDefault();
    // reset({ firstName: "", lastName: "", email: "" });
    signInWithEmailAndPassword(auth, data.email, data.password).catch(
      (error) => {
        Toast.error(error.code);
      }
    );
  };

  const onSignUp = (data: User) => {
    createUserWithEmailAndPassword(auth, data.email, data.password).catch(
      (error) => {
        Toast.error(error.code);
      }
    );
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="border border-radix-mauve6 rounded-md flex flex-col w-4/5 h-2/3 md:w-2/5 p-5 text-radix-mauve12">
        {signUpPage ? (
          <>
            <h2>SIGN UP</h2>
            <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col">
              <label className="mt-4 ">Email</label>
              <input
                className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 rounded mt-2"
                type="text"
                {...register("email")}
              />
              <label className="mt-4">Password</label>
              <input
                className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 rounded mt-2"
                type="password"
                {...register("password")}
              />
              <button
                type="submit"
                className="border mt-4 px-5 rounded py-2  text-radix-mauve12 violet-bg-int violet-border-int cursor-pointer text-sm"
              >
                SIGN UP
              </button>
            </form>
            <div className="w-full border-t border-radix-violet4 mt-4">
              <p className="text-center mt-4 text-sm text-radix-mauve11">
                Allready a user?
                <span
                  onClick={() => setSignUpPage(false)}
                  className="text-radix-mauve12 cursor-pointer"
                >
                  {" "}
                  LOGIN
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit(onLogin)} className="flex flex-col ">
              <label className="mt-4 ">Email</label>
              <input
                className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 rounded mt-2"
                type="text"
                {...register("email")}
              />
              <label className="mt-4">Password</label>
              <input
                className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 rounded mt-2"
                type="password"
                {...register("password")}
              />
              <button
                className="border mt-4 px-5 rounded py-2  text-radix-mauve12 violet-bg-int violet-border-int cursor-pointer text-sm"
                type="submit"
              >
                LOGIN
              </button>
            </form>
            <div className="w-full border-t border-radix-violet4 mt-4">
              <p className="text-center mt-4 text-sm text-radix-mauve11">
                Need an account?{" "}
                <span
                  onClick={() => setSignUpPage(true)}
                  className="text-radix-mauve12 cursor-pointer"
                >
                  SIGN UP
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
