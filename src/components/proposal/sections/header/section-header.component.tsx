"use client";

import { useEditableTool } from "@/hooks/useEditableTool";
import { useState } from "react";
import { EditableHeading } from "@/components/proposal/editable";
import type { HeaderData } from "./section-header.model";

export default function SectionHeader({ className = "" }: HeaderData) {
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
      <EditableHeading
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
      <EditableHeading
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
