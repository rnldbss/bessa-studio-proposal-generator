"use client";

import TextareaInput from "./TextareaInput";
import { Button } from "@/components/ui/button";
import { useEditableTool } from "@/hooks/useEditableTool";
import { Pencil } from "lucide-react";
import { useState } from "react";
interface EditableBodySectionProps {
  section: string;
  defaultValue: string;
}

export default function EditableBodySection({
  section,
  defaultValue,
}: EditableBodySectionProps) {
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    editingField,
    tempInputValue,
    setTempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
  } = useEditableTool();

  const isEditing = editingField === section;

  const handleGenerateObjectives = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          userInput: tempInputValue,
        }),
      });

      if (!res.ok) throw new Error(`API returned status ${res.status}`);

      const data = await res.json();

      // Store result in both temp input and visible output
      setTempInputValue(data.content); // for editing or saving
      setOutputText(data.content); // to display while editing
    } catch (error) {
      console.error("API Error:", error);
      setTempInputValue("Error generating content.");
      setOutputText("Error generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <TextareaInput
            label={"Objectives:"}
            inputValue={tempInputValue}
            onChange={setTempInputValue}
            defaultValue={defaultValue}
          />

          <div className="flex gap-2 mt-2">
            <Button
              size={"sm"}
              variant="default"
              onClick={() => saveValue(setOutputText)}
            >
              Save
            </Button>
            <Button
              size={"sm"}
              onClick={handleGenerateObjectives}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Generating..." : "Generate with AI"}
            </Button>
            <Button size={"sm"} variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="hover:ring ring-accent px-1 py-1 rounded-sm group relative">
          <p>{outputText || defaultValue}</p>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden absolute cursor-pointer top-1 right-1 group-hover:inline-flex hover:[&>svg]:stroke-accent hover:border-accent"
            onClick={() => {
              startEditing(section, outputText || defaultValue);
            }}
          >
            <Pencil className="h-3 w-3  stroke-on-level-1 transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
