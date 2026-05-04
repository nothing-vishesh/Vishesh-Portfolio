/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, MeshDistortMaterial, Grid } from "@react-three/drei";
import { useScroll, useTransform } from "motion/react";
import * as THREE from "three";

function MouseLight() {
  const light = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    const { x, y } = state.mouse;
    // Map mouse [-1, 1] to viewport
    light.current.position.x = (x * viewport.width) / 2;
    light.current.position.y = (y * viewport.height) / 2;
  });

  return <pointLight ref={light} intensity={2} color="#00f2ff" distance={10} />;
}

function FloatingShapes() {
  const mesh1 = useRef<THREE.Mesh>(null!);
  const mesh2 = useRef<THREE.Mesh>(null!);
  const mesh3 = useRef<THREE.Mesh>(null!);

  const { scrollYProgress } = useScroll();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress.get();
    const mouse = state.mouse;
    
    // More dramatic mouse influence on position and rotation
    mesh1.current.rotation.x = Math.sin(time / 4) + scrollVal * 3 + mouse.y * 2;
    mesh1.current.rotation.y = Math.sin(time / 2) + scrollVal * 2 + mouse.x * 2;
    mesh1.current.position.y = (1 - scrollVal) * 5 + mouse.y * 1.5;
    mesh1.current.position.x = -3 + mouse.x * 2;

    mesh2.current.rotation.x = Math.cos(time / 3) + scrollVal * 2 + mouse.y * 2.5;
    mesh2.current.rotation.z = Math.sin(time / 2) + scrollVal * 6 + mouse.x * 2.5;
    mesh2.current.position.y = -scrollVal * 10 + mouse.y * 2.5;
    mesh2.current.position.x = 3 + mouse.x * 3;

    mesh3.current.rotation.y = Math.sin(time / 3) + scrollVal * 4 + mouse.x * 2;
    mesh3.current.rotation.z = Math.cos(time / 4) + scrollVal * 5 + mouse.y * 2;
    mesh3.current.position.y = -scrollVal * 8 + mouse.y * 2;
    mesh3.current.position.x = mouse.x * 4;
    
    // Pulse scale with time
    const pulse = 1 + Math.sin(time) * 0.1;
    mesh1.current.scale.setScalar(pulse);
    mesh2.current.scale.setScalar(1 + Math.cos(time * 0.8) * 0.1);
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={mesh1} position={[-2, 1, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#00f2ff" speed={2} distort={0.3} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={mesh2} position={[2, -1, -2]}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#9d00ff" speed={1.5} distort={0.5} opacity={0.6} transparent />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
        <mesh ref={mesh3} position={[0, -2, 1]}>
          <torusGeometry args={[0.8, 0.2, 16, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      </Float>
    </>
  );
}

function Scene() {
  const { scrollYProgress } = useScroll();
  const sceneRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    const scrollVal = scrollYProgress.get();
    if (sceneRef.current) {
      sceneRef.current.rotation.x = scrollVal * 0.2;
      sceneRef.current.position.y = scrollVal * 2;
    }
  });

  return (
    <group ref={sceneRef}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <MouseLight />
      
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={5} 
        sectionColor="#1a1a1a" 
        cellColor="#0a0a0a" 
        position={[0, -5, 0]}
      />

      <FloatingShapes />
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  );
}
