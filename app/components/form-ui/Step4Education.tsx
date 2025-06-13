"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";

export default function Step4Education() {
  const { education, setEducation } = useResumeStore();

  const handleChange = (id: string, key: string, value: string) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [key]: value } : edu))
    );
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: uuidv4(),
        degree: "",
        department: "",
        university: "",
        location: "",
        fromDate: "",
        toDate: "",
        cgpa: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-semibold">Education</h2>

      {education.map((edu) => (
        <div key={edu.id} className="border p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. B.Tech, M.Sc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <input
                type="text"
                value={edu.department}
                onChange={(e) =>
                  handleChange(edu.id, "department", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="e.g. Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                University
              </label>
              <input
                type="text"
                value={edu.university}
                onChange={(e) =>
                  handleChange(edu.id, "university", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="e.g. IIT Delhi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) =>
                  handleChange(edu.id, "location", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="e.g. New Delhi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="text"
                value={edu.fromDate}
                onChange={(e) =>
                  handleChange(edu.id, "fromDate", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="e.g. 2019"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="text"
                value={edu.toDate}
                onChange={(e) => handleChange(edu.id, "toDate", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. 2023"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                CGPA / Percentage
              </label>
              <input
                type="text"
                value={edu.cgpa}
                onChange={(e) => handleChange(edu.id, "cgpa", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. 8.5 / 85%"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={addEducation}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>
    </div>
  );
}
