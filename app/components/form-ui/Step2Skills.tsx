"use client";

import { useState } from "react";
import { useResumeStore } from "@/app/lib/state/resumeStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Step2Skills() {
  const {
    skillsInterests,
    addSkill,
    removeSkill,
    addInterest,
    removeInterest,
    isSavedSkillsInterests,
    setIsSavedSkillsInterests,
  } = useResumeStore();

  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return toast.error("Please enter a skill.");
    if (skillsInterests.skills.includes(trimmed))
      return toast.error("This skill already exists.");
    addSkill(trimmed);
    setSkillInput("");
    setIsSavedSkillsInterests(false);
    if (isSavedSkillsInterests) {
      console.log("skills entered");
    }
  };

  const handleAddInterest = () => {
    const trimmed = interestInput.trim();
    if (!trimmed) return toast.error("Please enter an interest or language.");
    if (skillsInterests.interests.includes(trimmed))
      return toast.error("This entry already exists.");
    addInterest(trimmed);
    setInterestInput("");
    setIsSavedSkillsInterests(false);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    handler: () => void
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handler();
    }
  };

  const handleSave = () => {
    if (
      skillsInterests.skills.length === 0 &&
      skillsInterests.interests.length === 0
    ) {
      toast.error("Please add at least one skill or interest.");
      return;
    }
    setIsSavedSkillsInterests(true);
    toast.success("Skills and Interests saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-8 stepForms">
      <h2 className="text-2xl font-bold">Step 2: Skills & Interests</h2>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block font-semibold mb-2">Add Skill</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, handleAddSkill)}
            className="input flex-1"
            placeholder="e.g. JavaScript"
          />
          <button onClick={handleAddSkill} className="addButton">
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
                onClick={() => {
                  removeSkill(index);
                  setIsSavedSkillsInterests(false);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block font-semibold mb-2">
          Add Interest / Language
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, handleAddInterest)}
            className="input flex-1"
            placeholder="e.g. English, Problem Solving"
          />
          <button onClick={handleAddInterest} className="addButton">
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
                onClick={() => {
                  removeInterest(index);
                  setIsSavedSkillsInterests(false);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          className="saveButton flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          <CheckCircle size={18} />
          Save Skills & Interests
        </button>
      </div>
    </div>
  );
}
