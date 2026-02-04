import Card from "./Card";
import { useDetail } from "../context-products/getDetail";
import { useEffect } from "react";

const Explore = () => {
  const { displayProducts,fetchProducts } = useDetail();

  useEffect(() => {
    fetchProducts();
  }, []);

  
if(displayProducts.length>0){
  return (
    <div className="flex flex-row flex-wrap gap-4 bg-gray-100 p-7">
      {displayProducts.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}else{
  return(
   <div className="flex justify-center items-center h-64">
        <h1 className="text-3xl font-semibold text-gray-700">
          No results found
        </h1>
      </div>
  );
}
};

export default Explore;
