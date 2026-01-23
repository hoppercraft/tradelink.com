import Card from "./Card";
import { useDetail } from "../context-products/getDetail";

const Explore = () => {
  const { products, loading, error } = useDetail();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-gray-500 text-sm">Showing sample products instead</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 text-lg">No products available</p>
          <p className="text-gray-500 text-sm mt-1">Be the first to post something!</p>
          <a href="/home/post" className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Create Post
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 bg-gray-100 p-7">
      {products.map(product => (
        <Card key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default Explore;
