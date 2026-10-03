import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { skillGroups } from '../data.js';
import SceneFallback from './SceneFallback.jsx';

const points = [
  { pos: [-1.34, 0.86, 0.2], color: '#58e8f3', group: 'frontend', label: 'UI' },
  { pos: [1.38, 0.72, -0.12], color: '#ad8aff', group: 'agents', label: 'AI' },
  { pos: [1.42, -0.84, 0.1], color: '#71d8b4', group: 'embedded', label: 'I/O' },
  { pos: [-1.39, -0.7, -0.1], color: '#ff80ce', group: 'agents', label: 'API' },
];

function CircuitBoard({ activeGroup, onSelect }) {
  const board = useRef();
  const chip = useRef();
  const time = useRef(0);
  const activeColor = useMemo(() => skillGroups.find((group) => group.id === activeGroup)?.color, [activeGroup]);

  useFrame((state, delta) => {
    time.current += delta;
    if (!board.current) return;
    board.current.rotation.y = THREE.MathUtils.damp(board.current.rotation.y, state.pointer.x * 0.2, 3, delta);
    board.current.rotation.x = THREE.MathUtils.damp(board.current.rotation.x, -state.pointer.y * 0.13, 3, delta);
    if (chip.current) chip.current.rotation.y = Math.sin(time.current * 0.7) * 0.17;
  });

  return (
    <group ref={board}>
      <mesh rotation={[-0.14, 0, 0]} position={[0, 0, -0.18]}>
        <boxGeometry args={[3.4, 2.45, 0.11]} />
        <meshStandardMaterial color="#0b1321" metalness={0.68} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[3.12, 2.16, 0.014]} />
        <meshBasicMaterial color="#101d2c" wireframe opacity={0.28} transparent />
      </mesh>
      <group ref={chip} onClick={() => onSelect(activeGroup === 'agents' ? 'frontend' : 'agents')} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
        <mesh>
          <boxGeometry args={[1.05, 0.94, 0.28]} />
          <meshStandardMaterial color="#15172a" metalness={0.8} roughness={0.22} emissive="#392e68" emissiveIntensity={0.38} />
        </mesh>
        <mesh position={[0, 0, 0.148]}>
          <boxGeometry args={[0.85, 0.74, 0.015]} />
          <meshBasicMaterial color={activeColor} wireframe transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0, 0.17]}>
          <boxGeometry args={[0.34, 0.34, 0.035]} />
          <meshStandardMaterial color="#111827" metalness={0.48} roughness={0.2} emissive={activeColor} emissiveIntensity={0.78} />
        </mesh>
        <Html position={[0, -0.01, 0.2]} center transform distanceFactor={5}>
          <span className="chip-label">JS<span> / </span>AI</span>
        </Html>
      </group>
      {points.map((point, index) => {
        const highlighted = !activeGroup || activeGroup === point.group;
        return (
          <group key={point.label} position={point.pos} onClick={() => onSelect(point.group)} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
            <mesh>
              <sphereGeometry args={[highlighted ? 0.11 : 0.075, 24, 24]} />
              <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={highlighted ? 2.5 : 0.35} transparent opacity={highlighted ? 1 : 0.32} />
            </mesh>
            <mesh rotation={[0.3, index * 0.5, 0]}>
              <torusGeometry args={[0.19, 0.008, 8, 36]} />
              <meshBasicMaterial color={point.color} transparent opacity={highlighted ? 0.8 : 0.15} />
            </mesh>
            <mesh position={[0, 0, -0.16]}>
              <cylinderGeometry args={[0.012, 0.012, 0.25, 6]} />
              <meshBasicMaterial color={point.color} transparent opacity={highlighted ? 0.74 : 0.16} />
            </mesh>
            <Html position={[0, -0.29, 0]} center distanceFactor={6}>
              <span className={`scene-node-label ${highlighted ? 'node-active' : ''}`}>{point.label}</span>
            </Html>
          </group>
        );
      })}
      <mesh rotation={[0, 0, Math.PI / 6]} position={[0, 0, -0.08]}>
        <torusGeometry args={[1.73, 0.006, 8, 120]} />
        <meshBasicMaterial color="#7883f7" transparent opacity={0.35} />
      </mesh>
      <Sparkles count={54} scale={[4.1, 3.1, 2]} size={1.8} speed={0.22} color="#8a91c4" opacity={0.55} />
      <pointLight position={[-2, 2, 3]} color="#45e5f5" intensity={9} distance={8} />
      <pointLight position={[2, -1, 2]} color="#9b71ff" intensity={11} distance={8} />
    </group>
  );
}

export default function HeroScene({ activeGroup = 'agents', onSelect = () => {} }) {
  const lowMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4;
  if (lowMotion || lowPower) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      fallback={<SceneFallback />}
      onCreated={({ gl }) => gl.setClearColor('#080b12', 0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#d9f7ff" />
        <Float speed={1.05} rotationIntensity={0.07} floatIntensity={0.12}>
          <CircuitBoard activeGroup={activeGroup} onSelect={onSelect} />
        </Float>
        <OrbitControls enableDamping dampingFactor={0.075} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2 - 0.24} maxPolarAngle={Math.PI / 2 + 0.24} minAzimuthAngle={-0.42} maxAzimuthAngle={0.42} />
      </Suspense>
    </Canvas>
  );
}
