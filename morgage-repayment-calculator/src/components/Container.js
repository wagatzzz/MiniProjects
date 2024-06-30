import React, { useState } from 'react';
import Calculator from './Calculator';
import Results from './Results';

const Container = () => {
  const [results, setResults] = useState(null);

  const calculateMortgage = (amount, term, rate, type) => {
    const principal = parseFloat(amount);
    const years = parseFloat(term);
    const interestRate = parseFloat(rate) / 100;

    if (type === 'repayment') {
      const monthlyRate = interestRate / 12;
      const numberOfPayments = years * 12;
      
      // Calculate monthly repayment
      const monthlyRepayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      
      // Calculate total repayment
      const totalRepayment = monthlyRepayment * numberOfPayments;

      setResults({
        type: 'repayment',
        monthlyRepayment,
        totalRepayment,
      });
    } else {
      // Calculate total interest for interest-only
      const totalInterest = principal * interestRate * years;

      setResults({
        type: 'interestOnly',
        totalInterest,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <Calculator onCalculate={calculateMortgage} />
      </div>
      <div className="w-full max-w-md">
        <Results results={results} />
      </div>
    </div>
  );
};

export default Container;
