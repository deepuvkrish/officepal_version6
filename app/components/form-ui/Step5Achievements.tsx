"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// ✅ Define proper type instead of `any`
type Achievement = {
  id: string;
  title: string;
  date: string;
  description: string;
  summary: string;
};

export default function Step5Achievements() {
  const { achievements, setAchievements } = useResumeStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleChange = (id: string, key: keyof Achievement, value: string) => {
    const updated = achievements.map((ach) =>
      ach.id === id ? { ...ach, [key]: value } : ach
    );
    setAchievements(updated);
  };

  const addAchievement = () => {
    const newAch: Achievement = {
      id: uuidv4(),
      title: "",
      date: "",
      description: "",
      summary: "",
    };
    setAchievements([...achievements, newAch]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  const generateSummary = async (ach: Achievement) => {
    setLoadingId(ach.id);
    const response = await fetch("/api/summaryGeneration", {
      method: "POST",
      body: JSON.stringify({
        input: `Generate a concise one-line summary for the following achievement:\nTitle: ${ach.title}\nDate: ${ach.date}\nDescription: ${ach.description}\n`,
      }),
    });

    const data = await response.json();
    handleChange(
      ach.id,
      "summary",
      data.output || "Summary generation failed."
    );
    setLoadingId(null);
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-bold">Achievements</h2>
      {achievements.map((ach) => (
        <div key={ach.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={ach.title}
            onChange={(e) => handleChange(ach.id, "title", e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Date"
            value={ach.date}
            onChange={(e) => handleChange(ach.id, "date", e.target.value)}
            className="w-full border p-2"
          />
          <textarea
            placeholder="Description"
            value={ach.description}
            onChange={(e) =>
              handleChange(ach.id, "description", e.target.value)
            }
            className="w-full border p-2"
          />
          <textarea
            placeholder="Summary"
            value={ach.summary}
            onChange={(e) => handleChange(ach.id, "summary", e.target.value)}
            className="w-full border p-2"
          />
          <button
            onClick={() => generateSummary(ach)}
            className="text-sm bg-green-500 text-white px-3 py-1 rounded"
            disabled={loadingId === ach.id}
          >
            {loadingId === ach.id ? "Generating..." : "Generate Summary"}
          </button>
          <button
            type="button"
            onClick={() => removeAchievement(ach.id)}
            className="text-red-500 ml-3"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addAchievement}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Achievement
      </button>
    </div>
  );
}
