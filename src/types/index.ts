// User related types
export type UserRole = 'buyer' | 'seller' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Property related types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string; // Using only address field
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  images: string[];
  features: string[];
  sellerId: string;
  sellerName: string;
  createdAt: string;
  status: 'available' | 'pending' | 'sold';
  propertyType: 'house' | 'apartment' | 'land';
}

// Document related types
export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'deed' | 'inspection' | 'mortgage' | 'other';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  propertyId: string;
  isSecure: boolean;
}

// ROI Calculator related types
export interface ROICalculation {
  propertyValue: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  rentalIncome: number;
  expenses: {
    propertyTax: number;
    insurance: number;
    maintenance: number;
    utilities: number;
    propertyManagement: number;
    other: number;
  };
  results: {
    monthlyCashFlow: number;
    annualCashFlow: number;
    cashOnCashReturn: number;
    capRate: number;
    breakEvenPoint: number;
  };
}

// Chat related types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}
