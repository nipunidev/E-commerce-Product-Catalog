import { Link } from 'react-router-dom';
import '../../styles/components/admin-dashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-cards">
                <Link to="/admin/products" className="dashboard-card">
                    <h2>Manage Products</h2>
                    <p>View, add, edit, and delete products</p>
                </Link>
                <Link to="/admin/users" className="dashboard-card">
                    <h2>Manage Users</h2>
                    <p>View and manage user accounts</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;