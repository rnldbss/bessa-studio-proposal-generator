"use client";

import Header from "./Header";
import InfoSection from "./InfoSection";
import GPTGeneratedSection from "./GPTGeneratedSection";
import DeleteButton from "./buttons/DeleteButton";
import Row from "./Row";

interface FormProps {
  onClickDelete: () => void;
  sectionsCount: number;
}

export default function Form({ onClickDelete, sectionsCount }: FormProps) {
  return (
    <form className="flex flex-col gap-8">
      <Row>
        <Header className="col-start-2 col-end-3" />
      </Row>
      <Row>
        <InfoSection className="col-start-2 col-end-3" />
      </Row>
      {Array.from({ length: sectionsCount }).map((i, index) => (
        <Row key={index}>
          <GPTGeneratedSection className="col-start-2 col-end-3" />
          <DeleteButton onClick={onClickDelete} />
        </Row>
      ))}
    </form>
  );
}
