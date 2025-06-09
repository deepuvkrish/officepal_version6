"use client";

import { useState } from "react";
import { useResumeStore } from "@/app/lib/state/resumeStore";

export default function Step2Skills() {
  const {
    skillsInterests,
    addSkill,
    removeSkill,
    addInterest,
    removeInterest,
    setStep,
  } = useResumeStore();

  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      addInterest(interestInput.trim());
      setInterestInput("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Skills & Interests</h2>

      {/* Skills Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Add Skill</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="e.g. JavaScript"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {skillsInterests.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeSkill(index)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Add Interest / Language
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="e.g. English, Problem Solving"
          />
          <button
            onClick={handleAddInterest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {skillsInterests.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {interest}
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeInterest(index)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
