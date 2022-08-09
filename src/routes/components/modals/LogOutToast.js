const LogOutToast = ({ setToast }) => {
  const clickHandler = () => {
    setToast(false);
  }
  return (
    <>
    <div className="toast-background" onClick={clickHandler}/>
    <div className="toast">
      <p><b>Success:</b> You are now logged out.</p>
    </div>
    </>
  );
};

export default LogOutToast;
