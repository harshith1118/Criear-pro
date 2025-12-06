# PathFinder AI 🧭

**A Personalized AI Career & Skills Advisor**

PathFinder AI is an intelligent career counseling application designed to help students and job seekers navigate the complex job market. By analyzing a user's education, interests, and current skills, it generates personalized career paths, identifies skill gaps, and provides actionable roadmaps using Google's Gemini 2.5 Flash model.

## 🚀 Features

- **Smart Profile Analysis**: Collects detailed user data including education, major, hobbies, and work style preferences via a multi-step wizard.
- **AI-Powered Recommendations**: Generates 3 tailored career paths with match scores based on real-time market logic.
- **Visual Skill Gap Analysis**: Interactive radar charts comparing your current estimated skill levels vs. required industry standards.
- **Actionable Roadmaps**: Step-by-step guides to bridging skill gaps and landing the target role.
- **Interactive Advisor Chat**: A built-in context-aware AI chatbot to answer specific career questions, provide interview tips, or explain industry trends.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Model**: Gemini 2.5 Flash

## 🔑 Setup & Configuration

This application relies on the Google Gemini API to generate career insights.

1.  **Get an API Key**: Visit [Google AI Studio](https://aistudio.google.com/) to obtain your key.
2.  **Environment Variable**: The application expects the API key to be available in `process.env.API_KEY`.

## 💡 How it Works

1.  **Input Profile**: The user completes a 3-step wizard (Identity, Skills, Goals).
2.  **Analyze**: The app sends this structured data to the Gemini API with a specialized system instruction.
3.  **Explore**: The dashboard visualizes the best career fits, salary ranges, and growth outlooks.
4.  **Plan**: Users can view a step-by-step roadmap to achieve their career goals.
5.  **Chat**: Users can ask follow-up questions to the AI advisor regarding specific technologies or career moves.
