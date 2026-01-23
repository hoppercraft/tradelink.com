// detail_product.jsx
import { useEffect, useState, useContext } from "react";
import { DetailContext } from "./getDetail";
import api from "../apicentralize";
import { AuthContext } from "../auth/useAuth";

const MOCK_PRODUCTS = [
  {
    _id: "1",
    title: "Sample Laptop",
    content: "Good condition laptop, barely used",
    photo: ["https://via.placeholder.com/300"],
    author: "john_doe",
    locations: ["Kathmandu"],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Smartphone",
    content: "Almost new smartphone with accessories",
    photo: ["https://via.placeholder.com/300"],
    author: "alice_smith",
    locations: ["Pokhara"],
    createdAt: new Date().toISOString(),
  },
];

export const DetailProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated || false;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/v1/tradelink/post");
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setProducts(MOCK_PRODUCTS);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts(MOCK_PRODUCTS);
      setError("Could not load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const deleteProduct = async (postId) => {
    try {
      await api.delete(`/api/v1/tradelink/post/${postId}`);
      setProducts(products.filter(p => p._id !== postId));
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  const refreshProducts = () => {
    if (isAuthenticated) {
      fetchProducts();
    }
  };

  return (
    <DetailContext.Provider value={{ products, loading, error, deleteProduct, refreshProducts }}>
      {children}
    </DetailContext.Provider>
  );
};
