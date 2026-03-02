import type { ChangeEvent } from "react";

type StepProps = {
  question: string;
  answer: string;
  onChange: (value: string) => void;
};

export default function Step({ question, answer, onChange }: StepProps) {
  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{question}</h2>
      <textarea
        value={answer}
        onChange={handleInput}
        placeholder="Type your answer..."
        className="h-36 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-base outline-none transition focus:border-slate-400"
      />
    </div>
  );
}
