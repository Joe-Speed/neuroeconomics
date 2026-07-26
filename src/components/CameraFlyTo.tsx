import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { regionCentroid } from "../lib/brainParts";
import { approximateRegionPosition } from "../lib/regionCoordinates";
import { getRegionById, type RegionId } from "../lib/regions";

const DEFAULT_CAMERA_POSITION = new Vector3(0, 4, 4.5);
const DEFAULT_TARGET = new Vector3(0, 0, 0);
// Same elevated angle as the default overview camera — a fixed viewing
// direction, not one derived from the target itself. Deriving it from the
// target broke down for bilateral/central regions (their average centroid
// sits near the origin, so "outward from the brain" was nearly undefined
// and the camera could end up pointed almost straight down, right on top
// of the mesh).
const FOCUS_DIRECTION = new Vector3(0, 4, 4.5).normalize();
const FOCUS_DISTANCE = 4;
const LERP_SPEED = 3;
// A distance-threshold "have we arrived?" check doesn't work here: the lerp
// only ever closes part of the remaining gap each frame, so it can get
// visually indistinguishable from arrived while never crossing a small
// threshold — meaning the animation would keep running (and keep fighting
// manual orbit/zoom) forever. A fixed duration always terminates.
const FLIGHT_DURATION_SECONDS = 1.2;

interface CameraFlyToProps {
  selectedRegionId: RegionId | null;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}

function focusTarget(regionId: RegionId | null): Vector3 {
  if (!regionId) return DEFAULT_TARGET.clone();

  const centroid = regionCentroid(regionId);
  if (centroid) return new Vector3(...centroid);

  // No mapped mesh piece (vmPFC, OFC) — still guide the camera toward the
  // region's approximate published location, even with nothing to highlight.
  const region = getRegionById(regionId);
  return region ? new Vector3(...approximateRegionPosition(region.mniCoords)) : DEFAULT_TARGET.clone();
}

export function CameraFlyTo({ selectedRegionId, controlsRef }: CameraFlyToProps) {
  const { camera } = useThree();
  const flightElapsedRef = useRef(0);

  const targetGoal = useMemo(() => focusTarget(selectedRegionId), [selectedRegionId]);

  const cameraGoal = useMemo(() => {
    if (!selectedRegionId) return DEFAULT_CAMERA_POSITION.clone();
    return targetGoal.clone().add(FOCUS_DIRECTION.clone().multiplyScalar(FOCUS_DISTANCE));
  }, [selectedRegionId, targetGoal]);

  useEffect(() => {
    flightElapsedRef.current = 0;
  }, [selectedRegionId]);

  useFrame((_, delta) => {
    if (flightElapsedRef.current >= FLIGHT_DURATION_SECONDS) return;
    flightElapsedRef.current += delta;

    const lerpFactor = Math.min(delta * LERP_SPEED, 1);
    camera.position.lerp(cameraGoal, lerpFactor);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(targetGoal, lerpFactor);
      controls.update();
    }
  });

  return null;
}
