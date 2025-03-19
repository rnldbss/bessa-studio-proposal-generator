"use client";

import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditableFieldProps {
  title: string;
  label: string;
  value: string;
  defaultValue: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}
export default function EditableField({
  title,
  label,
  value,
  defaultValue,
  isEditing,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
}: EditableFieldProps) {
  return (
    <div
      className={`px-1 py-0.5 rounded-sm group ${
        isEditing
          ? "ring my-4 px-3 py-3 ring-level-2"
          : "hover:ring ring-accent"
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{title}: </span>
              <span>{value || defaultValue}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <TextInput
              title={title}
              label={label}
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
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">{title}: </span>
            <span>{value || defaultValue}</span>
          </div>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden group-hover:inline-flex hover:[&>svg]:stroke-accent hover:border-accent group"
            onClick={onStartEdit}
          >
            <Pencil className="h-3 w-3 stroke-on-level-1  transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
