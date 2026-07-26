import { REGIONS, getRegionById, type RegionId } from "../lib/regions";
import { AboutPanel } from "./AboutPanel";
import { RegionDetail } from "./RegionDetail";

interface RegionPanelProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId | null) => void;
}

export function RegionPanel({ selectedRegionId, onSelectRegion }: RegionPanelProps) {
  const selectedRegion = getRegionById(selectedRegionId);

  const handlePillClick = (regionId: RegionId) => {
    onSelectRegion(regionId === selectedRegionId ? null : regionId);
  };

  return (
    <aside className="region-panel">
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
    </aside>
  );
}
