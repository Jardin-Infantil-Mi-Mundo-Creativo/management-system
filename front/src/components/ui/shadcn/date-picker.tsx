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
import { useTranslations } from 'next-intl';

interface DatePickerProps {
  useTodayAsDefault?: boolean;
  onChange?: (date: Date) => void;
  value?: Date | null;
  id: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

function DatePicker({
  useTodayAsDefault,
  onChange,
  value,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: DatePickerProps) {
  const t = useTranslations('enrollment');

  const [open, setOpen] = useState(false);
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    () => value ?? (useTodayAsDefault ? new Date() : null)
  );
  const isControlled = value !== undefined;
  const date = isControlled ? value : uncontrolledDate;
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
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className={cn(
            'w-48 justify-between font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? formatDate(date) : t('selectDate')}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          onSelect={(d) => {
            if (d) {
              if (!isControlled) setUncontrolledDate(d);
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
