import { useState, useEffect } from 'react';
import { getCategories } from '../../api/api';
import '../../styles/pages/product-filter.css';

const ProductFilter = ({ onFilterChange, initialFilters }) => {
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: initialFilters.search || '',
        category: initialFilters.category || '',
        sortBy: initialFilters.sortBy || 'name',
        sortOrder: initialFilters.sortOrder || 'asc'
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="product-filter">
            <input
                type="text"
                name="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleChange}
            />

            <select name="category" value={filters.category} onChange={handleChange}>
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created_at">Date Added</option>
            </select>

            <select name="sortOrder" value={filters.sortOrder} onChange={handleChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default ProductFilter;