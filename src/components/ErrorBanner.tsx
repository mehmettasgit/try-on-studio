import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
  onDismiss: () => void;
}

/**
 * Error banner component for displaying upload and API errors
 * Dismissible with smooth animations
 */
const ErrorBanner = ({ error, onDismiss }: ErrorBannerProps) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-destructive text-destructive-foreground rounded-xl p-4 shadow-lg border border-destructive/20 animate-in slide-in-from-top-2 duration-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">Error</p>
            <p className="text-sm opacity-90 mt-1">{error}</p>
          </div>
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-destructive-foreground/80 hover:text-destructive-foreground transition-colors duration-200"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;