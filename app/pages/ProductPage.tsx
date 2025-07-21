import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BreakdownModal from "../components/BreakdownModel";
import FilterToggle from "../components/FilterToggle";
import { useCart } from "../components/CartContext";
import { BadgeCheck, ShoppingCart, CheckCircle } from "lucide-react";
import axios from "axios";

// Top-left EcoScore badge
const EcoScorePatch = ({
  score,
  onClick,
}: {
  score: number;
  onClick: () => void;
}) => {
  const getColor = (score: number) => {
    if (score >= 85) return "bg-green-700 text-white";
    if (score >= 70) return "bg-green-600 text-white";
    if (score >= 50) return "bg-green-500 text-white";
    return "bg-green-400 text-white";
  };

  return (
    <button
      onClick={onClick}
      className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded shadow ${getColor(
        score
      )}`}
    >
      {score}
    </button>
  );
};

// // Bottom-right "Excellent", "Good", "Poor" tag
// const RatingTag = ({ score }: { score: number }) => {
//   const getLabel = () => {
//     if (score >= 75) return { text: "Excellent", color: "bg-green-600" };
//     if (score >= 50) return { text: "Good", color: "bg-yellow-500" };
//     return { text: "Poor", color: "bg-red-500" };
//   };



const mockProducts = [
  {
    id: "p1",
    name: "Eco Cotton Shirt",
    brand: "GreenWear",
    material: "Organic Cotton",
    packaging: "Recycled Paper",
    ecoScore: 82,
    breakdown: {
      water: 850,
      carbon: 12,
      recyclability: 85,
      packaging: "Recycled Paper",
      certifications: ["FSC", "Fair Trade"],
      ecoTip: "Buying this saves 500L water",
    },
    certifications: ["FSC", "Fair Trade"],
  },
  {
    id: "p2",
    name: "Plastic Bottle",
    brand: "FastDrink",
    material: "PET Plastic",
    packaging: "Plastic Wrap",
    ecoScore: 52,
    breakdown: {
      water: 3000,
      carbon: 45,
      recyclability: 20,
      packaging: "Plastic Wrap",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p3",
    name: "Bamboo Toothbrush",
    brand: "EcoBrush",
    material: "Bamboo",
    packaging: "Kraft Paper",
    ecoScore: 90,
    breakdown: {
      water: 150,
      carbon: 5,
      recyclability: 95,
      packaging: "Kraft Paper",
      certifications: ["FSC"],
    },
    certifications: ["FSC"],
  },
  {
    id: "p4",
    name: "Reusable Grocery Bag",
    brand: "EcoCarry",
    material: "Jute",
    packaging: "Biodegradable",
    ecoScore: 78,
    breakdown: {
      water: 400,
      carbon: 10,
      recyclability: 80,
      packaging: "Biodegradable",
      certifications: ["Fair Trade"],
    },
    certifications: ["Fair Trade"],
  },
  {
    id: "p5",
    name: "Plastic Cutlery Set",
    brand: "FastEat",
    material: "Polystyrene",
    packaging: "Plastic",
    ecoScore: 40,
    breakdown: {
      water: 2000,
      carbon: 60,
      recyclability: 10,
      packaging: "Plastic",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p6",
    name: "Conventional Dish Soap",
    brand: "CleanMax",
    material: "Petroleum Derivatives",
    packaging: "Plastic Bottle",
    ecoScore: 50,
    breakdown: {
      water: 1500,
      carbon: 40,
      recyclability: 15,
      packaging: "Plastic Bottle",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p7",
    name: "Synthetic Sponge",
    brand: "ScrubCo",
    material: "Polyurethane Foam",
    packaging: "Plastic Wrap",
    ecoScore: 43,
    breakdown: {
      water: 900,
      carbon: 35,
      recyclability: 5,
      packaging: "Plastic Wrap",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p8",
    name: "Paper Towels",
    brand: "QuickWipe",
    material: "Bleached Pulp",
    packaging: "Plastic Wrap",
    ecoScore: 48,
    breakdown: {
      water: 1200,
      carbon: 32,
      recyclability: 30,
      packaging: "Plastic Wrap",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p9",
    name: "Conventional Deodorant",
    brand: "FreshRoll",
    material: "Aluminum & Plastic",
    packaging: "Plastic Tube",
    ecoScore: 46,
    breakdown: {
      water: 800,
      carbon: 25,
      recyclability: 20,
      packaging: "Plastic Tube",
      certifications: [],
    },
    certifications: [],
  },
  {
    id: "p10",
    name: "Conventional Coffee Pods",
    brand: "QuickBrew",
    material: "Plastic & Foil",
    packaging: "Box with Plastic Wrap",
    ecoScore: 41,
    breakdown: {
      water: 1000,
      carbon: 38,
      recyclability: 10,
      packaging: "Plastic Wrap",
      certifications: [],
    },
    certifications: [],
  },
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBreakdown, setActiveBreakdown] = useState<any>(null);

  const [onlySustainable, setOnlySustainable] = useState(false);
  const [recyclableOnly, setRecyclableOnly] = useState(false);
  const [waterFriendlyOnly, setWaterFriendlyOnly] = useState(false);
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const { addToCart, cartItems } = useCart();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = `${BASE_URL}/api/products`;

        if (onlySustainable) {
          endpoint = `${BASE_URL}/api/products?sustainable=true`;
        } else if (recyclableOnly) {
          endpoint = `${BASE_URL}/api/products/recyclable`;
        } else if (waterFriendlyOnly) {
          endpoint = `${BASE_URL}/api/products/water-friendly`;
        } else if (certifiedOnly) {
          endpoint = `${BASE_URL}/api/products/certified`;
        }

        const res = await axios.get(endpoint);
        const rawProducts = res.data.products;

        const productsWithScores = await Promise.all(
          rawProducts.map(async (product: any) => {
            const scoreRes = await axios.get(
              `${BASE_URL}/api/eco_score/${product.product_id}`
            );
            const breakdownRes = await axios.get(
              `${BASE_URL}/api/eco-breakdown/${product.product_id}`
            );

            return {
              ...product,
              ecoScore: scoreRes.data.eco_score,
              breakdown: breakdownRes.data.breakdown,
              id: `p-${product.product_id}`,
              name: product.product_name,
              brand: product.brand,
              material: product.product_description,
              packaging: product.packing_material_type,
              certifications:
                product.certification_tags !== "-"
                  ? [product.certification_tags]
                  : [],
              imageUrl: product["img_url"] || "",
            };
          })
        );

        setProducts(productsWithScores);
      } catch (error) {
        console.error("Error loading products: ", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [onlySustainable, recyclableOnly, waterFriendlyOnly, certifiedOnly]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading eco-friendly products...
      </div>
    );
  }

  const handleToggle = () => {
    setOnlySustainable((prev) => !prev);
  };

  const filteredProducts = products.filter((p) => {
    // if (onlySustainable && p.ecoScore <= 75) return false;
    //if (recyclableOnly && (p.breakdown?.recyclability || 0) < 70) return false;
    //if (waterFriendlyOnly && (p.breakdown?.water || 0) > 1000) return false;
    //if (certifiedOnly && (!p.certifications || p.certifications.length === 0)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5fdf7] text-gray-800 px-6 py-8">
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Walmart EcoScore
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <FilterToggle
            label="Only Sustainable (EcoScore > 50
            )"
            value={onlySustainable}
            onToggle={() => setOnlySustainable(!onlySustainable)}
          />
          <FilterToggle
            label="♻ Recyclable Only"
            value={recyclableOnly}
            onToggle={() => setRecyclableOnly(!recyclableOnly)}
          />
          <FilterToggle
            label="🌊 Water-Friendly"
            value={waterFriendlyOnly}
            onToggle={() => setWaterFriendlyOnly(!waterFriendlyOnly)}
          />
          <FilterToggle
            label="🌿 Certified Only"
            value={certifiedOnly}
            onToggle={() => setCertifiedOnly(!certifiedOnly)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto auto-rows-fr">
        {filteredProducts.map((product) => {
          const alreadyInCart = cartItems.some(
            (item) => item.id === product.id
          );

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col h-full"
            >
              <div className="flex flex-col justify-between h-full">
                {/* Product Visual */}
                <div>
                  <div className="relative w-full h-36 bg-green-50 rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-contain h-full w-full"
                      />
                    ) : (
                      <div className="text-green-500 text-sm font-semibold">
                        No Image
                      </div>
                    )}

                    <EcoScorePatch
                      score={product.ecoScore}
                      onClick={() => {
                        setActiveBreakdown(product);
                        setModalOpen(true);
                      }}
                    />
                    {/* <RatingTag score={product.ecoScore} /> */}
                  </div>

                  <h2 className="text-lg font-semibold min-h-[48px]">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.brand}</p>

                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>
                      <strong>Material:</strong> {product.material}
                    </p>
                    <p>
                      <strong>Packaging:</strong> {product.packaging}
                    </p>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2 mt-3 min-h-[28px]">
                    {product.certifications.map((cert: string, i: number) => (
                      <div
                        key={i}
                        className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full flex items-center gap-1"
                      >
                        <BadgeCheck size={14} /> {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setActiveBreakdown(product);
                      setModalOpen(true);
                    }}
                    className="text-sm text-green-600 hover:underline"
                  >
                    More Info →
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={alreadyInCart}
                    className={`w-full px-4 py-2 text-sm rounded-md flex items-center justify-center gap-2 transition-all ${
                      alreadyInCart
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {alreadyInCart ? (
                      
                      <>
                        <CheckCircle size={16} /> Added
                      </>
                    ) : (
                      
                      <>
                      
                        <ShoppingCart size={16} /> Add to Cart
                      </>
                    )}
                    
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Breakdown Modal */}
      {activeBreakdown && (
        <BreakdownModal
          open={modalOpen}
          score={activeBreakdown.ecoScore}
          breakdown={activeBreakdown.breakdown}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        {filteredProducts.length === 0
          ? "No products match selected filters."
          : `Showing ${filteredProducts.length} products.`}
      </div>
    </div>
  );
};

export default ProductPage;
