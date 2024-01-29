import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=12&skip=${(page - 1) * 12}`);
      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 12)); // Use Math.ceil to ensure a positive integer
      }      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className='products'>
          {products.map((product) => (
            <span className='products__single' key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span> {product.title} </span>
            </span>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className='pagination'>
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? 'pagination__selected' : 'pagination__disable'}
          >
            previous 👈
          </span>

          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index + 1}
              onClick={() => selectedPageHandler(index + 1)}
              className={page === index + 1 ? 'pagination__selected' : ''}
            >
              {index + 1}
            </span>
          ))}

          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < totalPages ? '' : 'pagination__disable'}
          >
            next 👉
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
