import React, { useState } from 'react'

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="px-4 md:px-8 max-w-5xl mx-auto mt-10">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center items-center border-b border-gray-300">
        <button
          onClick={() => setActiveTab('description')}
          className={`w-full sm:w-auto px-6 py-3 font-semibold text-base transition-all duration-300 
          ${activeTab === 'description'
              ? 'text-[#1560BD] border-b-2 border-[#1560BD]'
              : 'text-gray-600 hover:text-[#1560BD]'
            }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`w-full sm:w-auto px-6 py-3 font-semibold text-base transition-all duration-300 
          ${activeTab === 'reviews'
              ? 'text-[#1560BD] border-b-2 border-[#1560BD]'
              : 'text-gray-600 hover:text-[#1560BD]'
            }`}
        >
          Reviews (62)
        </button>
      </div>

      {/* Content Box */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-10 mt-6 transition-all duration-300 hover:shadow-md">
        {activeTab === 'description' ? (
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            "The best shopping app out there. I've never had an issue with a purchase, 
            and their customer service is top-notch. A truly user-friendly experience 
            from start to finish."
          </p>
        ) : (
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Customer Reviews</h3>
            <p className="text-gray-600 text-sm md:text-base">
              “Great quality products and fast delivery! Highly recommended.”
            </p>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              “Customer service is excellent — they resolved my query instantly.”
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
