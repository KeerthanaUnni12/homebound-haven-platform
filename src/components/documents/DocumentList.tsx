
import { useState } from 'react';
import { Document } from '@/types';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Lock, Check, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface DocumentListProps {
  propertyId?: string;
}

export const DocumentList = ({ propertyId }: DocumentListProps) => {
  const { documents, deleteDocument } = useDocument();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDocuments = propertyId 
    ? documents.filter(doc => doc.propertyId === propertyId)
    : documents;
  
  const searchedDocuments = searchQuery
    ? filteredDocuments.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredDocuments;
  
  const handleDownload = (document: Document) => {
    // In a real app, this would trigger a download
    toast({
      title: 'Document Download',
      description: `${document.name} would be downloaded in a real application.`,
    });
  };
  
  const handleDelete = (id: string) => {
    deleteDocument(id);
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'deed': return 'bg-green-100 text-green-800';
      case 'inspection': return 'bg-amber-100 text-amber-800';
      case 'mortgage': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (filteredDocuments.length === 0) {
    return (
      <div className="text-center py-10">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground/60" />
        <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
        <p className="mt-1 text-muted-foreground">
          {propertyId 
            ? 'Upload your first document for this property.'
            : 'Start by uploading your first document.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        {searchedDocuments.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No documents found matching your search.
          </p>
        ) : (
          searchedDocuments.map((document) => (
            <div 
              key={document.id} 
              className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-muted rounded-md p-2">
                  <FileText className="h-5 w-5 text-estate-navy" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{document.name}</h4>
                    {document.isSecure && (
                      <Lock className="h-3 w-3 text-estate-navy" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className={`${getTypeColor(document.type)} capitalize`}>
                      {document.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleDownload(document)}>
                  <Download className="h-4 w-4" />
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this document?
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>Cancel</Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(document.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
