import { useState } from "react";

const maxChars = 1200;

export function useEditableTool() {
  // Track current editing field and it's temporary value
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempInputValue, setTempInputValue] = useState("");
  const [characterWarning, setCharacterWarning] = useState(false);

  const handleInputChange = (value: string) => {
    const truncatedValue = value.slice(0, maxChars);

    setTempInputValue(truncatedValue);

    // Check if approaching the limit
    const remainingChars = maxChars - truncatedValue.length;
    setCharacterWarning(remainingChars <= 100);
  };

  // Save id and current value and mark field that started editing
  // then set the current value into the temporary value
  const startEditing = (id: string, currentValue: string) => {
    setEditingField(id);
    setTempInputValue(currentValue || "");
    setCharacterWarning(false);
  };

  // Save the user input and end editing
  const saveValue = (onUpdate: (value: string) => void) => {
    onUpdate(tempInputValue);
    setEditingField(null);
    setCharacterWarning(false);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setCharacterWarning(false);
  };

  // Discard edits
  return {
    editingField,
    tempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
    setTempInputValue: handleInputChange, // Replace with our new method
    characterWarning,
    maxChars: maxChars,
  };
}
