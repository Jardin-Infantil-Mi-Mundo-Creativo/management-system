'use client';

import { Skeleton } from '@/components/ui/shadcn/skeleton';

interface EnrolledStudentsTableSkeletonProps {
  columns: string[];
}

export function EnrolledStudentsTableSkeleton({
  columns,
}: EnrolledStudentsTableSkeletonProps) {
  return (
    <div className="w-full bg-muted/30 rounded-xl p-6">
      <div className="flex justify-between gap-4 p-4 border-b text-left text-sm">
        {columns.map((column) => (
          <p key={column} className="font-medium">
            {column}
          </p>
        ))}
      </div>

      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 items-center py-2">
            {columns.map((column) => (
              <Skeleton key={column} className="h-5 w-32" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
