// ./app/themes/ClassicTheme.tsx

"use client";
import { useEffect, useState } from "react";
import { useResumeStore } from "@/app/lib/state/resumeStore";

export default function ClassicTheme() {
  const [hydrated, setHydrated] = useState(false);
  const {
    personal,
    skillsInterests,
    projects,
    experiences,
    education,
    certifications,
    achievements,
  } = useResumeStore();
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevent mismatch between server and client

  return (
    <div
      id="resume-container"
      className="text-black font-serif space-y-6 text-sm leading-relaxed relative"
    >
      {/* PERSONAL INFO */}
      <div>
        <h1 className="text-2xl font-bold">{personal.fullName}</h1>
        <p>
          {personal.email} | {personal.phone} | {personal.address}
        </p>
        <p>
          {personal.linkedin} | {personal.portfolio}
        </p>
        <p>Date of Birth: {personal.dob}</p>
      </div>

      {/* SKILLS & INTERESTS */}
      <div>
        <h2 className="text-xl font-semibold underline">Skills</h2>
        <p>{skillsInterests.skills.join(", ")}</p>

        <h2 className="text-xl font-semibold underline mt-2">
          Interests & Languages
        </h2>
        <p>{skillsInterests.interests.join(", ")}</p>
      </div>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold underline">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mt-1">
              <h3 className="font-bold">{proj.projectName}</h3>
              <p className="italic text-xs">
                {proj.fromDate} - {proj.toDate}
              </p>
              <p>
                <strong>Tech Stack:</strong> {proj.techStack}
              </p>
              <p>{proj.description}</p>
              {proj.summary && <p className="text-gray-700">{proj.summary}</p>}
            </div>
          ))}
        </div>
      )}

      {/* EXPERIENCE */}
      {experiences.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold underline">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mt-1">
              <h3 className="font-bold">
                {exp.position} at {exp.companyName}
              </h3>
              <p className="italic text-xs">
                {exp.startDate} - {exp.endDate} ({exp.years})
              </p>
              <p>{exp.description}</p>
              {exp.summary && <p className="text-gray-700">{exp.summary}</p>}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold underline">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mt-1">
              <h3 className="font-bold">
                {edu.degree} - {edu.department}
              </h3>
              <p>
                {edu.university}, {edu.location}
              </p>
              <p className="italic text-xs">
                {edu.fromDate} - {edu.toDate}
              </p>
              <p>
                <strong>CGPA:</strong> {edu.cgpa}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold underline">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mt-1">
              <h3 className="font-bold">{cert.title}</h3>
              <p>{cert.organisation}</p>
              <p className="italic text-xs">
                {cert.fromDate} - {cert.toDate} ({cert.timeperiod})
              </p>
              <p>{cert.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold underline">Achievements</h2>
          {achievements.map((ach) => (
            <div key={ach.id} className="mt-1">
              <h3 className="font-bold">{ach.title}</h3>
              <p className="italic text-xs">{ach.date}</p>
              <p>{ach.description}</p>
              <p>{ach.summary}</p>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-[-42px] right-[-21px]  text-gray-300 text-lg pointer-events-none  z-0 bg-gray-700 px-3 py-1">
        Made with officePal.ai
      </div>
    </div>
  );
}
