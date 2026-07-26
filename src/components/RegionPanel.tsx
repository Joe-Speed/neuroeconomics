import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { REGIONS, getRegionById, type RegionId } from "../lib/regions";
import type { Theme } from "../lib/useTheme";
import { AboutPanel } from "./AboutPanel";
import { InfoModal } from "./InfoModal";
import { RegionDetail } from "./RegionDetail";
import { ThemeToggle } from "./ThemeToggle";

interface RegionPanelProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId | null) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function RegionPanel({ selectedRegionId, onSelectRegion, theme, onToggleTheme }: RegionPanelProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const selectedRegion = getRegionById(selectedRegionId);

  const handlePillClick = (regionId: RegionId) => {
    onSelectRegion(regionId === selectedRegionId ? null : regionId);
  };

  return (
    <aside className="region-panel">
      <h2 className="panel-heading region-list-heading">Neuroeconomic Brain Regions</h2>
      <ul className="region-list">
        {REGIONS.map((region) => (
          <li key={region.id}>
            <button
              type="button"
              className={region.id === selectedRegionId ? "region-button selected" : "region-button"}
              onClick={() => handlePillClick(region.id)}
            >
              {region.id}
            </button>
          </li>
        ))}
      </ul>
      <div className="region-panel-body">
        {selectedRegion ? <RegionDetail region={selectedRegion} /> : <AboutPanel />}
      </div>
      <div className="region-panel-toggle">
        <button
          type="button"
          className="info-button"
          onClick={() => setIsInfoOpen(true)}
          aria-label="About this atlas"
        >
          <BsInfoCircleFill size={18} />
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </aside>
  );
}
