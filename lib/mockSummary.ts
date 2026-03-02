export type BriefAnswers = {
  [key: string]: string;
};

export function buildMockSummary(answers: BriefAnswers) {
  const values = Object.values(answers);
  const first = values[0] || "your brand";
  const audience = values[2] || "your audience";
  const message = values[3] || "your core message";

  return {
    title: `AI Brief: ${first}`,
    concept:
      "A fast-paced, emotionally clear short-form video featuring the GON character guiding viewers through a simple and memorable narrative.",
    audience,
    message,
    style: "Minimal, high-contrast visuals with dynamic captions and gentle character motion.",
    cta: "Invite viewers to take one clear next action at the end of the video."
  };
}
