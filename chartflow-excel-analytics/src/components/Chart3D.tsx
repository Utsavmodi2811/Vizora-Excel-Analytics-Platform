
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Chart3DProps {
  data: Array<{ name: string; value: number }>;
  type: '3d-bar' | '3d-scatter' | '3d-surface';
  color?: string;
}

const Bar3D = ({ position, height, color, label }: { 
  position: [number, number, number]; 
  height: number; 
  color: string;
  label: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={[1, 0.1, 1]}
      >
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial 
          color={hovered ? '#ff6b6b' : color} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, height + 0.2, 0]}
        fontSize={0.12}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {height.toFixed(1)}
      </Text>
    </group>
  );
};

const ScatterPoint = ({ position, size, color }: { 
  position: [number, number, number]; 
  size: number; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      <sphereGeometry args={[size]} />
      <meshStandardMaterial color={hovered ? '#ff6b6b' : color} />
    </mesh>
  );
};

const Chart3DScene = ({ data, type, color = '#4f46e5' }: Chart3DProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const normalizedData = data.map(d => ({ ...d, value: (d.value / maxValue) * 3 }));

  const renderChart = () => {
    switch (type) {
      case '3d-bar':
        return normalizedData.map((item, index) => (
          <Bar3D
            key={index}
            position={[index * 1.5 - (data.length * 1.5) / 2, 0, 0]}
            height={item.value}
            color={color}
            label={item.name}
          />
        ));
        
      case '3d-scatter':
        return normalizedData.map((item, index) => (
          <ScatterPoint
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              item.value,
              (Math.random() - 0.5) * 10
            ]}
            size={0.2 + (item.value / 3) * 0.3}
            color={color}
          />
        ));
        
      default:
        return null;
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} />
      
      {renderChart()}
      
      <gridHelper args={[20, 20]} />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={5}
      />
    </>
  );
};

const Chart3D = ({ data, type, color }: Chart3DProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No data available for 3D visualization</p>
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-80 lg:h-96 w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <Chart3DScene data={data} type={type} color={color} />
      </Canvas>
    </div>
  );
};

export default Chart3D;
