import React from "react";
import { cn } from "../utils/cn"; 

interface EcoScoreBadgeProps {
  score: number; // 0–100
  onClick?: () => void; // Optional click handler
}

function getEcoLabel(score: number): { label: string; color: string; description: string } {
  if (score >= 75) return { label: "A", color: "white", description: "Excellent" };
  if (score >= 65) return { label: "B", color: "white", description: "Good" };
  if (score >= 50) return { label: "C", color: "white", description: "Moderate" };
  if (score >= 30) return { label: "D", color: "white", description: "Poor" };
  return { label: "E", color: "white", description: "Bad" };
}

const EcoScoreBadge: React.FC<EcoScoreBadgeProps> = ({ score, onClick }) => {
  const { label, color, description } = getEcoLabel(score);

  const isClickable = typeof onClick === "function";

  return (
    
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full text-white font-medium text-sm shadow-sm transition-transform duration-200",
        color,
        isClickable && "cursor-pointer hover:scale-105"
      )}
      role="button"
      aria-label={`Eco Score ${label}: ${description}`}
      title={`Eco Score ${label}: ${description}`}
    >

      <span className="text-lg font-bold">{label}</span>
      <span className="hidden sm:inline">{description}</span>
    </div>
    
  );
};

export default EcoScoreBadge;
