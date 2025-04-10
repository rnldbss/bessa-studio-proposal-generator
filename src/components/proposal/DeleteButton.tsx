import { X } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute items-center justify-center top-1/2 right-0 group/button -translate-y-1/2 hover:!bg-red-400 hidden group-hover/delete:flex "
      onClick={onClick}
    >
      <X className="h-4 w-4 text-on-level-0 group-hover/button:text-level-0" />
    </Button>
  );
}
