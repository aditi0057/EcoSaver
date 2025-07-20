import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../components/CartContext";
import { findGreenerAlternatives } from "../utils/findGreener";
import { generateCartImpactMessage } from "../utils/generateAImsg";
import { ShoppingCart, Leaf } from "lucide-react";
import mockGreenerDB from "../data/mockGreenerDB.json"; // your greener alt JSON DB

const Base_URL = "http://localhost:8000";
export type Product = {
  product_id: number;
  product_name: string;
  brand: string;
  category: string;
  product_description: string;
  product_weight_or_volume: string;
  "actual_price_(₹)": number;
  "selling_price_(₹)": number;
  discount: number;
  avg_rating: number;
  out_of_stock: boolean;
  packing_material_type: string;
  packing_material_weight: string;
  shipping_packaging: string;
  is_sustainable: boolean;
  sustainability_factors: string;
  certification_tags: string;
  end_of_life_disposal: string;
  "end_of_life_disposal.1": string; // image URL
};

export type EcoScoreBreakdown = {
  sustainability: number;
  certifications: number;
  disposal: number;
  product_material: number;
  bonus_sustainability_flag: number;
};

export type EcoScoreResponse = {
  product_id: number;
  product_name: string;
  eco_score: number;
  breakdown: EcoScoreBreakdown;
};


export type ProductsResponse = {
  products: Product[];
};

const CartPage: React.FC = () => {
  const { cartItems } = useCart();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [replacements, setReplacements] = useState<any[]>([]);

const handleAnalyze = async () => {
  console.log("🔍 cartItems inside handleAnalyze:", cartItems);
  try {
    // Step 1: Fetch full product info from backend
    const resProducts = await fetch(`${Base_URL}/api/products/latest`);
    const productData: { products: Product[] } = await resProducts.json();
    const allProducts = productData.products || [];

    // Step 2: Format cart items into payload format
    const formattedCart = await Promise.all(
        cartItems.map(async (item) => {
        const match = allProducts.find((p: Product) => p.product_id === item.product_id);


        if (!match) return null;

        // Step 3: Fetch eco score
        const ecoScoreRes = await fetch(`${Base_URL}/api/eco_score/${match.product_id}`);
        const ecoScoreData: EcoScoreResponse = await ecoScoreRes.json();

        return {
          product_id: match.product_id,
          product_name: match.product_name,
          brand: match.brand,
          material: match.packing_material_type || match.category || "",
          eco_score: ecoScoreData.eco_score,
        };
      })
    );

    // Filter out nulls
    const payload = formattedCart.filter(Boolean);
     console.log("🔍 payload  inside handleAnalyze:", payload);

    // Step 4: Send to greener-options API
    const res = await fetch(`${Base_URL}/api/cart/greener-options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setReplacements(data);
    setShowAnalysis(true);
  } catch (err) {
    console.error("Error analyzing cart", err);
  }
};



  return (
    <div className="min-h-screen bg-[#f5fdf7] text-gray-800 px-6 py-8">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🛒 Your Eco Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow flex justify-between items-start"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      EcoScore: <strong>{item.ecoScore}</strong>
                    </p>
                  </div>
                  <div className="text-green-600">
                    <ShoppingCart />
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
            >
              🧠 Analyze Cart for Greener Options
            </button>
          </>
        )}
      </div>

      {/* Greener Alternatives Section */}
      {showAnalysis && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🌿 Suggested Greener Alternatives</h2>
          {replacements.length === 0 ? (
            <p>No greener alternatives found.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {replacements.map(({ original, alternative }, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Your Item</p>
                      <h3 className="font-semibold">{original.product_name}</h3>
                      <p className="text-sm">EcoScore: {original.eco_score}</p>
                    </div>
                    <span className="text-xl">➡</span>
                    {alternative ? (
                      <div className="text-green-700">
                        <p className="text-sm text-gray-500">Greener Option</p>
                        <h3 className="font-semibold">{alternative.product_name}</h3>
                        <p className="text-sm">EcoScore: {alternative.eco_score}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Tradeoff: {alternative.tradeoff || "Minor cost increase, major eco benefit"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-500">No better match found</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* AI Message */}
          <div className="mt-8 text-center bg-green-50 text-green-800 p-4 rounded shadow-md">
            <Leaf className="inline mr-2" />
            {generateCartImpactMessage(replacements)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
