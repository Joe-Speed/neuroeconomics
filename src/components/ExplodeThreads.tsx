import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, type LineBasicMaterial, type LineSegments } from "three";
import { BRAIN_PARTS, EXPLODE_SCALE } from "../lib/brainParts";
import { GLOW_COLOR } from "../lib/sceneColors";

const THREAD_MAX_OPACITY = 0.35;

interface ExplodeThreadsProps {
  explodeProgressRef: { current: number };
}

export function ExplodeThreads({ explodeProgressRef }: ExplodeThreadsProps) {
  const lineRef = useRef<LineSegments>(null);
  const lastProgressRef = useRef<number | null>(null);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new BufferAttribute(new Float32Array(BRAIN_PARTS.length * 2 * 3), 3));
    return geom;
  }, []);

  useFrame(() => {
    const progress = explodeProgressRef.current;
    // Rewriting all 76 positions and re-uploading the buffer to the GPU is
    // wasted work on every frame the explode animation isn't actually
    // moving — which is most frames, since it only runs for ~1s per toggle.
    if (progress === lastProgressRef.current) return;
    lastProgressRef.current = progress;

    const factor = 1 + (EXPLODE_SCALE - 1) * progress;
    const positions = geometry.attributes.position.array as Float32Array;

    BRAIN_PARTS.forEach((part, index) => {
      const [centroidX, centroidY, centroidZ] = part.centroid;
      const base = index * 6;
      positions[base] = centroidX;
      positions[base + 1] = centroidY;
      positions[base + 2] = centroidZ;
      positions[base + 3] = centroidX * factor;
      positions[base + 4] = centroidY * factor;
      positions[base + 5] = centroidZ * factor;
    });
    geometry.attributes.position.needsUpdate = true;

    const material = lineRef.current?.material as LineBasicMaterial | undefined;
    if (material) material.opacity = progress * THREAD_MAX_OPACITY;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={GLOW_COLOR} transparent opacity={0} />
    </lineSegments>
  );
}
