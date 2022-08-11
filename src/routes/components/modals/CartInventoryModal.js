const CartInventoryModal = ({ setCartModal, currTitle, currInv }) => {
  const clickHandler = () => {
    setCartModal(false);
  };

  return (
    <>
      <div className="background" onClick={clickHandler} />
      <div className="modal">
        <header>
          <h2>Uh-Oh!</h2>
        </header>
        <p>
          <b>Max Inventory Exceeded:</b> Only {currInv} copies of <i>{currTitle}</i> are available in our warehouse.<br />
          Please try again!
        </p>
        <div>
          <button onClick={clickHandler} className="modal-confirm">Okay</button>
        </div>
      </div>
    </>
  );
};

export default CartInventoryModal;
