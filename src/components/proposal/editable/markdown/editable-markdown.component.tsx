"use client";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { useEditableTool } from "@/hooks/useEditableTool";
import { Pencil } from "lucide-react";
import type DOMPurify from "dompurify";
import { 
  generateMarkdownContent,
  getPromptSuggestionForSection,
  isValidSection,
  type GenerateContentRequest 
} from './editable-markdown.api';
import '@/styles/easymde.css';

import type { EditableMarkdownProps } from "./editable-markdown.types";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-level-0 rounded-md animate-pulse" />
});

export default function EditableMarkdown({
  section,
  defaultValue,
}: EditableMarkdownProps) {
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domPurify, setDomPurify] = useState<typeof DOMPurify | null>(null);

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

  useEffect(() => {
    // Load DOMPurify
    import('dompurify').then((module) => {
      setDomPurify(module.default);
    });
  }, []);

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
      ] as const,
      spellChecker: false,
      minHeight: "300px",
      previewRender: (markdown: string) => {
        try {
          return domPurify 
            ? domPurify.sanitize(marked.parse(markdown) as string, {
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
              })
            : marked.parse(markdown) as string;
        } catch {
          return markdown;
        }
      },
    }),
    [domPurify]
  );

  // Configure marked to use synchronous parsing
  marked.setOptions({
    breaks: true,
    gfm: true,
    async: false, // Force synchronous operation
  });

  const handleGenerateContent = async () => {
    if (!isValidSection(section)) {
      setError('Invalid section type');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: GenerateContentRequest = {
        section,
        userInput: tempInputValue
      };

      const result = await generateMarkdownContent(request);
      setTempInputValue(result.content);
      setOutputText(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  // Show prompt suggestion
  const promptSuggestion = getPromptSuggestionForSection(section);

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
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
          <div className="text-sm text-gray-500 mt-2">
            Suggestion: {promptSuggestion}
          </div>
        </>
      ) : (
        <div className="min-h-16 hover:ring ring-accent px-1 py-1 rounded-sm group/edit relative">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: domPurify
                ? domPurify.sanitize(marked.parse(outputText || defaultValue) as string, {
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
                  })
                : marked.parse(outputText || defaultValue) as string,
            }}
          />
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-level-0 hidden absolute cursor-pointer top-1 right-1 group-hover/edit:inline-flex hover:[&>svg]:stroke-accent hover:border-accent"
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
