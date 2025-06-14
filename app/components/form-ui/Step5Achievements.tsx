"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

type Achievement = {
  id: string;
  title: string;
  date: string;
  description: string;
  summary: string;
  isSaved?: boolean;
};

export default function Step5Achievements() {
  const { achievements, setAchievements } = useResumeStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleChange = (
    id: string,
    key: keyof Achievement,
    value: string | boolean
  ) => {
    const updated = achievements.map((ach) =>
      ach.id === id ? { ...ach, [key]: value } : ach
    );
    setAchievements(updated);
  };

  const addAchievement = () => {
    const hasUnsaved = achievements.some((ach) => !ach.isSaved);
    if (hasUnsaved) {
      toast("Please save or remove the current achievement first.", {
        icon: "⚠️",
      });
      return;
    }

    setAchievements([
      ...achievements,
      {
        id: uuidv4(),
        title: "",
        date: "",
        description: "",
        summary: "",
        isSaved: false,
      },
    ]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  const saveAchievement = (ach: Achievement) => {
    if (!ach.title || !ach.date || !ach.description) {
      toast.error("Please fill in Title, Date, and Description.");
      return;
    }

    handleChange(ach.id, "isSaved", true);
    toast.success("Achievement saved!");
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
    <div className="max-w-3xl mx-auto p-4 space-y-8 stepForms">
      <h2 className="text-2xl font-semibold">Achievements</h2>

      {achievements.map((ach) => (
        <div
          key={ach.id}
          className="rounded-lg p-4 space-y-4 innerForms border relative"
        >
          {ach.isSaved ? (
            // ✅ Saved View
            <div className="space-y-2 relative">
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleChange(ach.id, "isSaved", false)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  title="Edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => removeAchievement(ach.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>

              <h3 className="text-lg font-semibold">{ach.title}</h3>
              <p className="text-sm text-gray-600">{ach.date}</p>
              <p className="text-gray-800 whitespace-pre-wrap">
                {ach.description}
              </p>
              {ach.summary && (
                <p className="text-green-700 italic border-l-4 border-green-600 pl-3">
                  {ach.summary}
                </p>
              )}
            </div>
          ) : (
            // 📝 Editable Form View
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) =>
                      handleChange(ach.id, "title", e.target.value)
                    }
                    className="w-full border rounded p-2"
                    placeholder="e.g. Hackathon Winner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={ach.date}
                    onChange={(e) =>
                      handleChange(ach.id, "date", e.target.value)
                    }
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
                  <label className="block text-sm font-medium mb-1">
                    Summary
                  </label>
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
                  onClick={() => saveAchievement(ach)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => removeAchievement(ach.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={addAchievement}
          className="addAchieveBtn"
        >
          <Plus className="addIcon" />
        </button>
      </div>
    </div>
  );
}
