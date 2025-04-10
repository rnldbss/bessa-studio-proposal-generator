import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

interface AddButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AddButton({ onClick, className = "" }: AddButtonProps) {
  return (
    <div className={`relative h-full min-h-12 w-full px-2 ${className}`}>
      <div className="h-full w-px bg-level-3" />
      <Button
        variant="ghost"
        size="icon"
        className={`absolute flex items-center justify-center top-1/2 right-0 group/button -translate-y-1/2 ${className}`}
        onClick={onClick}
      >
        <Plus className="h-4 w-4 text-on-level-0 group-hover/button:text-level-0" />
      </Button>
    </div>
  );
}
