import { Loader2, Sparkles } from 'lucide-react';

interface TryOnButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

/**
 * Main action button for triggering the try-on process
 * Shows loading state and prevents multiple submissions
 */
const TryOnButton = ({ isDisabled, isLoading, onClick }: TryOnButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`
        relative px-8 py-4 rounded-full font-semibold text-lg
        transition-all duration-300 transform
        ${isDisabled || isLoading
          ? 'bg-muted text-muted-foreground cursor-not-allowed'
          : 'bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 active:scale-95'
        }
      `}
      aria-label={isLoading ? 'Processing try-on...' : 'Start virtual try-on'}
    >
      {isLoading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          <span>Try It On</span>
        </div>
      )}
    </button>
  );
};

export default TryOnButton;