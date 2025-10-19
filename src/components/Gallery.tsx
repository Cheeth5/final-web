import React, { useState, useEffect, useRef } from 'react';

// Media will be loaded dynamically from public folder
const photos: string[] = [];
const videos: string[] = [];

import { ArrowLeft, ArrowRight, Download } from 'lucide-react';



// List of media files in public folder (update this array as needed)
const publicMediaFiles = [
  '1Untitled.jpg',
  '2Untitled.jpg',
  '4Untitled.jpg',
  '15Untitled.jpg',
  '1748801160382.jfif',
  '1748801161406.jfif',
  '1748801161725.jfif',
  '1750936868529.mp4',
  '2025_03_08_13_45_IMG_6736.JPG',  
  '2025_03_15_16_51_IMG_6807.jpg',  
  '2025_03_30_03_54_IMG_6989.MOV',
  '2025_03_30_04_33_IMG_6990.MOV',
  '2025_04_12_09_33_IMG_7222.jpg',
  '2025_04_12_09_44_IMG_7229.jpg',
  '2025_04_16_22_38_IMG_7282.jpg',
  '2025_04_20_16_08_IMG_7346.MOV',
  '2025_04_20_16_24_IMG_7354.MOV',
  '2025_04_20_16_33_IMG_7356.MOV',
  '2025_04_20_16_51_IMG_7358.MOV',
  '2025_04_20_17_35_IMG_7362.jpg',
  '2025_04_20_17_35_IMG_7365.jpg',
  '2025_04_20_17_35_IMG_7366.jpg',
  '2025_04_20_17_49_IMG_7367.jpg',
  '2025_04_20_23_59_IMG_7381.JPEG',
  '2025_04_26_15_08_IMG_7481.jpg',
  '2025_04_26_17_48_IMG_7496.jpg',
  '2025_04_26_17_48_IMG_7498.jpg',
  '2025_04_26_17_53_IMG_7499.jpg',
  '2025_04_26_17_54_IMG_7502.jpg',
  '2025_04_26_17_55_IMG_7504.jpg',
  '2025_04_26_17_56_IMG_7509.jpg',
  '2025_04_26_17_57_IMG_7510.jpg',
  '2025_04_30_16_50_IMG_7548.jpg',
  '2025_04_30_20_45_IMG_7552.MOV',
  '2025_04_30_22_16_IMG_7553.JPG',
  '2025_05_01_12_29_IMG_7561.JPG',
  '2025_05_01_15_56_IMG_7568.jpg',
  '2025_05_01_16_00_IMG_7570.jpg',
  '2025_05_01_16_06_IMG_7575.jpg',
  '2025_05_01_16_06_IMG_7576.jpg',
  '2025_05_01_16_06_IMG_7577.jpg',
  '2025_05_01_16_06_IMG_7578.jpg',
  '2025_05_01_16_25_IMG_7579.jpg',
  '2025_05_01_16_25_IMG_7580.jpg',
  '2025_05_01_16_48_IMG_7581.jpg',
  '2025_05_01_16_49_IMG_7582.jpg',
  '2025_05_01_16_49_IMG_7583.jpg',
  '2025_05_01_17_13_IMG_7584.jpg',
  '2025_05_01_17_13_IMG_7585.jpg',
  'Almost Done ✨ (1).jpg',  
  'Almost Done ✨ (2).jpg',  
  'Almost Done ✨ (3).jpg',  
  'Almost Done ✨.jpg',  
  'Almost Done ✨.mp4',
  'WhatsApp Image 2025-07-01 at 15.28.28.jpeg',
  'WhatsApp Image 2025-07-07 at 18.08.35.jpeg',
  'WhatsApp Image 2025-07-07 at 18.08.36.jpeg',
  'WhatsApp Image 2025-07-07 at 19.16.41.jpeg',
  'WhatsApp Image 2025-07-10 at 19.00.45.jpeg',
  'WhatsApp Image 2025-07-10 at 19.00.47 (1).jpeg',
  'WhatsApp Image 2025-07-10 at 19.00.47.jpeg',
  'WhatsApp Video 2025-07-01 at 15.15.43.mp4',
  'WhatsApp Video 2025-07-07 at 18.08.40.mp4',
  'WhatsApp Video 2025-07-07 at 19.43.44.mp4',
];

const media = publicMediaFiles.map((filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext) {
    if (["jpg", "jpeg", "jfif", "png"].includes(ext)) {
      return { type: 'photo', src: `/${filename}` };
    } else if (["mp4", "webm", "mov"].includes(ext)) {
      return { type: 'video', src: `/${filename}` };
    }
  }
  return null;
}).filter(Boolean) as Array<{ type: 'photo' | 'video'; src: string }>;

export default function Gallery() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentMedia = media[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIdx((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = () => {
    if (!currentMedia) return;
    const link = document.createElement('a');
    link.href = currentMedia.src;
    link.download = currentMedia.src.split('/').pop() || 'media';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (currentMedia?.type === 'video' && videoRef.current) {
      // When the source changes, we need to manually load and play the new video.
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, [currentMedia?.src]);
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-sky-600">Robot Gallery</h1>
      <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 border border-sky-100">
        <div className="relative w-full flex items-center justify-center bg-sky-50 rounded-lg h-80">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-sky-200 rounded-full p-2 shadow hover:bg-sky-100"
            aria-label="Previous"
          >
            <ArrowLeft className="w-6 h-6 text-sky-600" />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            {currentMedia ? (
              currentMedia.type === 'photo' ? (
                <img
                  src={currentMedia.src}
                  alt="Gallery item"
                  className="max-h-72 max-w-full rounded-lg object-contain shadow border border-sky-200 bg-white"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={currentMedia.src}
                  key={currentMedia.src}
                  controls
                  autoPlay
                  muted
                  className="w-full h-72 rounded-lg shadow border border-sky-200 bg-white"
                />
              )
            ) : (
              <span className="text-gray-400">No media available</span>
            )}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-sky-200 rounded-full p-2 shadow hover:bg-sky-100"
            aria-label="Next"
          >
            <ArrowRight className="w-6 h-6 text-sky-600" />
          </button>
        </div>
        <button
          onClick={handleDownload}
          className="mt-6 flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-full shadow hover:bg-sky-600 transition"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
