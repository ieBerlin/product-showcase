import React, { useState } from 'react';
import MeshComponents from './caseComponents/MeshComponents';

const Case = ({caseRotation}) => {

  const [position, setPosition] = useState([0, 1.8, 0]);
  

  return (
    <group 
      position={position} 
    rotation={caseRotation}
      onContextMenu={(e) => e.preventDefault()}
    >
     <MeshComponents/>
    </group>
  );
};

export default Case;