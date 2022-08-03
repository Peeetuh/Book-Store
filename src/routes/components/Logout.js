import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ token, setToken, setUsername, setUserId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      window.localStorage.clear();
      setToken();
      setUsername("");
      setUserId("");
      navigate("/");
    }
  });
};

export default Logout;
