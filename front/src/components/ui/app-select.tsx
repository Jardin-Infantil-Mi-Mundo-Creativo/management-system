import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string;
  label: string;
}

interface AppSelectProps {
  className?: string;
  placeholder: string;
  options: Option[];
}

function AppSelect({ className, placeholder, options }: AppSelectProps) {
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { AppSelect };
