"use client";
import { useState, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { useEditableTool } from "@/hooks/useEditableTool";
import { Pencil } from "lucide-react";
import DOMPurify from "dompurify";

interface EditableBodySectionProps {
  section: string;
  defaultValue: string;
}

export default function EditableBodySection({
  section,
  defaultValue,
}: EditableBodySectionProps) {
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    editingField,
    tempInputValue,
    setTempInputValue,
    startEditing,
    saveValue,
    cancelEditing,
    characterWarning,
    maxChars,
  } = useEditableTool();

  const isEditing = editingField === section;

  // Memoize editor options to prevent unnecessary re-renders
  const editorOptions = useMemo(
    () => ({
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
      ] as const, // Use as const to help TypeScript
      spellChecker: false,
      minHeight: "300px",
      previewRender: (markdown: string) => {
        try {
          return DOMPurify.sanitize(marked.parse(markdown) as string, {
            ALLOWED_TAGS: [
              "p",
              "br",
              "strong",
              "em",
              "u",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "ul",
              "ol",
              "li",
              "blockquote",
              "a",
            ],
            ALLOWED_ATTR: ["href", "title", "target"],
          });
        } catch {
          return markdown;
        }
      },
    }),
    []
  );

  // Configure marked to use synchronous parsing
  marked.setOptions({
    breaks: true,
    gfm: true,
    async: false, // Force synchronous operation
  });

  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          userInput: tempInputValue,
        }),
      });
      const data = await res.json();
      setTempInputValue(data.content);
      setOutputText(data.content);
    } catch (error) {
      console.error("API Error:", error);
      setTempInputValue("Error generating content.");
      setOutputText("Error generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isEditing && characterWarning && (
        <div className="text-white rounded p-5 absolute bottom-5 -translate-x-1/2 left-1/2 bg-red-400">
          Approaching maximum {maxChars} character limit
        </div>
      )}
      {isEditing ? (
        <>
          <SimpleMDE
            value={tempInputValue}
            onChange={setTempInputValue}
            // the error comes from this "options"
            options={editorOptions}
            className="bg-level-0 rounded-md"
          />
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => saveValue(setOutputText)}
            >
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleGenerateContent}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Generating..." : "Generate with AI"}
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="hover:ring ring-accent px-1 py-1 rounded-sm group relative">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked.parse(outputText || defaultValue) as string,
                {
                  ALLOWED_TAGS: [
                    "p",
                    "br",
                    "strong",
                    "em",
                    "u",
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "ul",
                    "ol",
                    "li",
                    "blockquote",
                    "a",
                  ],
                  ALLOWED_ATTR: ["href", "title", "target"],
                }
              ),
            }}
          />
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden absolute cursor-pointer top-1 right-1 group-hover:inline-flex hover:[&>svg]:stroke-accent hover:border-accent"
            onClick={() => {
              startEditing(section, outputText || defaultValue);
            }}
          >
            <Pencil className="h-3 w-3 stroke-on-level-1 transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
