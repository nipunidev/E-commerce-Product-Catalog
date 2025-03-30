import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import ProductCard from '../components/products/ProductCard';
import '../styles/home.css';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // Get 4 random featured products
                const { data } = await getProducts({
                    limit: 4,
                    sortBy: 'RAND()' // Assuming your API supports random sorting
                });
                console.log("data", data)
                setFeaturedProducts(data.products || []);
            } catch (err) {
                console.error('Error fetching featured products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section with Animation */}
            <section className="hero">
                <div className="hero-content animate__animated animate__fadeIn">
                    <h1>Welcome to ShopCart</h1>
                    <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
                    <Link to="/products" className="shop-now-btn pulse">Shop Now</Link>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <h2 className="section-title">Featured Products</h2>
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <>
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    className="animate__animated animate__fadeInUp"
                                />
                            ))}
                        </div>
                        <Link to="/products" className="view-all-btn slide-right">
                            View All Products <span>→</span>
                        </Link>
                    </>
                )}
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature animate__animated animate__fadeIn">
                    <div className="feature-icon">🚚</div>
                    <h3>Free Shipping</h3>
                    <p>On orders over $50</p>
                </div>
                <div className="feature animate__animated animate__fadeIn animate__delay-1s">
                    <div className="feature-icon">🔄</div>
                    <h3>Easy Returns</h3>
                    <p>30-day return policy</p>
                </div>
                <div className="feature animate__animated animate__fadeIn animate__delay-2s">
                    <div className="feature-icon">🛟</div>
                    <h3>24/7 Support</h3>
                    <p>Dedicated support</p>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter">
                <div className="newsletter-content">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for exclusive deals and updates</p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                        />
                        <button type="submit" className="subscribe-btn">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;