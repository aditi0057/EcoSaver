import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp } from "lucide-react";

interface BreakdownModalProps {
  open: boolean;
  onClose: () => void;
  score: number;
  breakdown: {
    sustainability: number;
    certifications: number;
    disposal: number;
    product_material: number;
    bonus_sustainability_flag: number;
  };
  productName?: string;
}

function getScoreLabel(score: number) {
  if (score >= 75) return { emoji: "🌱", label: "Low Impact", color: "text-green-600" };
  if (score >= 40) return { emoji: "⚠️", label: "Moderate Impact", color: "text-amber-500" };
  return { emoji: "❌", label: "High Impact", color: "text-red-600" };
}

const BreakdownModal: React.FC<BreakdownModalProps> = ({ open, onClose, score, breakdown, productName }) => {
  const { emoji, label, color } = getScoreLabel(score);
  const [pledged, setPledged] = useState(false);
  const [showFacts, setShowFacts] = useState<Record<string, boolean>>({
    sustainability: false,
    certifications: false,
    disposal: false,
    product_material: false,
    bonus_sustainability_flag: false,
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-xl relative"
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold">{productName ?? "Eco Score"}: {score}/100</h2>
              <p className={`text-sm font-medium ${color}`}>{emoji} {label}</p>
            </div>

            {/* Breakdown Sections */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              {[
                { key: "sustainability", label: "Sustainability", icon: "🌿", value: breakdown.sustainability, fact: "Reflects how environmentally friendly the entire lifecycle of the product is." },
                { key: "certifications", label: "Certifications", icon: "✅", value: breakdown.certifications, fact: "3rd-party eco labels ensure trusted sustainability standards." },
                { key: "disposal", label: "Disposal", icon: "🗑️", value: breakdown.disposal, fact: "Better disposal = less landfill and ocean pollution." },
                { key: "product_material", label: "Materials", icon: "🧵", value: breakdown.product_material, fact: "Natural or recycled materials are preferred over plastics." },
                { key: "bonus_sustainability_flag", label: "Bonus Flag", icon: "🎁", value: breakdown.bonus_sustainability_flag, fact: "Bonus points for extra green features like carbon offsetting." }
              ].map(item => (
                <div key={item.key} className="text-center border p-2 rounded">
                  <p className="text-xl">{item.icon}</p>
                  <p className="font-semibold">{item.value} pts</p>
                  <p className="text-xs text-gray-600">{item.label}</p>
                  <button
                    onClick={() => setShowFacts(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className="text-[10px] text-green-500 underline mt-1"
                  >
                    Why it matters?
                  </button>
                  {showFacts[item.key] && (
                    <p className="text-[10px] text-gray-400 mt-1">{item.fact}</p>
                  )}
                </div>
              ))}
            </div>

            {/* User Pledge */}
            <div className="mt-4 text-center">
              {pledged ? (
                <p className="text-green-600 text-sm font-medium">🌱 You pledged to choose greener products!</p>
              ) : (
                <button
                  onClick={() => setPledged(true)}
                  className="text-sm px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  I choose green
                </button>
              )}
            </div>

            {/* Community Stats */}
            <div className="mt-4 text-[11px] text-center text-gray-500">
              👍 87% of users chose this item to reduce their footprint.
              <br />
              “Feels great to buy guilt-free.” – <i>Sneha R.</i>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreakdownModal;
