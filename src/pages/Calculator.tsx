
import { Layout } from '@/components/layout/Layout';
import { ROICalculator } from '@/components/calculator/ROICalculator';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start space-x-4 mb-8">
          <div className="bg-estate-lightblue rounded-full p-3">
            <CalculatorIcon className="h-6 w-6 text-estate-navy" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">ROI Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate the potential return on investment for your real estate purchases.
            </p>
          </div>
        </div>
        
        <ROICalculator />
      </div>
    </Layout>
  );
};

export default Calculator;
