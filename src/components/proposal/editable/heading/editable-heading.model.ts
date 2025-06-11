export interface EditableHeadingData {  
  value: string;
  defaultValue: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  isEditing: boolean;
  className?: string;
  title: string;
  label: string;
}

export interface EditableHeadingEvents {
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface EditableHeadingProps extends EditableHeadingData, EditableHeadingEvents {}