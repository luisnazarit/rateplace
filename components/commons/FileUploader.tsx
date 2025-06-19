import React, { useState, useId } from "react";
import { toast } from "react-toastify";

import { formatBytes } from "@/utils/utils";
import Button from "./Button";
import { Trash2 } from "lucide-react";

interface Props {
  className?: string;
  setContent: (val: File | null | string) => void;
  label?: string;
  value?: string | File | null;
  type?: string;
  disabled?: boolean;
  hint?: string;
  required?: boolean;
  acceptedMimeTypes?: string[] | string;
  isInvalid?: boolean;
  maxSize?: number;
  verifyCloud?: boolean;
  name?: string;
  hintError?: string;
}

const mimeTypes: string[] = [
  // Text files
  "text/plain", // .txt
  "text/csv", // .csv
  "text/xml", // .xml

  // Word documents
  "application/msword", // .doc (Microsoft Word 97-2003)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx (Microsoft Word 2007+)

  // PDF documents
  "application/pdf", // .pdf

  // Other document types
  "application/rtf", // .rtf (Rich Text Format)
  "application/vnd.ms-excel", // .xls (Microsoft Excel 97-2003)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx (Microsoft Excel 2007+)
  "application/vnd.ms-powerpoint", // .ppt (Microsoft PowerPoint 97-2003)
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx (Microsoft PowerPoint 2007+)
];

const imageMimeTypes: string[] = [
  // JPEG image
  "image/jpeg", // .jpeg, .jpg

  // PNG image
  "image/png", // .png

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
      <label className="block mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    );
  }
  return null;
};

const FileUploader = ({
  className,
  maxSize = 5,
  type = "image",
  setContent,
  disabled,
  required = false,
  acceptedMimeTypes = type === "image" ? imageMimeTypes : mimeTypes,
  label,
  isInvalid,
  hintError,
  value,
  name,
  hint,
}: Props) => {
  const [file, setFile] = useState(value instanceof File ? value : null);
  const [preview, setPreview] = useState("");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !event ||
      !event.target?.files ||
      !validateSize(event.target.files[0])
    ) {
      return null;
    }
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setContent(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview("");
    setContent("_deleted");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    validateSize(event.dataTransfer.files[0]);
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setContent(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  if (typeof value === "string" && value !== "_deleted" && value !== "") {
    return (
      <div className={`${className}`}>
        {label && (
          <label className="block mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative max-w-64">
          <img className="rounded bg-gray-400" src={value} alt="Preview" />
          <div className="absolute top-2 right-2">
            <Button color="error" isIcon onClick={handleFileRemove}>
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className || ""} ${disabled ? "opacity-50" : ""}`}>
      {labelFileUploader(label, required)}
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="rounded border-2 border-dashed border-white/20 p-4 text-center cursor-pointer bg-white/5"
        >
          <input
            accept={
              typeof acceptedMimeTypes === "string"
                ? acceptedMimeTypes
                : acceptedMimeTypes.join(",")
            }
            style={{ display: "none" }}
            id={id}
            type="file"
            disabled={disabled}
            name={name}
            onChange={handleFileChange}
          />
          <label htmlFor={id} className="flex flex-col gap-1 cursor-pointer">
            <span>Subir Archivo</span>
            <span className="mt-2 text-gray-400 text-sm">
              Puedes arrastrar o clickear para subir el archivo
            </span>
          </label>
        </div>
      )}
      {file && (
        <div className="flex gap-10 relative">
          {type === "image" && (
            <img
              src={preview || URL.createObjectURL(file)}
              alt="Preview"
              className="max-w-40 rounded "
            />
          )}
          <div className="flex-1">
            <h4>{file.name}</h4>
            <small className="text-gray-500">{formatBytes(file.size)}</small>
          </div>

          <div className="absolute top-2 right-2">
            <Button isIcon color="error" onClick={handleFileRemove}>
              <Trash2 />
            </Button>
          </div>
        </div>
      )}
      {hint && <small className="text-gray-400">{hint}</small>}
      {isInvalid && hintError && <small className="text-red-500">{hintError}</small>}
    </div>
  );
};

export default FileUploader;
