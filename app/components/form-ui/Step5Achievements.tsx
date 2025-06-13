"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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
    setAchievements([
      ...achievements,
      {
        id: uuidv4(),
        title: "",
        date: "",
        description: "",
        summary: "",
      },
    ]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  const generateSummary = async (ach: Achievement) => {
    setLoadingId(ach.id);
    try {
      const response = await fetch("/api/summaryGeneration", {
        method: "POST",
        body: JSON.stringify({
          input: `Generate a concise one-line summary for the following achievement:\nTitle: ${ach.title}\nDate: ${ach.date}\nDescription: ${ach.description}`,
        }),
      });
      const data = await response.json();
      handleChange(
        ach.id,
        "summary",
        data.output || "Summary generation failed."
      );
    } catch (error) {
      console.error("Summary generation failed:", error);
      handleChange(ach.id, "summary", "Summary generation failed.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-semibold">Achievements</h2>

      {achievements.map((ach) => (
        <div key={ach.id} className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={ach.title}
                onChange={(e) => handleChange(ach.id, "title", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. Hackathon Winner"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                value={ach.date}
                onChange={(e) => handleChange(ach.id, "date", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="e.g. June 2023"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={ach.description}
                onChange={(e) =>
                  handleChange(ach.id, "description", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="Describe the achievement in detail..."
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                value={ach.summary}
                onChange={(e) =>
                  handleChange(ach.id, "summary", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="One-line summary (generated or manual)"
                rows={2}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={() => generateSummary(ach)}
              disabled={loadingId === ach.id}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
            >
              {loadingId === ach.id ? "Generating..." : "Generate Summary"}
            </button>

            <button
              type="button"
              onClick={() => removeAchievement(ach.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={addAchievement}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Achievement
        </button>
      </div>
    </div>
  );
}
