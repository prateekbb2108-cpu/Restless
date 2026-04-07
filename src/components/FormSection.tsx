import { useState } from 'react';
import { ResumeData, Experience, Project, Education } from '../types';

interface FormSectionProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onExportClick: () => void;
}

export function FormSection({ data, onChange, onExportClick }: FormSectionProps) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    languages: true,
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCustomField, setNewCustomField] = useState('');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const addCustomField = () => {
    const fields = data.personal.customFields || [];
    if (newCustomField.trim() && !fields.includes(newCustomField.trim())) {
      onChange({
        ...data,
        personal: { ...data.personal, customFields: [...fields, newCustomField.trim()] }
      });
      setNewCustomField('');
    }
  };

  const removeCustomField = (fieldToRemove: string) => {
    const fields = data.personal.customFields || [];
    onChange({
      ...data,
      personal: { ...data.personal, customFields: fields.filter(f => f !== fieldToRemove) }
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      onChange({ ...data, skills: [...data.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s !== skillToRemove) });
  };

  const addLanguage = () => {
    const langs = data.languages || [];
    if (newLanguage.trim() && !langs.includes(newLanguage.trim())) {
      onChange({ ...data, languages: [...langs, newLanguage.trim()] });
      setNewLanguage('');
    }
  };

  const removeLanguage = (langToRemove: string) => {
    const langs = data.languages || [];
    onChange({ ...data, languages: langs.filter(l => l !== langToRemove) });
  };

  const addExperience = () => {
    const newExp: Experience = { id: Date.now().toString(), company: '', role: '', date: '', description: '' };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const addProject = () => {
    const newProj: Project = { id: Date.now().toString(), name: '', description: '' };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = { id: Date.now().toString(), school: '', degree: '', date: '' };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  return (
    <section className="px-6 space-y-4">
      {/* Personal Info */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <button 
          className="w-full flex justify-between items-center group"
          onClick={() => toggleSection('personal')}
        >
          <span className="text-sm font-bold tracking-tight text-on-surface">Personal Info</span>
          <span className={`material-symbols-outlined text-outline transition-transform ${openSections.personal ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {openSections.personal && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-3 outline-none" placeholder="Alex Rivera" type="text" value={data.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-3 outline-none" placeholder="alex.rivera@example.com" type="email" value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Phone</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-3 outline-none" placeholder="555-0123" type="tel" value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Location</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-3 outline-none" placeholder="San Francisco, CA" type="text" value={data.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
            </div>
            
            <div className="space-y-1.5 mt-2 pt-4 border-t border-outline-variant/20">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Extra Links / Info</label>
              <div className="flex gap-2 mb-2">
                <input 
                  className="flex-1 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-2 outline-none" 
                  placeholder="e.g. linkedin.com/in/alex" 
                  value={newCustomField}
                  onChange={e => setNewCustomField(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomField()}
                />
                <button onClick={addCustomField} className="bg-primary text-on-primary px-4 rounded-xl font-bold text-sm hover:bg-primary-dim transition-colors">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(data.personal.customFields || []).map(field => (
                  <span key={field} className="bg-surface-container p-2 rounded-lg text-xs font-medium flex items-center gap-2">
                    {field} <button onClick={() => removeCustomField(field)} className="hover:bg-surface-variant rounded-full p-0.5 flex"><span className="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <button 
          className="w-full flex justify-between items-center"
          onClick={() => toggleSection('summary')}
        >
          <span className="text-sm font-bold tracking-tight text-on-surface">Summary</span>
          <span className={`material-symbols-outlined text-outline transition-transform ${openSections.summary ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {openSections.summary && (
          <div className="mt-4">
            <textarea className="w-full bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-3 outline-none resize-y" placeholder="Professional summary..." rows={4} value={data.summary} onChange={e => onChange({ ...data, summary: e.target.value })}></textarea>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold tracking-tight text-on-surface">Education</span>
          <div className="flex gap-2">
            <button onClick={addEducation} className="flex items-center gap-1 text-primary font-bold text-xs hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-sm">add</span> Add
            </button>
            <button onClick={() => toggleSection('education')} className="flex items-center text-outline hover:bg-surface-variant px-1 py-1 rounded-lg transition-colors">
              <span className={`material-symbols-outlined text-sm transition-transform ${openSections.education ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
          </div>
        </div>
        {openSections.education && (
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="p-4 bg-surface-container-low rounded-xl space-y-3 relative group">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none font-bold" placeholder="School / University" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none" placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none" placeholder="Date (e.g. 2016 - 2020)" value={edu.date} onChange={e => updateEducation(edu.id, 'date', e.target.value)} />
              </div>
            ))}
            {data.education.length === 0 && <div className="text-xs text-outline-variant text-center py-2">No education added</div>}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold tracking-tight text-on-surface">Skills</span>
          <button onClick={() => toggleSection('skills')} className="flex items-center gap-1 text-primary font-bold text-xs hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors">
            <span className={`material-symbols-outlined text-sm transition-transform ${openSections.skills ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
        </div>
        {openSections.skills && (
          <div>
            <div className="flex gap-2 mb-4">
              <input 
                className="flex-1 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-2 outline-none" 
                placeholder="Add a skill..." 
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} className="bg-primary text-on-primary px-4 rounded-xl font-bold text-sm hover:bg-primary-dim transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span key={skill} className="bg-surface-container p-2 rounded-lg text-xs font-medium flex items-center gap-2">
                  {skill} <button onClick={() => removeSkill(skill)} className="hover:bg-surface-variant rounded-full p-0.5 flex"><span className="material-symbols-outlined text-xs">close</span></button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold tracking-tight text-on-surface">Work Experience</span>
          <div className="flex gap-2">
            <button onClick={addExperience} className="flex items-center gap-1 text-primary font-bold text-xs hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-sm">add</span> Add
            </button>
            <button onClick={() => toggleSection('experience')} className="flex items-center text-outline hover:bg-surface-variant px-1 py-1 rounded-lg transition-colors">
              <span className={`material-symbols-outlined text-sm transition-transform ${openSections.experience ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
          </div>
        </div>
        {openSections.experience && (
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="p-4 bg-surface-container-low rounded-xl space-y-3 relative group">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none font-bold" placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none" placeholder="Role" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none" placeholder="Date (e.g. 2020 - Present)" value={exp.date} onChange={e => updateExperience(exp.id, 'date', e.target.value)} />
                <textarea className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none resize-y" placeholder="Description (one bullet per line)" rows={3} value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)}></textarea>
              </div>
            ))}
            {data.experience.length === 0 && <div className="text-xs text-outline-variant text-center py-2">No experience added</div>}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold tracking-tight text-on-surface">Projects</span>
          <div className="flex gap-2">
            <button onClick={addProject} className="flex items-center gap-1 text-primary font-bold text-xs hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-sm">add</span> Add
            </button>
            <button onClick={() => toggleSection('projects')} className="flex items-center text-outline hover:bg-surface-variant px-1 py-1 rounded-lg transition-colors">
              <span className={`material-symbols-outlined text-sm transition-transform ${openSections.projects ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
          </div>
        </div>
        {openSections.projects && (
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="p-4 bg-surface-container-low rounded-xl space-y-3 relative group">
                <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none font-bold" placeholder="Project Name" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                <textarea className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-3 py-2 outline-none resize-y" placeholder="Description" rows={2} value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)}></textarea>
              </div>
            ))}
            {data.projects.length === 0 && <div className="text-xs text-outline-variant text-center py-2">No projects added</div>}
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/15">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold tracking-tight text-on-surface">Languages</span>
          <button onClick={() => toggleSection('languages')} className="flex items-center gap-1 text-primary font-bold text-xs hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors">
            <span className={`material-symbols-outlined text-sm transition-transform ${openSections.languages ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
        </div>
        {openSections.languages && (
          <div>
            <div className="flex gap-2 mb-4">
              <input 
                className="flex-1 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary text-sm px-4 py-2 outline-none" 
                placeholder="Add a language (e.g. French - Fluent)..." 
                value={newLanguage}
                onChange={e => setNewLanguage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addLanguage()}
              />
              <button onClick={addLanguage} className="bg-primary text-on-primary px-4 rounded-xl font-bold text-sm hover:bg-primary-dim transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(data.languages || []).map(lang => (
                <span key={lang} className="bg-surface-container p-2 rounded-lg text-xs font-medium flex items-center gap-2">
                  {lang} <button onClick={() => removeLanguage(lang)} className="hover:bg-surface-variant rounded-full p-0.5 flex"><span className="material-symbols-outlined text-xs">close</span></button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 py-8">
        <button 
          onClick={() => onChange({
            personal: { fullName: '', email: '', location: '', phone: '', customFields: [] },
            summary: '',
            skills: [],
            experience: [],
            projects: [],
            education: [],
            languages: []
          })}
          className="bg-surface-container-high text-on-surface-variant font-bold py-4 rounded-2xl text-sm transition-all active:scale-95 hover:bg-surface-variant"
        >
          Clear Form
        </button>
        <button onClick={onExportClick} className="bg-primary text-on-primary font-bold py-4 rounded-2xl text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-primary-dim">Download PDF</button>
      </div>
    </section>
  );
}
