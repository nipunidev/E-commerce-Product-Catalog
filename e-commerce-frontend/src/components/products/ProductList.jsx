import ProductCard from './ProductCard';
import '../../styles/components/product-list.css';

const ProductList = ({ products, onEdit, onDelete, isAdmin }) => {

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAdmin={isAdmin}
                />
            ))}
        </div>
    );
};

export default ProductList;