'use client';

import { AlertCircle, Check, FileText } from 'lucide-react';
import { useRef, useState } from 'react';

import { Label } from '@/components/ui/shadcn/label';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { cn } from '@/lib/utils';

interface EnrollmentFormFileInputProps {
  className?: string;
  onFileSelect?: (file: File | null) => void;
}

function EnrollmentFormFileInput({
  className,
  onFileSelect,
}: EnrollmentFormFileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePDFFile = (file: File): boolean => {
    // Check file extension
    const validExtensions = ['.pdf'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError('Solo se permiten archivos PDF');
      return false;
    }

    // Check MIME type
    if (file.type !== 'application/pdf') {
      setError('El archivo debe ser un PDF válido');
      return false;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('El archivo no puede ser mayor a 10MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);

    if (!validatePDFFile(file)) {
      return;
    }

    setIsLoading(true);
    setIsComplete(false);

    setUploadedFile(file);
    setIsLoading(false);
    setIsComplete(true);
    onFileSelect?.(file);
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
    setIsComplete(false);
    setError(null);
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor="pdf-upload">Archivos adjuntos</Label>

      <div
        className={cn(
          'h-32 w-full border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center transition-colors',
          isLoading
            ? 'border-blue-300 bg-blue-50'
            : isComplete
              ? 'border-green-300 bg-green-50'
              : error
                ? 'border-red-300 bg-red-50'
                : 'border-border cursor-pointer hover:border-primary/50'
        )}
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : isComplete && uploadedFile ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="size-4 text-green-600" />
              </div>
              <FileText className="size-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-foreground truncate max-w-48">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-xs text-red-600 hover:text-red-800 mt-1 cursor-pointer"
              >
                Remover archivo
              </button>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-red-100 rounded-full p-2">
              <AlertCircle className="size-4 text-red-600" />
            </div>
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-xs text-muted-foreground">
              Haga clic para intentar de nuevo
            </p>
          </div>
        ) : (
          <>
            <div className="mb-2 bg-muted rounded-full p-3">
              <FileText className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Subir archivo PDF
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Arrastra y suelta o haz clic para seleccionar
            </p>
          </>
        )}

        <input
          type="file"
          id="pdf-upload"
          data-testid="pdf-file-upload"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,application/pdf"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}

export { EnrollmentFormFileInput };
