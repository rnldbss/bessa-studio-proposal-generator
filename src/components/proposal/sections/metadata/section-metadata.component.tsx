"use client";

import { EditableField, EditableHeading } from "@/components/proposal/editable";
import { useEditableTool } from "../../../../hooks/useEditableTool";
import { useState } from "react";
import type { SectionMetadataData } from "./section-metadata.types";

export default function SectionMetadata({ className = " " }: SectionMetadataData) {
  // Info Section fields' state
  const [infoSectionTitle, setInfoSectionTitle] = useState("");
  const [infoSectionService, setInfoSectionService] = useState("");
  const [infoSectionPreparedDate, setInfoSectionPreparedDate] = useState("");
  const [infoSectionExpireDate, setInfoSectionExpireDate] = useState("");
  const [infoSectionAuthor, setInfoSectionAuthor] = useState("");
  const [infoSectionFor, setInfoSectionFor] = useState("");

  const infoSectionData = [
    {
      id: "service",
      title: "Service",
      label: "What service did you provide?",
      userInput: infoSectionService,
      onUpdate: setInfoSectionService,
      defaultValue: "Website design and development",
    },
    {
      id: "prepared-on",
      title: "Prepared on",
      label: "What date it was created?",
      userInput: infoSectionPreparedDate,
      onUpdate: setInfoSectionPreparedDate,
      defaultValue: "20/05/2025",
    },
    {
      id: "valid-until",
      title: "Valid until",
      label: "When will it expire?",
      userInput: infoSectionExpireDate,
      onUpdate: setInfoSectionExpireDate,
      defaultValue: "20/05/2025",
    },
    {
      id: "created-by",
      title: "Created by",
      label: "Who's the author?",
      userInput: infoSectionAuthor,
      onUpdate: setInfoSectionAuthor,
      defaultValue: "Ronald Bessa",
    },
    {
      id: "created-for",
      title: "Created for",
      label: "Who's it for?",
      userInput: infoSectionFor,
      onUpdate: setInfoSectionFor,
      defaultValue: "Client name",
    },
  ];

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
        label="What's the proposal title?"
        title="title"
        className="text-3xl"
        value={editingField === "title" ? tempInputValue : infoSectionTitle}
        defaultValue="Website proposal"
        isEditing={editingField === "title"}
        onStartEdit={() => startEditing("title", infoSectionTitle)}
        onChange={setTempInputValue}
        onSave={() => saveValue(setInfoSectionTitle)}
        onCancel={cancelEditing}
        as="h1"
      />
      {infoSectionData.map((field) => {
        const isActive = editingField === field.id;

        return (
          <EditableField
            key={field.id}
            title={field.title}
            label={field.label}
            value={isActive ? tempInputValue : field.userInput}
            defaultValue={field.defaultValue}
            isEditing={isActive}
            onStartEdit={() => startEditing(field.id, field.userInput)}
            onChange={setTempInputValue}
            onSave={() => saveValue(field.onUpdate)}
            onCancel={cancelEditing}
          />
        );
      })}
    </div>
  );
}
