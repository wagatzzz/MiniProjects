import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="bg-cyan-900 text-white p-4 md:p-8 lg:p-8 rounded-r-lg w-full h-full md:h-96 flex flex-col justify-center items-center shadow-2xl">
    {results ? (
        results.type === 'repayment' ? (
            <>
                <div className="flex flex-col bg-cyan-950 p-4 rounded-lg w-full md:w-auto">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Monthly Repayment</h3>
                        <p>${results.monthlyRepayment.toFixed(2)}</p>
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Total Repayment</h3>
                        <p>${results.totalRepayment.toFixed(2)}</p>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="mb-4 w-full md:w-auto">
                    <h3 className="text-lg font-bold">Total Interest</h3>
                    <p>${results.totalInterest.toFixed(2)}</p>
                </div>
            </>
        )
    ) : (
        <div className="text-center w-full md:w-auto">
            <h3 className="text-xl md:text-2xl font-semibold px-10 md:px-20">Results shown here</h3>
            <p className='font-light p-4'>Complete the form and click the buttons to see what your monthly/repayments would be.</p>
        </div>
    )}
</div>

    );
};

export default Results;
