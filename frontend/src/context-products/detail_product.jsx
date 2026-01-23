// detail_product.jsx
import { useEffect, useState, useContext } from "react";
import { DetailContext } from "./getDetail";
import api from "../apicentralize"; // centralized axios
import { AuthContext } from "../auth/useAuth"; // get current user (optional)

const MOCK_PRODUCTS = [
  {
    _id: "1",
    title: "Laptop",
    content: "Good condition",
    price: 1200,
    photo: ["https://via.placeholder.com/300"],
    author: "john",
    locations: ["New York"],
  },
  {
    _id: "2",
    title: "Phone",
    content: "Almost new",
    price: 800,
    photo: ["https://via.placeholder.com/300"],
    author: "alice",
    locations: ["Los Angeles"],
  },
];

export const DetailProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      // Optionally, skip fetching if user is not logged in
      setProducts(MOCK_PRODUCTS);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/v1/tradelink/post");
        console.log("Posts from API:", res.data);
        if (res.data.success && res.data.data) {
          setProducts(res.data.data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setProducts(MOCK_PRODUCTS);
      }
    };

    fetchProducts();
  }, [isAuthenticated]); // re-fetch when login state changes

  return (
    <DetailContext.Provider value={{ products, setProducts }}>
      {children}
    </DetailContext.Provider>
  );
};
