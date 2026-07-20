import { SCENE_RADIUS } from "../lib/mniToLocal";

export function BrainMesh() {
  return (
    <mesh scale={[SCENE_RADIUS.x, SCENE_RADIUS.y, SCENE_RADIUS.z]}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial color="#e4d5c3" roughness={0.55} metalness={0.05} />
    </mesh>
  );
}
