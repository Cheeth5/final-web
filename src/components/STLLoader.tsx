import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Group, BufferGeometry, Mesh } from 'three';

interface STLModelProps {
  url: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

const STLModel: React.FC<STLModelProps> = ({ 
  url, 
  position = [0, 0, 0], 
  scale = [1, 1, 1],
  rotation = [0, 0, 0]
}) => {
  const meshRef = useRef<Mesh>(null);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    
    loader.load(
      url,
      (geometry) => {
        // Center the geometry
        geometry.computeBoundingBox();
        const center = geometry.boundingBox?.getCenter(new THREE.Vector3()) || new THREE.Vector3();
        geometry.translate(-center.x, -center.y, -center.z);
        
        // Compute normals for proper lighting
        geometry.computeVertexNormals();
        
        setGeometry(geometry);
        setLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading STL:', error);
        setError('Failed to load STL file');
        setLoading(false);
      }
    );
  }, [url]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  if (loading) {
    return null; // Loading handled by parent component
  }

  if (error || !geometry) {
    return null; // Error handled by parent component
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <meshStandardMaterial
        color="#f8fafc"
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
};

export default STLModel;