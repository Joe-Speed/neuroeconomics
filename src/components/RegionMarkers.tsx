import { REGIONS, type RegionId } from "../lib/regions";
import { RegionMarker } from "./RegionMarker";

interface RegionMarkersProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId) => void;
}

export function RegionMarkers({ selectedRegionId, onSelectRegion }: RegionMarkersProps) {
  return (
    <>
      {REGIONS.map((region) => (
        <RegionMarker
          key={region.id}
          region={region}
          isSelected={region.id === selectedRegionId}
          onSelect={onSelectRegion}
        />
      ))}
    </>
  );
}
