import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

type MediaItem = {
  type: "image" | "video";
  url: string;
  id: string;
};

type CarouselProps = {
  mediaItems: MediaItem[];
  callback?: () => void;
};

const Carousel: React.FC<CarouselProps> = ({ mediaItems, callback }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseVideo = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });
  }, [currentIndex])

  const handleCallback = () => {
    if (callback) {
      callback();
      pauseVideo();
    }
  };

  useEffect(() => {
    pauseVideo();
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-full mx-auto">
      {/* Contenedor del carousel */}
      <div className="relative overflow-hidden rounded-lg h-full">
        {/* Flecha izquierda */}
        <button
          onClick={goToPrevious}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 
            bg-black bg-opacity-50 text-white p-2 
            rounded-full hover:bg-opacity-75 transition z-10 
            `}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Contenedor de medios (imágenes o videos) */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mediaItems.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 h-full w-full"
              onClick={handleCallback}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`Slide ${item.id}`}
                  className="h-full mx-auto"
                />
              ) : (
                <video
                  controls
                  className="h-full object-cover mx-auto"
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                >
                  <source src={item.url} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              )}
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots (puntos de navegación) */}
      <div className="flex justify-center mt-4 space-x-2">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
