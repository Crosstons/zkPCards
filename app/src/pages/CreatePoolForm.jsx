import React, { useState } from 'react';

function CreatePoolForm() {
  const [poolType, setPoolType] = useState('');
  const [poolName, setPoolName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ poolType, poolName, amount });
    // Add logic to handle form submission
  };

  // Determine the theme color based on the pool type
  const themeColor = poolType === 'credit' ? 'orange' : 'blue';

  return (
    <div className="container mx-auto p-6">
      <div className={`max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md transition duration-500 hover:shadow-lg ${themeColor === 'orange' ? 'border-orange-500' : 'border-blue-500'}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Create Pools</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pool Type</label>
            <select 
              value={poolType} 
              onChange={(e) => setPoolType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
            >
              <option value="">Select Pool Type</option>
              <option value="credit">Credit Pools</option>
              <option value="debit">Debit Pools</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pool Name</label>
            <input 
              type="text" 
              value={poolName} 
              onChange={(e) => setPoolName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
              placeholder="Enter pool name"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700 text-lg">$</span>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg  text-5xl text-gray-700 placeholder-gray-400 focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`"
              placeholder="$0.00"
            />
          </div>

          <button type="submit" className={`w-full py-2 px-4 rounded-lg transition duration-300 font-bold ${themeColor === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoolForm;
