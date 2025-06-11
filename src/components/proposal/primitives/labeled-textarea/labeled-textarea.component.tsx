import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { LabeledTextareaProps } from "./labeled-textarea.model";

export default function LabeledTextarea({
  label,
  inputValue,
  onChange,
  defaultValue,
  id = label.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}: LabeledTextareaProps) {
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
