import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ token, setToken, setUsername, setUserId, setToast, setIsAdmin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      window.localStorage.clear();
      setToken("");
      setUsername("");
      setUserId("");
      setIsAdmin(false);
      setToast(true);
      navigate("/");
    }
  });
};

export default Logout;
