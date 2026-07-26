import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { BrainMesh } from "./BrainMesh";
import { CameraFlyTo } from "./CameraFlyTo";
import { ExplodeThreads } from "./ExplodeThreads";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { useExplodeProgress } from "../lib/useExplodeProgress";
import { CANVAS_BACKGROUND } from "../lib/sceneColors";
import type { RegionId } from "../lib/regions";
import type { Theme } from "../lib/useTheme";

interface BrainSceneProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId | null) => void;
  theme: Theme;
}

interface ExplodeAnimatedSceneProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId | null) => void;
  isExploded: boolean;
}

function ExplodeAnimatedScene({ selectedRegionId, onSelectRegion, isExploded }: ExplodeAnimatedSceneProps) {
  const explodeProgressRef = useExplodeProgress(isExploded);

  return (
    <>
      <BrainMesh
        selectedRegionId={selectedRegionId}
        onSelectRegion={onSelectRegion}
        explodeProgressRef={explodeProgressRef}
        isExploded={isExploded}
      />
      <ExplodeThreads explodeProgressRef={explodeProgressRef} />
    </>
  );
}

export function BrainScene({ selectedRegionId, onSelectRegion, theme }: BrainSceneProps) {
  const [isExploded, setIsExploded] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <SceneErrorBoundary>
      <div className="brain-scene">
        <button
          type="button"
          className="explode-toggle"
          onClick={() => setIsExploded((current) => !current)}
        >
          {isExploded ? "Reassemble" : "Explode view"}
        </button>
        <Canvas
          camera={{ position: [0, 4, 4.5], fov: 45 }}
          onPointerMissed={() => onSelectRegion(null)}
        >
          <color attach="background" args={[CANVAS_BACKGROUND[theme]]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <ExplodeAnimatedScene
            selectedRegionId={selectedRegionId}
            onSelectRegion={onSelectRegion}
            isExploded={isExploded}
          />
          <CameraFlyTo selectedRegionId={selectedRegionId} controlsRef={controlsRef} />
          <OrbitControls ref={controlsRef} enablePan={false} minDistance={1.5} maxDistance={10} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.75} luminanceSmoothing={0.2} intensity={0.7} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
