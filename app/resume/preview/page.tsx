// ./app/resume/preview/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/lib/state/resumeStore";
import { useSession } from "next-auth/react";
import { Button } from "@/app/components/ui/Button";
import { useState } from "react";
import ThemeSidebar from "@/app/components/preview/ThemeSidebar";
import toast from "react-hot-toast";
import ClassicTheme from "@/app/themes/ClassicTheme";
import ModernTheme from "@/app/themes/ModernTheme";
// import { signIn } from "next-auth/react";

function renderTheme(selectedTheme: string) {
  switch (selectedTheme) {
    case "modern":
      return <ModernTheme />;
    case "classic":
      return <ClassicTheme />;

    default:
      return <ClassicTheme />;
  }
}

export default function ResumePreviewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { selectedTheme } = useResumeStore();

  const [showThemeSidebar, setShowThemeSidebar] = useState(false);

  const handleDownload = async () => {
    if (!session?.user) {
      toast.error("Please login to download your resume.");
      router.push("/auth/signin?redirect=/resume/preview");
      return;
    }
    // Get rendered HTML from the DOM
    const resumeContent = document.querySelector("#resume-container");
    if (!resumeContent) {
      toast.error("Resume content missing.");
      return;
    }
    let toastId: string | undefined;
    try {
      toastId = toast.loading("Generating PDF...");

      const res = await fetch("/api/officepalResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: resumeContent.outerHTML }),
      });

      if (!res.ok) {
        throw new Error(`Download failed with status ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.dismiss(toastId);
      toast.success("Resume downloaded.");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Something went wrong while Downloading.");
      console.error("Download error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Preview</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/resume/form")}>
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowThemeSidebar((prev) => !prev)}
          >
            Switch Theme
          </Button>
          <Button onClick={handleDownload}>Download PDF</Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="border rounded shadow p-6 bg-white">
        {renderTheme(selectedTheme)}
      </div>

      {/* Theme Switcher Sidebar */}
      {showThemeSidebar && (
        <ThemeSidebar onClose={() => setShowThemeSidebar(false)} />
      )}
    </div>
  );
}
