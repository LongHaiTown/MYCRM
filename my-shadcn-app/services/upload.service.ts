import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';

export const uploadService = {
  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      console.log('Uploading to:', `${API_URL}/api/upload`);
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      return response.data.imagePaths;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Upload error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: error.config,
        });
      }
      throw error;
    }
  },
}; 