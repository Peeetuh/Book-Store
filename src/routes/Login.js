import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../api";

const Login = ({
  setIsLoading,
  setToken,
  setUserData,
  username,
  setUsername,
  password,
  setPassword,
  setUserId,
  setIsAdmin,
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
      const data = await fetchLogin(username, password);
      if (data.token) {
        console.log(data.user, data.user.isAdmin);
        setToken(data.token);
        setUserId(data.user.id);
        setUsername(data.user.userEmail);
        setIsAdmin(data.user.isAdmin);
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
