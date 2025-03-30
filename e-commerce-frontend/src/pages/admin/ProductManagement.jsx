import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../../api/api';
import ProductForm from '../../components/products/ProductForm';
import ProductList from '../../components/products/ProductList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import '../../styles/pages/product-management.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getProducts();
                setProducts(data.products || []);
            } catch (err) {
                console.error('Fetch products error:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleCreate = async (productData) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('category', productData.category);
            formData.append('stock_quantity', productData.stock_quantity);
            if (productData.image) {
                formData.append('image', productData.image);
            }

            const { data } = await createProduct(formData);
            setProducts([...products, data]);
            closeModal();
            alert('Product created successfully!');
        } catch (err) {
            console.error('Create product error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to create product');
            alert('Failed to create product: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, productData) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('name', productData.name || '');
            formData.append('description', productData.description || '');
            formData.append('price', productData.price || 0);
            formData.append('category', productData.category || '');
            formData.append('stock_quantity', productData.stock_quantity || 0);

            if (productData.image) {
                formData.append('image', productData.image);
            } else if (editingProduct?.image_url) {
                formData.append('image_url', editingProduct.image_url);
            }

            const { data } = await updateProduct(id, formData);
            setProducts(products.map(p => p.id === id ? data : p));
            closeModal();
            alert('Product updated successfully!');
        } catch (err) {
            console.error('Update product error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to update product');
            alert(`Failed to update product: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                setLoading(true);
                setError(null);

                await deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
                alert('Product deleted successfully!');
            } catch (err) {
                console.error('Delete product error:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Failed to delete product');
                alert('Failed to delete product: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-management">
            <div className="product-management-header">
                <h1>Manage Products</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => openModal()}
                >
                    Add New Product
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm
                    onSubmit={editingProduct ?
                        (data) => handleUpdate(editingProduct.id, data) :
                        handleCreate
                    }
                    initialData={editingProduct}
                    onCancel={closeModal}
                />
            </Modal>

            <ProductList
                products={products}
                onEdit={openModal}
                onDelete={handleDelete}
                isAdmin
            />
        </div>
    );
};

export default ProductManagement;