import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const EXPLODE_SPEED = 4;

/** Ref, not state: driven every frame, read by BrainMesh and ExplodeThreads without re-rendering React. */
export function useExplodeProgress(isExploded: boolean) {
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    const target = isExploded ? 1 : 0;
    progressRef.current += (target - progressRef.current) * Math.min(delta * EXPLODE_SPEED, 1);
  });

  return progressRef;
}
