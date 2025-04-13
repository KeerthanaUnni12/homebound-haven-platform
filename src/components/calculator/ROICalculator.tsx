
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROICalculatorForm } from './ROICalculatorForm';
import { ROICalculatorResults } from './ROICalculatorResults';

export type ROIValues = {
  propertyValue: number;
  rentalIncome: number;
  expenses: number;
};

export type ROIResults = {
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
};

export const ROICalculator = () => {
  const [values, setValues] = useState<ROIValues>({
    propertyValue: 350000,
    rentalIncome: 2500,
    expenses: 950,
  });

  const [results, setResults] = useState<ROIResults>({
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0
  });

  const calculateROI = () => {
    // Calculate basic ROI metrics
    const downPayment = values.propertyValue * 0.2; // Assume 20% down payment
    const monthlyCashFlow = values.rentalIncome - values.expenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
    const netOperatingIncome = (values.rentalIncome * 12) - (values.expenses * 12);
    const capRate = (netOperatingIncome / values.propertyValue) * 100;
    
    setResults({
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      capRate
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateROI();
  }, [values]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simple ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ROICalculatorForm 
              values={values} 
              setValues={setValues}
              onCalculate={calculateROI}
            />
            
            <ROICalculatorResults results={results} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
