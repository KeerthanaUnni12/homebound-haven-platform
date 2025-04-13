
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ROICalculation } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Chart,
  ChartLegend,
  ChartLegendItem,
  ChartArea,
  ChartPie,
  ChartDonut,
  ChartBar
} from '@/components/ui/chart';

export const ROICalculator = () => {
  const [calculationData, setCalculationData] = useState<Omit<ROICalculation, 'results'>>({
    propertyValue: 350000,
    downPayment: 70000,
    loanAmount: 280000,
    interestRate: 4.5,
    loanTerm: 30,
    rentalIncome: 2500,
    expenses: {
      propertyTax: 300,
      insurance: 100,
      maintenance: 200,
      utilities: 0,
      propertyManagement: 250,
      other: 100,
    }
  });
  
  const [results, setResults] = useState<ROICalculation['results']>({
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    breakEvenPoint: 0,
  });

  useEffect(() => {
    // Calculate ROI metrics
    const totalMonthlyExpenses = Object.values(calculationData.expenses).reduce((a, b) => a + b, 0);
    const monthlyMortgage = calculateMonthlyMortgage(
      calculationData.loanAmount,
      calculationData.interestRate,
      calculationData.loanTerm
    );
    
    const monthlyCashFlow = calculationData.rentalIncome - totalMonthlyExpenses - monthlyMortgage;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = (annualCashFlow / calculationData.downPayment) * 100;
    
    const grossAnnualIncome = calculationData.rentalIncome * 12;
    const annualExpenses = totalMonthlyExpenses * 12 + monthlyMortgage * 12;
    const netOperatingIncome = grossAnnualIncome - (totalMonthlyExpenses * 12);
    const capRate = (netOperatingIncome / calculationData.propertyValue) * 100;
    
    // Simplified break-even calculation (months to recover down payment)
    const breakEvenPoint = monthlyCashFlow > 0 
      ? calculationData.downPayment / monthlyCashFlow 
      : 0;
    
    setResults({
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      breakEvenPoint,
    });
  }, [calculationData]);

  const calculateMonthlyMortgage = (loanAmount: number, interestRate: number, loanTerm: number) => {
    // P * (r * (1+r)^n) / ((1+r)^n - 1)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    
    return loanAmount * (numerator / denominator);
  };

  const updateExpense = (key: keyof ROICalculation['expenses'], value: number) => {
    setCalculationData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [key]: value,
      }
    }));
  };

  const handlePropertyValueChange = (value: number) => {
    // Adjust down payment and loan amount
    const newDownPayment = value * 0.2; // Assume 20% down payment
    
    setCalculationData(prev => ({
      ...prev,
      propertyValue: value,
      downPayment: newDownPayment,
      loanAmount: value - newDownPayment,
    }));
  };

  const handleDownPaymentChange = (value: number) => {
    setCalculationData(prev => ({
      ...prev,
      downPayment: value,
      loanAmount: prev.propertyValue - value,
    }));
  };

  const totalExpenses = Object.values(calculationData.expenses).reduce((a, b) => a + b, 0);
  const monthlyMortgagePayment = calculateMonthlyMortgage(
    calculationData.loanAmount, 
    calculationData.interestRate, 
    calculationData.loanTerm
  );

  const handleRentalIncomeChange = (value: number) => {
    setCalculationData(prev => ({
      ...prev,
      rentalIncome: value,
    }));
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="property" className="space-y-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="income">Income & Expenses</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="property" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <span>{formatCurrency(calculationData.propertyValue)}</span>
                  </div>
                  <Slider
                    id="propertyValue"
                    min={100000}
                    max={2000000}
                    step={10000}
                    value={[calculationData.propertyValue]}
                    onValueChange={([value]) => handlePropertyValueChange(value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>$100k</span>
                    <span>$2M</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="downPayment">Down Payment</Label>
                      <span>{formatCurrency(calculationData.downPayment)}</span>
                    </div>
                    <Slider
                      id="downPayment"
                      min={0}
                      max={calculationData.propertyValue}
                      step={5000}
                      value={[calculationData.downPayment]}
                      onValueChange={([value]) => handleDownPaymentChange(value)}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Loan Amount</Label>
                    <div className="mt-2 p-2 border rounded bg-muted/50">
                      {formatCurrency(calculationData.loanAmount)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <span>{calculationData.interestRate.toFixed(2)}%</span>
                    </div>
                    <Slider
                      id="interestRate"
                      min={1}
                      max={10}
                      step={0.1}
                      value={[calculationData.interestRate]}
                      onValueChange={([value]) => 
                        setCalculationData(prev => ({ ...prev, interestRate: value }))
                      }
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>1%</span>
                      <span>10%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <span>{calculationData.loanTerm} years</span>
                    </div>
                    <Slider
                      id="loanTerm"
                      min={15}
                      max={30}
                      step={5}
                      value={[calculationData.loanTerm]}
                      onValueChange={([value]) => 
                        setCalculationData(prev => ({ ...prev, loanTerm: value }))
                      }
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>15 yrs</span>
                      <span>30 yrs</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Monthly Mortgage Payment</p>
                  <p className="text-2xl font-bold mt-1 text-estate-navy">
                    {formatCurrency(monthlyMortgagePayment)}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="rentalIncome">Monthly Rental Income</Label>
                    <span>{formatCurrency(calculationData.rentalIncome)}</span>
                  </div>
                  <Slider
                    id="rentalIncome"
                    min={500}
                    max={10000}
                    step={50}
                    value={[calculationData.rentalIncome]}
                    onValueChange={([value]) => handleRentalIncomeChange(value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>$500</span>
                    <span>$10,000</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Monthly Expenses</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyTax">Property Tax</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="propertyTax"
                            type="number"
                            min="0"
                            value={calculationData.expenses.propertyTax}
                            onChange={(e) => updateExpense('propertyTax', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="insurance">Insurance</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="insurance"
                            type="number"
                            min="0"
                            value={calculationData.expenses.insurance}
                            onChange={(e) => updateExpense('insurance', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maintenance">Maintenance</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="maintenance"
                            type="number"
                            min="0"
                            value={calculationData.expenses.maintenance}
                            onChange={(e) => updateExpense('maintenance', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="utilities">Utilities</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="utilities"
                            type="number"
                            min="0"
                            value={calculationData.expenses.utilities}
                            onChange={(e) => updateExpense('utilities', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyManagement">Property Management</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="propertyManagement"
                            type="number"
                            min="0"
                            value={calculationData.expenses.propertyManagement}
                            onChange={(e) => updateExpense('propertyManagement', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="other">Other Expenses</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">$</span>
                          <Input
                            id="other"
                            type="number"
                            min="0"
                            value={calculationData.expenses.other}
                            onChange={(e) => updateExpense('other', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">Total Monthly Expenses</p>
                    <p className="text-xl font-bold mt-1 text-estate-navy">
                      {formatCurrency(totalExpenses)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">Monthly Mortgage</p>
                    <p className="text-xl font-bold mt-1 text-estate-navy">
                      {formatCurrency(monthlyMortgagePayment)}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Cash on Cash Return</p>
                  <p className="text-2xl font-bold mt-1 text-estate-navy">
                    {results.cashOnCashReturn.toFixed(2)}%
                  </p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Cap Rate</p>
                  <p className="text-2xl font-bold mt-1 text-estate-navy">
                    {results.capRate.toFixed(2)}%
                  </p>
                </div>
              </div>
              
              {results.breakEvenPoint > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Break-Even Point</p>
                  <p className="text-xl font-bold mt-1 text-estate-navy">
                    {Math.round(results.breakEvenPoint)} months ({Math.round(results.breakEvenPoint / 12)} years)
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Monthly Cash Flow Breakdown</h3>
                <div className="h-60">
                  <Chart type="bar">
                    <ChartBar
                      data={[
                        {
                          name: 'Rental Income',
                          value: calculationData.rentalIncome,
                        },
                        {
                          name: 'Expenses',
                          value: -totalExpenses,
                        },
                        {
                          name: 'Mortgage',
                          value: -monthlyMortgagePayment,
                        },
                        {
                          name: 'Cash Flow',
                          value: results.monthlyCashFlow,
                        },
                      ]}
                      valueFormatter={(value) => `$${Math.abs(value).toLocaleString()}`}
                      color={{
                        'Rental Income': 'green',
                        'Expenses': 'amber',
                        'Mortgage': 'red',
                        'Cash Flow': results.monthlyCashFlow >= 0 ? 'emerald' : 'rose',
                      }}
                    />
                  </Chart>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Expense Breakdown</h3>
                <div className="h-60 flex items-center justify-center">
                  <Chart type="donut" className="h-full">
                    <ChartDonut
                      data={[
                        {
                          name: 'Mortgage',
                          value: monthlyMortgagePayment,
                        },
                        {
                          name: 'Property Tax',
                          value: calculationData.expenses.propertyTax,
                        },
                        {
                          name: 'Insurance',
                          value: calculationData.expenses.insurance,
                        },
                        {
                          name: 'Maintenance',
                          value: calculationData.expenses.maintenance,
                        },
                        {
                          name: 'Property Mgmt',
                          value: calculationData.expenses.propertyManagement,
                        },
                        {
                          name: 'Utilities',
                          value: calculationData.expenses.utilities,
                        },
                        {
                          name: 'Other',
                          value: calculationData.expenses.other,
                        },
                      ]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      color={{
                        'Mortgage': 'blue',
                        'Property Tax': 'amber',
                        'Insurance': 'green',
                        'Maintenance': 'red',
                        'Property Mgmt': 'purple',
                        'Utilities': 'sky',
                        'Other': 'gray',
                      }}
                    />
                    <ChartLegend className="justify-center" />
                  </Chart>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
