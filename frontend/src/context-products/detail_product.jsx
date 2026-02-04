// detail_product.jsx
import { useEffect, useState, useContext, useMemo } from "react";
import { DetailContext } from "./getDetail";
import api from "../apicentralize"; // centralized axios
import { AuthContext } from "../auth/useAuth"; // get current user (optional)

export const DetailProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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
  const fetchMyProducts = async () => {
    try{
      const res = await api.get("/api/items/?mine=true");
      setProducts(res.data);
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
    <DetailContext.Provider value={{ products,displayProducts,setSearchInput,fetchProducts,fetchMyProducts,setActiveSearch,searchInput }}>
      {children}
    </DetailContext.Provider>
  );
};
