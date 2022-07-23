import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../api";

const Login = ({ setToken, username, setUsername, password, setPassword }) => {
  const navigate = useNavigate();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const authFormSubmitHandler = async (event) => {
    event.preventDefault();
    const data = await fetchLogin(username, password);
    if (data.token) {
      setToken(data.token);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("token", data.token);
      alert("You've logged on!");
      navigate("/");
    } else {
      alert(`${data.message}`);
    }
  };
  return (
    <>
      <h3>Login</h3>
      <form id="login" onSubmit={authFormSubmitHandler}>
        <label>Username</label>
        <input
          placeholder="username"
          id="username"
          type="email"
          onChange={usernameChangeHandler}
        />
        <label>Password</label>
        <input
          placeholder="password"
          id="pasword"
          type="password"
          minLength={5}
          onChange={passwordChangeHandler}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </>
  );
};


export default Login;