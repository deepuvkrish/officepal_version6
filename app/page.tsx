import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
// import AnimatedBackground from "./components/ui/AnimatedBackground";
import Image from "next/image";
// import SignIn from "@/app/components/SignIn";
import Testimonial from "./components/ui/Testimonial";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-background text-foreground text-center overflow-hidden">
      {/* Background Illustration */}
      {/* <AnimatedBackground /> */}

      <div className="relative z-10 max-w-[900px] pt-10">
        <Image
          src="/logo/icon_black2.png"
          alt="Resume Icon"
          width={200}
          height={200}
          className="mx-auto mb-6"
        />

        <h1 className="text-5xl font-bold mb-4">
          Start Your Professional Career here with Us
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          Create your professional writings with ease, Simple, Clean & Smart.
          Powered by AI.
        </p>

        <Link href="/resume/form">
          <Button size="lg" className="text-base px-8 cursor-pointer commonBtn">
            Start Building Resume
          </Button>
        </Link>
        {/* <SignIn /> */}
      </div>

      <div className="flex flex-col w-full mt-[10rem]">
        <Testimonial />
      </div>
    </main>
  );
}
