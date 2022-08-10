import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserAccount } from "../api";
import {
  UserInfo,
  UserOrders,
  UserWishlist,
} from "./components";
import "./MyAccount.css";

const MyAccount = ({ token, username, userId, setIsLoading }) => {
  const [myAccount, setMyAccount] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [userInfoPage, setUserInfoPage] = useState(false);
  const [userOrders, setUserOrders] = useState(false);
  const [userWishlist, setUserWishlist] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/");
    else {
      const loadMyAccount = async () => {
        setIsLoading(true);
        try {
          const fetchedAccount = await fetchUserAccount(token);
          console.log("fetched account", fetchedAccount);
          setMyAccount(fetchedAccount);
          setMyOrders(fetchedAccount.orders || []);
        } finally {
          setIsLoading(false);
        }
      };
      loadMyAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="my-account">
      <header>
        <h2>Your Account</h2>
      </header>
      <button
        onClick={() => {
          setUserInfoPage(true);
          setUserOrders(false);
          setUserWishlist(false);
        }}
      >
        Account Info
      </button>
      <button
        onClick={() => {
          setUserOrders(true);
          setUserInfoPage(false);
          setUserWishlist(false);
        }}
      >
        Orders
      </button>
      <button
        onClick={() => {
          setUserWishlist(true);
          setUserInfoPage(false);
          setUserOrders(false);
        }}
      >
        Wishlist
      </button>

      {userOrders ? (
        <UserOrders myAccount={myAccount} myOrders={myOrders} />
      ) : null}
      {userInfoPage ? (
        <UserInfo
          token={token}
          userId={userId}
          myAccount={myAccount}
          username={username}
          setMyAccount={setMyAccount}
        />
      ) : null}
      {userWishlist ? (
        <UserWishlist token={token} />
      ) : null}
    </main>
  );
};

export default MyAccount;
