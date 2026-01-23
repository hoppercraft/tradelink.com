import Card from "./Card";
import { useDetail } from "../context-products/getDetail";

const Explore = () => {
  const { products } = useDetail();

  return (
    <div className="flex flex-row flex-wrap gap-4 bg-gray-100 p-7">
      {products && products.length > 0 ? (
        products.map(product => (
          <Card key={product._id || product.id} product={product} />
        ))
      ) : (
        <div className="w-full text-center py-10">
          <p className="text-gray-500 text-lg">No products available yet.</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to post a product!</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
