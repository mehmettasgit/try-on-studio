import { useCallback } from 'react';
import { Upload, User } from 'lucide-react';
import { validateImageFile } from '../services/tryOnService';

interface PhotoUploaderProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onError: (error: string) => void;
  label: string;
  icon?: 'user' | 'upload';
  accept?: string;
}

/**
 * File uploader component with drag-and-drop functionality
 * Shows preview thumbnail when file is selected
 */
const PhotoUploader = ({ 
  selectedFile, 
  onFileSelect, 
  onError, 
  label,
  icon = 'upload',
  accept = 'image/*'
}: PhotoUploaderProps) => {
  
  const handleFileChange = useCallback((file: File | null) => {
    if (!file) {
      onFileSelect(null);
      return;
    }

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      onError(validation.error || 'Invalid file');
      return;
    }

    onFileSelect(file);
  }, [onFileSelect, onError]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const IconComponent = icon === 'user' ? User : Upload;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      
      <div
        className="relative border-2 border-dashed border-border rounded-2xl p-8 text-center bg-gradient-card hover:border-accent transition-all duration-300 cursor-pointer group"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        
        {selectedFile ? (
          <div className="space-y-4">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt={icon === 'user' ? 'Portrait preview' : 'Clothing preview'}
              className="max-h-48 max-w-full mx-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground">
              {selectedFile.name}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
              }}
              className="text-xs text-accent hover:text-accent/80 underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-secondary group-hover:bg-accent/20 transition-colors duration-300">
              <IconComponent className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            </div>
            <div>
              <p className="text-foreground font-medium">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports JPEG, PNG, WebP (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;