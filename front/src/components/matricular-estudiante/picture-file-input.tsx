"use client";

import { Upload, Check, AlertCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

interface FileInputProps {
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

function PictureFileInput({ onFileSelect, className }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImageFile = (file: File): boolean => {
    // Check file extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Solo se permiten archivos de imagen (JPG, PNG, GIF, WebP)');
      return false;
    }

    // Check MIME type
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen válida');
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('La imagen no puede ser mayor a 5MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);

    if (!validateImageFile(file)) {
      return;
    }

    setIsLoading(true);
    setIsComplete(false);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload process
    setTimeout(() => {
      setUploadedFile(file);
      setIsLoading(false);
      setIsComplete(true);
      onFileSelect?.(file);
    }, 2000);
  };

  const handleBoxClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isLoading) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    setImagePreview(null);
    setIsComplete(false);
    setError(null);
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className={`h-48 w-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center my-auto relative overflow-hidden transition-colors ${
        isLoading 
          ? 'border-blue-300 bg-blue-50' 
          : isComplete 
            ? 'border-green-300 bg-green-50' 
            : error 
              ? 'border-red-300 bg-red-50'
              : 'border-border hover:border-primary/50'
      } ${uploadedFile ? 'cursor-default' : 'cursor-pointer'} ${className}`}
      onClick={handleBoxClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 p-8">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      ) : isComplete && uploadedFile && imagePreview ? (
        <div className="relative w-full h-full">
          <Image
            src={imagePreview}
            alt="Foto del estudiante"
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute top-2 right-2 bg-green-100 rounded-full p-1">
            <Check className="size-4 text-green-600" />
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute top-2 left-2 bg-red-100 hover:bg-red-200 rounded-full p-1 transition-colors cursor-pointer"
          >
            <X className="size-4 text-red-600" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
            <p className="truncate">{uploadedFile.name}</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 p-8">
          <div className="bg-red-100 rounded-full p-2">
            <AlertCircle className="size-4 text-red-600" />
          </div>
          <p className="text-sm text-red-600 text-center">{error}</p>
          <p className="text-xs text-muted-foreground">
            Haga clic para intentar de nuevo
          </p>
        </div>
      ) : (
        <div className="p-8">
          <div className="mb-2 bg-muted rounded-full p-3 w-fit m-auto">
            <Upload className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Subir foto del estudiante
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Arrastra y suelta o haz clic
          </p>
        </div>
      )}
      
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

export { PictureFileInput };
