import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { BackSide, Color, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import {
  BRAIN_PARTS,
  EXPLODE_SCALE,
  nodeNamesForRegion,
  regionCentroid,
  regionIdForNode,
} from "../lib/brainParts";
import { GLOW_COLOR } from "../lib/sceneColors";
import { getRegionById, type RegionId } from "../lib/regions";

const BRAIN_MODEL_PATH = "/brain.glb";
const TISSUE_COLOR = "#e0a49a";
const OUTLINE_COLOR = "#241c1a";
const OUTLINE_SCALE = 1.015;
const HIGHLIGHT_COLOR = new Color(GLOW_COLOR);
const HIGHLIGHT_EMISSIVE_INTENSITY = 0.85;
const HOVER_EMISSIVE_INTENSITY = 0.3;
const GHOST_OPACITY = 0.12;

interface BrainMeshProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId | null) => void;
  explodeProgressRef: { current: number };
  isExploded: boolean;
}

export function BrainMesh({ selectedRegionId, onSelectRegion, explodeProgressRef, isExploded }: BrainMeshProps) {
  const { scene } = useGLTF(BRAIN_MODEL_PATH, true);
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);

  const meshesByNode = useMemo(() => {
    const map = new Map<string, Mesh>();
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        map.set(child.name, child as Mesh);
      }
    });
    return map;
  }, [scene]);

  const outlinesByNodeRef = useRef<Map<string, Mesh>>(new Map());

  useEffect(() => {
    const outlinesByNode = new Map<string, Mesh>();

    meshesByNode.forEach((mesh, nodeName) => {
      const material = new MeshStandardMaterial({
        color: TISSUE_COLOR,
        roughness: 0.7,
        metalness: 0.03,
        emissive: 0x000000,
        transparent: true,
      });
      mesh.material = material;

      const outline = new Mesh(
        mesh.geometry,
        new MeshBasicMaterial({ color: OUTLINE_COLOR, side: BackSide, transparent: true }),
      );
      outline.scale.setScalar(OUTLINE_SCALE);
      outline.raycast = () => {};
      mesh.add(outline);
      outlinesByNode.set(nodeName, outline);
    });

    outlinesByNodeRef.current = outlinesByNode;

    // mesh.geometry belongs to useGLTF's cache, not to us — only the
    // materials and the outline mesh itself were created here.
    return () => {
      meshesByNode.forEach((mesh) => {
        (mesh.material as MeshStandardMaterial).dispose();
      });
      outlinesByNode.forEach((outline) => {
        outline.removeFromParent();
        (outline.material as MeshBasicMaterial).dispose();
      });
    };
  }, [meshesByNode]);

  const selectedNodeNames = useMemo(
    () => new Set(selectedRegionId ? nodeNamesForRegion(selectedRegionId) : []),
    [selectedRegionId],
  );
  const hoveredNodeNames = useMemo(
    () => new Set(hoveredRegionId ? nodeNamesForRegion(hoveredRegionId) : []),
    [hoveredRegionId],
  );

  const hasSelection = selectedRegionId !== null;

  const lastFrameStateRef = useRef<{
    progress: number | null;
    selectedNodeNames: Set<string> | null;
    hoveredNodeNames: Set<string> | null;
  }>({ progress: null, selectedNodeNames: null, hoveredNodeNames: null });

  useFrame(() => {
    const progress = explodeProgressRef.current;
    const lastFrameState = lastFrameStateRef.current;
    // Sets are only ever replaced (never mutated) when selection/hover
    // changes, so reference equality is a correct, cheap "did it change?"
    // check. Repositioning and recoloring 76 pieces is wasted work on every
    // frame nothing actually changed — which is most frames, since this
    // only needs to happen when explode is mid-animation or right after a
    // click/hover.
    if (
      progress === lastFrameState.progress &&
      selectedNodeNames === lastFrameState.selectedNodeNames &&
      hoveredNodeNames === lastFrameState.hoveredNodeNames
    ) {
      return;
    }
    lastFrameState.progress = progress;
    lastFrameState.selectedNodeNames = selectedNodeNames;
    lastFrameState.hoveredNodeNames = hoveredNodeNames;

    const offsetScale = (EXPLODE_SCALE - 1) * progress;

    for (const part of BRAIN_PARTS) {
      const mesh = meshesByNode.get(part.nodeName);
      if (!mesh) continue;

      const [centroidX, centroidY, centroidZ] = part.centroid;
      mesh.position.set(centroidX * offsetScale, centroidY * offsetScale, centroidZ * offsetScale);

      const isSelected = selectedNodeNames.has(part.nodeName);
      const isHovered = hoveredNodeNames.has(part.nodeName);

      const material = mesh.material as MeshStandardMaterial;
      if (isSelected) {
        material.emissive.copy(HIGHLIGHT_COLOR);
        material.emissiveIntensity = HIGHLIGHT_EMISSIVE_INTENSITY;
      } else if (isHovered) {
        material.emissive.copy(HIGHLIGHT_COLOR);
        material.emissiveIntensity = HOVER_EMISSIVE_INTENSITY;
      } else {
        material.emissiveIntensity = 0;
      }

      const shouldGhost = hasSelection && !isExploded && !isSelected && !isHovered;
      const opacity = shouldGhost ? GHOST_OPACITY : 1;
      material.opacity = opacity;

      const outline = outlinesByNodeRef.current.get(part.nodeName);
      if (outline) (outline.material as MeshBasicMaterial).opacity = opacity;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectRegion(regionIdForNode(event.object.name));
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const regionId = regionIdForNode(event.object.name);
    if (regionId) {
      setHoveredRegionId(regionId);
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = () => {
    setHoveredRegionId(null);
    document.body.style.cursor = "auto";
  };

  const displayedRegionId = hoveredRegionId ?? selectedRegionId;
  const displayedRegion = getRegionById(displayedRegionId);
  const labelPosition = !isExploded && displayedRegionId ? regionCentroid(displayedRegionId) : null;

  return (
    <>
      <primitive
        object={scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      {labelPosition && displayedRegion && (
        <Html position={labelPosition} center distanceFactor={3.5}>
          <span className="region-label">{displayedRegion.name}</span>
        </Html>
      )}
    </>
  );
}

useGLTF.preload(BRAIN_MODEL_PATH);
