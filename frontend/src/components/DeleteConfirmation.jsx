const DeleteConfirmation = ({ close, onConfirm, productName }) => {
  const handleDelete = () => {
    onConfirm();
    close();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Delete Product
        </h2>
        
        <p className="text-gray-600">
          Are you sure you want to delete <span className="font-semibold">"{productName}"</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={close}
            className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
