"use client";
import React, { useState, useEffect } from "react";
import Attachment from "./Attachment";
import { Attachment as attachment } from "@prisma/client";

const Gallery = ({ attachments }: { attachments: attachment[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Abrir el modal
  const openModal = () => setIsOpen(true);

  // Cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Cambiar la imagen actual (flecha derecha e izquierda)
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % attachments.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + attachments.length) % attachments.length
    );
  };

  // Manejar eventos de teclado (esc, flechas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal(); // Cerrar el modal con ESC
      } else if (e.key === "ArrowRight") {
        goToNext(); // Ir a la siguiente imagen con la flecha derecha
      } else if (e.key === "ArrowLeft") {
        goToPrev(); // Ir a la imagen anterior con la flecha izquierda
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Limpiar el evento cuando el modal se cierre
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, attachments.length, goToNext, goToPrev]);

  return (
    <>
      {attachments.map((attachment, index) => (
        <Attachment
          key={index}
          attachment={attachment}
          onClick={() => {
            setCurrentIndex(index);
            openModal();
          }}
        />
      ))}

      {/* Modal lightbox */}
      {isOpen && (
        <div className="lightbox-modal" onClick={closeModal}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={attachments[currentIndex].url}
              alt={`Image ${currentIndex}`}
              className="lightbox-image"
            />
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>

            {/* Navegación con flechas */}
            <button className="prev-btn" onClick={goToPrev}>
              ←
            </button>
            <button className="next-btn" onClick={goToNext}>
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
