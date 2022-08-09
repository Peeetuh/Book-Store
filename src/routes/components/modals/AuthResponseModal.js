import { useNavigate } from "react-router-dom";

const AuthResponseModal = ({ resData, setResModal }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    setResModal(false);
    if (!resData.error) navigate("/");
  };
  return (
    <>
      <div className="background" />
      <div className="modal">
        <header>{!resData.error ? <h2>Success!</h2> : <h2>Uh-Oh!</h2>}</header>
        <p>{resData.message}</p>
        <button onClick={clickHandler}>Okay</button>
      </div>
    </>
  );
};

export default AuthResponseModal;
