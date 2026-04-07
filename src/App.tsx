import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FormSection } from './components/FormSection';
import { PreviewSection } from './components/PreviewSection';
import { ExportModal } from './components/ExportModal';
import { ResumeData } from './types';

const initialData: ResumeData = {
  personal: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    location: 'San Francisco, CA',
    phone: '555-0123'
  },
  summary: 'Dedicated and result-oriented professional with extensive experience in architecting digital solutions. Proven track record of delivering high-impact projects on schedule while maintaining strict ATS compliance and aesthetic integrity.',
  skills: ['Product Strategy', 'UI/UX Design', 'Team Leadership', 'Project Management', 'Agile Methodologies', 'Data Analysis'],
  experience: [
    {
      id: '1',
      company: 'Studio Ink',
      role: 'Senior Product Designer',
      date: '2020 – Present',
      description: 'Led design team for flagship mobile application with 1M+ downloads.\nIncreased user retention by 25% through strategic UX overhauls.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Blueprint Platform',
      description: 'Developed an end-to-end resume building system focusing on structural integrity and ATS parsing efficiency.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Design',
      degree: 'Bachelor of Science in Human-Computer Interaction',
      date: '2016 – 2020'
    }
  ],
  languages: ['English (Native)', 'Spanish (Fluent)']
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [activeNav, setActiveNav] = useState('build');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportClick = () => {
    setActiveTab('preview');
    setActiveNav('export');
    setTimeout(() => setIsExportModalOpen(true), 100);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20 pb-24">
      <Header />
      
      <main>
        {/* Tab Navigation */}
        <div className="sticky top-16 z-40 bg-surface/80 backdrop-blur-md px-6 py-4">
          <div className="flex bg-surface-container-low p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                activeTab === 'form' 
                  ? 'text-on-primary bg-primary shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Form
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                activeTab === 'preview' 
                  ? 'text-on-primary bg-primary shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={activeTab === 'form' ? 'block' : 'hidden'}>
          <FormSection data={resumeData} onChange={setResumeData} onExportClick={handleExportClick} />
        </div>
        <div className={activeTab === 'preview' ? 'block' : 'hidden'}>
          <PreviewSection data={resumeData} ref={resumeRef} />
        </div>
      </main>

      <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} onExportClick={handleExportClick} />
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => {
          setIsExportModalOpen(false);
          setActiveNav('build');
        }} 
        resumeRef={resumeRef} 
      />
    </div>
  );
}
