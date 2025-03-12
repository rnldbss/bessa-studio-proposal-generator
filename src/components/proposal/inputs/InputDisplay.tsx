interface InputDisplayProps {
  title?: string;
  userInput: string;
  defaultValue: string;
}

export default function InputDisplay({
  title,
  userInput,
  defaultValue,
}: InputDisplayProps) {
  return (
    <p>
      {title && <strong>{title}: </strong>}
      {userInput || defaultValue}
    </p>
  );
}
