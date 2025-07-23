import { Download, RefreshCcw } from 'lucide-react';

interface ResultCanvasProps {
  imageUrl: string | null;
  onReset: () => void;
}

/**
 * Displays the try-on result image with download functionality
 */
const ResultCanvas = ({ imageUrl, onReset }: ResultCanvasProps) => {
  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `virtual-try-on-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-card rounded-2xl p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">Your Virtual Try-On Result</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors duration-300"
          aria-label="Try again with new images"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
      
      <div className="relative bg-background rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt="Virtual try-on result"
          className="w-full h-auto object-contain max-h-[600px]"
        />
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownload}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
          aria-label="Download result image"
        >
          <Download className="w-5 h-5" />
          Download Result
        </button>
      </div>
    </div>
  );
};

export default ResultCanvas;