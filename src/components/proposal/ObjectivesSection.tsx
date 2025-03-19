"use client";

import { useState } from "react";
import { useEditableTool } from "@/hooks/useEditableTool";
import EditableText from "./inputs/EditableText";
import EditableBodySection from "./inputs/EditableBodyWithGPT.tsx";

export default function ObjectivesSection() {
  const [heading, setHeading] = useState("");

  const objectivesSectionData = {
    label: "What goals do you aim to achieve with your services?",
    defaultValue:
      "The aim is to make Silver Springs Retreat a professional website that conveys its atmosphere and displays all the important information potential clients need when browsing while aligning with SEO best practices.",
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
    <div className="">
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
    </div>
  );
}
