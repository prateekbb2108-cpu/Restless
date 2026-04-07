export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    location: string;
    phone: string;
    customFields: string[];
  };
  summary: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: string[];
}
