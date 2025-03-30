import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>ShopCart</h3>
                    <p>Your one-stop shop for all your needs</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <a href="/products">Products</a>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <p>Email: info@shopcart.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ShopCart. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;