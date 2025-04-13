
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export const ROICalculator = () => {
  const [propertyValue, setPropertyValue] = useState(350000);
  const [rentalIncome, setRentalIncome] = useState(2500);
  const [expenses, setExpenses] = useState(950);
  const [results, setResults] = useState({
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0
  });

  const calculateROI = () => {
    // Calculate basic ROI metrics
    const downPayment = propertyValue * 0.2; // Assume 20% down payment
    const monthlyCashFlow = rentalIncome - expenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
    const netOperatingIncome = (rentalIncome * 12) - (expenses * 12);
    const capRate = (netOperatingIncome / propertyValue) * 100;
    
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
  }, [propertyValue, rentalIncome, expenses]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simple ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyValue">Property Value</Label>
                <div className="flex items-center mt-1">
                  <span className="text-sm mr-2">$</span>
                  <Input
                    id="propertyValue"
                    type="number"
                    min="0"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="rentalIncome">Monthly Rental Income</Label>
                <div className="flex items-center mt-1">
                  <span className="text-sm mr-2">$</span>
                  <Input
                    id="rentalIncome"
                    type="number"
                    min="0"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="expenses">Total Monthly Expenses</Label>
                <div className="flex items-center mt-1">
                  <span className="text-sm mr-2">$</span>
                  <Input
                    id="expenses"
                    type="number"
                    min="0"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Include mortgage, taxes, insurance, maintenance, etc.
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={calculateROI}
            >
              Calculate ROI
            </Button>
            
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
