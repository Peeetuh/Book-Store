const Selector = ({ inventory }) => {
  const inventoryArr = [...Array(inventory).keys()];

  return (
    <>
      {inventoryArr.map((num) => {
        const offByOne = num + 1;
        return (
          <option key={num} value={offByOne}>
            {offByOne}
          </option>
        );
      })}
    </>
  );
};

export default Selector;
