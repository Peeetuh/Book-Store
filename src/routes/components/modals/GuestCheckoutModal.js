import {
  guestCheckoutRequest,
  stripeCheckoutRequest,
} from "../../../api/checkout";

const GuestCheckoutModal = ({
  setIsCheckingOut,
  setIsLoading,
  guestEmail,
  setGuestEmail,
  guestCart,
  setResModal,
  setResData,
}) => {
  const cancelClickHandler = () => setIsCheckingOut(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await guestCheckoutRequest(guestEmail, guestCart);
    console.log("result", result);
    if (result.error) {
      setIsCheckingOut(false);
      setResModal(true);
      setResData(result);
    }
    if (result.status && result.status === "checkout") {
      const { orderPrice, orderId } = result;
      await stripeCheckoutRequest(orderPrice, orderId);
    }
  };
  return (
    <>
      <div className="background" />
      <div className="modal">
        <form className="modal-form" onSubmit={submitHandler}>
          <h3>Checking Out as Guest</h3>
          <label htmlFor="guest-email">Please enter your email address:</label>
          <input
            id="guest-email"
            type="email"
            required
            onChange={(e) => setGuestEmail(e.target.value)}
          />
          <div className="modal-form-buttons">
            <button className="modal-cancel" onClick={cancelClickHandler}>
              Cancel
            </button>
            <button className="modal-confirm" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GuestCheckoutModal;
