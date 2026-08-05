import React, { useState } from "react";
import data from "./data";

export default function Accord() {
  const [openItems, setOpenItems] = useState([]);
  const [isMultiEnabled, setIsMultiEnabled] = useState(false);

  const toggleItem = (id) => {
    if (isMultiEnabled) {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }}
    else{
        if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      setOpenItems([id]);
    }
}
  };

  const toggleAll = () => {
    if (openItems.length === data.length) {
      setOpenItems([]);
    } else {
      setOpenItems(data.map(item => item.id));
    }
  };

  
  const allOpen = data && openItems.length === data.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-800 p-4">
      <button 
        onClick={toggleAll} 
        className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors font-medium shadow-sm cursor-pointer"
      >
        {allOpen ? "Close All" : "Open All"}
      </button>
      <button onClick={() => setIsMultiEnabled(!isMultiEnabled)} className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors font-medium shadow-sm cursor-pointer">
        {isMultiEnabled ? "Multi-Enabled (click to disable)" : "Enable Multi"}
      </button>

      <div className="w-full max-w-2xl bg-white dark:bg-red-700 shadow-md rounded-lg p-2">
        {data && data.length > 0 ? (
          data.map((item) => {
            const isOpen = openItems.includes(item.id);
            
            return (
              <div key={item.id} className="m-2">
                
                <div 
                  className="flex justify-between items-center bg-red-200 dark:bg-red-600 p-4 rounded cursor-pointer select-none" 
                  onClick={() => toggleItem(item.id)}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <span className={`transform transition-transform duration-300 dark:text-white font-bold text-lg`}>
                    {isOpen ? "-" : "+"}
                  </span>
                </div>

                {isOpen && (
                  <div className="p-4 bg-red-50 dark:bg-red-800 text-gray-700 dark:text-gray-300 rounded-b border border-t-0 border-gray-200 dark:border-gray-600">
                    {item.answer}
                  </div>
                )}
                
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center p-4">No questions available.</p>
        )}
      </div>
    </div>
  );
}