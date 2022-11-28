import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import Phone from "../components/login/Phone";
import Verification from "../components/login/Verification";
import { Home } from "../components/home/Home";
import LoadingPage from "../components/login/LoadingPage";
import Search from "../components/search/Search";
import Orders from "../components/search/Orders";
import Account from "../components/account/Account";
import Profile from "../components/account/Profile";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { actionSignPhoneSync } from "../redux/actions/userAction";
import Details from "../components/restaurant/Details";
import Plates from "../components/restaurant/Plates";


const Router = () => {
  const dispatch = useDispatch();
  const [isLoggedin, setIsLoggedIn] = useState(undefined);
  const [check, setcheck] = useState(true);
  const userStore = useSelector(store => store.userStore)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setcheck(false)
      if (user?.auth.currentUser) {
        if (Object.entries(userStore).length === 0) {
          const { displayName, email, accessToken, phoneNumber, photoURL, uid } = user.auth.currentUser;
          dispatch(
            actionSignPhoneSync({
              name: displayName,
              email,
              accessToken,
              phoneNumber,
              avatar: photoURL,
              uid,
              error: false
            }));
        }
      }
    }
    );
  }, [setIsLoggedIn, check, userStore, dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter isAuthentication={isLoggedin} />}>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/verification" element={<Verification />} />
        </Route>
        <Route element={<PrivateRouter isAuthentication={isLoggedin} />}>
          <Route path="/register/:uid" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/plates" element={<Plates />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
