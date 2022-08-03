import { useNavigate } from "react-router-dom";

const Logout = ({ token, setToken, setUsername, setUserId }) => {
  const navigate = useNavigate();
  if (token) {
    return (
      <div>
        <button
          className="button"
          onClick={() => {
            window.localStorage.clear();
            setToken();
            setUsername("");
            setUserId("");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    );
  }
};

export default Logout;
