"use client";

import { useState } from "react";
//import InputDisplay from "./inputs/InputDisplay";
import TextareaInput from "./inputs/TextareaInput";
import { Button } from "../ui/button";

export default function ObjectivesSection() {
  const [proposalObjectives, setProposalObjectives] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const objectivesSectionData = {
    label: "What goals do you aim to achieve with your services?",
    userInput: proposalObjectives,
    inputHandler: setProposalObjectives,
    defaultValue:
      "The aim is to make Silver Springs Retreat a professional website that conveys its atmosphere and displays all the important information potential clients need when browsing while aligning with SEO best practices.",
  };

  async function handleGenerateObjectives() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "objectives",
          userInput: proposalObjectives,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      setApiResponse(data.content);
    } catch (error) {
      console.error("API Error:", error);
      setApiResponse("Error generating proposal objectives. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl">Project Objectives</h2>

      <TextareaInput
        label={objectivesSectionData.label}
        inputValue={proposalObjectives}
        onChange={setProposalObjectives}
        defaultValue={objectivesSectionData.defaultValue}
      />

      <Button onClick={handleGenerateObjectives} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate"}
      </Button>

      {apiResponse && (
        <div className="mt-6 p-4 border rounded-sm bg-gray-50">
          <h3 className="font-semibold mb-2">Generated Objectives:</h3>
          <div className="whitespace-pre-wrap">{apiResponse}</div>
        </div>
      )}
    </div>
  );
}
