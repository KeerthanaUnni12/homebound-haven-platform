
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

// Mock document data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Purchase Agreement.pdf',
    type: 'contract',
    url: '#',
    uploadedBy: '123',
    uploadedAt: new Date().toISOString(),
    propertyId: '1',
    isSecure: true,
  },
  {
    id: '2',
    name: 'Property Deed.pdf',
    type: 'deed',
    url: '#',
    uploadedBy: '456',
    uploadedAt: new Date().toISOString(),
    propertyId: '2',
    isSecure: true,
  },
];

interface DocumentContextType {
  documents: Document[];
  userDocuments: Document[];
  addDocument: (document: Omit<Document, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsForProperty: (propertyId: string) => Document[];
  isLoading: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock data or fetch from API in a real application
    setDocuments(mockDocuments);
    setIsLoading(false);
  }, []);

  const userDocuments = user
    ? documents.filter(document => document.uploadedBy === user.id)
    : [];
  
  const addDocument = (documentData: Omit<Document, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to upload a document',
        variant: 'destructive',
      });
      return;
    }
    
    const newDocument: Document = {
      ...documentData,
      id: Math.random().toString(36).substring(2, 9),
      uploadedAt: new Date().toISOString(),
      uploadedBy: user.id,
    };
    
    setDocuments([...documents, newDocument]);
    toast({
      title: 'Document Uploaded',
      description: 'Your document has been successfully uploaded',
    });
  };
  
  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(document => document.id !== id));
    
    toast({
      title: 'Document Deleted',
      description: 'Your document has been successfully deleted',
    });
  };
  
  const getDocumentsForProperty = (propertyId: string) => {
    return documents.filter(document => document.propertyId === propertyId);
  };
  
  return (
    <DocumentContext.Provider 
      value={{ 
        documents, 
        userDocuments,
        addDocument, 
        deleteDocument, 
        getDocumentsForProperty,
        isLoading 
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
