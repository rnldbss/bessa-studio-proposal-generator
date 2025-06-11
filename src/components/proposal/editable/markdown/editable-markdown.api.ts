// === TYPES ===
export interface GenerateContentRequest {
  section: string;
  userInput: string;
}

export interface GenerateContentResponse {
  content: string;
  section: string;
}

export interface GenerateContentError {
  error: string;
  details?: string;
}

// === CLIENT-SIDE API FUNCTIONS ===

/**
 * Generate markdown content using AI
 */
export async function generateMarkdownContent(
  request: GenerateContentRequest
): Promise<GenerateContentResponse> {
  // Validate input
  if (!request.section || !request.userInput?.trim()) {
    throw new Error('Section and user input are required');
  }

  try {
    const response = await fetch('/api/generate-proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData: GenerateContentError = await response.json();
      throw new Error(errorData.details || errorData.error || 'Failed to generate content');
    }

    const data: GenerateContentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating markdown content:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Unknown error occurred while generating content');
  }
}

/**
 * Save markdown content (if you need this functionality)
 */
export async function saveMarkdownContent(content: string, sectionId: string): Promise<void> {
  // Implement if you need to save content to backend
  try {
    const response = await fetch('/api/save-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, sectionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to save content');
    }
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
}

// === HELPER FUNCTIONS ===

/**
 * Get prompt suggestions for different sections
 */
export function getPromptSuggestionForSection(section: string): string {
  const suggestions: Record<string, string> = {
    objectives: "Describe the main goals and desired outcomes for this project. What problem are you solving?",
    scope: "Outline what work will be included and what will be excluded from this project.",
    methodology: "Explain your approach, process, and methodology for completing this work.",
    timeline: "Provide key milestones, phases, and deadlines for project completion.",
    budget: "Break down the costs, investment required, and value delivered.",
  };

  return suggestions[section] || "Provide specific details and context for this section...";
}

/**
 * Validate section type
 */
export function isValidSection(section: string): boolean {
  const validSections = ['objectives', 'scope', 'methodology', 'timeline', 'budget'];
  return validSections.includes(section);
}

/**
 * Format user input for better AI results
 */
export function formatUserInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

// === CONSTANTS ===
export const SUPPORTED_SECTIONS = [
  'objectives',
  'scope', 
  'methodology',
  'timeline',
  'budget'
] as const;

export type SupportedSection = typeof SUPPORTED_SECTIONS[number];

// === HOOKS HELPER (Optional) ===
export interface UseMarkdownGeneratorState {
  isLoading: boolean;
  error: string | null;
  lastGenerated: string | null;
}

export const initialGeneratorState: UseMarkdownGeneratorState = {
  isLoading: false,
  error: null,
  lastGenerated: null,
};
