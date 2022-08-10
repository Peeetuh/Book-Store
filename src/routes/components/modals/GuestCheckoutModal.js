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
    setIsLoading(true);
    try {
      const result = await guestCheckoutRequest(guestEmail, guestCart);
      console.log("result", result);
      if(result.error) {
        setIsCheckingOut(false);
        setResModal(true);
        setResData(result);
      }
      if (result.status && result.status === "checkout") {
        const { orderPrice, orderId } = result;
        await stripeCheckoutRequest(orderPrice, orderId);
      }
    } finally {
      setIsLoading(false);
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
          <button onClick={cancelClickHandler}>Cancel</button>
          <button type="submit">Proceed to Checkout</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GuestCheckoutModal;
