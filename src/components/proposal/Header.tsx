"use client";

import { useState } from "react";
import { useEditableTool } from "@/hooks/useEditableTool";
import EditableText from "./inputs/EditableText";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [companyName, setCompanyName] = useState("");
  const [proposalDate, setProposalDate] = useState("");

  const {
    editingField,
    tempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
    setTempInputValue,
  } = useEditableTool();

  return (
    <div className={`flex justify-between items-center px-1 ${className}`}>
      <EditableText
        label="Company name?"
        title="company"
        value={editingField === "company" ? tempInputValue : companyName}
        defaultValue="Bessa Studio"
        className="font-cal text-xl"
        isEditing={editingField === "company"}
        onStartEdit={() => startEditing("company", companyName)}
        onChange={setTempInputValue}
        onSave={() => saveValue(setCompanyName)}
        onCancel={cancelEditing}
        as="span"
      />
      <EditableText
        label="Date?"
        title="date"
        value={editingField === "date" ? tempInputValue : proposalDate}
        defaultValue="Feb, 2025"
        className="text-xs"
        isEditing={editingField === "date"}
        onStartEdit={() => startEditing("date", proposalDate)}
        onChange={setTempInputValue}
        onSave={() => saveValue(setProposalDate)}
        onCancel={cancelEditing}
        as="span"
      />
    </div>
  );
}
