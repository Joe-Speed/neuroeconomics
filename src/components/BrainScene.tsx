import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BrainMesh } from "./BrainMesh";
import { RegionMarkers } from "./RegionMarkers";
import type { RegionId } from "../lib/regions";

interface BrainSceneProps {
  selectedRegionId: RegionId | null;
  onSelectRegion: (id: RegionId) => void;
}

export function BrainScene({ selectedRegionId, onSelectRegion }: BrainSceneProps) {
  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
      <color attach="background" args={["#0b0d12"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <BrainMesh />
      <RegionMarkers selectedRegionId={selectedRegionId} onSelectRegion={onSelectRegion} />
      <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.2} intensity={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
