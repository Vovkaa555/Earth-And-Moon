import * as THREE from 'three';
import { useRef,} from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import {useControls} from 'leva'

function Moon(props: JSX.IntrinsicElements['mesh']) {

  const { speed, zoom, textures, lightIntensity, lightX, lightY, lightZ, rotationX, rotationY, rotationZ, night } = useControls({
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
  })

  const ref = useRef<THREE.Mesh>(null!)

  const [earth, earthTexture] = useTexture([
    require('../assets/Moon/textures/moon.jpg'),
    require('../assets/Moon/textures/moonTextures.jpg'),
  ]);

  useFrame((state, delta) => (ref.current.rotation.y += 0.001*speed))
  
  return (
    <>
    {night ? <ambientLight intensity={0.05}/> : <pointLight position={[lightX, lightY, lightZ]} intensity={lightIntensity} />}
      <mesh
        {...props}
        ref={ref}
        scale={zoom}
        rotation={[rotationY, rotationX, rotationZ]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
        map={earth}
        normalMap={earthTexture}
        normalScale={new THREE.Vector2(textures*0.5, textures*1.5)}/> 
      </mesh>
    </>
  )
}

  export default Moon;