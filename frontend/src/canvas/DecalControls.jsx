import { useControls } from 'leva';
import { presetPositions } from '../config/presetPositions';

export const useDecalControls = (setCurrentPreset, setScale) => {
  return useControls({
    position: {
      options: Object.keys(presetPositions),
      value: 'front',
      onChange: (value) => setCurrentPreset(value)
    },
    scale: {
      min: 0.5,
      max: 5,
      value: 2,
      step: 0.01,
      onChange: (value) => {
        setScale([value, value, 1]);
      },
    }
  });
};