"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X, Play, ExternalLink } from "lucide-react"

/**
 * Single-file Stellar Card & Video Gallery Component
 * - Supports images and videos (local MP4 assets & Google Drive embeds)
 * - 3D Starfield, Orbital Galaxy distribution, Interactive modal player
 */

/* =========================
   Card Context & Types
   ========================= */

export type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
  videoUrl?: string
  driveUrl?: string
  isVideo?: boolean
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

export function CardProvider({ children, initialCards }: { children: React.ReactNode; initialCards?: Card[] }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const defaultCards: Card[] = [
    {
      id: "v1",
      imageUrl: "images/portfolio_video_thumb.jpg",
      videoUrl: "images/portfolio_video.mp4",
      driveUrl: "https://drive.google.com/file/d/1SPL6s8om6zxBwJKlL2XtxkN9ZWYlq-AN/view?usp=sharing",
      alt: "Signature UGC Brand Showcase",
      title: "Signature UGC Brand Showcase",
      isVideo: true
    },
    {
      id: "v2",
      imageUrl: "images/portfolio_video_thumb.jpg",
      videoUrl: "images/ad_video.mp4",
      alt: "Scalebuzz Performance Ad",
      title: "Scalebuzz Performance Ad",
      isVideo: true
    },
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", alt: "Aura Beauty Hook", title: "Aura Beauty Hook" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800", alt: "Surge Energy Ad", title: "Surge Energy Ad" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", alt: "Velour Perfume Campaign", title: "Velour Perfume Campaign" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", alt: "Flux Fitness Concept", title: "Flux Fitness Concept" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", alt: "Echo Tech Hook", title: "Echo Tech Hook" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800", alt: "Flux Yoga Walkthrough", title: "Flux Yoga Walkthrough" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", alt: "Velour Lifestyle Reel", title: "Velour Lifestyle Reel" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", alt: "Aura Glow Showcase", title: "Aura Glow Showcase" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", alt: "Noir Fashion Concept", title: "Noir Fashion Concept" },
    { id: "10", imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800", alt: "Surge Can Aesthetic", title: "Surge Can Aesthetic" },
    { id: "11", imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", alt: "Velour Bottle Studio", title: "Velour Bottle Studio" },
    { id: "12", imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800", alt: "Aura Balm Lip Swatch", title: "Aura Balm Lip Swatch" },
    { id: "13", imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800", alt: "Echo Buds Macro", title: "Echo Buds Macro" },
    { id: "14", imageUrl: "https://images.unsplash.com/photo-1541462608141-ad4d4f942177?auto=format&fit=crop&q=80&w=800", alt: "High-CTR Hook Framework", title: "High-CTR Hook Framework" },
    { id: "15", imageUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800", alt: "Surge Storyboard Layout", title: "Surge Storyboard Layout" },
    { id: "16", imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800", alt: "Creator Match Sheet", title: "Creator Match Sheet" },
  ]

  const cards = initialCards || defaultCards

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating Card
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-44 h-56 rounded-xl overflow-hidden shadow-2xl bg-[#0F172A] p-3 select-none relative group"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(37, 99, 235, 0.6), 0 0 30px rgba(37, 99, 235, 0.4)"
              : "0 15px 30px rgba(0, 0, 0, 0.7)",
            border: card.isVideo || hovered ? "2px solid rgba(37, 99, 235, 0.8)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="relative w-full h-40 overflow-hidden rounded-lg">
            <img
              src={card.imageUrl || "/placeholder.svg"}
              alt={card.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
            {card.isVideo && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className="text-white text-xs font-semibold truncate">{card.title}</p>
            {card.isVideo && <span className="text-[10px] text-blue-400 font-bold tracking-wide uppercase">Video Ad</span>}
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal (Video Player + Lightbox)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md" onClick={handleBackdropClick}>
      <div className="relative max-w-xl w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[20px] bg-[#0F172A] p-5 transition-all duration-500 ease-out w-full border border-blue-500/30"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(37, 99, 235, 0.25)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4 rounded-[14px] overflow-hidden bg-black" style={{ aspectRatio: selectedCard.isVideo ? "16 / 9" : "4 / 3" }}>
              {selectedCard.isVideo && selectedCard.videoUrl ? (
                <video
                  src={selectedCard.videoUrl}
                  poster={selectedCard.imageUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  loading="lazy"
                  className="w-full h-full object-cover"
                  alt={selectedCard.alt}
                  src={selectedCard.imageUrl || "/placeholder.svg"}
                />
              )}
            </div>

            <h3 className="text-white text-xl font-bold mb-4 text-center">{selectedCard.title}</h3>

            <div className="flex gap-3">
              {selectedCard.driveUrl ? (
                <a
                  href={selectedCard.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open on Google Drive</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Asset</span>
                </button>
              )}
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Heart className="h-4 w-4" fill={isFavorited ? "#ef4444" : "none"} color={isFavorited ? "#ef4444" : "currentColor"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e293b" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2563eb" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle({ initialCards }: { initialCards?: Card[] }) {
  return (
    <CardProvider initialCards={initialCards}>
      <div className="w-full h-screen relative overflow-hidden bg-black font-sans">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-6 left-6 z-20 text-white pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
            🌐 3D Video & Creative Gallery
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Stellar Video Galaxy</h1>
          <p className="text-sm text-slate-400">Drag to rotate 360° • Scroll to zoom • Click any card or video to play</p>
        </div>
      </div>
    </CardProvider>
  )
}
