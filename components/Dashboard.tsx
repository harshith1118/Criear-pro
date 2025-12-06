import React, { useState } from 'react';
import { AdvisorResponse, CareerPath } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { TrendingUp, DollarSign, Brain, Map, ArrowRight, BookOpen, MessageCircle } from 'lucide-react';

interface DashboardProps {
  data: AdvisorResponse;
  onOpenChat: () => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onOpenChat, onReset }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(data.careerPaths[0]);

  // Transform skill gap data for the radar chart
  const radarData = selectedCareer.missingSkills.map(skill => ({
    subject: skill.skillName,
    A: skill.currentLevel, // User
    B: skill.requiredLevel, // Required
    fullMark: 10,
  }));

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Career Analysis</h1>
                <p className="text-slate-500">Based on your unique profile and market trends</p>
            </div>
            <div className="flex gap-3">
                 <button onClick={onOpenChat} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                    <MessageCircle size={18} /> Ask Advisor
                </button>
                <button onClick={onReset} className="text-slate-400 hover:text-slate-600 px-4 py-2 font-medium">
                    New Profile
                </button>
            </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <p className="text-slate-700 leading-relaxed text-lg">{data.analysis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Career List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 px-2">Recommended Paths</h2>
          {data.careerPaths.map((career) => (
            <div
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
                selectedCareer.id === career.id
                  ? 'bg-white border-blue-500 shadow-md scale-[1.02]'
                  : 'bg-white border-transparent hover:border-slate-200 shadow-sm hover:shadow'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">{career.title}</h3>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    career.matchScore > 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {career.matchScore}% Match
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">{career.description}</p>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1"><DollarSign size={12}/> {career.salaryRange}</span>
                <span className="flex items-center gap-1"><TrendingUp size={12}/> {career.growthOutlook}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedCareer.title} Details</h2>
                <p className="text-slate-600">{selectedCareer.reasoning}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Skill Gap Chart */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col items-center">
                    <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Brain size={18} className="text-purple-500"/> Skill Gap Analysis
                    </h4>
                    <div className="w-full h-[250px] text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                                <Radar
                                    name="You"
                                    dataKey="A"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.3}
                                />
                                <Radar
                                    name="Required"
                                    dataKey="B"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                    fillOpacity={0.3}
                                />
                                <Legend />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Missing Skills List */}
                <div>
                    <h4 className="font-semibold text-slate-700 mb-4">Key Skills to Acquire</h4>
                    <div className="space-y-3">
                        {selectedCareer.missingSkills.map((skill, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-slate-800 text-sm">{skill.skillName}</span>
                                    <span className="text-xs text-slate-400">Level {skill.currentLevel} → {skill.requiredLevel}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                                    <div 
                                        className="bg-purple-500 h-1.5 rounded-full" 
                                        style={{ width: `${(skill.currentLevel / skill.requiredLevel) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-500">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <div>
                <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Map size={18} className="text-green-500"/> Action Plan
                </h4>
                <div className="relative">
                     {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                    
                    <div className="space-y-6 relative">
                        {selectedCareer.roadmapSteps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <div className="min-w-[32px] h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold text-sm z-10 shadow-sm">
                                    {idx + 1}
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                                    <p className="text-slate-700 text-sm font-medium">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;