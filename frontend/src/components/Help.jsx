import React, { useRef } from "react";

const Help = () => {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const size = textareaRef.current;
    size.style.height = "auto";
    size.style.height = size.scrollHeight + "px";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Info */}
        <section className="rounded-xl bg-white border border-gray-200 p-6">
          <h1 className="text-xl font-semibold mb-2">
            Help & How It Works
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Browse items from students, open listings to view details,
            and contact sellers directly. Manage your own listings from
            your profile. Transactions are handled between users not by our website we only link them.
          </p>
        </section>

        {/* Rules */}
        <section className="rounded-xl bg-white border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-2">
            Marketplace guidelines
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Accurate listings only</li>
            <li>Clear pricing</li>
            <li>Respectful communication</li>
            <li>No prohibited items</li>
          </ul>
        </section>

        {/* Report */}
        <section className="rounded-xl bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Report a problem
          </h2>

          <textarea
            ref={textareaRef}
            rows={3}
            onInput={autoResize}
            placeholder="Describe the issue..."
            className="w-full resize-none overflow-hidden rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button className="rounded-lg bg-red-800 px-5 py-2 text-sm font-medium text-white hover:bg-red-600 cursor-pointer">
            Report
          </button>
        </section>

      </div>
    </div>
  );
};

export default Help;
