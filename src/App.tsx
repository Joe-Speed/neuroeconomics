import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { AppLoadGate } from "./components/AppLoadGate";
import { BrainScene } from "./components/BrainScene";
import { RegionPanel } from "./components/RegionPanel";
import { useTheme } from "./lib/useTheme";
import type { RegionId } from "./lib/regions";

export function App() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);
  const { theme, toggleTheme } = useTheme();

  return (
    <AppLoadGate>
      <div className="app-shell">
        <AppHeader theme={theme} onToggleTheme={toggleTheme} />
        <div className="app-layout">
          <BrainScene
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            theme={theme}
          />
          <RegionPanel selectedRegionId={selectedRegionId} onSelectRegion={setSelectedRegionId} />
        </div>
      </div>
    </AppLoadGate>
  );
}
