import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import ProductList from '../../components/products/ProductList';
import ProductFilter from '../../components/products/ProductFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/pages/product-listing.css';

const ProductListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        pages: 1
    });

    const fetchProducts = async (params) => {
        try {
            setLoading(true);
            const { data } = await getProducts(params);
            setProducts(data.products);
            setPagination({
                page: data.page,
                total: data.total,
                pages: data.pages
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        fetchProducts(params);
    }, [searchParams]);

    const handleFilterChange = (newFilters) => {
        setSearchParams({ ...newFilters, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
    };

    return (
        <div className="product-listing-page">
            <h1>Our Products</h1>

            <ProductFilter
                onFilterChange={handleFilterChange}
                initialFilters={Object.fromEntries(searchParams)}
            />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {products.length > 0 ? (
                        <>
                            <ProductList products={products} />

                            <div className="pagination">
                                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={pagination.page === page ? 'active' : ''}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-products">No products found matching your criteria</div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductListingPage;