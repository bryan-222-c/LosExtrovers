import { useState, useEffect } from 'react';

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  threshold?: number; // threshold for white detection (0-255)
}

export function TransparentImage({ src, alt, className = '', threshold = 238 }: TransparentImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

  useEffect(() => {
    if (!src) return;
    setProcessedSrc(src);

    let isMounted = true;
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          if (isMounted) setProcessedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Scan every pixel and set alpha to 0 if it is close to pure white
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Color distance to white (255, 255, 255)
          const dr = 255 - r;
          const dg = 255 - g;
          const db = 255 - b;
          const distance = Math.sqrt(dr * dr + dg * dg + db * db);

          if (distance < 35) {
            data[i + 3] = 0; // Transparent
          } else if (distance < 70) {
            const ratio = (distance - 35) / (70 - 35);
            data[i + 3] = Math.floor(ratio * 255);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        if (isMounted) {
          setProcessedSrc(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        if (isMounted) setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setProcessedSrc(src);
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, threshold]);

  return (
    <img 
      src={processedSrc || src} 
      alt={alt} 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
