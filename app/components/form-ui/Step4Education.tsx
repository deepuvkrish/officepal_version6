"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";

export default function Step4Education() {
  const { education, setEducation } = useResumeStore();

  const handleChange = (id: string, key: string, value: string) => {
    const updated = education.map((edu) =>
      edu.id === id ? { ...edu, [key]: value } : edu
    );
    setEducation(updated);
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Education</h2>
      {education.map((edu) => (
        <div key={edu.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Department"
            value={edu.department}
            onChange={(e) => handleChange(edu.id, "department", e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="University"
            value={edu.university}
            onChange={(e) => handleChange(edu.id, "university", e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={edu.location}
            onChange={(e) => handleChange(edu.id, "location", e.target.value)}
            className="w-full border p-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="From Date"
              value={edu.fromDate}
              onChange={(e) => handleChange(edu.id, "fromDate", e.target.value)}
              className="w-full border p-2"
            />
            <input
              type="text"
              placeholder="To Date"
              value={edu.toDate}
              onChange={(e) => handleChange(edu.id, "toDate", e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <input
            type="text"
            placeholder="CGPA/Percentage"
            value={edu.cgpa}
            onChange={(e) => handleChange(edu.id, "cgpa", e.target.value)}
            className="w-full border p-2"
          />
          <button
            type="button"
            onClick={() => removeEducation(edu.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Education
      </button>
    </div>
  );
}
