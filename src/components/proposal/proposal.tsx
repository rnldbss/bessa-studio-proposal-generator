"use client";

import Header from "./Header";
import InfoSection from "./InfoSection";
import GPTGeneratedSection from "./GPTGeneratedSection";
import { useState } from "react";
import DeleteButton from "./DeleteButton";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Proposal() {
  const [addSection, setAddSection] = useState(1);

  const handleAddSection = () => {
    setAddSection((prev) => prev + 1);
  };

  const handleRemoveSection = () => {
    setAddSection((prev) => prev - 1);
  };

  return (
    <div className="">
      <form className="w-a4   px-7 py-10 flex flex-col [&>*]:pr-10 gap-8">
        <Header />
        <InfoSection />
        {Array.from({ length: addSection }).map((item, index) => {
          return (
            <div key={index} className="relative group/delete">
              <GPTGeneratedSection />
              <DeleteButton onClick={handleRemoveSection} />
            </div>
          );
        })}
        <div className="w-full relative min-h-20">
          <div className="w-0.5 h-full absolute -right-2.5 top-0 bg-level-3 " />
          <Button variant="ghost" size="icon" onClick={handleAddSection}>
            <Plus />
          </Button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={handleAddSection}
          >
            Add Section
          </button>
          {addSection > 1 && (
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={handleRemoveSection}
            >
              Remove Section
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
