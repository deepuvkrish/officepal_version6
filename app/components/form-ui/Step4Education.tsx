"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

export default function Step4Education() {
  const { education, setEducation } = useResumeStore();
  const [editStates, setEditStates] = useState<Record<string, boolean>>({});

  const handleChange = (id: string, key: string, value: string) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [key]: value } : edu))
    );
  };

  const addEducation = () => {
    const unsaved = education.find(
      (edu) => !edu.degree || !edu.department || !edu.university
    );
    if (unsaved) {
      toast.error(
        "Please complete or remove the existing card before adding a new one."
      );
      return;
    }
    const newEdu = {
      id: uuidv4(),
      degree: "",
      department: "",
      university: "",
      location: "",
      fromDate: "",
      toDate: "",
      cgpa: "",
    };
    setEducation([...education, newEdu]);
    setEditStates({ ...editStates, [newEdu.id]: true });
  };

  const saveEducation = (id: string) => {
    const edu = education.find((e) => e.id === id);
    if (!edu || !edu.degree || !edu.department || !edu.university) {
      toast.error("Degree, Department, and University are required.");
      return;
    }
    setEditStates({ ...editStates, [id]: false });
    toast.success("Saved successfully");
  };

  const editEducation = (id: string) => {
    setEditStates({ ...editStates, [id]: true });
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
    const updatedEdits = { ...editStates };
    delete updatedEdits[id];
    setEditStates(updatedEdits);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8 stepForms">
      <h2 className="text-2xl font-semibold">Education</h2>

      {education.map((edu) => (
        <div key={edu.id} className="border p-4 rounded-lg space-y-4 relative">
          {editStates[edu.id] ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Degree"
                  className="border p-2 rounded w-full"
                  value={edu.degree}
                  onChange={(e) =>
                    handleChange(edu.id, "degree", e.target.value)
                  }
                />
                <input
                  placeholder="Department"
                  className="border p-2 rounded w-full"
                  value={edu.department}
                  onChange={(e) =>
                    handleChange(edu.id, "department", e.target.value)
                  }
                />
                <input
                  placeholder="University"
                  className="border p-2 rounded w-full"
                  value={edu.university}
                  onChange={(e) =>
                    handleChange(edu.id, "university", e.target.value)
                  }
                />
                <input
                  placeholder="Location"
                  className="border p-2 rounded w-full"
                  value={edu.location}
                  onChange={(e) =>
                    handleChange(edu.id, "location", e.target.value)
                  }
                />
                <input
                  placeholder="From"
                  className="border p-2 rounded w-full"
                  value={edu.fromDate}
                  onChange={(e) =>
                    handleChange(edu.id, "fromDate", e.target.value)
                  }
                />
                <input
                  placeholder="To"
                  className="border p-2 rounded w-full"
                  value={edu.toDate}
                  onChange={(e) =>
                    handleChange(edu.id, "toDate", e.target.value)
                  }
                />
                <input
                  placeholder="CGPA / Percentage"
                  className="border p-2 rounded w-full md:col-span-2"
                  value={edu.cgpa}
                  onChange={(e) => handleChange(edu.id, "cgpa", e.target.value)}
                />
              </div>
              <div className="text-right">
                <button
                  onClick={() => saveEducation(edu.id)}
                  className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="text-lg font-semibold flex justify-between">
                <span>
                  {edu.degree} in {edu.department}
                </span>
                <div className="flex gap-3">
                  <button onClick={() => editEducation(edu.id)}>
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => removeEducation(edu.id)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {edu.university}, {edu.location}
              </p>
              <p className="text-sm">
                {edu.fromDate} - {edu.toDate}
              </p>
              <p className="text-sm">CGPA / Percentage: {edu.cgpa}</p>
            </div>
          )}
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
