import { useRef, useState } from "react";

const ProductUpdate = ({ close, product }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(product?.image || null);

  const [form, setForm] = useState({
    item_name: product?.item_name || "Product Name",
    description: product?.description || "Product description",
    price: product?.price || 0,
    image: null
  });

  const chooseImage = () => fileInputRef.current.click();

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file });
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("item_name", form.item_name);
    formData.append("description", form.description);
    formData.append("price", form.price);

    if (form.image) {
      formData.append("image", form.image);
    }

    //Call backend API when ready
    console.log("Product update (UI only):", form);
    close();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-5 space-y-3"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Edit Product
        </h2>

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <button
            onClick={chooseImage}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl"
          >
            Choose Image
          </button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border-2 border-gray-300"
            />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={changeImage}
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Product Name</label>
          <input
            value={form.item_name}
            onChange={e =>
              setForm({ ...form, item_name: e.target.value })
            }
            className="border rounded-xl px-4 py-2 text-sm"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            rows={2}
            className="border rounded-xl px-4 py-2 text-sm"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Price (Rs.)</label>
          <input
            type="number"
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: parseFloat(e.target.value) || 0 })
            }
            className="border rounded-xl px-4 py-2 text-sm"
          />
        </div>

        <button
          onClick={submit}
          className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProductUpdate;
