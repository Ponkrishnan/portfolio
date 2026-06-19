'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const N_NODES   = 48
const N_SIGNALS = 24

// ── Circular point sprite (avoids the default WebGL square-point look) ────
function makeCircleSprite(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 28)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.6)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// ── Fibonacci sphere — evenly distributed points ──────────────────────────
function spherePoints(n: number, r: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const phi = Math.PI * (Math.sqrt(5) - 1)
  for (let i = 0; i < n; i++) {
    const y   = (1 - (i / (n - 1)) * 2) * r
    const rad = Math.sqrt(Math.max(0, r * r - y * y))
    pts.push(new THREE.Vector3(rad * Math.cos(phi * i), y, rad * Math.sin(phi * i)))
  }
  return pts
}

// ── Core LLM visualization ────────────────────────────────────────────────
function NeuralScene() {
  const groupRef     = useRef<THREE.Group>(null)
  const sigAttribRef = useRef<THREE.BufferAttribute>(null)
  const colAttribRef = useRef<THREE.BufferAttribute>(null)

  const { nodeFlat, edgeFlat, edges, sigPos, sigEdgeArr, sigT, nodeColors, sprite } =
    useMemo(() => {
      const sprite  = makeCircleSprite()
      const nodes   = spherePoints(N_NODES, 1.45)
      const nodeFlat = new Float32Array(N_NODES * 3)
      nodes.forEach((p, i) => { nodeFlat[i*3]=p.x; nodeFlat[i*3+1]=p.y; nodeFlat[i*3+2]=p.z })

      // Edges — connect nodes within distance threshold
      const THRESH_SQ = 1.28 * 1.28
      const edges: [number, number][] = []
      for (let i = 0; i < N_NODES; i++)
        for (let j = i + 1; j < N_NODES; j++)
          if (nodes[i].distanceToSquared(nodes[j]) < THRESH_SQ)
            edges.push([i, j])

      const edgeFlat = new Float32Array(edges.length * 6)
      edges.forEach(([a, b], k) => {
        edgeFlat[k*6]   = nodeFlat[a*3];   edgeFlat[k*6+1] = nodeFlat[a*3+1]; edgeFlat[k*6+2] = nodeFlat[a*3+2]
        edgeFlat[k*6+3] = nodeFlat[b*3];   edgeFlat[k*6+4] = nodeFlat[b*3+1]; edgeFlat[k*6+5] = nodeFlat[b*3+2]
      })

      // Signal initial state
      const sigPos     = new Float32Array(N_SIGNALS * 3)
      const sigEdgeArr = Array.from({ length: N_SIGNALS }, () => Math.floor(Math.random() * edges.length))
      const sigT       = new Float32Array(Array.from({ length: N_SIGNALS }, () => Math.random()))

      // Node vertex colours — pulsed per-frame
      const nodeColors = new Float32Array(N_NODES * 3)
      for (let i = 0; i < N_NODES; i++) {
        nodeColors[i*3] = 0.2; nodeColors[i*3+1] = 0.08; nodeColors[i*3+2] = 0.75
      }

      return { nodeFlat, edgeFlat, edges, sigPos, sigEdgeArr, sigT, nodeColors, sprite }
    }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.09 + pointer.x * 0.28
      groupRef.current.rotation.x = Math.sin(t * 0.065) * 0.18 + pointer.y * 0.2
    }

    // Advance signal particles along edges
    for (let i = 0; i < N_SIGNALS; i++) {
      sigT[i] += 0.01
      if (sigT[i] >= 1) {
        sigT[i] = 0
        sigEdgeArr[i] = Math.floor(Math.random() * edges.length)
      }
      const [a, b] = edges[sigEdgeArr[i]]
      const s = sigT[i], r = 1 - s
      sigPos[i*3]   = nodeFlat[a*3]   * r + nodeFlat[b*3]   * s
      sigPos[i*3+1] = nodeFlat[a*3+1] * r + nodeFlat[b*3+1] * s
      sigPos[i*3+2] = nodeFlat[a*3+2] * r + nodeFlat[b*3+2] * s
    }
    if (sigAttribRef.current) sigAttribRef.current.needsUpdate = true

    // Pulse node colours (each node fires independently)
    for (let i = 0; i < N_NODES; i++) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.85)
      nodeColors[i*3]   = 0.1  + pulse * 0.28
      nodeColors[i*3+1] = 0.04 + pulse * 0.06
      nodeColors[i*3+2] = 0.55 + pulse * 0.42
    }
    if (colAttribRef.current) colAttribRef.current.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* Structural edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgeFlat, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00b4d8" transparent opacity={0.10} />
      </lineSegments>

      {/* Pulsing nodes — circles via sprite map */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodeFlat, 3]} />
          <bufferAttribute ref={colAttribRef} attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          vertexColors
          map={sprite}
          sizeAttenuation
          transparent
          opacity={0.92}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      {/* Signal particles — bright cyan circles */}
      <points>
        <bufferGeometry>
          <bufferAttribute ref={sigAttribRef} attach="attributes-position" args={[sigPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00e5ff"
          map={sprite}
          sizeAttenuation
          transparent
          opacity={0.95}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

// ── Ambient star field ─────────────────────────────────────────────────────
function Stars() {
  const ref = useRef<THREE.Points>(null)
  const { positions, sprite } = useMemo(() => {
    const sprite    = makeCircleSprite()
    const positions = new Float32Array(160 * 3)
    for (let i = 0; i < 160; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 5 + Math.random() * 5
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i*3+2] = r * Math.cos(phi)
    }
    return { positions, sprite }
  }, [])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.012 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        map={sprite}
        transparent
        opacity={0.25}
        sizeAttenuation
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  )
}

// ── Scene root ─────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[ 5,  4,  5]} intensity={3.5} color="#00b4d8" />
      <pointLight position={[-5, -4, -5]} intensity={2.5} color="#7b2ff7" />
      <Stars />
      <NeuralScene />
    </Canvas>
  )
}
