import { useState } from "react";
import { fetchRegister } from "../api";
import { AuthResponseModal } from "./components";

const Register = ({
  setIsLoading,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setUserId,
  guestCart,
  setGuestCart,
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
      const data = await fetchRegister(username, password, guestCart);
      console.log("register", data);
      if (data.token) {
        setToken(data.token);
        setUserId(data.user.id);
        setUsername(data.user.userEmail);
        setGuestCart([]);
        window.localStorage.removeItem("GuestCartData");
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.user.id);
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
      <main className="register-page">
      <header id="register-header">
      <h3>Register</h3>
      </header>
      <h6>
        To register please enter your email address, and a password with at least 8 characters.
      </h6>
      <section className="login">
      <form onSubmit={authFormSubmitHandler}>
        <div className="input-container">
        <label>Username</label>
        <input
          placeholder="Enter your email address"
          id="username"
          type="email"
          value={username}
          onChange={usernameChangeHandler}
        />
        </div>
        <div className="input-container">
        <label>Password</label>
        <input
          placeholder="minimum of 8 characters"
          id="pasword"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        </div>
        <button id="register-btn" type="submit">Submit</button>
      </form>
      </section>
      </main>
    </>
  );
};

export default Register;
