import { useFrame } from '@react-three/fiber';
import { smoothDampVector } from '../utils/animation';

export const useDecalAnimation = (
  position,
  setPosition,
  rotation,
  setRotation,
  currentPreset,
  presetPositions,
  materials,
  color
) => {
  useFrame((state, delta) => {
    const target = presetPositions[currentPreset];
    
    // Smooth position transition
    const newPosition = smoothDampVector(
      position,
      target.position,
      0.25,
      delta
    );
    setPosition(newPosition);

    // Smooth rotation transition
    const newRotation = smoothDampVector(
      rotation,
      target.rotation,
      0.25,
      delta
    );
    setRotation(newRotation);

    // Color smoothing remains unchanged as it's already working
    materials.lambert1.color.lerp(color, 0.25 * delta);
  });
};