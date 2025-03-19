"use client";

import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditableHeadingProps {
  value: string;
  defaultValue: string;
  as?: "h1" | "h2" | "h3";
  isEditing: boolean;
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditableHeading({
  value,
  defaultValue,
  as: Heading = "h1",
  isEditing,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
}: EditableHeadingProps) {
  return (
    <div
      className={`px-1 py-0.5 rounded-sm group ${
        isEditing
          ? "ring my-4 px-3 py-3 ring-level-2"
          : "hover:ring ring-accent"
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-3 my-4">
          <Heading className="text-3xl">{value || defaultValue}</Heading>
          <TextInput
            title="Title"
            label="What is the title of this proposal?"
            inputValue={value}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave}>
              Set
            </Button>
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center group">
          <Heading className="text-3xl">{value || defaultValue}</Heading>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden group-hover:inline-flex hover:[&>svg]:stroke-accent hover:border-accent"
            onClick={onStartEdit}
          >
            <Pencil className="h-3 w-3 stroke-on-level-1 transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
