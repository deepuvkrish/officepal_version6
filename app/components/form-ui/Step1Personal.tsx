"use client";

import { useResumeStore } from "@/app/lib/state/resumeStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Save, Trash } from "lucide-react";

export default function Step1Personal() {
  const { personal, updatePersonal } = useResumeStore();
  const [form, setForm] = useState(personal);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem("resume_step1_personal");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed);
      updatePersonal(parsed);
    }
  }, [updatePersonal]);

  useEffect(() => {
    setForm(personal);
  }, [personal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Inline validation
    if (
      ["fullName", "dob", "email", "phone", "address"].includes(name) &&
      value.trim() === ""
    ) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Email format validation
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    }
  };

  const validateRequiredFields = () => {
    const requiredFields = ["fullName", "dob", "email", "phone", "address"];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!form[field as keyof typeof form]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateRequiredFields()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    updatePersonal(form);
    sessionStorage.setItem("resume_step1_personal", JSON.stringify(form));
    toast.success("Saved personal info!");
  };

  const handleClear = () => {
    const emptyForm = {
      fullName: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      portfolio: "",
    };
    setForm(emptyForm);
    updatePersonal(emptyForm);
    sessionStorage.removeItem("resume_step1_personal");
    setErrors({});
    toast.success("Cleared personal info.");
  };

  const fields = [
    { name: "fullName", label: "Full Name *", type: "text" },
    { name: "dob", label: "Date of Birth *", type: "date" },
    { name: "email", label: "Email *", type: "email" },
    { name: "phone", label: "Phone Number *", type: "tel" },
    { name: "address", label: "Location (City, Country) *", type: "text" },
    { name: "linkedin", label: "LinkedIn URL (optional)", type: "text" },
    {
      name: "portfolio",
      label: "Portfolio or Website (optional)",
      type: "text",
    },
  ];

  return (
    <div className="space-y-6 stepForms">
      <h2 className="text-2xl font-bold">Step 1: Personal & Contact Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col"
          >
            <input
              type={field.type}
              name={field.name}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              placeholder={field.label}
              className={`input ${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <span className="text-sm text-red-600 mt-1">
                {errors[field.name]}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleSave} className="savebutton">
          <Save size={15} />
          Save Info
        </button>
        <button onClick={handleClear} className="clearbutton">
          <Trash size={15} />
          Clear Info
        </button>
      </div>
    </div>
  );
}
