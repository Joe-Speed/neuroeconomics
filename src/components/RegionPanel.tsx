import { REGIONS, type RegionId } from "../lib/regions";

interface RegionPanelProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId) => void;
}

export function RegionPanel({ selectedRegionId, onSelectRegion }: RegionPanelProps) {
  const selectedRegion = REGIONS.find((region) => region.id === selectedRegionId);

  return (
    <aside className="region-panel">
      <h1>Neuroeconomics</h1>
      <ul className="region-list">
        {REGIONS.map((region) => (
          <li key={region.id}>
            <button
              type="button"
              className={region.id === selectedRegionId ? "region-button selected" : "region-button"}
              onClick={() => onSelectRegion(region.id)}
            >
              {region.id}
            </button>
          </li>
        ))}
      </ul>
      {selectedRegion && (
        <div className="region-detail">
          <h2>{selectedRegion.name}</h2>
          <p>{selectedRegion.role}</p>
        </div>
      )}
    </aside>
  );
}
