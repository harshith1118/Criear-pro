import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, AdvisorResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.STRING,
      description: "A brief, encouraging executive summary of the user's profile and potential.",
    },
    careerPaths: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          matchScore: { type: Type.INTEGER, description: "0 to 100" },
          salaryRange: { type: Type.STRING },
          growthOutlook: { type: Type.STRING },
          missingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillName: { type: Type.STRING },
                currentLevel: { type: Type.INTEGER, description: "Estimated user level 1-10 based on profile" },
                requiredLevel: { type: Type.INTEGER, description: "Required level 1-10 for the role" },
                description: { type: Type.STRING, description: "Why this skill is needed" },
              },
            },
          },
          roadmapSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          reasoning: { type: Type.STRING, description: "Why this fits the user" },
        },
      },
    },
  },
};

export const generateCareerAdvice = async (profile: UserProfile): Promise<AdvisorResponse> => {
  const prompt = `
    Analyze the following student/job-seeker profile and suggest 3 high-potential career paths.
    Consider current market trends, emerging technology, and the user's specific constraints.
    
    Profile:
    - Name: ${profile.name}
    - Education: ${profile.educationLevel} in ${profile.major}
    - Interests: ${profile.interests.join(", ")}
    - Current Skills: ${profile.skills.join(", ")}
    - Work Preference: ${profile.preferredWorkStyle}
    - Goals: ${profile.careerGoals}

    Provide a JSON response with specific, actionable career paths. 
    For each path, identify skill gaps (comparing estimated current user level vs required level on a scale of 1-10) and a mini-roadmap.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a world-class career counselor and labor market analyst. You provide encouraging, realistic, and forward-looking advice.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AdvisorResponse;
  } catch (error) {
    console.error("Career advice generation failed:", error);
    throw error;
  }
};

export const chatWithAdvisor = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    const chat = ai.chats.create({
      model: modelId,
      history: history,
      config: {
        systemInstruction: "You are a helpful, empathetic career advisor. Keep answers concise (under 100 words unless asked for more) and action-oriented.",
      },
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Chat failed:", error);
    throw error;
  }
};