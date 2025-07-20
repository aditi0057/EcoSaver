// utils/findGreenerAlternatives.ts
import Fuse from "fuse.js";

// Define product type
export interface Product {
  id: string;
  name: string;
  brand: string;
  material: string;
  packaging?: string;
  ecoScore: number;
  breakdown?: {
    water: number;
    carbon: number;
    recyclability: number;
    packaging: string;
    certifications: string[];
    ecoTip?: string;
  };
  certifications?: string[];
}

export interface AlternativeMatch {
  original: Product;
  alternative: Product | null;
}

// Main function with improved fuzzy search logic
export const findGreenerAlternatives = (
  cartItems: Product[],
  greenerDB: Product[]
): AlternativeMatch[] => {
  const fuse = new Fuse<Product>(greenerDB, {
    keys: ["name", "material", "brand"],
    threshold: 0.5, // controls fuzziness: 0 = exact, 1 = loose
  });

  return cartItems.map((item): AlternativeMatch => {
    // Combine fields for better fuzzy matching
const searchQuery = `${item.name} ${item.material} ${item.brand}`;
const results = fuse.search(searchQuery);

    // Find a greener alternative with ecoScore at least 5 points higher
    const best = results.find(
      (res) => res.item.ecoScore > item.ecoScore + 5
    );

    return {
      original: item,
      alternative: best?.item || null,
    };
  });
};
