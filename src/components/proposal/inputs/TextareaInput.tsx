import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaInputProps {
  label: string;
  inputValue: string;
  onChange: (value: string) => void;
  defaultValue: string;
  id?: string;
}

export default function TextareaInput({
  label,
  inputValue,
  onChange,
  defaultValue,
  id = label.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}: TextareaInputProps) {
  const labelId = `${id}-label`;

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="flex flex-col gap-2 px-1"
    >
      <Label htmlFor={id} id={labelId}>
        {label}
      </Label>
      <Textarea
        id={id}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={inputValue || defaultValue}
      />
    </div>
  );
}
