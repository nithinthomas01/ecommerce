import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import PriceFilter from './PriceFilter';
import CartNavbar from './CartNavbar';

const Home = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = () => {
      fetch('https://dummyjson.com/products')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((data) => {
          // Set products and filtered products after fetching data
          setProducts(data.products);
          setFilteredProducts(data.products);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching products');
          setLoading(false);
        });
    };

    fetchProducts();
  }, []);

  // Function to handle search results
  const handleSearch = (obj) => {
    setFilteredProducts(obj.products);
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
    return totalPrice;
  };

  // Function to handle price filtering
  const handlePriceFilter = (min, max) => {
    const filtered = products.filter((product) => product.price >= min && product.price <= max);
    setFilteredProducts(filtered);
  };

  return (
    <div>
      {/* Cart Navbar */}
      <CartNavbar itemsCount={cartItems.length} totalPrice={calculateTotalPrice()} />
      
      {/* Page title and filter components */}
      <h1 className='text-5xl text-center decoration-2'>Products</h1>
      <div className='flex flex-row justify-between bg-slate-50'>
        <Searchbar handleSearch={handleSearch} />
        <PriceFilter handlePriceFilter={handlePriceFilter} />
      </div>

      {/* ............................................PRODUCT CARDS............................................. */}
      <div>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-1">
      {filteredProducts.map((product) => (
        <div key={product.id} className="rounded-lg shadow-lg shadow-blue-900 overflow-hidden border border-gray-200">
          {/* Product image */}
          <img className="w-full h-60 object-cover" src={product.thumbnail} alt="product image" />
          {/* Product details */}
          <div className="p-4">
            <h5 className="text-xl font-semibold mb-2">{product.title}</h5>
            <p className="text-gray-700 mb-4">Rs.{product.price}</p>
            <div className="flex items-center mb-4">
              {/* Rating */}
              <svg aria-hidden="true" className="h-5 w-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              {/* Include more rating stars */}
              <span className="rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
            </div>
            {/* Add to cart and remove buttons */}
            <div className="flex justify-between">
              <button onClick={() => addToCart(product)} className="rounded-md bg-blue-900 text-white px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Add to cart
              </button>
              <button onClick={() => removeFromCart(product.id)} className="rounded-md bg-red-700 text-white px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div></div>

  );
};

export default Home;
