"use client";
import React, { useEffect, useId, useState } from "react";
import { formatBytes } from "@/utils/utils";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

export type FileType = {
  url: string;
  id?: string;
  publicId?: string;
  deleted?: boolean;
  file?: File;
};

type Props = {
  value: FileType[] | null | File[];
  onChange: (newValue: FileType[] | File[]) => void;
  name?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  required?: boolean;
  maxSize?: number;
  maxFiles?: number;
  acceptedMimeTypes?: string[] | string;
  className?: string;
};

const mimeTypes: string[] = [
  // JPEG image
  "image/jpeg", // .jpeg, .jpg

  // PNG image
  "image/png", // .png
  "video/mp4", // .mp4
  // "video/mov", // .mov
  // "video/quicktime", // .mov (QuickTime)
  // "video/mpeg", // .mpeg
  "video/webm", // .webm
  "video/3gpp", // .3gpp
  "video/3gpp2", // .3g2
  // WebP image
  "image/webp", // .webp

  // HEIC image
  "image/heic", // .heic
  "image/heif", // .heif (High Efficiency Image Format, often used interchangeably with HEIC)

  // Other formats
  "image/jp2", // .jp2 (JPEG 2000)
  "image/avif", // .avif (AV1 Image File Format)
];

const labelFileUploader = (label: string | undefined, required: boolean) => {
  if (label) {
    return (
      <label className="block mb-2 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    );
  }
  return null;
};

export default function MultipleFileUploader({
  value,
  onChange,
  maxSize = 15,
  maxFiles = 5,
  name,
  hint,
  disabled,
  required = false,
  acceptedMimeTypes = mimeTypes,
  className,
  label,
}: Props) {
  const id = useId();

  const validateSize = (file: File) => {
    if (maxSize && file.size > maxSize * 1000000) {
      toast.error(
        `El tamano del archivo no puede superar ${formatBytes(
          maxSize * 1000000
        )}`
      );
      return false;
    }
    return true;
  };

  const [files, setFiles] = useState<FileType[]>(value || []);

  useEffect(() => {
    setFiles(value || []);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (fileList.length > maxFiles) {
      toast.error(`Solo se pueden subir ${maxFiles} archivos`);
      return null;
    }

    const newFiles: FileType[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      newFiles.push({ file, url: URL.createObjectURL(file) });
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange([...(value || []), ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fileList = e.dataTransfer.files;
    if (!fileList) return;

    if (fileList.length > maxFiles) {
      toast.error(`Solo se pueden subir ${maxFiles} archivos`);
      return null;
    }

    e.preventDefault();
    validateSize(e.dataTransfer.files[0]);

    const newFiles: FileType[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      newFiles.push({ file, url: URL.createObjectURL(file) });
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange([...value, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Manejador para eliminar archivos
  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    const deletedFile = updatedFiles[index];

    if (deletedFile.url && !deletedFile.url.startsWith("blob")) {
      updatedFiles[index] = { ...deletedFile, deleted: true };
      onChange(updatedFiles);
    } else {
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
    }
  };

  return (
    <div className={`${className || ""} ${disabled ? "opacity-50" : ""}`}>
      {labelFileUploader(label, required)}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="rounded border-2 border-dashed border-slate-600 p-4 text-center cursor-pointer bg-white/5"
      >
        <input
          accept={
            typeof acceptedMimeTypes === "string"
              ? acceptedMimeTypes
              : acceptedMimeTypes.join(",")
          }
          multiple
          style={{ display: "none" }}
          id={id}
          type="file"
          disabled={disabled}
          name={name}
          onChange={handleFileChange}
        />
        <label htmlFor={id} className="flex flex-col gap-1 cursor-pointer">
          <span>Subir Archivos</span>
          <span className="mt-2 text-gray-400 text-sm">
            Puedes arrastrar o clickear para subir el archivo
          </span>
        </label>
      </div>
      {hint && <small className="text-gray-400">{hint}</small>}

      <div>
        <div className="flex gap-4 mt-4">
          {files.map((file, index) => {
            if (file.deleted) {
              return <div className="hidden" key={index}></div>;
            }
            return (
              <div key={index} className="flex flex-col gap-2 relative">
                {file.file ? (
                  <>
                    {file.file.type.startsWith("video") ? (
                      <video
                        className="aspect-square object-cover rounded-md"
                        width="100"
                        height="100"
                        controls
                      >
                        <source src={file.url} />
                      </video>
                    ) : (
                      <img
                        className="aspect-square object-cover rounded-md"
                        src={file.url}
                        alt="Vista previa"
                        width={100}
                        height={100}
                      />
                    )}
                  </>
                ) : (
                  // Si es una URL preexistente
                  <>
                    {file.url.includes("video") ? (
                      <video width="100" height="100" controls>
                        <source src={file.url} />
                      </video>
                    ) : (
                      <img
                        className="aspect-square object-cover rounded-md"
                        src={file.url}
                        alt="Cargado"
                        width={100}
                        height={100}
                      />
                    )}
                  </>
                )}
                <div className="absolute bottom-1 right-1">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-dark-400 p-1 hover:bg-dark-300 rounded-sm text-sm"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
