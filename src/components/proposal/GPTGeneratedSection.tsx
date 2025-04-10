"use client";

import { useState } from "react";
import { useEditableTool } from "@/hooks/useEditableTool";
import EditableText from "./inputs/EditableText";
import EditableBodySection from "./inputs/EditableBodyWithGPT.tsx";

interface GPTGeneratedSectionProps {
  className?: string;
}

export default function GPTGeneratedSection({
  className = "",
}: GPTGeneratedSectionProps) {
  const [heading, setHeading] = useState("");

  const objectivesSectionData = {
    label: "Give some context to GPT generate this section",
    defaultValue: "",
  };
  const {
    editingField,
    tempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
    setTempInputValue,
  } = useEditableTool();

  return (
    <div className={`${className}`}>
      <EditableText
        label="Section heading"
        title="heading"
        className="text-2xl"
        value={editingField === "title" ? tempInputValue : heading}
        defaultValue="Project Objectives"
        isEditing={editingField === "title"}
        onStartEdit={() => startEditing("title", heading)}
        onChange={setTempInputValue}
        onSave={() => saveValue(setHeading)}
        onCancel={cancelEditing}
        as="h2"
      />

      <EditableBodySection
        section="objectives"
        defaultValue={objectivesSectionData.defaultValue}
      />
      <div className="w-0.5 h-full absolute -right-2.5 top-0 bg-level-3 hidden group-hover/delete:block" />
    </div>
  );
}
