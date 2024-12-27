import { Vector3 } from 'three';
import { easing } from 'maath';

// Helper to create dampable vector
const createDampableVector = (x, y, z) => {
  return new Vector3(x, y, z);
};

// Smooth animation utility
export const smoothDampVector = (current, target, smoothing, delta) => {
  const currentVec = createDampableVector(current[0], current[1], current[2]);
  const targetVec = createDampableVector(target[0], target[1], target[2]);
  
  easing.damp3(currentVec, targetVec, smoothing, delta);
  
  return [currentVec.x, currentVec.y, currentVec.z];
};

// import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useState } from 'react';
import { useDecalControls } from './DecalControls';
import { useDecalAnimation } from '../hooks/useDecalAnimation';
import { presetPositions } from '../config/presetPositions';
import state from '../store';

// const Case = () => {
//   const snap = useSnapshot(state);
//   const { nodes, materials } = useGLTF('/iphone4.glb');
  
//   // Initialize textures with proper anisotropy
//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);
//   logoTexture.anisotropy = 16;
  
//   // State management
//   const [currentPreset, setCurrentPreset] = useState('front');
//   const [position, setPosition] = useState([-1.95, 0, 0]);
//   const [rotation, setRotation] = useState([Math.PI, 0, 0]);
//   const [scale, setScale] = useState([1, 1, 1]);

//   // Setup controls
//   useDecalControls(setCurrentPreset, setScale);

//   // Setup animation
//   useDecalAnimation(
//     position,
//     setPosition,
//     rotation,
//     setRotation,
//     currentPreset,
//     presetPositions,
//     materials,
//     snap.color
//   );

//   return (
//     <group key={JSON.stringify(snap)}>
//       <mesh
//         castShadow
//         geometry={nodes.iphone.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//         rotation-x={Math.PI / 2}
//       >
//         {snap.isFullTexture && (
//           <Decal
//             position={[-2, 0, 0]}
//             rotation={[Math.PI, 0, 0]}
//             scale={3.3}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal
//             position={position}
//             rotation={[180, 0, 0]}
//             scale={scale}
//             map={logoTexture}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//       </mesh>
//     </group>
//   );
// };

// export default Case;