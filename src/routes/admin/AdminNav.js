import { Link, Outlet } from "react-router-dom";
const AdminNav = () => {
  return (
    <>
    <nav>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/products">Products</Link>
    </nav>
    <Outlet />
    </>
  )
}

export default AdminNav;