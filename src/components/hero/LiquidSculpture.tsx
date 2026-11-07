import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { MathUtils, type Group } from 'three';

function Sculpture() {
  const sculpture = useRef<Group>(null);
  const rings = useRef<Group>(null);

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    if (sculpture.current) {
      sculpture.current.rotation.x = MathUtils.damp(sculpture.current.rotation.x, -pointer.y * 0.45, 3, delta);
      sculpture.current.rotation.y = MathUtils.damp(
        sculpture.current.rotation.y,
        pointer.x * 0.7 + clock.elapsedTime * 0.12,
        3,
        delta,
      );
    }
    if (rings.current) {
      rings.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 5, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[3, 2, 3]} intensity={70} color="#ff2e88" />
      <pointLight position={[-3, -2, 2]} intensity={60} color="#3b82f6" />
      <pointLight position={[0, 3, -2]} intensity={40} color="#ff8a3d" />

      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={1.1}>
        <group ref={sculpture}>
          <Sphere args={[1.15, 160, 160]}>
            <MeshDistortMaterial
              color="#e4e0ff"
              metalness={0.95}
              roughness={0.16}
              distort={0.42}
              speed={1.8}
            />
          </Sphere>
        </group>
      </Float>

      <group ref={rings}>
        <Torus args={[2.05, 0.02, 24, 240]} rotation={[1.2, 0.3, 0]}>
          <meshBasicMaterial color="#ff2e88" />
        </Torus>
        <Torus args={[2.45, 0.014, 24, 240]} rotation={[0.4, 1.1, 0.5]}>
          <meshBasicMaterial color="#60a5fa" />
        </Torus>
        <Torus args={[2.8, 0.01, 24, 240]} rotation={[1.6, 0.2, 1.2]}>
          <meshBasicMaterial color="#ff8a3d" />
        </Torus>
      </group>

      <Float speed={2.4} floatIntensity={1.8}>
        <Sphere args={[0.16, 32, 32]} position={[1.9, 0.9, 0.6]}>
          <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={1.2} />
        </Sphere>
      </Float>
      <Float speed={1.9} floatIntensity={1.4}>
        <Sphere args={[0.11, 32, 32]} position={[-1.7, -1.2, 0.9]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={1.2} />
        </Sphere>
      </Float>
      <Float speed={2.1} floatIntensity={1.2}>
        <Sphere args={[0.13, 32, 32]} position={[-0.9, 1.9, -0.8]}>
          <meshStandardMaterial color="#ff8a3d" emissive="#ff8a3d" emissiveIntensity={1.2} />
        </Sphere>
      </Float>
    </>
  );
}

type LiquidSculptureProps = {
  source: HTMLElement;
};

export default function LiquidSculpture({ source }: LiquidSculptureProps) {
  return (
    <Canvas
      eventSource={source}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!pointer-events-none"
    >
      <Sculpture />
    </Canvas>
  );
}
