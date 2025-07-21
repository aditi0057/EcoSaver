import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplet, Recycle, ShieldCheck, Sparkles, FileSpreadsheet } from "lucide-react";

// A versatile Section component with an optional 'background' prop for alternating colors
const Section = ({ children, className = "", background = "transparent" }: { children: React.ReactNode; className?: string, background?: 'transparent' | 'white' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className={background === 'white' ? 'bg-white' : ''}
  >
    <section
      className={`max-w-5xl mx-auto py-16 px-4 sm:px-8 ${className}`}
    >
      {children}
    </section>
  </motion.div>
);

// Feature component, now consistently aligned with the icon on the left
const FeatureSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex-shrink-0 p-5 bg-white/70 backdrop-blur-sm rounded-full shadow-lg"
    >
      {icon}
    </motion.div>
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-green-800 mb-3">{title}</h2>
      <div className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto md:mx-0">{children}</div>
    </div>
  </div>
);

// Card component for "Greener Cart" suggestions
const SuggestionCard = ({ from, to, fromScore, toScore }: { from: string; to: string; fromScore: number; toScore: number }) => (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300 border border-gray-200/80">
        <div className="mb-4">
            <p className="text-gray-500 text-sm">From: {from}</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">EcoScore: {fromScore}</span>
            </div>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div>
            <p className="text-green-700 font-semibold">Suggested: {to}</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">EcoScore: {toScore}</span>
            </div>
        </div>
    </div>
);

// Static component to display the EcoScore analysis example visually
const EcoScoreAnalysisCard = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-700 text-center text-sm mb-2">
            ♻️ EcoScore Analysis
        </h3>
        <p className="text-center font-bold text-green-700 mb-3">Plastic Toothbrush</p>

        <div className="text-center mb-4">
            <p className="text-4xl font-bold text-red-500">20<span className="text-2xl text-gray-400">/100</span></p>
            <p className="font-semibold text-red-500">❌ High Impact</p>
        </div>

        <div className="bg-gray-50 rounded p-3 text-xs space-y-1">
            <h4 className="font-semibold mb-1">Breakdown:</h4>
            <div className="flex justify-between"><span>🧪 Sustainability:</span> <strong>10</strong></div>
            <div className="flex justify-between"><span>📜 Certifications:</span> <strong>0</strong></div>
            <div className="flex justify-between"><span>🗑️ Disposal:</span> <strong>5</strong></div>
            <div className="flex justify-between"><span>🧱 Product Material:</span> <strong>5</strong></div>
            <div className="flex justify-between"><span>🎁 Bonus (Flags):</span> <strong>0</strong></div>
        </div>
    </div>
);


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fff4] to-[#e6f9f0] text-gray-800">
      {/* --- Hero Section --- */}
      <div className="text-center pt-20 pb-16 px-4 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4"
        >
          About Eco Saver 🌍
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          We're making sustainability simple, accessible, and smart—one product at a time.
        </motion.p>
      </div>

      {/* --- Features Sections with a consistent background --- */}
      <div className="space-y-0">
        <Section>
          <FeatureSection
            title="Smartly Calculated EcoScore"
            icon={<Sparkles className="text-green-600 w-10 h-10" />}
          >
            Our EcoScore goes beyond labels. It’s computed using a smart blend of factors like recyclability, water use, material impact, certifications, and packaging. This score gives you a clear view of each product's real environmental footprint.
          </FeatureSection>
        </Section>

        <Section>
          <FeatureSection
            title="Filters that Actually Help"
            icon={<Leaf className="text-green-600 w-10 h-10" />}
          >
            We don’t just list products—we guide you to better choices with focused filters. Easily find items that are sustainable, recyclable, water-friendly, or certified.
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 max-w-md">
                <li className="flex items-center justify-center md:justify-start gap-2 text-sm">🌿 <span className="font-medium">Only Sustainable</span></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-sm">♻️ <span className="font-medium">Recyclable Only</span></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-sm">🌊 <span className="font-medium">Water-Friendly</span></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-sm">✅ <span className="font-medium">Certified Only</span></li>
            </ul>
          </FeatureSection>
        </Section>

        <Section>
          <FeatureSection
            title="Product Insights & Breakdown"
            icon={<Recycle className="text-green-600 w-10 h-10" />}
          >
            Every product comes with a detailed breakdown of its sustainability, materials, disposal, packaging, and certifications, helping you understand the impact of every choice you make.
          </FeatureSection>
        </Section>

        {/* --- How It Works / Data Processing Section --- */}
        <Section>
             <FeatureSection
                title="From Spreadsheet to Score"
                icon={<FileSpreadsheet className="text-green-600 w-10 h-10" />}
             >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left side: Simplified Process Steps */}
                    <div className="space-y-4 text-sm text-gray-600">
                        <p>We automate sustainability analysis. Simply upload your supplier's Excel file, add any relevant certifications, and our system instantly calculates a detailed EcoScore.</p>
                        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                            <h4 className="font-semibold mb-2">Example Process:</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">1</span>
                                    <span>Upload <code className="text-xs">products.xlsx</code></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">2</span>
                                    <span>Add Certifications (e.g., FSC)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">3</span>
                                    <span>Compute & Save</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right side: The analysis card */}
                    <div>
                        <EcoScoreAnalysisCard />
                    </div>
                </div>
             </FeatureSection>
        </Section>

        {/* --- Greener Cart Section --- */}
        <Section>
          <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-3 text-green-800">
                  <ShieldCheck className="w-7 h-7"/>
                  <h2 className="text-3xl font-bold">Greener Cart Suggestions</h2>
              </div>
              <p className="max-w-3xl mx-auto text-gray-600 mb-8">
                  One of our most loved features! As you shop, we suggest greener alternatives with higher EcoScores. A minor cost increase for a major eco benefit.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <SuggestionCard from="Plastic Toothbrush" fromScore={40} to="Bamboo Toothbrush" toScore={75} />
                  <SuggestionCard from="Petroleum Lip Balm" fromScore={20} to="Beeswax Lip Balm" toScore={45} />
              </div>
          </div>
        </Section>

        <Section>
          <FeatureSection
            title="Why This Matters"
            icon={<Droplet className="text-green-600 w-10 h-10" />}
          >
            Climate change isn’t abstract anymore. Your everyday product choices influence carbon emissions, plastic waste, and water use. Eco Saver helps you buy better—without changing your lifestyle, just your choices.
          </FeatureSection>
        </Section>
      </div>

      {/* --- Footer --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-500 py-20"
      >
        <p>Join us in making a difference, one purchase at a time.</p>
        <p className="text-sm mt-2 font-semibold text-green-700">Eco Saver</p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
