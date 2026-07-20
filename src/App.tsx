import { useState } from "react";
import { BrainScene } from "./components/BrainScene";
import { RegionPanel } from "./components/RegionPanel";
import type { RegionId } from "./lib/regions";

export function App() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);

  return (
    <div className="app-layout">
      <BrainScene selectedRegionId={selectedRegionId} onSelectRegion={setSelectedRegionId} />
      <RegionPanel selectedRegionId={selectedRegionId} onSelectRegion={setSelectedRegionId} />
    </div>
  );
}
