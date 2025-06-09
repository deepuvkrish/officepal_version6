"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { useState, useEffect } from "react";

export default function Step1Personal() {
  const { personal, updatePersonal } = useResumeStore();

  const [form, setForm] = useState(personal);

  useEffect(() => {
    setForm(personal);
  }, [personal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updatePersonal(form);
    alert("Saved!");
  };

  return (
    <div className="space-y-6 stepForms">
      <h2 className="text-2xl font-bold">Step 1: Personal & Contact Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input"
        />
        <input
          type="text"
          name="location"
          value={form.address}
          onChange={handleChange}
          placeholder="Location (City, Country)"
          className="input"
        />
        <input
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="input"
        />
        <input
          type="text"
          name="website"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio or Personal Website"
          className="input"
        />
      </div>

      <button onClick={handleSave} className="btn mt-4">
        Save Info
      </button>
    </div>
  );
}
