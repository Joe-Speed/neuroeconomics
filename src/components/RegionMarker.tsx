import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { Region, RegionId } from "../lib/regions";
import { mniToLocalPosition } from "../lib/mniToLocal";

const BASE_SCALE = 0.06;
const SELECTED_SCALE = 0.1;
const PULSE_SPEED = 3;
const PULSE_AMOUNT = 0.25;

interface RegionMarkerProps {
  region: Region;
  isSelected: boolean;
  onSelect: (id: RegionId) => void;
}

export function RegionMarker({ region, isSelected, onSelect }: RegionMarkerProps) {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const position = mniToLocalPosition(region.mniCoords);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const targetScale = isSelected ? SELECTED_SCALE : BASE_SCALE;
    const pulse = isSelected
      ? 1 + Math.sin(clock.elapsedTime * PULSE_SPEED) * PULSE_AMOUNT
      : 1;
    mesh.scale.setScalar(targetScale * pulse);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(region.id);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#7dd3fc" : "#f97316"}
          emissive={isSelected ? "#38bdf8" : "#f97316"}
          emissiveIntensity={isSelected ? 2.2 : isHovered ? 1.2 : 0.4}
          toneMapped={false}
        />
      </mesh>
      {(isSelected || isHovered) && (
        <Html distanceFactor={8} center>
          <span className="region-label">{region.id}</span>
        </Html>
      )}
    </group>
  );
}
