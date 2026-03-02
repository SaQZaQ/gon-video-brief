"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { BriefAnswers } from "@/lib/mockSummary";
import { buildMockSummary } from "@/lib/mockSummary";

type SummaryProps = {
  answers: BriefAnswers;
};

export default function Summary({ answers }: SummaryProps) {
  const [isExporting, setIsExporting] = useState(false);
  const summary = buildMockSummary(answers);
  const cardRef = useRef<HTMLDivElement>(null);

  const exportPdf = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });

    const margin = 10;
    const width = 190;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", margin, margin, width, height);
    pdf.save("gon-video-brief.pdf");
    setIsExporting(false);
  };

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">{summary.title}</h2>
        <p><span className="font-medium">Concept:</span> {summary.concept}</p>
        <p><span className="font-medium">Audience:</span> {summary.audience}</p>
        <p><span className="font-medium">Message:</span> {summary.message}</p>
        <p><span className="font-medium">Style:</span> {summary.style}</p>
        <p><span className="font-medium">CTA:</span> {summary.cta}</p>
      </div>
      <button
        type="button"
        onClick={exportPdf}
        disabled={isExporting}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {isExporting ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
}
