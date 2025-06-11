export interface LabeledInputData {
  title: string;
  label: string;
  inputValue: string;
  defaultValue: string;
  id?: string;
}

export interface LabeledInputEvents {
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface LabeledInputProps extends LabeledInputData, LabeledInputEvents {}