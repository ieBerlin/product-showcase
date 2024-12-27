import { proxy } from 'valtio';

const state = proxy({
  start: false,
  color: '#498dd6',
  isLogoTexture: true,
  isFullTexture: false,
  isTextTexture :false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  text:"",
  textRotation:[180, 0, 0],
  logoRotation:[360, 0, 0],
  scaleX:+1.5,
  scaleY:+1.5,
  scaleTextX:+1.5,
  scaleTextY:+1.5,
  textBackgroundTransparent:false,

});

export default state;
