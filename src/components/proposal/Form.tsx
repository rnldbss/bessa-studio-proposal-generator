"use client";

import { DeleteSectionButton } from "@/components/proposal/buttons";
import { SectionHeader, SectionMetadata, SectionMarkdown } from "@/components/proposal/sections";
import { LayoutRow } from "@/components/proposal/layout";
interface FormProps {
  onClickDelete: () => void;
  sectionsCount: number;
}

export default function Form({ onClickDelete, sectionsCount }: FormProps) {
  return (
    <form className="flex flex-col gap-8">
      <LayoutRow>
        <SectionHeader className="col-start-2 col-end-3" />
      </LayoutRow>
      <LayoutRow>
        <SectionMetadata className="col-start-2 col-end-3" />
      </LayoutRow>
      {Array.from({ length: sectionsCount }).map((i, index) => (
        <LayoutRow key={index}>
          <SectionMarkdown className="col-start-2 col-end-3" />
          <DeleteSectionButton onClick={onClickDelete} />
        </LayoutRow>
      ))}
    </form>
  );
}
