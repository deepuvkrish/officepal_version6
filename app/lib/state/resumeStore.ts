import { create } from 'zustand';

type PersonalInfo = {
  fullName: string;
  dob: string;
  phone: string;
  address: string;
  email: string;
  linkedin: string;
  portfolio: string;
};

type SkillInterest = {
  skills: string[];
  interests: string[];
};

type Project = {
  id: string;
  projectName: string;
  fromDate: string;
  toDate: string;
  techStack: string;
  description: string;
  summary: string;
};

type Experience = {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  years: string;
  description: string;
  summary: string;
};

type Education = {
  id: string;
  degree: string;
  department: string;
  university: string;
  location: string;
  fromDate: string;
  toDate: string;
  cgpa: string;
};

type Certification = {
  id: string;
  title: string;
  timeperiod: string;
  fromDate: string;
  toDate: string;
  organisation: string;
  summary: string;
};

type Achievement = {
  isSaved: boolean;
  id: string;
  title: string;
  date: string;
  description: string;
  summary: string;
};

type ResumeData = {
  step: number;
  personal: PersonalInfo;
  skillsInterests: SkillInterest;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];

  setStep: (step: number) => void;
  updatePersonal: (data: PersonalInfo) => void;
  updateSkillsInterests: (data: SkillInterest) => void;

  // New Step 2 specific methods
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addInterest: (interest: string) => void;
  removeInterest: (index: number) => void;

  setProjects: (projects: Project[]) => void;
  setExperiences: (experiences: Experience[]) => void;
  setEducation: (education: Education[]) => void;
  setCertifications: (certifications: Certification[]) => void;
  setAchievements: (achievements: Achievement[]) => void;
};

export const useResumeStore = create<ResumeData>((set) => ({
  step: 1,
  personal: {
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
  },
  skillsInterests: {
    skills: [],
    interests: [],
  },
  projects: [],
  experiences: [],
  education: [],
  certifications: [],
  achievements: [],

  setStep: (step) => set({ step }),
  updatePersonal: (data) => set({ personal: data }),
  updateSkillsInterests: (data) => set({ skillsInterests: data }),

  addSkill: (skill) =>
    set((state) => ({
      skillsInterests: {
        ...state.skillsInterests,
        skills: [...state.skillsInterests.skills, skill],
      },
    })),

  removeSkill: (index) =>
    set((state) => {
      const updated = [...state.skillsInterests.skills];
      updated.splice(index, 1);
      return {
        skillsInterests: {
          ...state.skillsInterests,
          skills: updated,
        },
      };
    }),

  addInterest: (interest) =>
    set((state) => ({
      skillsInterests: {
        ...state.skillsInterests,
        interests: [...state.skillsInterests.interests, interest],
      },
    })),

  removeInterest: (index) =>
    set((state) => {
      const updated = [...state.skillsInterests.interests];
      updated.splice(index, 1);
      return {
        skillsInterests: {
          ...state.skillsInterests,
          interests: updated,
        },
      };
    }),

  setProjects: (projects) => set({ projects }),
  setExperiences: (experiences) => set({ experiences }),
  setEducation: (education) => set({ education }),
  setCertifications: (certifications) => set({ certifications }),
  setAchievements: (achievements) => set({ achievements }),
}));
