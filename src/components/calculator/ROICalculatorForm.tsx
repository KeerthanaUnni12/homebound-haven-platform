
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ROIValues } from './ROICalculator';

type ROICalculatorFormProps = {
  values: ROIValues;
  setValues: React.Dispatch<React.SetStateAction<ROIValues>>;
  onCalculate: () => void;
};

export const ROICalculatorForm = ({ values, setValues, onCalculate }: ROICalculatorFormProps) => {
  const handleChange = (field: keyof ROIValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [field]: Number(e.target.value)
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="propertyValue">Property Value (₹)</Label>
        <div className="flex items-center mt-1">
          <span className="text-sm mr-2">₹</span>
          <Input
            id="propertyValue"
            type="number"
            min="0"
            value={values.propertyValue}
            onChange={handleChange('propertyValue')}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="rentalIncome">Monthly Rental Income (₹)</Label>
        <div className="flex items-center mt-1">
          <span className="text-sm mr-2">₹</span>
          <Input
            id="rentalIncome"
            type="number"
            min="0"
            value={values.rentalIncome}
            onChange={handleChange('rentalIncome')}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="expenses">Total Monthly Expenses (₹)</Label>
        <div className="flex items-center mt-1">
          <span className="text-sm mr-2">₹</span>
          <Input
            id="expenses"
            type="number"
            min="0"
            value={values.expenses}
            onChange={handleChange('expenses')}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Include mortgage, taxes, insurance, maintenance, etc.
        </p>
      </div>
      
      <Button 
        className="w-full mt-4" 
        onClick={onCalculate}
      >
        Calculate ROI
      </Button>
    </div>
  );
};
