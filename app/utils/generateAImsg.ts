// utils/generateCartImpactMessage.ts
export function generateCartImpactMessage(replacements: any[]) {
  let totalCO2 = 0;
  let totalWater = 0;
  let count = 0;

  replacements.forEach(({ original, alternative }) => {
    if (alternative) {
      count++;
      totalCO2 += (original.breakdown?.carbon || 10) - (alternative.breakdown?.carbon || 5);
      totalWater += (original.breakdown?.water || 1000) - (alternative.breakdown?.water || 200);
    }
  });

  return count > 0
    ? `🌍 You could reduce your CO₂ by ${totalCO2.toFixed(1)}kg and water usage by ${totalWater.toFixed(
        0
      )}L by switching ${count} item${count > 1 ? "s" : ""}.`
    : "✅ All your selected items are already eco-optimized!";
}
