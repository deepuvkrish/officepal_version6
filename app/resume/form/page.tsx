"use client";
import { useEffect, useState } from "react";
import { useResumeStore } from "@/app/lib/state/resumeStore";
import Step1Personal from "@/app/components/form-ui/Step1Personal";
import Step2Skills from "@/app/components/form-ui/Step2Skills";
import Step3ProjectsExperience from "@/app/components/form-ui/Step3ProjectsExperience";
import Step4Education from "@/app/components/form-ui/Step4Education";
import Step5Achievements from "@/app/components/form-ui/Step5Achievements";
import Step5Certifications from "@/app/components/form-ui/Step5Certifications";
import FormSkeleton from "@/app/components/form-ui/FormSkeleton";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeFormPage() {
  const { step, setStep, personal } = useResumeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const isStep1Valid = (): boolean => {
    const { fullName, dob, email, phone, address } = personal;
    return !!(fullName && dob && email && phone && address);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Personal />;
      case 2:
        return <Step2Skills />;
      case 3:
        return <Step3ProjectsExperience />;
      case 4:
        return <Step4Education />;
      case 5:
        return (
          <div className="space-y-6">
            <Step5Achievements />
            <Step5Certifications />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step === 1 && !isStep1Valid()) {
      toast.error("Please fill in all required personal details.");
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 mt-[6rem]">
      <div className="mb-6 borderBottom">
        <h1 className="text-2xl font-bold">
          Resume Builder - Step {step} of 5
        </h1>
      </div>

      {loading ? <FormSkeleton /> : renderStep()}

      {!loading && (
        <div className="flex justify-between items-center mt-8">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              iconRight={<ArrowLeft />}
            >
              Previous
            </Button>
          ) : (
            <span />
          )}

          {step < 5 ? (
            <Button onClick={handleNext} iconRight={<ArrowRight />}>
              Next
            </Button>
          ) : (
            <Link href="/resume/preview">
              <Button variant="default">Preview PDF</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
