"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Step3ProjectsExperience() {
  const {
    projects,
    experiences,
    setProjects,
    setExperiences,
  } = useResumeStore();

  const [loadingProject, setLoadingProject] = useState<string | null>(null);
  const [loadingExperience, setLoadingExperience] = useState<string | null>(null);

  const handleProjectChange = (id: string, key: string, value: string) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [key]: value } : proj
      )
    );
  };

  const handleExperienceChange = (id: string, key: string, value: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [key]: value } : exp
      )
    );
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: uuidv4(),
        projectName: "",
        fromDate: "",
        toDate: "",
        techStack: "",
        description: "",
        summary: "",
      },
    ]);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: uuidv4(),
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        years: "",
        description: "",
        summary: "",
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const generateProjectSummary = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    setLoadingProject(id);

    const res = await fetch("/api/summaryGeneration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "project",
        description: project.description,
        techStack: project.techStack,
      }),
    });

    const data = await res.json();
    handleProjectChange(id, "summary", data.summary);
    setLoadingProject(null);
  };

  const generateExperienceSummary = async (id: string) => {
    const exp = experiences.find((e) => e.id === id);
    if (!exp) return;
    setLoadingExperience(id);

    const res = await fetch("/api/summaryGeneration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "experience",
        description: exp.description,
        position: exp.position,
        companyName: exp.companyName,
      }),
    });

    const data = await res.json();
    handleExperienceChange(id, "summary", data.summary);
    setLoadingExperience(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Projects</h2>
      {projects.map((proj) => (
        <div key={proj.id} className="border p-4 rounded">
          <input
            type="text"
            placeholder="Project Name"
            value={proj.projectName}
            onChange={(e) =>
              handleProjectChange(proj.id, "projectName", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="From Date"
            value={proj.fromDate}
            onChange={(e) =>
              handleProjectChange(proj.id, "fromDate", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="To Date"
            value={proj.toDate}
            onChange={(e) =>
              handleProjectChange(proj.id, "toDate", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={proj.techStack}
            onChange={(e) =>
              handleProjectChange(proj.id, "techStack", e.target.value)
            }
          />
          <textarea
            placeholder="Description"
            value={proj.description}
            onChange={(e) =>
              handleProjectChange(proj.id, "description", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => generateProjectSummary(proj.id)}
            disabled={loadingProject === proj.id}
          >
            {loadingProject === proj.id ? "Generating..." : "Generate Summary"}
          </button>
          <textarea
            placeholder="AI Summary"
            value={proj.summary}
            onChange={(e) =>
              handleProjectChange(proj.id, "summary", e.target.value)
            }
          />
          <button onClick={() => removeProject(proj.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addProject}>Add Project</button>

      <h2 className="text-xl font-bold mt-8">Experience</h2>
      {experiences.map((exp) => (
        <div key={exp.id} className="border p-4 rounded">
          <input
            type="text"
            placeholder="Company Name"
            value={exp.companyName}
            onChange={(e) =>
              handleExperienceChange(exp.id, "companyName", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) =>
              handleExperienceChange(exp.id, "position", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="From"
            value={exp.startDate}
            onChange={(e) =>
              handleExperienceChange(exp.id, "startDate", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="To"
            value={exp.endDate}
            onChange={(e) =>
              handleExperienceChange(exp.id, "endDate", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Years"
            value={exp.years}
            onChange={(e) =>
              handleExperienceChange(exp.id, "years", e.target.value)
            }
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) =>
              handleExperienceChange(exp.id, "description", e.target.value)
            }
          />
          <button
            onClick={() => generateExperienceSummary(exp.id)}
            disabled={loadingExperience === exp.id}
          >
            {loadingExperience === exp.id
              ? "Generating..."
              : "Generate Summary"}
          </button>
          <textarea
            placeholder="AI Summary"
            value={exp.summary}
            onChange={(e) =>
              handleExperienceChange(exp.id, "summary", e.target.value)
            }
          />
          <button onClick={() => removeExperience(exp.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addExperience}>Add Experience</button>
    </div>
  );
}
