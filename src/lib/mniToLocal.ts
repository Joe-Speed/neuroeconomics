// Standard MNI152/SPM template bounding box (mm), asymmetric per axis direction.
const MNI_BOUNDS = {
  xExtent: 78,
  yAnteriorExtent: 76,
  yPosteriorExtent: 112,
  zSuperiorExtent: 85,
  zInferiorExtent: 70,
} as const;

// Scene units for the placeholder brain ellipsoid (src/components/BrainMesh.tsx).
// three.js axes: x = left-right, y = superior-inferior (up), z = anterior-posterior (depth, anterior = +z).
const SCENE_RADIUS = { x: 1.4, y: 0.95, z: 1.7 } as const;

// Markers sit just outside the mesh surface so they're never occluded by it.
const MARKER_SURFACE_OFFSET = 1.05;

/**
 * Maps an approximate MNI coordinate onto the surface of the placeholder brain
 * ellipsoid: normalizes per-axis by the MNI bounding box, then projects that
 * direction onto the scene ellipsoid. This is a visualization convenience, not
 * an anatomically registered lookup — depth is discarded in favor of a
 * consistently visible marker position.
 */
export function mniToLocalPosition(
  mniCoords: readonly [number, number, number],
): [number, number, number] {
  const [mniX, mniY, mniZ] = mniCoords;

  const normalizedX = mniX / MNI_BOUNDS.xExtent;
  const normalizedY =
    mniY >= 0 ? mniY / MNI_BOUNDS.yAnteriorExtent : mniY / MNI_BOUNDS.yPosteriorExtent;
  const normalizedZ =
    mniZ >= 0 ? mniZ / MNI_BOUNDS.zSuperiorExtent : mniZ / MNI_BOUNDS.zInferiorExtent;

  const directionLength = Math.hypot(normalizedX, normalizedY, normalizedZ) || 1;

  const sceneX = (normalizedX / directionLength) * SCENE_RADIUS.x;
  const sceneY = (normalizedZ / directionLength) * SCENE_RADIUS.y;
  const sceneZ = (normalizedY / directionLength) * SCENE_RADIUS.z;

  return [
    sceneX * MARKER_SURFACE_OFFSET,
    sceneY * MARKER_SURFACE_OFFSET,
    sceneZ * MARKER_SURFACE_OFFSET,
  ];
}

export { SCENE_RADIUS };
