/**
 * Virtual Try-On API service
 * Handles communication with the back-end try-on API
 */

export interface TryOnResult {
  imageUrl: string;
  success: boolean;
  message?: string;
}

export async function tryOnPortrait(portraitFile: File, clothingFile: File): Promise<TryOnResult> {
  try {
    const formData = new FormData();
    formData.append('portrait', portraitFile);
    formData.append('clothing', clothingFile);
    
    const response = await fetch('/api/try-on', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server error: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Try-on API error:', error);
    throw error;
  }
}

/**
 * Validates image file before upload
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Please upload a valid image file (JPEG, PNG, or WebP)' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }
  
  return { isValid: true };
}