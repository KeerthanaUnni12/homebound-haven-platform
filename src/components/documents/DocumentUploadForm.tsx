
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useDocument } from '@/contexts/DocumentContext';
import { useProperty } from '@/contexts/PropertyContext';
import { Upload, Lock } from 'lucide-react';

interface DocumentUploadFormProps {
  onSuccess?: () => void;
  propertyId?: string;
}

export const DocumentUploadForm = ({ onSuccess, propertyId }: DocumentUploadFormProps) => {
  const { addDocument } = useDocument();
  const { properties } = useProperty();
  
  const [name, setName] = useState('');
  const [documentType, setDocumentType] = useState<'contract' | 'deed' | 'inspection' | 'mortgage' | 'other'>('contract');
  const [isSecure, setIsSecure] = useState(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState(propertyId || '');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !selectedPropertyId) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, we would upload the file to a secure storage
      // For demo purposes, we're just simulating the upload
      await addDocument({
        name,
        type: documentType,
        url: '#', // Would be the URL of the uploaded file in a real app
        propertyId: selectedPropertyId,
        isSecure,
      });
      
      // Reset form
      setName('');
      setFile(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to upload document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="document-name">Document Name</Label>
        <Input
          id="document-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Purchase Agreement"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="document-type">Document Type</Label>
        <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
          <SelectTrigger id="document-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="deed">Deed</SelectItem>
            <SelectItem value="inspection">Inspection Report</SelectItem>
            <SelectItem value="mortgage">Mortgage Document</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {!propertyId && (
        <div className="space-y-2">
          <Label htmlFor="property">Related Property</Label>
          <Select 
            value={selectedPropertyId} 
            onValueChange={setSelectedPropertyId}
            required
          >
            <SelectTrigger id="property">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="file">Upload Document</Label>
        <div className="border border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your file here, or click to select
            </p>
            <Input
              id="file"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => document.getElementById('file')?.click()}
              className="mt-2"
            >
              Select File
            </Button>
            {file && (
              <p className="text-sm mt-2 text-green-600">
                Selected: {file.name}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, DOCX, JPEG, PNG (max 10MB)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              For demo purposes, file upload is simulated.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="secure"
          checked={isSecure}
          onCheckedChange={setIsSecure}
        />
        <Label htmlFor="secure" className="flex items-center cursor-pointer">
          <Lock className="h-4 w-4 mr-1" />
          Secure document (encrypted storage)
        </Label>
      </div>
      
      <Button type="submit" disabled={isSubmitting || !name} className="w-full">
        {isSubmitting ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  );
};
