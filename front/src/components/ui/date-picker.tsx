"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react'

interface DatePickerProps {
  label: string;
  useTodayAsDefault?: boolean;
  onChange?: (date: Date) => void;
}

function DatePicker({ label, useTodayAsDefault, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(() =>
    useTodayAsDefault ? new Date() : null
  );
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="date">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? formatDate(date) : "Seleccionar fecha"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            onSelect={(d) => {
              if (d) {
                setDate(d)
                onChange?.(d)
              }
              setOpen(false)
            }}
            {...(date && { selected: date })}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
