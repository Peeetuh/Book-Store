import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../api";

const Register = ({
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setUserId,
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

    const data = await fetchRegister(username, password);

    if (data.token) {
      setToken(data.token);
      setUserId(data.user.id);
      setUsername(data.user.userEmail);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userId", data.user.id);
      alert("You've successfully registered");
      navigate("/");
    } else {
      alert(`${data.message}`);
    }
  };
  return (
    <>
      <h3>Register</h3>
      <h6>
        To register please create a username and a password with at least 9
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
          placeholder="minimum of 9 characters"
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
