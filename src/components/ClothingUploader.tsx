import PhotoUploader from './PhotoUploader';

interface ClothingUploaderProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onError: (error: string) => void;
}

/**
 * Specialized uploader for clothing images
 * Uses the same PhotoUploader component with clothing-specific props
 */
const ClothingUploader = ({ selectedFile, onFileSelect, onError }: ClothingUploaderProps) => {
  return (
    <PhotoUploader
      selectedFile={selectedFile}
      onFileSelect={onFileSelect}
      onError={onError}
      label="Upload clothing image"
      icon="upload"
    />
  );
};

export default ClothingUploader;