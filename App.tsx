import React, { useState } from 'react';
import { UserProfile, AdvisorResponse } from './types';
import { generateCareerAdvice } from './services/geminiService';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import { Sparkles, Compass } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [advisorData, setAdvisorData] = useState<AdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleProfileSubmit = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setIsLoading(true);
    try {
      const data = await generateCareerAdvice(userProfile);
      setAdvisorData(data);
    } catch (error) {
      alert("Something went wrong generating your career plan. Please check your API Key and try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setAdvisorData(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
        
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
                    <Compass size={24} />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">PathFinder AI</span>
            </div>
            {advisorData && (
                 <div className="text-sm font-medium text-slate-500">
                    Hello, <span className="text-slate-900">{profile?.name}</span>
                 </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!advisorData ? (
          <div className="flex flex-col items-center">
            {!isLoading && (
                 <div className="text-center mb-12 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future Career</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Stop guessing. Let AI analyze your skills, interests, and goals to build a personalized roadmap for the evolving job market.
                    </p>
                </div>
            )}
            <InputForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <Dashboard 
            data={advisorData} 
            onOpenChat={() => setIsChatOpen(true)} 
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} PathFinder AI. Powered by Google Gemini.</p>
        </div>
      </footer>

      {/* Floating Chat */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        userName={profile?.name || ''} 
      />
    </div>
  );
};

export default App;