import { X } from "lucide-react";
import { Button } from "../../ui/button";

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <div className="relative h-full w-full px-2">
      <div className="h-full w-px bg-level-3  hidden group-hover/row:flex" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`absolute items-center justify-center top-1/2 right-0 group/button -translate-y-1/2 hover:!bg-red-400 hidden group-hover/row:flex`}
        onClick={onClick}
      >
        <X className="h-4 w-4 text-on-level-0 group-hover/button:text-level-0" />
      </Button>
    </div>
  );
}
