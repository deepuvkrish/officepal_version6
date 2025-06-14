"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

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

export default function Step3ProjectsExperience() {
  const { projects, experiences, setProjects, setExperiences } =
    useResumeStore();

  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [editExperienceId, setEditExperienceId] = useState<string | null>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleProjectChange = (
    id: string,
    key: keyof Project,
    value: string
  ) => {
    const current = useResumeStore.getState().projects;
    setProjects(current.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  const handleExperienceChange = (
    id: string,
    key: keyof Experience,
    value: string
  ) => {
    const current = useResumeStore.getState().experiences;
    setExperiences(
      current.map((e) => (e.id === id ? { ...e, [key]: value } : e))
    );
  };

  const isProjectValid = (p: Project) =>
    p.projectName.trim() &&
    p.fromDate.trim() &&
    p.toDate.trim() &&
    p.techStack.trim() &&
    p.description.trim();

  const isExperienceValid = (e: Experience) =>
    e.companyName.trim() &&
    e.position.trim() &&
    e.startDate.trim() &&
    e.endDate.trim() &&
    e.years.trim() &&
    e.description.trim();

  const addProject = () => {
    if (editProjectId) {
      toast.error(
        "Save or remove the current project before adding a new one."
      );
      return;
    }

    const newProject: Project = {
      id: uuidv4(),
      projectName: "",
      fromDate: "",
      toDate: "",
      techStack: "",
      description: "",
      summary: "",
    };
    setProjects([...projects, newProject]);
    setEditProjectId(newProject.id);
  };

  const addExperience = () => {
    if (editExperienceId) {
      toast.error(
        "Save or remove the current experience before adding a new one."
      );
      return;
    }

    const newExperience: Experience = {
      id: uuidv4(),
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      years: "",
      description: "",
      summary: "",
    };
    setExperiences([...experiences, newExperience]);
    setEditExperienceId(newExperience.id);
  };

  const saveProject = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj || !isProjectValid(proj)) {
      toast.error("Please fill all fields before saving.");
      return;
    }
    setEditProjectId(null);
    toast.success("Project saved.");
  };

  const saveExperience = (id: string) => {
    const exp = experiences.find((e) => e.id === id);
    if (!exp || !isExperienceValid(exp)) {
      toast.error("Please fill all fields before saving.");
      return;
    }
    setEditExperienceId(null);
    toast.success("Experience saved.");
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (editProjectId === id) setEditProjectId(null);
    toast.success("Project removed.");
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    if (editExperienceId === id) setEditExperienceId(null);
    toast.success("Experience removed.");
  };

  const generateSummary = async (
    type: "project" | "experience",
    id: string
  ) => {
    setLoadingId(id);

    const item =
      type === "project"
        ? projects.find((p) => p.id === id)
        : experiences.find((e) => e.id === id);

    if (!item) {
      toast.error("Item not found.");
      return;
    }

    try {
      const res = await fetch("/api/summaryGeneration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, type }),
      });
      const data = await res.json();

      if (type === "project") {
        handleProjectChange(id, "summary", data.summary);
      } else {
        handleExperienceChange(id, "summary", data.summary);
      }
    } catch (err) {
      console.log(err, "Summary generation failed");
      toast.error("Failed to generate summary.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-10 stepForms">
      {/* Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {projects.map((proj) =>
          editProjectId === proj.id ? (
            <div key={proj.id} className="border p-4 rounded-lg space-y-3">
              <input
                type="text"
                placeholder="Project Name"
                className="w-full border rounded p-2"
                value={proj.projectName}
                onChange={(e) =>
                  handleProjectChange(proj.id, "projectName", e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="From"
                  className="w-full border rounded p-2"
                  value={proj.fromDate}
                  onChange={(e) =>
                    handleProjectChange(proj.id, "fromDate", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="To"
                  className="w-full border rounded p-2"
                  value={proj.toDate}
                  onChange={(e) =>
                    handleProjectChange(proj.id, "toDate", e.target.value)
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Tech Stack"
                className="w-full border rounded p-2"
                value={proj.techStack}
                onChange={(e) =>
                  handleProjectChange(proj.id, "techStack", e.target.value)
                }
              />
              <textarea
                className="w-full border rounded p-2"
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  handleProjectChange(proj.id, "description", e.target.value)
                }
              />
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => generateSummary("project", proj.id)}
                  disabled={loadingId === proj.id}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {loadingId === proj.id ? "Generating..." : "Generate Summary"}
                </button>
                <button
                  onClick={() => saveProject(proj.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              key={proj.id}
              className="border p-4 rounded-lg relative shadow-md"
            >
              <button
                onClick={() => removeProject(proj.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
              <h3 className="text-lg font-medium">{proj.projectName}</h3>
              <p className="text-sm text-gray-600">
                {proj.fromDate} - {proj.toDate}
              </p>
              <p className="text-sm italic mb-1">Tech: {proj.techStack}</p>
              <p className="text-sm">{proj.description}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Summary: {proj.summary}
              </p>
              <button
                onClick={() => setEditProjectId(proj.id)}
                className="mt-2 text-blue-600 hover:underline flex items-center gap-1"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>
          )
        )}
        <button
          onClick={addProject}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Project
        </button>
      </div>
      {/* Experience */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        {experiences.map((exp) =>
          editExperienceId === exp.id ? (
            <div key={exp.id} className="border p-4 rounded-lg space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border rounded p-2"
                value={exp.companyName}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "companyName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Position"
                className="w-full border rounded p-2"
                value={exp.position}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "position", e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-full border rounded p-2"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, "startDate", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-full border rounded p-2"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, "endDate", e.target.value)
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Years (e.g., 2.5 years)"
                className="w-full border rounded p-2"
                value={exp.years}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "years", e.target.value)
                }
              />
              <textarea
                className="w-full border rounded p-2"
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "description", e.target.value)
                }
              />
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => generateSummary("experience", exp.id)}
                  disabled={loadingId === exp.id}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {loadingId === exp.id ? "Generating..." : "Generate Summary"}
                </button>
                <button
                  onClick={() => saveExperience(exp.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              key={exp.id}
              className="border p-4 rounded-lg relative shadow-md"
            >
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
              <h3 className="text-lg font-medium">{exp.companyName}</h3>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-sm font-semibold">{exp.position}</p>
              <p className="text-sm">{exp.description}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Summary: {exp.summary}
              </p>
              <button
                onClick={() => setEditExperienceId(exp.id)}
                className="mt-2 text-blue-600 hover:underline flex items-center gap-1"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>
          )
        )}
        <button
          onClick={addExperience}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
}
