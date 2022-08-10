import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";
import { UserInfo, UserOrders, UserWishlist } from "./components";

const MyAccount = ({ token, username, userId, setIsLoading }) => {
  const [myAccount, setMyAccount] = useState([]);
  const [userInfoPage, setUserInfoPage] = useState(false);
  const [userOrders, setUserOrders] = useState(false);
  const [userWishlist, setUserWishlist] = useState(false);

  useEffect(() => {
    const loadMyAccount = async () => {
      setIsLoading(true);
      try {
        const fetchedAccount = await fetchUserAccount(token);
        setMyAccount(fetchedAccount);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyAccount();
  }, [token, setIsLoading]);

  return (
    <>
      <h1>Welcome {username}!</h1>
      <button
        onClick={() => {
          setUserInfoPage(true);
          setUserOrders(false);
          setUserWishlist(false);
        }}
      >
        Your Account
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

      {userOrders ? <UserOrders myAccount={myAccount} /> : null}
      {userInfoPage ? (
        <UserInfo token={token} userId={userId} myAccount={myAccount} />
      ) : null}
      {userWishlist ? <UserWishlist setIsLoading={setIsLoading} token={token} /> : null}
    </>
  );
};

export default MyAccount;
