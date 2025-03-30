import { Link } from 'react-router-dom';
import '../../styles/components/product-card.css';

const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <div className="product-image">
                    <img
                        src={product.image_url || '/placeholder-product.png'}
                        alt={product.name}
                    />
                </div>
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                    <p className="category">{product.category}</p>
                </div>
            </Link>

            {isAdmin && (
                <div className="admin-actions">
                    <button onClick={() => onEdit(product)} className="edit-btn">
                        Edit
                    </button>
                    <button onClick={() => onDelete(product.id)} className="delete-btn">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;