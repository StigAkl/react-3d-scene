import React, { useEffect, useRef } from 'react'
import birdScene from '../assets/3d/bird.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Bird = () => {

    const { scene, animations } = useGLTF(birdScene);
    const scale = 0.002;
    const birdRef = useRef();
    const {actions} = useAnimations(animations, birdRef)
    
    
    useEffect(() => {
      actions['Take 001'].play();
    }, [])

    useFrame(({ clock, camera }) => {
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * .2 + 2;

      if(birdRef.current.position.x > camera.position.x + 10) {
        birdRef.current.rotation.y = Math.PI;
      } else if(birdRef.current.position.x < camera.position.x -10) {
        birdRef.current.rotation.y = 0;
      }

      if(birdRef.current.rotation.y === 0){
        birdRef.current.position.x += 0.03;
        birdRef.current.position.z -= 0.03;
      } else  {
        birdRef.current.position.x -= 0.03;
        birdRef.current.position.z += 0.03;
      }
    });

    return (
    <mesh 
    position={[-5,2,0]} 
    scale={[scale, scale, scale]} 
    ref={birdRef}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Bird