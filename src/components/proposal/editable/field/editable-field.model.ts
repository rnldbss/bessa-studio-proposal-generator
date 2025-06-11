export interface EditableFieldData {
  title: string;
  label: string;
  value: string;
  defaultValue: string;
  isEditing: boolean; 
}

export interface EditableFieldEvents {
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface EditableFieldProps extends EditableFieldData, EditableFieldEvents {}