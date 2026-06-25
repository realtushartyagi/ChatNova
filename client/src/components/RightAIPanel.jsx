import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// The 3D Wireframe Polyhedron (Icosahedron)
const AICoreWireframe = () => {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 0]} />
      {/* Glow / Glass effect */}
      <meshPhysicalMaterial 
        color="#88F7FF"
        wireframe={true}
        transparent={true}
        opacity={0.8}
        emissive="#88F7FF"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

const RightAIPanel = () => {
  return (
    <div className='hidden xl:flex flex-col w-[260px] h-full p-6 border-l border-white/5 bg-[#081019]/80 backdrop-blur-3xl z-10' style={{animationDirection: 'reverse'}}>
      
      {/* Top Title */}
      <h2 className='text-2xl font-light text-white tracking-wide mb-6 drop-shadow-[0_0_15px_rgba(136,247,255,0.4)]'>
        AI Core
      </h2>

      {/* 3D Core Viewport */}
      <div className='flex-1 w-full relative flex items-center justify-center min-h-[250px] mb-8'>
          {/* Ambient background glow behind the 3D model */}
          <div className='absolute inset-0 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none'></div>
          
          <div className='w-full h-full absolute inset-0'>
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#88F7FF" />
                <AICoreWireframe />
              </Canvas>
          </div>
      </div>

      {/* Bottom Status Panel */}
      <div className='mt-auto space-y-6'>
          {/* Processing Speed */}
          <div className='space-y-3'>
              <p className='text-xs text-[#B8BEC8] font-medium tracking-wide'>Processing Speed</p>
              <div className='w-full h-1.5 bg-white/10 rounded-full overflow-hidden'>
                  <div className='h-full bg-gradient-to-r from-cyan-600 to-cyan-300 w-[75%] rounded-full shadow-[0_0_10px_rgba(136,247,255,0.6)]'></div>
              </div>
          </div>

          {/* AI Status */}
          <div className='flex items-center justify-between'>
              <p className='text-xs text-[#B8BEC8] font-medium tracking-wide'>AI Status</p>
              <div className='w-10 h-5 bg-[#0E1520] rounded-full p-1 cursor-pointer border border-white/5 flex justify-end shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]'>
                  <div className='w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'></div>
              </div>
          </div>
      </div>

    </div>
  )
}

export default RightAIPanel
