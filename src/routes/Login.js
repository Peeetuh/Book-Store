import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../api";

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
}) => {
  const navigate = useNavigate();

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
      console.log("guest cart before log on", guestCart);
      const data = await fetchLogin(username, password, guestCart);
      if (data.token) {
        console.log("login data:", data);
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
        alert("You've logged on!");
        navigate("/");
      } else {
        alert(`${data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    <body className="body-page">
      <h3>Login</h3>
      <h6>
        Enter your email address and password to login.
      </h6>
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
        <button type="submit">Submit</button>
        </div>
      </form>
      </body>
    </>
  );
};

export default Login;
