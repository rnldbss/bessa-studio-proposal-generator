"use client";

import AddButton from "./buttons/add-section/add-section-button.component";
import Form from "./Form";
import Row from "./layout/row/layout-row.component";
import { useState } from "react";

export default function Proposal() {
  const [addSection, setAddSection] = useState(1);

  const handleAddSection = () => {
    setAddSection((prev) => prev + 1);
  };

  const handleRemoveSection = () => {
    setAddSection((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col">
      <Form onClickDelete={handleRemoveSection} sectionsCount={addSection} />
      <Row>
        <AddButton
          onClick={handleAddSection}
          className="col-start-3 col-end-4"
        />
      </Row>
    </div>
  );
}
