import { forwardRef } from 'react';
import { ResumeData } from '../types';

interface PreviewSectionProps {
  data: ResumeData;
}

export const PreviewSection = forwardRef<HTMLDivElement, PreviewSectionProps>(({ data }, ref) => {
  return (
    <section className="px-6 pb-12">
      <div ref={ref} className="bg-[#ffffff] text-[#000000] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-lg p-8 min-h-[600px] font-ats border-t-4 border-[#f1f5f9]">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold uppercase tracking-wide text-[#000000]">{data.personal.fullName || 'Your Name'}</h1>
          <p className="text-[12px] mt-1 text-[#475569]">
            {[
              data.personal.location, 
              data.personal.email, 
              data.personal.phone,
              ...(data.personal.customFields || [])
            ].filter(Boolean).join(' | ')}
          </p>
        </div>
        
        {data.summary && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Professional Summary</h2>
            <p className="text-[11px] leading-relaxed text-[#1e293b] whitespace-pre-wrap">{data.summary}</p>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between text-[11px] text-[#000000]">
                  <span className="font-bold">{edu.school}</span>
                  <span>{edu.date}</span>
                </div>
                <div className="text-[11px] text-[#334155]">{edu.degree}</div>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Skills</h2>
            <p className="text-[11px] leading-relaxed text-[#1e293b]">{data.skills.join(', ')}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Work Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between font-bold text-[11px] text-[#000000]">
                  <span>{exp.company}</span>
                  <span>{exp.date}</span>
                </div>
                <div className="italic text-[11px] text-[#334155]">{exp.role}</div>
                {exp.description && (
                  <ul className="list-disc ml-5 text-[11px] mt-1 text-[#1e293b] space-y-0.5">
                    {exp.description.split('\n').map((bullet, i) => bullet.trim() ? <li key={i}>{bullet}</li> : null)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Projects</h2>
            {data.projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <div className="font-bold text-[11px] text-[#000000]">{proj.name}</div>
                <p className="text-[11px] text-[#1e293b] mt-0.5 whitespace-pre-wrap">{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-[#000000] mb-1 uppercase pb-1 text-[#000000]">Languages</h2>
            <p className="text-[11px] leading-relaxed text-[#1e293b]">{data.languages.join(', ')}</p>
          </div>
        )}
      </div>
    </section>
  );
});
