"use client";

import { useMemo, useState } from "react";
import Gon from "@/components/Gon";
import Step from "@/components/Step";
import Summary from "@/components/Summary";

const questions = [
  "What is the product or service?",
  "What is the goal of this video?",
  "Who is the target audience?",
  "What is the key message?",
  "What tone should the video have?",
  "Where will this video be published?",
  "What visual style do you prefer?",
  "What action should viewers take next?"
];

function ProgressRing({ progress }: { progress: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r={radius} className="fill-none stroke-slate-200" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="fill-none stroke-slate-900 transition-all duration-300"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-sm text-slate-500">Progress</p>
        <p className="text-lg font-semibold">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const isSummary = step === questions.length;
  const progress = useMemo(() => (step / questions.length) * 100, [step]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, questions.length));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl gap-8 p-6 md:p-10">
      <section className="flex-1 rounded-2xl bg-slate-100 p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <ProgressRing progress={isSummary ? 100 : progress} />
          <p className="text-sm text-slate-500">
            {isSummary ? "Summary" : `Question ${step + 1} of ${questions.length}`}
          </p>
        </div>

        {isSummary ? (
          <Summary answers={Object.fromEntries(Object.entries(answers).map(([k, v]) => [questions[Number(k)], v]))} />
        ) : (
          <Step question={questions[step]} answer={answers[step] || ""} onChange={handleAnswer} />
        )}

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-200 disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {isSummary ? "Done" : step === questions.length - 1 ? "Generate Summary" : "Next"}
          </button>
        </div>
      </section>

      <aside className="hidden w-64 rounded-2xl bg-white p-4 shadow-sm md:block">
        <Gon />
      </aside>
    </main>
  );
}
