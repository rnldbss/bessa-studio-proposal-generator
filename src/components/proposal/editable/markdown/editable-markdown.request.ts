import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  section: string;
  userInput: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const { section, userInput } = (await req.json()) as RequestBody;

    // Adjust the system prompts based on the section it's going to be used
    const systemPrompt = getPromptForSection(section);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "OpenAI API Error", details: errorText },
        { status: response.status } // I dont think this is returning proper error messages
      );
    }

    const data = (await response.json()) as OpenAIResponse;
    return NextResponse.json({
      content: data.choices[0].message.content,
      section,
    });
  } catch (error) {
    console.error("Error in generate-proposal API route:", error);
    return NextResponse.json(
      {
        error: "Server Error",
        details:
          error instanceof Error ? error.message : "Unknown error ocurred",
      },
      { status: 500 }
    );
  }
}

// Helper function to create appropriate prompts for different proposal sections
function getPromptForSection(section: string): string {
  // I don't understand this type Record<string, string> - need to have a look at it
  const prompts: Record<string, string> = {
    objectives: `You are a professional proposal writer. Create a clear, concise "Objectives" section for a client proposal based on the input provided.
    
    Keep your response focused on business goals and outcomes. Use professional language but avoid jargon.`,

    scope: `Create a detailed "Scope of Work" section for a professional proposal based on the input. `,

    methodology: `Create a "Methodology" section explaining your approach to achieving the client's objectives.`,

    timeline: `Create a "Project Timeline" section with realistic milestones and deadlines based on the information provided.`,

    budget: `Create a professional "Budget" section that outlines costs clearly and justifies the investment.`,
  };

  return (
    prompts[section] ||
    "Create a professional proposal section based on the client's input. Be concise, specific, and focused on business value."
  );
}
