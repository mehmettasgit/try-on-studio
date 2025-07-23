import { useState, useCallback } from 'react';
import { tryOnPortrait, TryOnResult } from '../services/tryOnService';

interface UseTryOnState {
  portraitFile: File | null;
  clothingFile: File | null;
  resultUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing virtual try-on state and operations
 */
export const useTryOn = () => {
  const [state, setState] = useState<UseTryOnState>({
    portraitFile: null,
    clothingFile: null,
    resultUrl: null,
    isLoading: false,
    error: null,
  });

  const setPortraitFile = useCallback((file: File | null) => {
    setState(prev => ({ ...prev, portraitFile: file, resultUrl: null }));
  }, []);

  const setClothingFile = useCallback((file: File | null) => {
    setState(prev => ({ ...prev, clothingFile: file, resultUrl: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const performTryOn = useCallback(async () => {
    if (!state.portraitFile || !state.clothingFile) {
      setError('Please upload both portrait and clothing images');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result: TryOnResult = await tryOnPortrait(state.portraitFile, state.clothingFile);
      
      if (result.success && result.imageUrl) {
        setState(prev => ({ 
          ...prev, 
          resultUrl: result.imageUrl, 
          isLoading: false 
        }));
      } else {
        throw new Error(result.message || 'Try-on failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        isLoading: false 
      }));
    }
  }, [state.portraitFile, state.clothingFile, setError]);

  const reset = useCallback(() => {
    setState({
      portraitFile: null,
      clothingFile: null,
      resultUrl: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const canTryOn = Boolean(state.portraitFile && state.clothingFile && !state.isLoading);

  return {
    ...state,
    setPortraitFile,
    setClothingFile,
    setError,
    clearError,
    performTryOn,
    reset,
    canTryOn,
  };
};