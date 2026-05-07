import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AtlasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070912, 0.0028);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
    camera.position.set(0, 0, 220);

    // Star field
    const starGeom = new THREE.BufferGeometry();
    const starCount = 1800;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1100;
      const t = Math.random();
      colors[i * 3 + 0] = 0.55 + t * 0.45;
      colors[i * 3 + 1] = 0.7 + t * 0.3;
      colors[i * 3 + 2] = 1.0;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.4, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false,
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // Wireframe icosahedrons
    const shapeGroup = new THREE.Group();
    const addShape = (radius: number, color: number, x: number, y: number, z: number) => {
      const geom = new THREE.IcosahedronGeometry(radius, 1);
      const wire = new THREE.WireframeGeometry(geom);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 });
      const line = new THREE.LineSegments(wire, mat);
      line.position.set(x, y, z);
      (line as unknown as { spin: { x: number; y: number } }).spin = {
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
      };
      shapeGroup.add(line);
    };
    addShape(38, 0x7cf9d8, -180, 60, -80);
    addShape(28, 0x9d7cff, 210, -90, -40);
    addShape(20, 0xff7ca8, -50, 140, -200);
    addShape(46, 0x6da6ff, 100, -180, -260);
    scene.add(shapeGroup);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    parent.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      stars.rotation.y += 0.0004;
      stars.rotation.x += 0.0001;
      shapeGroup.children.forEach(s => {
        const spin = (s as unknown as { spin: { x: number; y: number } }).spin;
        s.rotation.x += spin.x;
        s.rotation.y += spin.y;
      });
      camera.position.x += (mouseX * 30 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 20 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener('mousemove', onMouseMove);
      starGeom.dispose();
      starMat.dispose();
      shapeGroup.children.forEach(s => {
        const line = s as THREE.LineSegments;
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="atlas-canvas" />;
}
