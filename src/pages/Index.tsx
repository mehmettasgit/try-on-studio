import Header from '../components/Header';
import PhotoUploader from '../components/PhotoUploader';
import ClothingUploader from '../components/ClothingUploader';
import TryOnButton from '../components/TryOnButton';
import ResultCanvas from '../components/ResultCanvas';
import ErrorBanner from '../components/ErrorBanner';
import { useTryOn } from '../hooks/useTryOn';

/**
 * Main application page for Virtual Try-On
 * Orchestrates all components and manages the try-on workflow
 */
const Index = () => {
  const {
    portraitFile,
    clothingFile,
    resultUrl,
    isLoading,
    error,
    setPortraitFile,
    setClothingFile,
    setError,
    clearError,
    performTryOn,
    reset,
    canTryOn,
  } = useTryOn();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ErrorBanner error={error} onDismiss={clearError} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PhotoUploader
            selectedFile={portraitFile}
            onFileSelect={setPortraitFile}
            onError={setError}
            label="Upload your portrait"
            icon="user"
          />
          
          <ClothingUploader
            selectedFile={clothingFile}
            onFileSelect={setClothingFile}
            onError={setError}
          />
        </div>

        {/* Try-On Button */}
        <div className="flex justify-center mb-12">
          <TryOnButton
            isDisabled={!canTryOn}
            isLoading={isLoading}
            onClick={performTryOn}
          />
        </div>

        {/* Result Section */}
        {resultUrl && (
          <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <ResultCanvas
              imageUrl={resultUrl}
              onReset={reset}
            />
          </div>
        )}

        {/* Instructions */}
        {!resultUrl && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-muted-foreground">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                  1
                </div>
                <p className="text-sm">Upload a full-body portrait photo</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                  2
                </div>
                <p className="text-sm">Upload the clothing item you want to try</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                  3
                </div>
                <p className="text-sm">See yourself wearing the outfit instantly</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
