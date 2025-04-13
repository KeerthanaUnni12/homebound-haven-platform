
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ROIResults } from './ROICalculator';

type ROICalculatorResultsProps = {
  results: ROIResults;
};

export const ROICalculatorResults = ({ results }: ROICalculatorResultsProps) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium">Monthly Cash Flow</p>
          <p className={`text-2xl font-bold mt-1 ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(results.monthlyCashFlow)}
          </p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium">Annual Cash Flow</p>
          <p className={`text-2xl font-bold mt-1 ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(results.annualCashFlow)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium">Cash on Cash Return</p>
          <p className="text-2xl font-bold mt-1 text-estate-navy">
            {results.cashOnCashReturn.toFixed(2)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Based on 20% down payment
          </p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium">Cap Rate</p>
          <p className="text-2xl font-bold mt-1 text-estate-navy">
            {results.capRate.toFixed(2)}%
          </p>
        </div>
      </div>
    </>
  );
};
