export const handleImageUpload = (
  file: File | null,
  callback: (result: string) => void
): void => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      callback(result);
    };
    reader.readAsDataURL(file);
  }
};

export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

export const downloadImages = (images: string[]): void => {
  images.forEach((image, index) => {
    downloadImage(image, `slide-${index + 1}.png`);
  });
};
