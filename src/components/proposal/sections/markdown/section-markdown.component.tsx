"use client";

import { EditableHeading } from "@/components/proposal/editable";
import dynamic from "next/dynamic";
import { useEditableTool } from "@/hooks/useEditableTool";
import { useState } from "react";

const EditableMarkdown = dynamic(
  () => import("@/components/proposal/editable/markdown/editable-markdown.component"),
  { ssr: false }
);

import type { SectionMarkdownData } from "./section-markdown.types";

export default function SectionMarkdown({
  className = "",
}: SectionMarkdownData) {
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
      <EditableHeading
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

      <EditableMarkdown
        section="objectives"
        defaultValue={objectivesSectionData.defaultValue}
      />
      <div className="w-0.5 h-full absolute -right-2.5 top-0 bg-level-3 hidden group-hover/delete:block" />
    </div>
  );
}
