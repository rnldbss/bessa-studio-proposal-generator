"use client";

import TextInput from "./inputs/TextInput";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
// interface infoSectionParagraphProps {
//   title: string;
//   userInput: string;
//   defaultValue: string;
//   onClick: () => void;
// }

export default function InfoSection() {
  // Proposal fields
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalService, setProposalService] = useState("");
  const [proposalPreparedOn, setProposalPreparedOn] = useState("");
  const [proposalExpireDate, setProposalExpireDate] = useState("");
  const [proposalAuthor, setProposalAuthor] = useState("");
  const [proposalFor, setProposalFor] = useState("");

  // Track current editing field and it's temporary value
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempInputValue, setTempInputValue] = useState("");

  const infoSectionData = [
    {
      id: "service",
      title: "Service",
      label: "What service did you provide?",
      userInput: proposalService,
      onUpdate: setProposalService,
      defaultValue: "Website design and development",
    },
    {
      id: "prepared-on",
      title: "Prepared on",
      label: "What date it was created?",
      userInput: proposalPreparedOn,
      onUpdate: setProposalPreparedOn,
      defaultValue: "20/05/2025",
    },
    {
      id: "valid-until",
      title: "Valid until",
      label: "When will it expire?",
      userInput: proposalExpireDate,
      onUpdate: setProposalExpireDate,
      defaultValue: "20/05/2025",
    },
    {
      id: "created-by",
      title: "Created by",
      label: "Who's the author?",
      userInput: proposalAuthor,
      onUpdate: setProposalAuthor,
      defaultValue: "Ronald Bessa",
    },
    {
      id: "created-for",
      title: "Created for",
      label: "Who's it for?",
      userInput: proposalFor,
      onUpdate: setProposalFor,
      defaultValue: "Client name",
    },
  ];

  // Save id and current value from the field that started editing
  const startEditing = (id: string, currentValue: string) => {
    setEditingField(id);
    setTempInputValue(currentValue || "");
  };

  const saveValue = (onUpdate: (value: string) => void) => {
    onUpdate(tempInputValue);
    setEditingField(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingField(null);
  };

  return (
    <div>
      <h1 className="text-3xl px-1">{proposalTitle || "Website proposal"}</h1>
      {infoSectionData.map((field) => (
        <div
          key={field.id}
          className={`px-1 py-0.5 rounded-sm  ${
            editingField === field.id
              ? "ring my-4 px-3 py-3 ring-level-2"
              : "hover:ring ring-accent"
          }`}
        >
          {editingField === field.id ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{field.title}: </span>
                  <span>{field.userInput || field.defaultValue}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <TextInput
                  title={field.title}
                  label={field.label}
                  inputValue={tempInputValue}
                  onChange={(value) => setTempInputValue(value)}
                  defaultValue={field.defaultValue}
                />
                <div className="flex gap-2">
                  <Button size={"sm"} onClick={() => saveValue(field.onUpdate)}>
                    Set
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={cancelEditing}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{field.title}: </span>
                <span>{field.userInput || field.defaultValue}</span>
              </div>
              <Button
                size={"icon"}
                variant={"outline"}
                className="hover:bg-level-0 hover:border-accent group"
                onClick={() =>
                  startEditing(field.id, field.userInput || field.defaultValue)
                }
              >
                <Pencil className="h-3 w-3 stroke-on-level-0 group-hover:stroke-accent transition-all" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// function InfoSectionParagraph({
//   title,
//   userInput,
//   defaultValue,
//   onClick,
// }: infoSectionParagraphProps) {
//   return (
//     <div className="hover:ring group ring-accent rounded-sm px-1 py-0.5 flex justify-between items-center">
//       <p>
//         <strong>{title}: </strong>
//         {userInput || defaultValue}
//       </p>
//       <button
//         onClick={onClick}
//         className="hidden group group-hover:block ring ring-level-5 hover:ring-accent p-0.5 rounded-xs"
//       >
//         <Pencil className=" stroke-level-5 w-4 h-4" />
//       </button>
//     </div>
//   );
// }
