import { useResumeStore } from "@/app/lib/state/resumeStore";

export default function ModernTheme() {
  const { personal } = useResumeStore();

  return (
    <div className="text-gray-800 font-sans bg-gray-50 p-6 rounded shadow">
      <h2 className="text-3xl font-semibold text-blue-700">
        {personal.fullName}
      </h2>
      <p className="text-sm">
        {personal.email} • {personal.phone}
      </p>
      <p className="text-sm">{personal.linkedin}</p>
      {/* Add more fields and sections */}
    </div>
  );
}
