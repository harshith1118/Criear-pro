import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle, Sparkles, BookOpen, Briefcase, Target, User } from 'lucide-react';

interface InputFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    educationLevel: 'Undergraduate',
    major: '',
    interests: [],
    skills: [],
    preferredWorkStyle: 'Hybrid',
    careerGoals: '',
  });

  const [currentInterest, setCurrentInterest] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const addInterest = () => {
    if (currentInterest.trim() && !profile.interests.includes(currentInterest.trim())) {
      setProfile({ ...profile, interests: [...profile.interests, currentInterest.trim()] });
      setCurrentInterest('');
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !profile.skills.includes(currentSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Who are you?</h2>
        <p className="text-slate-500">Let's start with the basics.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g. Alex Chen"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Education</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={profile.educationLevel}
                onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
              >
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Graduate (Masters/PhD)</option>
                <option>Bootcamp/Certification</option>
                <option>Self-Taught</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Major / Field of Study</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Computer Science"
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
              />
            </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
          <BookOpen className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Skills & Interests</h2>
        <p className="text-slate-500">What are you good at? What do you love?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Interests & Hobbies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. Gaming, Design, Sustainablity"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addInterest)}
            />
            <button
              onClick={addInterest}
              className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-purple-100">
                {interest}
                <button onClick={() => setProfile({...profile, interests: profile.interests.filter((_, i) => i !== idx)})} className="hover:text-purple-900 ml-1">×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Current Skills</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. Python, Public Speaking, Excel"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addSkill)}
            />
            <button
              onClick={addSkill}
              className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-blue-100">
                {skill}
                <button onClick={() => setProfile({...profile, skills: profile.skills.filter((_, i) => i !== idx)})} className="hover:text-blue-900 ml-1">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="bg-green-100 p-3 rounded-full inline-block mb-3">
          <Target className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Goals</h2>
        <p className="text-slate-500">Where do you want to go?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Work Style</label>
           <div className="grid grid-cols-3 gap-3">
            {['Remote', 'Hybrid', 'On-site'].map((style) => (
              <button
                key={style}
                onClick={() => setProfile({ ...profile, preferredWorkStyle: style })}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  profile.preferredWorkStyle === style
                    ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-green-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Career Goal / Dream</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none h-32 resize-none"
            placeholder="Describe your ideal career situation. e.g. 'I want to solve climate problems using data' or 'I want a stable creative job'."
            value={profile.careerGoals}
            onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>Profile</span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 2 ? 'text-purple-600' : 'text-slate-400'}`}>Skills</span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 3 ? 'text-green-600' : 'text-slate-400'}`}>Goals</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-tr-full -z-0 opacity-50" />
        
        <div className="z-10 relative">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>

        <div className="flex justify-between mt-8 z-10 relative">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft size={20} /> Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !profile.name} // Basic validation
              className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
            >
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => onSubmit(profile)}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-200 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Sparkles className="animate-spin" size={20} /> Analyzing...
                </>
              ) : (
                <>
                  Generate Career Plan <CheckCircle size={20} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;