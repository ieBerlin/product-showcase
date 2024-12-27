import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { Vector3, Vector2, CanvasTexture } from 'three';
import state from '../../store';
import { useControls } from 'leva';

export default function MeshComponents(){
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Demo.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  logoTexture.anisotropy = 16;
  
  // New state for text texture
  const [textTexture, setTextTexture] = useState(null);
  const [textPosition, setTextPosition] = useState([-2, 0, 0]);
  const [textScale, setTextScale] = useState(1);
  const [textRotation, setTextRotation] = useState(snap.textRotation);
  const [isTextTransparent, setIsTextTransparent] = useState(false);

  // Create text texture dynamically
  const createTextTexture = useCallback(() => {
    if (!snap.text) return null;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Clear canvas
    context.fillStyle = isTextTransparent ? "transparent" : snap.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text styles
    context.font = '72px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Draw text
    context.fillText(snap.text, canvas.width / 2, canvas.height / 2);
    
    // Create Three.js texture from canvas
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [snap.text, isTextTransparent, snap.color]);

  // Regenerate text texture when input changes
  useMemo(() => {
    const newTextTexture = createTextTexture();
    setTextTexture(newTextTexture);
  }, [snap.text, createTextTexture, snap.color]);
  const [scaleX, setScaleX] = useState(snap.scaleX);
  const [scaleY, setScaleY] = useState(snap.scaleY);
  const [scaleZ, setScaleZ] = useState(1.5);
  const [scaleTextX, setscaleTextX] = useState(1.5);
  const [scaleTextY, setscaleTextY] = useState(1.5);
  const [scaleTextZ, setscaleTextZ] = useState(1.5);

  const [logoPosition, setLogoPosition] = useState(snap.logoPosition || [-1.95, 0, 0]);
  const [logoScale, setLogoScale] = useState(1);
  const [logoRotation, setLogoRotation] = useState(snap.logoRotation);

  const [fullTexturePosition, setFullTexturePosition] = useState(snap.fullPosition || [-2, 0, 0]);
  const [fullTextureScale, setFullTextureScale] = useState(1);


  //useEffect to chnage setRorationText and set
  useEffect(() => {
    setTextRotation([...snap.textRotation]);  // Deep copy of textRotation
    setLogoRotation([...snap.logoRotation]);  // Deep copy of logoRotation
    setScaleX(snap.scaleX);  // Direct update for scaleX
    setScaleY(snap.scaleY);  // Direct update for scaleY
    setscaleTextX(snap.scaleTextX);  // Direct update for scaleTextX
    setscaleTextY(snap.scaleTextY);  // Direct update for scaleTextY
    setIsTextTransparent(snap.textBackgroundTransparent)
  }, [snap.textRotation, snap.logoRotation, snap.scaleX, snap.scaleY,snap.scaleTextY,snap.scaleTextX,snap.textBackgroundTransparent]);
  
  const logoDecalRef = useRef();
  const fullDecalRef = useRef();
  const textDecalRef = useRef();
  const meshRef = useRef();

  const [interactionState, setInteractionState] = useState({
    isDragging: false,
    isResizing: false,
    isRotating: false,
    draggedTexture: null,
    initialPosition: new Vector3(),
    initialScaleX: 1,
    initialScaleY: 1,
    initialScaleZ: 1,
    initialMousePosition: new Vector2()
  });

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  // Helper function to compute new scale
  const computeNewScale = (initialScaleX, initialScaleY, mouseDelta) => {
    const scaleFactor = 0.01;
    const newScaleX = Math.max(0.5, Math.min(5, initialScaleX + mouseDelta.x * scaleFactor));
    const newScaleY = Math.max(0.5, Math.min(5, initialScaleY + mouseDelta.y * scaleFactor));
    return new Vector2(newScaleX, newScaleY);
  };

// Controls setup
// const controls = useControls({
//   scaleX: {
//     min: 0.5,
//     max: 5,
//     value: 1.5,
//     step: 0.01,
//     onChange: (value) => setScaleX(value),
//   },
//   scaleY: {
//     min: 0.5,
//     max: 5,
//     value: 1.5,
//     step: 0.01,
//     onChange: (value) => setScaleY(value),
//   },
//   textTransparency: {
//     label: "Text Background Transparent",
//     value: isTextTransparent,
//     onChange: (value) => {
//       setIsTextTransparent(value);
//       // Update state to reflect the change
//     }
//   },
//   scaleTextX: {
//     min: 0.5,
//     max: 5,
//     value: textScale,
//     step: 0.01,
//     onChange: (value) => setscaleTextX(value),
//   },
//   scaleTextY: {
//     min: 0.5,
//     max: 5,
//     value: textScale,
//     step: 0.01,
//     onChange: (value) => setscaleTextY(value),
//   },
// });




  // Pointer event handlers
  const handlePointerDown = useCallback((texture, type) => (event) => {
    event.stopPropagation();
    const mesh = meshRef.current;

    if (!mesh) return;

    const point = event.point.clone();
    mesh.worldToLocal(point);

    const isResizing = event.button === 2;

    setInteractionState(prev => ({
      ...prev,
      isDragging: !isResizing,
      isResizing,
      draggedTexture: texture,
      initialPosition: point.clone(),
      initialScaleX: texture === 'logo' ? logoScale 
        : texture === 'full' ? fullTextureScale 
        : textScale,
      initialScaleY: texture === 'logo' ? logoScale 
        : texture === 'full' ? fullTextureScale 
        : textScale,
      initialMousePosition: new Vector2(event.clientX, event.clientY)
    }));
  }, [logoScale, fullTextureScale, textScale]);

  const handlePointerMove = useCallback((event) => {
    const { 
      isDragging, 
      isResizing, 
      draggedTexture, 
      initialPosition, 
      initialScaleX,
      initialScaleY,
      initialMousePosition 
    } = interactionState;

    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const point = event.point.clone();
    mesh.worldToLocal(point);

    if (isDragging) {
      const newPosition = [point.x, point.y, point.z];

      if (draggedTexture === 'logo') {
        setLogoPosition(newPosition);
      } else if (draggedTexture === 'full') {
        setFullTexturePosition(newPosition);
      } else if (draggedTexture === 'text') {
        setTextPosition(newPosition);
      }
    } else if (isResizing) {
      const mouseDelta = new Vector2(event.clientX, event.clientY).sub(initialMousePosition);
      const newScale = computeNewScale(initialScaleX, initialScaleY, mouseDelta);

      if (draggedTexture === 'logo') {
        setLogoScale(newScale.x);
      } else if (draggedTexture === 'full') {
        setFullTextureScale(newScale.x);
      } else if (draggedTexture === 'text') {
        setTextScale(newScale.x);
      }
    }
  }, [interactionState]);

  const handlePointerUp = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      isDragging: false,
      isResizing: false,
      draggedTexture: null,
      initialPosition: new Vector3(),
      initialScaleX: 1,
      initialScaleY: 1,
      initialScaleZ: 1,
      initialMousePosition: new Vector2()
    }));
  }, []);
    return  <mesh
    ref={meshRef}
    castShadow
    geometry={nodes.Mesh.geometry}
    material={materials.lambert1}
    material-roughness={1}
    dispose={null}
    rotation-x={Math.PI / 2}
    
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
  >
    {snap.isFullTexture && (
      <Decal
        ref={fullDecalRef}
        position={fullTexturePosition}
        rotation={[360, 0, 0]}
        scale={[scaleX, scaleY, scaleZ]}
        map={fullTexture}
        onPointerDown={handlePointerDown('full')}
      />
    )}

    {snap.isLogoTexture && (
      <Decal
        ref={logoDecalRef}
        position={logoPosition}
        rotation={logoRotation}
        scale={[scaleX, scaleY, scaleZ]}
        map={logoTexture}
        depthTest={false}
        depthWrite={true}
        onPointerDown={handlePointerDown('logo')}
      />
    )}

    {/* Text texture decal */}
    {textTexture && (
      <Decal
        ref={textDecalRef}
        position={textPosition}
        rotation={textRotation}
        scale={[scaleTextX,scaleTextY,scaleTextZ]}
        map={textTexture}
        depthTest={false}
        depthWrite={true}
        onPointerDown={handlePointerDown('text')}
      />
    )}
  </mesh>
}