import React, { Suspense } from 'react';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Loader } from '@react-three/drei';

interface Robot3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

function Model() {
  // Assuming robot.glb is in the public/ folder
  const { scene } = useGLTF('/robot.glb');
  // The <Stage> component will handle scaling and centering
  return <primitive object={scene} />;
}

const Robot3DViewer: React.FC<Robot3DViewerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-5/6 mx-4 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 text-white backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/30 transition-colors"
          aria-label="Close 3D viewer"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="w-full h-full rounded-lg overflow-hidden">
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6}>
                <Model />
              </Stage>
            </Suspense>
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.5}
              enableZoom={true}
            />
          </Canvas>
          <Loader 
            containerStyles={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            innerStyles={{ backgroundColor: '#1f2937', width: '150px' }}
            barStyles={{ backgroundColor: '#0ea5e9', height: '5px' }}
            dataStyles={{ color: 'white' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Robot3DViewer;