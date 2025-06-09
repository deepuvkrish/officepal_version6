import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import AnimatedBackground from "@/app/components/ui/AnimatedBackground";
import Image from "next/image";
import { SignOut } from "../components/SignOut";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-background text-foreground text-center overflow-hidden">
      {/* Background Illustration */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-xl">
        <Image
          src="/logo/icon_white.png"
          alt="Resume Icon"
          width={200}
          height={200}
          className="mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">
          Office Assist: Resume Creator
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Build your professional resume with ease. Simple. Clean. Smart.
          Powered by AI.
        </p>

        <Link href="/resume/form">
          <Button size="lg" className="text-base px-8 cursor-pointer">
            Start Building Resume
          </Button>
        </Link>

        <SignOut />
      </div>
    </main>
  );
}
