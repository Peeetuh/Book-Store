import { useEffect, useState } from "react";

import DisplayAllOrders from "./admin/DisplayAllOrders";
import { allOrdersRequest } from "../api/admin";

const AdminOrders = ({ token }) => {
  const [allOrdersData, setAllOrdersData] = useState([]);
  const [filteredOrdersData, setFilteredOrdersData] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const orders = await allOrdersRequest(token);
      console.log("orders", orders);
      setAllOrdersData(orders);
    };
    fetchOrdersData();
  }, []);
  return (
    <div>
      <h3>Manage Orders</h3>
      <DisplayAllOrders
        allOrdersData={allOrdersData}
        filteredOrdersData={filteredOrdersData}
        setFilteredOrdersData={setFilteredOrdersData}
      />
    </div>
  );
};

export default AdminOrders;
