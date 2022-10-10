import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase from "../firebaseConfig";
import FullPageLoader from "../components/FullPageLoader";
import { history } from '../history';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [loaderShow, setLoaderShow] = useState(false);
  const dispatch = useDispatch();
  const loginHandler = async (event) => {
    event.preventDefault();
    setLoaderShow(true);
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let type = -1;
      querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
          type = doc.data().type;
        }
      });
      dispatch({
        type: "SIGN_IN",
        payload: { user: userCredential.user, type: type },
      });
      dispatch({ type: "ACCOUNT_TYPE", payload: type });
      switch (type) {
        case 1:
          history.replace("/patient");
          break;
        case 2:
          history.replace("/hospital");
          break;
        default:
          break;
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setLoginError(() => true);
    }
    setLoaderShow(false);
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="pt-40 pl-20">
          <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
            <form onSubmit={loginHandler}>
              <div className="flex items-center justify-center">
                <h2 className="text-2xl font-bold tracking-wide">
                  Welcome back
                </h2>
              </div>
              <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                Log In
              </h2>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="text"
                className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                placeholder="Email id"
              />
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                placeholder="Password"
              />
              <div className="flex items-center justify-between">
                <Link
                  to="/forgotpassword"
                  className="text-gray-600"
                >
                  Forget Password?
                </Link>
                <button className="bg-gray-800 text-gray-200  px-2 py-1 rounded">
                  Log In
                </button>
              </div>
            </form>
            {loginError ? (
              <div className="loginerror text-center text-red-500">
                Invalid Email or Password
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="mr-20 mt-40 p-12"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
          }}
        >
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Welcome to
          </h1>
          <h1 className="text-5xl py-2 font-bold text-white tracking-wide">
            MedChain
          </h1>
          <p className="text-white py-2">
            We Can't Predict Future But We can Protect It
          </p>
          <span className="text-white">
            Create New Account?
            <Link
              to="/signup"
              className="text-white text-lg ml-2 font-bold hover:text-red-500"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login;