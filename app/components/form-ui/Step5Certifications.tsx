"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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

  const handleChange = (id: string, key: string, value: string) => {
    const updated = certifications.map((ach) =>
      ach.id === id ? { ...ach, [key]: value } : ach
    );
    setCertifications(updated);
  };

  const addCertification = () => {
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
  };
  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };
  const generateSummary = async (cert: Certification) => {
    setLoadingId(cert.id);
    const response = await fetch("/api/certSummaryGeneration", {
      method: "POST",
      body: JSON.stringify({
        input: `Generate a concise one-line summary for the following certificate:\nTitle: ${cert.title}\nTime period: ${cert.timeperiod}\nfrom: ${cert.fromDate}\nto: ${cert.toDate}\norganisation: ${cert.organisation}\n`,
      }),
    });

    const data = await response.json();
    handleChange(
      cert.id,
      "summary",
      data.output || "Summary generation failed."
    );
    setLoadingId(null);
  };
  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-bold">certifications</h2>
      {certifications.map((cert) => (
        <div key={cert.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={cert.title}
            onChange={(e) => handleChange(cert.id, "title", e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Time Period"
            value={cert.timeperiod}
            onChange={(e) => handleChange(cert.id, "title", e.target.value)}
            className="w-full border p-2"
          />
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="From Date"
              value={cert.fromDate}
              onChange={(e) => handleChange(cert.id, "date", e.target.value)}
              className="w-full border p-2"
            />
            <input
              type="text"
              placeholder="To Date"
              value={cert.toDate}
              onChange={(e) => handleChange(cert.id, "date", e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <textarea
            placeholder="Source"
            value={cert.organisation}
            onChange={(e) =>
              handleChange(cert.id, "description", e.target.value)
            }
            className="w-full border p-2"
          />
          <textarea
            placeholder="Summary"
            value={cert.summary}
            onChange={(e) => handleChange(cert.id, "summary", e.target.value)}
            className="w-full border p-2"
          />
          <button
            onClick={() => generateSummary(cert)}
            className="text-sm bg-green-500 text-white px-3 py-1 rounded"
            disabled={loadingId === cert.id}
          >
            {loadingId === cert.id ? "Generating..." : "Generate Summary"}
          </button>
          <button
            type="button"
            onClick={() => removeCertification(cert.id)}
            className="text-red-500 ml-3"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCertification}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Certification
      </button>
    </div>
  );
}
