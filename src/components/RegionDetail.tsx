import { ANATOMICAL_REGION_IDS, nodeNamesForRegion } from "../lib/brainParts";
import type { Region } from "../lib/regions";
import { PaperList } from "./PaperList";

interface RegionDetailProps {
  region: Region;
}

export function RegionDetail({ region }: RegionDetailProps) {
  const isAnatomical = ANATOMICAL_REGION_IDS.has(region.id);
  const hasMappedPiece = nodeNamesForRegion(region.id).length > 0;

  return (
    <div className="region-detail">
      <h2>{region.name}</h2>
      {!isAnatomical && hasMappedPiece && (
        <p className="region-approx-note">
          Highlighted on its nearest established anatomical correlate — {region.name} is defined by
          function and location, not a distinct physical boundary.
        </p>
      )}
      {!isAnatomical && !hasMappedPiece && (
        <p className="region-approx-note">
          No structure in this model corresponds to {region.name} — it has no distinct anatomical
          boundary, and nothing nearby is a fair enough match to highlight.
        </p>
      )}
      <p className="region-role">{region.role}</p>
      <h3>Papers ({region.papers.length})</h3>
      <PaperList papers={region.papers} />
    </div>
  );
}
