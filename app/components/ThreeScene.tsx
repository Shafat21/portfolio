import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup - initial dummy aspect, will fix in handleResize
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    // Create a group to hold all objects
    const group = new THREE.Group()
    scene.add(group)

    // Create floating cubes
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

    const createCube = (x: number, y: number, z: number, color: string) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.3,
        roughness: 0.4,
      })
      const cube = new THREE.Mesh(cubeGeometry, material)
      cube.position.set(x, y, z)
      cube.userData = {
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005,
        },
        floatSpeed: Math.random() * 0.005 + 0.002,
        floatDirection: Math.random() < 0.5 ? 1 : -1,
        floatOffset: Math.random() * Math.PI * 2,
      }
      group.add(cube)
      return cube
    }

    const cubes = [
      createCube(-2, 1, 0, "#3b82f6"),
      createCube(2, -1, 1, "#8b5cf6"),
      createCube(0, 2, -1, "#06b6d4"),
      createCube(-1, -2, -2, "#4f46e5"),
      createCube(1.5, 1.5, 0.5, "#ec4899"),
    ]

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 2, 3)
    scene.add(directionalLight)

    const updateSize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth || window.innerWidth
      const height = containerRef.current.clientHeight || window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    // Initial size setup
    updateSize()
    containerRef.current.appendChild(renderer.domElement)

    window.addEventListener("resize", updateSize)

    const mouse = new THREE.Vector2()
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      group.rotation.y = mouse.x * 0.5
      group.rotation.x = mouse.y * 0.5

      cubes.forEach((cube) => {
        const data = cube.userData
        cube.rotation.x += data.rotationSpeed.x
        cube.rotation.y += data.rotationSpeed.y
        cube.rotation.z += data.rotationSpeed.z
        cube.position.y += Math.sin(elapsedTime * data.floatSpeed + data.floatOffset) * 0.002 * data.floatDirection
      })

      renderer.render(scene, camera)

      // Signal loaded after first frame
      if (!isLoaded) setIsLoaded(true)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
