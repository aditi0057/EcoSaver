import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, UploadCloud, BadgeCheck } from "lucide-react";
import axios from "axios";

const AdminPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [ecoScore, setEcoScore] = useState<any>(null);
  const [certInput, setCertInput] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (parsedData) {
      setEcoScore(null); // Reset ecoScore if form is edited again
    }
  }, [parsedData]);

  const handleParse = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/parse-supplier`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { products } = response.data;
      setParsedData(products[0]);
      setSuccessMsg("✅ File parsed successfully");

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  };

  const fetchEcoScore = async (productId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/eco_score/${productId}`);
      const { eco_score, breakdown, product_name } = res.data;

      setEcoScore({
        score: eco_score,
        breakdown,
        product_name,
        impact: {
          emoji: eco_score >= 75 ? "🌱" : eco_score >= 40 ? "⚠️" : "❌",
          label:
            eco_score >= 75
              ? "Low Impact"
              : eco_score >= 40
              ? "Moderate"
              : "High",
          color:
            eco_score >= 75
              ? "text-green-600"
              : eco_score >= 40
              ? "text-amber-500"
              : "text-red-500",
        },
        isSustainable: eco_score > 50,
      });
    } catch (error) {
      console.error("Error fetching eco score:", error);
    }
  };

  const isReadyToCompute =
    parsedData &&
    parsedData.product_name &&
    parsedData.brand &&
    parsedData.category &&
    parsedData.description &&
    parsedData.weight &&
    parsedData.actual_price &&
    parsedData.selling_price &&
    parsedData.packaging &&
    parsedData.material_type &&
    parsedData.material_weight &&
    parsedData.recyclability &&
    parsedData.carbon &&
    parsedData.water;

  const handleCertAdd = () => {
    if (certInput.trim()) {
      setCertifications([...certifications, certInput.trim()]);
      setCertInput("");
    }
  };

  const handleSave = async () => {
    if (!isReadyToCompute || !parsedData) return;

    const toFloat = (val: any, fallback = 0) =>
      val === "" || isNaN(parseFloat(val)) ? fallback : parseFloat(val);

    const payload = {
      product_name: parsedData.product_name,
      brand: parsedData.brand,
      category: parsedData.category,
      product_description: parsedData.description,
      product_weight_or_volume: parsedData.weight,
      actual_price: toFloat(parsedData.actual_price),
      selling_price: toFloat(parsedData.selling_price),
      discount: toFloat(parsedData.discount),
      avg_rating: toFloat(parsedData.avg_rating),
      out_of_stock: parsedData.out_of_stock || false,
      packing_material_type: parsedData.material_type,
      packing_material_weight: parsedData.material_weight,
      shipping_packaging: parsedData.packaging,
      is_sustainable: false, // Will be updated later
      sustainability_factors: `Water: ${parsedData.water}L, CO₂: ${parsedData.carbon}kg, Recyclability: ${parsedData.recyclability}%`,
      certification_tags: certifications.join(", "),
      end_of_life_disposal: parsedData.end_of_life_disposal || "",
      image_url: parsedData.image_url || null,
    };

    try {
      const saveRes = await axios.post(`${BASE_URL}/api/admin/product`, payload);
      const savedProductId = saveRes.data?.product?.product_id;

      if (savedProductId) {
        await axios.post(`${BASE_URL}/api/admin/update-sustainability`);
        await fetchEcoScore(savedProductId);
      }

      setSuccessMsg("✅ Product saved and EcoScore computed!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-[#f8fdf9] text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-700 mb-6 text-center"
      >
        🛠 Parse Your Product Excel
      </motion.h1>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UploadCloud size={20} /> Upload Supplier File (.xlsx)
        </h2>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <button
          onClick={handleParse}
          disabled={!file}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
        >
          Parse File
        </button>
        {successMsg && (
          <div className="bg-green-100 text-green-800 p-3 rounded mt-4 text-center">
            {successMsg}
          </div>
        )}
      </motion.div>

      {/* Editable Product Form */}
      {parsedData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Edit Product Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              "product_name",
              "brand",
              "category",
              "description",
              "weight",
              "actual_price",
              "selling_price",
              "discount",
              "avg_rating",
              "packaging",
              "material_type",
              "material_weight",
              "carbon",
              "water",
              "recyclability",
              "end_of_life_disposal",
              "image_url",
            ].map((key) => (
              <input
                key={key}
                className="border p-2 rounded"
                placeholder={key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                value={parsedData[key] ?? ""}
                onChange={(e) =>
                  setParsedData({ ...parsedData, [key]: e.target.value })
                }
              />
            ))}

            <div className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={parsedData.out_of_stock || false}
                onChange={(e) =>
                  setParsedData({ ...parsedData, out_of_stock: e.target.checked })
                }
              />
              <label>Out of Stock</label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Certification Input */}
      {parsedData && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-2xl mx-auto"
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BadgeCheck size={20} /> Add Certifications
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              placeholder="e.g., FSC, Fair Trade"
              className="border border-gray-300 px-3 py-1 rounded w-full"
            />
            <button
              onClick={handleCertAdd}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                ✅ {cert}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* EcoScore Display */}
      {ecoScore && ecoScore.score !== undefined && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center mb-4">
            ♻️ EcoScore Analysis for:{" "}
            <span className="text-green-700">{ecoScore.product_name}</span>
          </h3>

          <div className="text-center mb-4">
            <p className="text-2xl font-bold">
              EcoScore: <span className="text-green-700">{ecoScore.score}/100</span>
            </p>
            <p className={`text-md font-medium ${ecoScore.impact.color}`}>
              {ecoScore.impact.emoji} {ecoScore.impact.label}
            </p>
            <p className="mt-2 text-sm">
              Sustainability:{" "}
              <strong>
                {ecoScore.isSustainable ? "✅ Sustainable" : "❌ Not Sustainable"}
              </strong>
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <h4 className="font-semibold mb-2">Breakdown:</h4>
            <ul className="space-y-1">
              <li>🧪 <strong>Sustainability:</strong> {ecoScore.breakdown.sustainability}</li>
              <li>📜 <strong>Certifications:</strong> {ecoScore.breakdown.certifications}</li>
              <li>🗑 <strong>Disposal:</strong> {ecoScore.breakdown.disposal}</li>
              <li>🧱 <strong>Product Material:</strong> {ecoScore.breakdown.product_material}</li>
              <li>🎁 <strong>Bonus (Flags):</strong> {ecoScore.breakdown.bonus_sustainability_flag}</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Save Button */}
      {parsedData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6"
        >
          <button
            onClick={handleSave}
            disabled={!isReadyToCompute}
            className={`bg-green-700 text-white px-6 py-2 rounded-lg text-sm ${
              isReadyToCompute ? 'hover:bg-green-800' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            💾 Save Product & Compute EcoScore
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AdminPage;
