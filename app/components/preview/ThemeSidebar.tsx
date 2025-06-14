"use client";
import { useResumeStore } from "@/app/lib/state/resumeStore";
import themes from "@/app/themes/themeList";
import clsx from "clsx";
import Image from "next/image";

type ThemeSidebarProps = {
  onClose: () => void;
};

export default function ThemeSidebar({ onClose }: ThemeSidebarProps) {
  const { selectedTheme, setSelectedTheme } = useResumeStore();

  return (
    <aside className="fixed right-0 top-0 h-full w-[300px] bg-white shadow-lg p-4 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Choose a Theme</h2>
        <button
          onClick={onClose}
          className="text-sm text-red-500 hover:underline"
        >
          Close
        </button>
      </div>
      <div className="grid gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={clsx(
              "cursor-pointer border p-2 rounded hover:border-blue-500",
              selectedTheme === theme.id &&
                "border-blue-600 ring-2 ring-blue-400"
            )}
          >
            <Image
              src={theme.thumbnail}
              alt={theme.name}
              className="w-full h-auto"
              height={100}
              width={200}
            />
            <p className="text-center mt-2">{theme.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
