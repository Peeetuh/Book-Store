import AdminNav from "./admin/AdminNav";
import "./Admin.css";

const Admin = () => {
  return (
    <main className="admin-main">
      <header>
        <h2>TBM Books Admin Portal</h2>
        <AdminNav />
      </header>
    </main>
  );
};

export default Admin;
