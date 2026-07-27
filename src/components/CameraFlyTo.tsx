import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { regionPosition } from "../lib/brainParts";
import type { RegionId } from "../lib/regions";

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
  return new Vector3(...regionPosition(regionId));
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
    // Aim manually instead of via controls.update() while flying: the
    // opening shot starts well outside OrbitControls' configured
    // maxDistance (that's the whole "from a distance" effect), and
    // update() clamps camera.position to maxDistance on every call — it
    // would snap the shot back to resting distance on the very first
    // frame instead of letting it fly in.
    camera.lookAt(targetGoal);

    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.lerp(targetGoal, lerpFactor);

    // One real sync at touchdown so OrbitControls' internal state matches
    // reality before the user's first manual drag/zoom.
    if (flightElapsedRef.current >= FLIGHT_DURATION_SECONDS) controls.update();
  });

  return null;
}
