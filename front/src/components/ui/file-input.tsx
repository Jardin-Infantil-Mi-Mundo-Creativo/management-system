"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

function FileInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
  );

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));
      }, 300);
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div
      className="h-48 w-48 border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer my-auto"
      onClick={handleBoxClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mb-2 bg-muted rounded-full p-3">
        <Upload className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">
        Subir foto del estudiante
      </p>
      <input
        type="file"
        id="fileUpload"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
    </div>
  );
}

export { FileInput };
