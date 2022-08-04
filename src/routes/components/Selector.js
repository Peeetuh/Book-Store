const Selector = ({ inventory }) => {
  const inventoryArr = [...Array(inventory).keys()];

  return (
    // <>
    //   {inventoryArr.map((num) => {
    //     const offByOne = num+1
    //     return (
    //         <option key={num} value={offByOne}>{offByOne}</option>
    //     );
    //   })}
    // </>
    <>
      {inventoryArr.length <= 10 ? (
        inventoryArr.map((num) => {
          return (
            <option key={num} value={(num + 1)}>
              {num + 1}
            </option>
          );
        })
      ) : (
        <>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </>
      )}
    </>
  );
};

export default Selector;
