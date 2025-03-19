import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  title: string;
  label: string;
  inputValue: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue: string;
  id?: string;
}

export default function TextInput({
  title,
  label,
  inputValue,
  onChange,
  onKeyDown,
  defaultValue,
  id = title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}: TextInputProps) {
  const titleId = `${id}-label`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={titleId}>{label}</Label>
      <Input
        id={titleId}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={inputValue || defaultValue}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
