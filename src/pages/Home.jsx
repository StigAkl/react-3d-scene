import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import Loader from '../components/Loader'
import { Island } from '../models'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);

    const adjustIslandForScreenSize = () => {
        let islandScale = null;
        let islandPosition = [0, -6.5, -143];
        let islandRotation = [0.1, 4.7, 0];
        if (window.innerWidth < 768) {
            islandScale = [1.5,1.5, 1.5];
        } else {
            islandScale = [3, 3, 3];
        }

        return [islandScale, islandPosition, islandRotation];
    }

    const adjustPlaneForScreen = () => {
        let screenScale, screenPosition; 

        if(window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5]; 
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [3,3,3];
            screenPosition = [0, -1, -4];
        }
        return [screenScale, screenPosition];
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition] = adjustPlaneForScreen();

    return (
        <section className='w-full h-screen relative'>
            <Canvas
                className={
                    `w-full h-screen bg-transparent ${isRotating ? 
                        'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight 
                    intensity={1.5} 
                    position={[1,1,1]}
                    />
                    <ambientLight intensity={0.5}/>
                 <hemisphereLight 
                    skyColor={"#b2e1ff"} 
                    groundColor={"#000000"} 
                    intensity={1} />

<Bird />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        />
                    <Sky isRotating={isRotating} />

                    <Plane isRotating={isRotating} rotation={[0, 20, 0]} scale={planeScale} position={planePosition} />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home