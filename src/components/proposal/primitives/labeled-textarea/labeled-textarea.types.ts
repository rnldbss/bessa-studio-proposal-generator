export interface LabeledTextareaData {
  label: string;
  inputValue: string;
  defaultValue: string;
  id?: string;
}

export interface LabeledTextareaEvents {
  onChange: (value: string) => void;
}

export interface LabeledTextareaProps extends LabeledTextareaData, LabeledTextareaEvents {}