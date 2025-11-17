'use client';

import { Skeleton } from '@/components/ui/shadcn/skeleton';

export function EnrolledStudentsTableSkeleton({
  rows = 10,
}: {
  rows?: number;
}) {
  return (
    <div className="w-full bg-muted/30 rounded-xl p-6">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 pb-4 border-b text-left text-sm">
        <p className="font-medium">Documento del estudiante</p>
        <p className="font-medium">Nombre</p>
        <p className="font-medium">Grado</p>
        <p className="font-medium">Acciones</p>
      </div>

      {/* Rows */}
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 items-center py-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
