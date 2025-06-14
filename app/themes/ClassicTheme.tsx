import { useResumeStore } from "@/app/lib/state/resumeStore";

export default function ClassicTheme() {
  const { personal } = useResumeStore();

  return (
    <div className="text-black font-serif">
      <h2 className="text-2xl font-bold">{personal.fullName}</h2>
      <p>
        {personal.email} | {personal.phone}
      </p>
      <p>{personal.address}</p>
      {/* Render skills, projects, education, etc. */}
    </div>
  );
}
