// Standard MNI152/SPM template bounding box (mm), asymmetric per axis direction.
const MNI_BOUNDS = {
  xExtent: 78,
  yAnteriorExtent: 76,
  yPosteriorExtent: 112,
  zSuperiorExtent: 85,
  zInferiorExtent: 70,
} as const;

// Half-extents (scene units) of public/brain.glb — a segmented BodyParts3D
// mesh, centred on its bounding-box midpoint and scaled at 1mm = 0.02 units.
// See assets/source/ for the conversion script. The mesh's native axes are
// x = left-right, y = anterior(-)/posterior(+), z = superior(+)/inferior(-).
const SCENE_RADIUS = { x: 1.336, y: 1.702, z: 1.567 } as const;

/**
 * Maps a region's published MNI coordinate proportionally into the brain's
 * scene volume — NOT projected onto the outer surface. Used only for vmPFC
 * and OFC, the two regions with no mapped mesh piece at all: it gives the
 * camera something to pan toward even though nothing highlights. A surface
 * projection would push deep structures out to wherever the surface happens
 * to be nearby (this broke once already — it matched the VTA to the
 * cerebellum), so this stays proportional to true depth instead.
 */
export function approximateRegionPosition(
  mniCoords: readonly [number, number, number],
): [number, number, number] {
  const [mniX, mniY, mniZ] = mniCoords;

  const normalizedX = mniX / MNI_BOUNDS.xExtent;
  const normalizedY =
    mniY >= 0 ? mniY / MNI_BOUNDS.yAnteriorExtent : mniY / MNI_BOUNDS.yPosteriorExtent;
  const normalizedZ =
    mniZ >= 0 ? mniZ / MNI_BOUNDS.zSuperiorExtent : mniZ / MNI_BOUNDS.zInferiorExtent;

  return [normalizedX * SCENE_RADIUS.x, -normalizedY * SCENE_RADIUS.y, normalizedZ * SCENE_RADIUS.z];
}
