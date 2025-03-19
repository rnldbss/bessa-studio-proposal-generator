"use client";

import { useState } from "react";
import EditableField from "./inputs/EditableField";
import EditableHeading from "./inputs/EditableHeading";

export default function InfoSection() {
  // Info Section fields' state
  const [infoSectionTitle, setInfoSectionTitle] = useState("");
  const [infoSectionService, setInfoSectionService] = useState("");
  const [infoSectionPreparedDate, setInfoSectionPreparedDate] = useState("");
  const [infoSectionExpireDate, setInfoSectionExpireDate] = useState("");
  const [infoSectionAuthor, setInfoSectionAuthor] = useState("");
  const [infoSectionFor, setInfoSectionFor] = useState("");

  // Track current editing field and it's temporary value
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempInputValue, setTempInputValue] = useState("");

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

  // Save id and current value and mark field that started editing
  // then set the current value into the temporary value
  const startEditing = (id: string, currentValue: string) => {
    setEditingField(id);
    setTempInputValue(currentValue || "");
  };

  // Save the user input and end editing
  const saveValue = (onUpdate: (value: string) => void) => {
    onUpdate(tempInputValue);
    setEditingField(null);
  };

  // Discard edits
  const cancelEditing = () => {
    setEditingField(null);
  };

  return (
    <div>
      <EditableHeading
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
