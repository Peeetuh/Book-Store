import { useNavigate } from "react-router-dom";

const Logout = ({ token, setToken, setUsername }) => {
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