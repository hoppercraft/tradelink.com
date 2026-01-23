import { MdHelp, MdEmail, MdPhone, MdQuestionAnswer } from "react-icons/md";

const faqs = [
  {
    question: "How do I create a listing?",
    answer:
      "Go to the 'Post Item' section from the sidebar, fill in your product details, upload an image, and click Post.",
  },
  {
    question: "How do I contact a seller?",
    answer:
      "Click on any product to view details, then use the 'Contact Seller' button to reach out.",
  },
  {
    question: "Is TradeLink free to use?",
    answer:
      "Yes! TradeLink is completely free for both buyers and sellers.",
  },
  {
    question: "How do I edit my profile?",
    answer:
      "Go to your Profile page and click the 'Edit Profile' button to update your information.",
  },
  {
    question: "How do I delete a listing?",
    answer:
      "Go to your Profile page, find the listing in 'My Posts', and click the delete icon.",
  },
];

const Help = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MdHelp className="text-3xl text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
        <p className="text-gray-500 mt-2">
          Find answers to common questions
        </p>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MdQuestionAnswer className="text-indigo-600" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <h3 className="font-medium text-gray-800">{faq.question}</h3>
              <p className="text-gray-500 text-sm mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Still Need Help?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:kcprabin2063@gmail.com"
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <MdEmail className="text-xl text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Email Support</p>
              <p className="text-sm text-gray-500">kcprabin2063@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MdPhone className="text-xl text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Phone Support</p>
              <p className="text-sm text-gray-500">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
