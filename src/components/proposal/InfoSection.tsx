"use client";

import TextInput from "./inputs/TextInput";
import { useState } from "react";

interface infoSectionParagraphProps {
  title: string;
  userInput: string;
  defaultValue: string;
}

export default function InfoSection() {
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalService, setProposalService] = useState("");
  const [proposalPreparedOn, setProposalPreparedOn] = useState("");
  const [proposalExpireDate, setProposalExpireDate] = useState("");
  const [proposalAuthor, setProposalAuthor] = useState("");
  const [proposalFor, setProposalFor] = useState("");

  const infoSectionData = [
    {
      title: "Service",
      label: "What service did you provide?",
      userInput: proposalService,
      inputHandler: setProposalService,
      defaultValue: "Website design and development",
    },
    {
      title: "Prepared on",
      label: "What date it was created?",
      userInput: proposalPreparedOn,
      inputHandler: setProposalPreparedOn,
      defaultValue: "20/05/2025",
    },
    {
      title: "Valid until",
      label: "When it will expire?",
      userInput: proposalExpireDate,
      inputHandler: setProposalExpireDate,
      defaultValue: "20/05/2025",
    },
    {
      title: "Created by",
      label: "Who's the author?",
      userInput: proposalAuthor,
      inputHandler: setProposalAuthor,
      defaultValue: "Ronald Bessa",
    },
    {
      title: "Created for",
      label: "Who's it for?",
      userInput: proposalFor,
      inputHandler: setProposalFor,
      defaultValue: "Client name",
    },
  ];

  return (
    <div>
      <h1>{proposalTitle || "Website proposal"}</h1>
      {infoSectionData.map((paragraphItem) => (
        <div className="pt-5 space-y-1" key={paragraphItem.label}>
          <InfoSectionParagraph
            title={paragraphItem.title}
            userInput={paragraphItem.userInput}
            defaultValue={paragraphItem.defaultValue}
          />
          <TextInput
            title={paragraphItem.title}
            label={paragraphItem.label}
            inputValue={paragraphItem.userInput}
            onChange={paragraphItem.inputHandler}
            defaultValue={paragraphItem.defaultValue}
          />
        </div>
      ))}
    </div>
  );
}

function InfoSectionParagraph({
  title,
  userInput,
  defaultValue,
}: infoSectionParagraphProps) {
  return (
    <p>
      <strong>{title}: </strong>
      {userInput || defaultValue}
    </p>
  );
}
