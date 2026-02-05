// detail_product.jsx
import { useEffect, useState, useContext, useMemo } from "react";
import { DetailContext } from "./getDetail";
import api from "../apicentralize"; // centralized axios
import { AuthContext } from "../auth/useAuth"; // get current user (optional)

export const DetailProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [searchInput,setSearchInput]=useState('');
  const [activeSearch,setActiveSearch]=useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/items/"); // Axios instance with token
      console.log("Products JSON from API:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  const deleteProduct = async (id) => {
  try {
    await api.delete(`/api/items/delete/${id}/`);
    
    setProducts((prev) => prev.filter(product => product.id !== id));
    setMyProducts((prev) => prev.filter(p => p.id !== id));
    console.log("Product deleted from database and UI");
  } catch (err) {
    console.error("Failed to delete product:", err);
    alert("Could not delete product. Please try again.");
  }
};
  const fetchMyProducts = async () => {
    try{
      const res = await api.get("/api/items/?mine=true");
      setMyProducts(res.data);
    }catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    fetchProducts();
  }, [isAuthenticated]); 

  const displayProducts=useMemo(()=>{
          if(!activeSearch.trim()) return products;

            return products.filter(p =>
      p.item_name.toLowerCase().includes(activeSearch.toLowerCase())
    );

  },[products,activeSearch]);



  return (
    <DetailContext.Provider value={{ products,displayProducts,myProducts,deleteProduct,setSearchInput,fetchProducts,fetchMyProducts,setActiveSearch,searchInput }}>
      {children}
    </DetailContext.Provider>
  );
};
