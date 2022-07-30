const DisplayAllOrders = ({
  allOrdersData,
  filteredOrdersData,
  setFilteredOrdersData,
}) => {
  const changeHandler = (e) => {
    if (e.target.value === "open") {
      const filtered = allOrdersData.filter((order) => !order.isComplete);
      setFilteredOrdersData(filtered);
    } else if (e.target.value === "closed") {
      const filtered = allOrdersData.filter((order) => order.isComplete);
      setFilteredOrdersData(filtered);
    } else setFilteredOrdersData([]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <section>
      <h4>Displaying All Orders</h4>
      <div>
        <form onSubmit={submitHandler}>
          <label>Filter Results:</label>
          <select onChange={changeHandler}>
            <option value="all">All Orders</option>
            <option value="open">Open Orders</option>
            <option value="closed">Closed Orders</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <table>
          <tbody>
            <tr>
              <th>Order ID#</th>
              <th>User ID#</th>
              <th>User Email</th>
              <th>Order Price</th>
              <th>Order Status</th>
            </tr>
            {!filteredOrdersData.length
              ? allOrdersData.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userId}</td>
                      <td>{order.userEmail}</td>
                      <td>{order.orderPrice}</td>
                      <td>{order.isComplete ? "Closed" : "Open"}</td>
                    </tr>
                  );
                })
              : filteredOrdersData.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userId}</td>
                      <td>{order.userEmail}</td>
                      <td>{order.orderPrice}</td>
                      <td>{order.isComplete ? "Closed" : "Open"}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DisplayAllOrders;
