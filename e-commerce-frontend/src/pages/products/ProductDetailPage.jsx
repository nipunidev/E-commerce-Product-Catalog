import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/components/product-detail.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProduct(id);
                // Ensure price is a number
                if (data && typeof data.price === 'string') {
                    data.price = parseFloat(data.price);
                }
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div>Product not found</div>;

    // Safely format the price
    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            price = parseFloat(price) || 0;
        }
        return price.toFixed(2);
    };

    return (
        <div className="product-detail">
            <div className="product-images">
                <img
                    src={product.image_url || '/placeholder-product.png'}
                    alt={product.name}
                    className="main-image"
                />
            </div>

            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">${formatPrice(product.price)}</p>
                <p className="category">{product.category}</p>

                <div className="description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                </div>

                <div className="stock-info">
                    <p>Availability: {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    {product.stock_quantity > 0 && (
                        <button className="add-to-cart">Add to Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;