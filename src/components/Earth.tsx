import * as THREE from 'three';
import { useRef,} from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import {useControls} from 'leva'

function Earth(props: JSX.IntrinsicElements['mesh']) {

  const { speed, zoom, textures, lightIntensity, lightX, lightY, lightZ, rotationX, rotationY, rotationZ, night, clouds } = useControls({
    speed: {
      value: 0.3,
      min: 0,
      max: 10,
      step: 0.1,
    },
    zoom: {
      value: 2.5,
      min: 1,
      max: 3.5,
      step: 0.1,
    },
    textures: {
      value: 0.05,
      min: 0,
      max: 0.5,
      step: 0.01,
    },
    lightIntensity: {
      value: 1,
      min: 0.15,
      max: 2,
      step: 0.01,
    },
    lightX: {
      value: 10,
      min: -10,
      max: 10,
      step: 0.01,
    },
    lightY: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    lightZ: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.01,
    },
    rotationX: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.01,
    },
    rotationY: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.01,
    },
    rotationZ: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.01,
    },
    night: false,
    clouds: false,
  })

  const ref = useRef<THREE.Mesh>(null!)

  const [earth, earthTexture, earthNight, earthClouds] = useTexture([
    require('../assets/Earth/textures/earth.jpg'),
    require('../assets/Earth/textures/bump.jpg'),
    require('../assets/Earth/textures/night.jpg'),
    require('../assets/Earth/textures/clouds.jpg'),
  ]);

  useFrame((state, delta) => (ref.current.rotation.y += 0.001*speed))
  
  return (
    <>
    {night ? <ambientLight intensity={0.15}/> : <pointLight position={[lightX, lightY, lightZ]} intensity={lightIntensity} />}
      <mesh
        {...props}
        ref={ref}
        scale={zoom}
        rotation={[rotationY, rotationX, rotationZ]}>
        <sphereGeometry args={[1, 32, 32]} />
          {night ? 
          <meshStandardMaterial 
          map={earthNight}/>   
          :
          (clouds) ? 
          <meshStandardMaterial 
          map={earthClouds}
          bumpMap={earthTexture}
          bumpScale={textures}/> 
          : 
          <meshStandardMaterial 
          map={earth}
          bumpMap={earthTexture}
          bumpScale={textures}/> }
      </mesh>
    </>
  )
}

  export default Earth;