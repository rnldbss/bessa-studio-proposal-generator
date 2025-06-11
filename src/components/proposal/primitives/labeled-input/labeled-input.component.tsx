import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LabeledInputProps } from "./labeled-input.model";

export default function LabeledInput({
  title,
  label,
  inputValue,
  onChange,
  onKeyDown,
  defaultValue,
  id = title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}: LabeledInputProps) {
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
