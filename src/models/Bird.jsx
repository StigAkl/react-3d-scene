import React from 'react'
import birdScene from '../assets/3d/bird.glb';
import { useGLTF } from '@react-three/drei';

const Bird = () => {

    const { scene, animations } = useGLTF(birdScene);
    const scale = 0.002;
    return (
    <mesh position={[-5,2,0]} scale={[scale, scale, scale]}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Bird