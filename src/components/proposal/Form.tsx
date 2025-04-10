"use client";

import Header from "./Header";
import InfoSection from "./InfoSection";
import GPTGeneratedSection from "./GPTGeneratedSection";
import { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import Row from "./Row";
import AddButton from "./buttons/AddButton";

export default function Form() {
  const [addSection, setAddSection] = useState(1);

  const handleAddSection = () => {
    setAddSection((prev) => prev + 1);
  };

  const handleRemoveSection = () => {
    setAddSection((prev) => prev - 1);
  };

  return (
    <form className="flex flex-col gap-8">
      <Row>
        <Header className="col-start-2 col-end-3" />
      </Row>
      <Row>
        <InfoSection className="col-start-2 col-end-3" />
      </Row>
      {Array.from({ length: addSection }).map((i, index) => (
        <Row key={index}>
          <GPTGeneratedSection className="col-start-2 col-end-3" />
          <DeleteButton onClick={handleRemoveSection} />
        </Row>
      ))}
      <Row>
        <AddButton
          onClick={handleAddSection}
          className="col-start-3 col-end-4"
        />
      </Row>
    </form>
  );
}
