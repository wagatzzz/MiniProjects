import React, { useState } from 'react';

const Calculator = ({ onCalculate }) => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [rate, setRate] = useState('');

  const handleRepayment = () => {
    onCalculate(amount, term, rate, 'repayment');
  };

  const handleInterestOnly = () => {
    onCalculate(amount, term, rate, 'interestOnly');
  };

  return (
    <div className="bg-white text-black p-4 rounded-l-lg w-full h-full shadow-md">
      <div className="mb-4">
        <label className="block mb-8 text-2xl font-bold text-teal-900">Mortgage Calculator</label>
        <label className="block text-gray-400">Mortgage Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-black rounded-md text-black"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-gray-400">Mortgage Term</label>
          <div className="flex items-center">
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="p-2 rounded-l-md border border-y-black border-s-black text-black w-3/4"
            />
            <span className="p-2 text-black bg-blue-200 border border-black rounded-r-md border-s-white">
              years
            </span>
          </div>
        </div>
        <div>
          <label className="block text-gray-400">Mortgage Rate</label>
          <div className="flex items-center">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="p-2 rounded-l-md border border-y-black border-s-black text-black"
            />
            <span className="py-2 px-4 text-black bg-blue-200 border border-black rounded-r-md border-s-white">
              %
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="block text-gray-400">Mortgage Rate</label>
        <button
          onClick={handleRepayment}
          className="hover:bg-gray-300 text-teal-900 font-bold py-2 px-4 rounded w-96 border border-black"
        >
          Repayment
        </button>
        <button
          onClick={handleInterestOnly}
          className="hover:bg-gray-300 text-teal-900 font-bold py-2 px-4 rounded w-96 border border-black"
        >
          Interest Only
        </button>
      </div>
    </div>
  );
};

export default Calculator;
