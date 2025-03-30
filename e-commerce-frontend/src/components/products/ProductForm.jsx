import { useState, useEffect } from 'react';
import '../../styles/components/product-form.css';

const ProductForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        image: null
    });

    // This effect will update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                category: initialData.category || '',
                stock_quantity: initialData.stock_quantity || '',
                image: null // Reset image field when editing
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Price ($)</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            <div className="form-group">
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Stock Quantity</label>
                <input
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label>Product Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {initialData?.image_url && !formData.image && (
                    <div className="current-image">
                        <p>Current Image:</p>
                        <img
                            src={initialData.image_url}
                            alt="Current product"
                            width="100"
                        />
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    {initialData ? 'Update Product' : 'Add Product'}
                </button>
                {onCancel && (
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;