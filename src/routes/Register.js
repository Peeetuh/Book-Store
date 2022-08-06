import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../api";

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
      const data = await fetchRegister(username, password, guestCart);
      if (data.token) {
        setToken(data.token);
        setUserId(data.user.id);
        setUsername(data.user.userEmail);
        setGuestCart([]);
        window.localStorage.removeItem("GuestCartData");
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.user.id);
        alert("You've successfully registered");
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
      <h3>Register</h3>
      <h6>
        To register please create a username and a password with at least 8
        characters
      </h6>
      <form id="login" onSubmit={authFormSubmitHandler}>
        <label>Username</label>
        <input
          placeholder="username"
          id="username"
          type="email"
          value={username}
          onChange={usernameChangeHandler}
        />
        <label>Password</label>
        <input
          placeholder="minimum of 8 characters"
          id="pasword"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;
