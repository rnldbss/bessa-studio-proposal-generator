export interface AddSectionButtonData {
  className?: string;
}

export interface AddSectionButtonEvents {
  onClick: () => void;
}

export interface AddSectionButtonProps extends AddSectionButtonData, AddSectionButtonEvents {}