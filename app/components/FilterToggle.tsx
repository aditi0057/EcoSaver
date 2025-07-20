import React from "react";
import { motion } from "framer-motion";
import { Leaf, Info } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface FilterToggleProps {
  value: boolean;
  onToggle: () => void;
  label: string;
  tooltip?: string;
  icon?: React.ReactNode;
}

const FilterToggle: React.FC<FilterToggleProps> = ({
  value,
  onToggle,
  label,
  tooltip = "This filter narrows down eco-friendly attributes.",
  icon = <Leaf size={20} />,
}) => {
  const tooltipId = `tooltip-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex items-center gap-3 p-3 bg-white shadow-md rounded-xl max-w-sm w-full">
      {/* Icon */}
      <div className="text-green-600">{icon}</div>

      {/* Label + Tooltip */}
      <div className="flex flex-col text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>{tooltip?.split(".")[0]}</span>
          <div data-tooltip-id={tooltipId}>
            <Info
              size={14}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
            />
          </div>
          <Tooltip id={tooltipId} place="top" content={tooltip} />
        </div>
      </div>

      {/* Toggle Switch */}
      <motion.div
        onClick={onToggle}
        initial={false}
        animate={value ? "on" : "off"}
        variants={{
          on: { backgroundColor: "#22c55e" },
          off: { backgroundColor: "#d1d5db" },
        }}
        className="ml-auto w-10 h-6 rounded-full cursor-pointer relative transition-colors"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full absolute top-0.5"
          style={{
            left: value ? "calc(100% - 1.25rem)" : "0.25rem",
            boxShadow: value
              ? "0 0 0 2px rgba(34, 197, 94, 0.4)"
              : "0 0 0 1px rgba(0,0,0,0.1)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default FilterToggle;
