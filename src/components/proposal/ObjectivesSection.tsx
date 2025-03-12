"use client";

import InputDisplay from "./inputs/InputDisplay";
import TextareaInput from "./inputs/TextAreaInput";
import { useState } from "react";

export default function ObjectivesSection() {
  const [proposalObjectives, setProposalObjectives] = useState("");

  const objectivesSectionData = {
    label: "What goals do you aim to achieve with your services?",
    userInput: proposalObjectives,
    inputHandler: setProposalObjectives,
    defaultValue:
      "The aim is to make Silver Springs Retreat a professional website that conveys its atmosphere and displays all the important information potential clients need when browsing while aligning with SEO best practices.",
  };
  return (
    <div>
      <h2>Objectives</h2>
      <InputDisplay
        userInput={objectivesSectionData.userInput}
        defaultValue={objectivesSectionData.defaultValue}
      />
      <TextareaInput
        label={objectivesSectionData.label}
        inputValue={objectivesSectionData.userInput}
        onChange={objectivesSectionData.inputHandler}
        defaultValue={objectivesSectionData.defaultValue}
      />
    </div>
  );
}
