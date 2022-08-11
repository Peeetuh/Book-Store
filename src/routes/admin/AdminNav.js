import { Link, Outlet } from "react-router-dom";
const AdminNav = () => {
  return (
    <>
    <nav>
      <Link to="/admin/users" className="admin-link">Users</Link>
      <Link to="/admin/orders" className="admin-link">Orders</Link>
      <Link to="/admin/products" className="admin-link">Products</Link>
    </nav>
    <Outlet />
    </>
  )
}

export default AdminNav;