'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Calendar } from '@/components/ui/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn/popover';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  useTodayAsDefault?: boolean;
  onChange?: (date: Date) => void;
  value?: Date | null;
  id: string;
}

function DatePicker({
  useTodayAsDefault,
  onChange,
  value,
  id,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(
    () => value ?? (useTodayAsDefault ? new Date() : null)
  );
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className={cn(
            'w-48 justify-between font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? formatDate(date) : 'Seleccionar fecha'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          onSelect={(d) => {
            if (d) {
              setDate(d);
              onChange?.(d);
            }
            setOpen(false);
          }}
          {...(date && { selected: date })}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
