// detail_product.jsx
import { useEffect, useState } from "react";
import { DetailContext } from "./getDetail";
import api from "../api"; // your axios instance

// Optional: fallback mock products in dev
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Correct API endpoint
        const res = await api.get("/api/items/");

        // Log the JSON response
        console.log("Products JSON from API:", res.data);

        setProducts(res.data); // Axios parses JSON automatically
      } catch (err) {
        console.error("Error fetching products:", err);

        // fallback to mock products
        setProducts(MOCK_PRODUCTS);
        console.log("Using MOCK_PRODUCTS:", MOCK_PRODUCTS);
      }
    };

    fetchProducts();
  }, []);

  return (
    <DetailContext.Provider value={{ products }}>
      {children}
    </DetailContext.Provider>
  );
};
