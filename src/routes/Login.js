import { useState } from "react";
import { fetchLogin, getUserWishlist } from "../api";
import { AuthResponseModal } from "./components";
const Login = ({
  setIsLoading,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setUserId,
  setIsAdmin,
  guestCart,
  setGuestCart,
  setUserWishlist,
}) => {
  const [resModal, setResModal] = useState(false);
  const [resData, setResData] = useState({});
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const authFormSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetchLogin(username, password, guestCart);
      console.log("login data:", data);
      if (data.token) {
        setToken(data.token);
        setUserId(data.user.id);
        setUsername(data.user.userEmail);
        setIsAdmin(data.user.isAdmin);
        setGuestCart([]);
        window.localStorage.removeItem("GuestCartData");
        window.localStorage.setItem("username", data.user.userEmail);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.user.id);
        window.localStorage.setItem("isAdmin", data.user.isAdmin);
        const wishlist = await getUserWishlist(data.token);
        setUserWishlist(wishlist || []);
      }
      setResModal(true);
      setResData(data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {resModal && (
        <AuthResponseModal resData={resData} setResModal={setResModal} />
      )}
      <main className="body-page">
        <header id="login-header">
          <h3>Login</h3>
        </header>
        <section>
          <h6>Enter your email address and password to login.</h6>
          <form className="login" onSubmit={authFormSubmitHandler}>
            <div className="input-container">
              <label>Username</label>
              <input
                placeholder="username"
                id="username"
                type="email"
                onChange={usernameChangeHandler}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                placeholder="password"
                id="pasword"
                type="password"
                minLength={5}
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="button-container">
              <button id="login-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
