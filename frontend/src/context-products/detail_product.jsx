// detail_product.jsx
import { useEffect, useState, useContext } from "react";
import { DetailContext } from "./getDetail";
import api from "../apicentralize"; // centralized axios
import { AuthContext } from "../auth/useAuth"; // get current user (optional)

const MOCK_PRODUCTS = [
  {
    id: 1,
    item_name: "Laptop",
    description: "Good condition",
    price: 1200,
    image: "https://via.placeholder.com/300",
    owner: { username: "john", avatar: "" },
  },
  {
    id: 2,
    item_name: "Phone",
    description: "Almost new",
    price: 800,
    image: "https://via.placeholder.com/300",
    owner: { username: "alice", avatar: "" },
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
        const res = await api.get("/items/"); // Axios instance with token
        console.log("Products JSON from API:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts(MOCK_PRODUCTS);
      }
    };

    fetchProducts();
  }, [isAuthenticated]); // re-fetch when login state changes

  return (
    <DetailContext.Provider value={{ products }}>
      {children}
    </DetailContext.Provider>
  );
};
