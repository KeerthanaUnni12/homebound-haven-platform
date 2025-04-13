
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentUploadForm } from '@/components/documents/DocumentUploadForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Documents = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-lg text-muted-foreground">
              Securely store and manage your real estate documents.
            </p>
          </div>
          
          <Dialog open={isUploading} onOpenChange={setIsUploading}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <DocumentUploadForm onSuccess={() => setIsUploading(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-estate-lightblue rounded-full p-3">
              <FileText className="h-6 w-6 text-estate-navy" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Secure Document Storage</h2>
              <p className="text-muted-foreground mt-1 mb-3">
                All documents uploaded to our platform are encrypted and securely stored.
                Only you and authorized parties can access your documents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <h3 className="font-medium">End-to-End Encryption</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your documents are encrypted before transmission and storage.
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-medium">Access Control</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You control who can view and download your documents.
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-medium">Transaction Records</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All document actions are recorded for transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
          <DocumentList />
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
