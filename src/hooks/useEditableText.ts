import { useState } from "react";

export function useEditableText() {
  // Track current editing field and it's temporary value
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempInputValue, setTempInputValue] = useState("");

  // Save id and current value and mark field that started editing
  // then set the current value into the temporary value
  const startEditing = (id: string, currentValue: string) => {
    setEditingField(id);
    setTempInputValue(currentValue || "");
  };

  // Save the user input and end editing
  const saveValue = (onUpdate: (value: string) => void) => {
    onUpdate(tempInputValue);
    setEditingField(null);
  };

  const cancelEditing = () => {
    setEditingField(null);
  };

  // Discard edits
  return {
    editingField,
    tempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
    setTempInputValue,
  };
}
