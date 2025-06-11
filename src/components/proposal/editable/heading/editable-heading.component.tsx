"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { LabeledInput } from "@/components/proposal/primitives/labeled-input";

import type { EditableHeadingProps } from "./editable-heading.model";

// FIX: Tab navigation is inexistent at the moment
export default function EditableHeading({
  value,
  defaultValue,
  as: Heading = "h1",
  isEditing,
  className = "",
  title,
  label,
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
          <Heading className={className}>{value || defaultValue}</Heading>
          <LabeledInput
            title={title}
            label={label}
            inputValue={value}
            onChange={onChange}
            defaultValue={defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSave();
              }
            }}
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
        <div className="flex justify-between gap-2 items-center group/edit">
          <Heading className={className}>{value || defaultValue}</Heading>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden cursor-pointer group-hover/edit:inline-flex hover:[&>svg]:stroke-accent hover:border-accent"
            onClick={onStartEdit}
          >
            <Pencil className="h-3 w-3 stroke-on-level-1 transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
