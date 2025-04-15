export const handleApiError = (error: any): string => {
    if (error.response?.data?.message) {
      return error?.response?.data?.message;
    } else if (error?.request) {
      return "Network error. Please check your connection.";
    } else {
      return "An unexpected error occurred.";
    }
  };
  