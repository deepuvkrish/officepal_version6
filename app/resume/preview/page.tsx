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

  const handleDownload = () => {
    if (!session?.user) {
      toast.error("Please login to download your resume.");
      router.push(
        "/auth/login?redirect=/resume/preview&message=Please login to download your resume"
      );
      return;
    }

    // Trigger PDF generation (client/server logic based on your setup)
    toast.success("Downloading...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28">
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
