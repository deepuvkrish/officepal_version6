"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Pencil, Trash2, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";

type Certification = {
  id: string;
  title: string;
  timeperiod: string;
  fromDate: string;
  toDate: string;
  organisation: string;
  summary: string;
};

export default function Step5Certifications() {
  const { certifications, setCertifications } = useResumeStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [unsavedId, setUnsavedId] = useState<string | null>(null);

  const handleChange = (
    id: string,
    key: keyof Certification,
    value: string
  ) => {
    const updated = certifications.map((cert) =>
      cert.id === id ? { ...cert, [key]: value } : cert
    );
    setCertifications(updated);
  };

  const addCertification = () => {
    if (unsavedId) {
      toast.error("Please save or remove the current certification first.");
      return;
    }
    const newCert: Certification = {
      id: uuidv4(),
      title: "",
      timeperiod: "",
      fromDate: "",
      toDate: "",
      organisation: "",
      summary: "",
    };
    setCertifications([...certifications, newCert]);
    setUnsavedId(newCert.id);
    setEditingId(newCert.id);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
    if (unsavedId === id) setUnsavedId(null);
    if (editingId === id) setEditingId(null);
  };

  const validateFields = (cert: Certification) => {
    return (
      cert.title.trim() &&
      cert.timeperiod.trim() &&
      cert.fromDate.trim() &&
      cert.toDate.trim() &&
      cert.organisation.trim()
    );
  };

  const saveCertification = (id: string) => {
    const cert = certifications.find((c) => c.id === id);
    if (!cert) return;

    if (!validateFields(cert)) {
      toast.error("Please fill all required fields.");
      return;
    }

    setEditingId(null);
    setUnsavedId(null);
    toast.success("Certification saved.");
  };

  const generateSummary = async (cert: Certification) => {
    if (!validateFields(cert)) {
      toast.error("Please fill all required fields before generating summary.");
      return;
    }

    setLoadingId(cert.id);
    try {
      const response = await fetch("/api/summaryGeneration", {
        method: "POST",
        body: JSON.stringify({
          input: `Generate a concise one-line summary for the following certificate:\nTitle: ${cert.title}\nTime period: ${cert.timeperiod}\nFrom: ${cert.fromDate}\nTo: ${cert.toDate}\nOrganisation: ${cert.organisation}`,
        }),
      });

      const data = await response.json();
      handleChange(
        cert.id,
        "summary",
        data.output || "Summary generation failed."
      );
    } catch (error) {
      console.error("Summary generation failed:", error);
      toast.error("Summary generation failed.");
      handleChange(cert.id, "summary", "Summary generation failed.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 mt-8 stepForms max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Certifications</h2>

      {certifications.map((cert) => {
        const isEditing = editingId === cert.id;

        return (
          <div
            key={cert.id}
            className="border rounded-lg p-4 space-y-4 relative innerForms"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={cert.title}
                  onChange={(e) =>
                    handleChange(cert.id, "title", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Time Period"
                  value={cert.timeperiod}
                  onChange={(e) =>
                    handleChange(cert.id, "timeperiod", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="From Date"
                    value={cert.fromDate}
                    onChange={(e) =>
                      handleChange(cert.id, "fromDate", e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="To Date"
                    value={cert.toDate}
                    onChange={(e) =>
                      handleChange(cert.id, "toDate", e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <textarea
                  placeholder="Organisation"
                  value={cert.organisation}
                  onChange={(e) =>
                    handleChange(cert.id, "organisation", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Summary"
                  value={cert.summary}
                  onChange={(e) =>
                    handleChange(cert.id, "summary", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => generateSummary(cert)}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
                    disabled={loadingId === cert.id}
                  >
                    {loadingId === cert.id
                      ? "Generating..."
                      : "Generate Summary"}
                  </button>
                  <button
                    onClick={() => saveCertification(cert.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    <Save className="w-4 h-4 inline-block mr-1" />
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => setEditingId(cert.id)}>
                    <Pencil
                      className="text-gray-500 hover:text-blue-600"
                      size={18}
                    />
                  </button>
                  <button onClick={() => removeCertification(cert.id)}>
                    <Trash2 className="text-red-500" size={18} />
                  </button>
                </div>
                <p>
                  <strong>Title:</strong> {cert.title}
                </p>
                <p>
                  <strong>Time Period:</strong> {cert.timeperiod}
                </p>
                <p>
                  <strong>From:</strong> {cert.fromDate} <strong>To:</strong>{" "}
                  {cert.toDate}
                </p>
                <p>
                  <strong>Organisation:</strong> {cert.organisation}
                </p>
                {cert.summary && (
                  <p className="text-gray-700 italic">
                    <strong>Summary:</strong> {cert.summary}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="text-center">
        <button
          type="button"
          onClick={addCertification}
          className="flex items-center gap-2 justify-center mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>
    </div>
  );
}
