import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/header.css';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <h1>ShopCart</h1>
                </Link>

                <nav className="nav">
                    <Link to="/products">Products</Link>

                    {isAuthenticated ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin/dashboard">Admin</Link>
                            )}
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;