import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  title: string; //This need to be fixed - title won't be always provided to be used as id
  label: string;
  inputValue: string;
  onChange: (value: string) => void;
  defaultValue: string;
  id?: string;
}

export default function TextInput({
  title,
  label,
  inputValue,
  onChange,
  defaultValue,
  id = title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}: TextInputProps) {
  const titleId = `${id}-label`;

  return (
    <div className="flex flex-col" role="group" aria-labelledby={titleId}>
      <Label htmlFor={id} id={titleId}>
        {label}
      </Label>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={inputValue || defaultValue}
      />
    </div>
  );
}
