import { useEffect, useRef } from "react";
import * as THREE from "three";

import { isLandPoint } from "@/components/home/landMaskLookup";

const MAP_VERTEX_SHADER = `
  uniform sampler2D u_map_tex;
  uniform float u_dot_size;
  uniform float u_time_since_click;
  uniform vec3 u_pointer;

  #define PI 3.14159265359

  varying float vOpacity;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    float visibility = step(.2, texture2D(u_map_tex, uv).r);
    gl_PointSize = visibility * u_dot_size;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vOpacity = (1. / length(mvPosition.xyz) - .7);
    vOpacity = clamp(vOpacity, .05, 1.);

    float t = u_time_since_click - .1;
    t = max(0., t);
    float max_amp = .15;
    float dist = 1. - .5 * length(position - u_pointer);
    float damping = 1. / (1. + 20. * t);
    float delta = max_amp * damping * sin(5. * t * (1. + 2. * dist) - PI);
    delta *= 1. - smoothstep(.8, 1., dist);

    vec3 pos = position;
    pos *= (1. + delta);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
`;

const MAP_FRAGMENT_SHADER = `
  uniform sampler2D u_map_tex;

  varying float vOpacity;
  varying vec2 vUv;

  void main() {
    vec3 color = texture2D(u_map_tex, vUv).rgb;
    color -= .2 * length(gl_PointCoord.xy - vec2(.5));
    float dot = 1. - smoothstep(.38, .4, length(gl_PointCoord.xy - vec2(.5)));
    if (dot < 0.5) discard;
    gl_FragColor = vec4(color, dot * vOpacity);
  }
`;

const ROTATION_SPEED_PER_FRAME = 0.0052;

const buildMapCanvas = () => {
  const canvas = document.createElement("canvas");
  const width = 1024;
  const height = 512;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = "#071624";
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += 2) {
    const lat = 90 - (y / height) * 180;
    for (let x = 0; x < width; x += 2) {
      const lng = (x / width) * 360 - 180;
      if (!isLandPoint(lat, lng)) continue;

      const warm = Math.sin((lat + lng) * 0.05) > 0.22;
      ctx.fillStyle = warm ? "#9ca866" : "#35a769";
      ctx.fillRect(x, y, 2, 2);
    }
  }

  return canvas;
};


const ShaderGlobe = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas3d = canvas3dRef.current;
    if (!wrapper || !canvas3d) return;

    let disposed = false;
    let frameId = 0;
    let lastFrameTime = performance.now();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.12, 1.12, 1.12, -1.12, 0, 4);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-2, -2);
    const clock = new THREE.Clock(false);
    const group = new THREE.Group();
    const mapTexture = new THREE.CanvasTexture(buildMapCanvas());
    const geometry = new THREE.IcosahedronGeometry(1, 22);
    const baseGeometry = new THREE.SphereGeometry(0.985, 64, 64);
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: 0xf6f6f4,
      transparent: true,
      opacity: 0.92,
    });
    const baseGlobe = new THREE.Mesh(baseGeometry, baseMaterial);
    const mapMaterial = new THREE.ShaderMaterial({
      vertexShader: MAP_VERTEX_SHADER,
      fragmentShader: MAP_FRAGMENT_SHADER,
      uniforms: {
        u_map_tex: { value: mapTexture },
        u_dot_size: { value: 0 },
        u_pointer: { value: new THREE.Vector3(0, 0, 1) },
        u_time_since_click: { value: 0 },
      },
      transparent: true,
    });
    const globeMeshMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const globe = new THREE.Points(geometry, mapMaterial);
    const globeMesh = new THREE.Mesh(geometry, globeMeshMaterial);

    camera.position.z = 1.8;
    raycaster.far = 3;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    group.rotation.x = -0.18;
    group.add(baseGlobe, globe, globeMesh);
    scene.add(group);

    let dragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotationX = 0;
    let dragRotationY = 0;

    const resize = () => {
      const size = Math.max(280, Math.min(560, Math.round(wrapper.clientWidth)));
      wrapper.style.height = `${size}px`;
      renderer.setSize(size, size, false);
      mapMaterial.uniforms.u_dot_size.value = size * 0.036;
    };

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = wrapper.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      dragMoved = false;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragRotationX = group.rotation.x;
      dragRotationY = group.rotation.y;
      canvas3d.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateMouse(event.clientX, event.clientY);

      if (!dragging) return;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 4) dragMoved = true;
      group.rotation.y = dragRotationY + deltaX * 0.008;
      group.rotation.x = Math.max(-0.72, Math.min(0.42, dragRotationX + deltaY * 0.006));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas3d.hasPointerCapture(event.pointerId)) {
        canvas3d.releasePointerCapture(event.pointerId);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (dragMoved) return;

      updateMouse(event.clientX, event.clientY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globeMesh);
      if (!intersects.length || !intersects[0].face) return;

      const normal = intersects[0].face.normal.clone().normalize();
      mapMaterial.uniforms.u_pointer.value.copy(normal);
      mapMaterial.uniforms.u_time_since_click.value = 0;
      clock.start();
    };

    const handleMoveCursor = (event: PointerEvent) => {
      updateMouse(event.clientX, event.clientY);
      raycaster.setFromCamera(mouse, camera);
      wrapper.style.cursor = raycaster.intersectObject(globeMesh).length ? "pointer" : "grab";
    };

    const render = () => {
      if (disposed) return;

      const now = performance.now();
      const frameScale = Math.min(3, (now - lastFrameTime) / (1000 / 60));
      lastFrameTime = now;

      if (!prefersReducedMotion && !dragging) {
        group.rotation.y += ROTATION_SPEED_PER_FRAME * frameScale;
      }
      mapMaterial.uniforms.u_time_since_click.value = clock.running ? clock.getElapsedTime() : 100;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    wrapper.addEventListener("pointermove", handleMoveCursor);
    canvas3d.addEventListener("click", handleClick);
    canvas3d.addEventListener("pointerdown", handlePointerDown);
    canvas3d.addEventListener("pointermove", handlePointerMove);
    canvas3d.addEventListener("pointerup", handlePointerUp);
    canvas3d.addEventListener("pointercancel", handlePointerUp);
    render();

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("pointermove", handleMoveCursor);
      canvas3d.removeEventListener("click", handleClick);
      canvas3d.removeEventListener("pointerdown", handlePointerDown);
      canvas3d.removeEventListener("pointermove", handlePointerMove);
      canvas3d.removeEventListener("pointerup", handlePointerUp);
      canvas3d.removeEventListener("pointercancel", handlePointerUp);
      window.cancelAnimationFrame(frameId);
      geometry.dispose();
      baseGeometry.dispose();
      baseMaterial.dispose();
      mapMaterial.dispose();
      globeMeshMaterial.dispose();
      mapTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative z-0 mx-auto aspect-square w-full max-w-[560px] touch-none select-none"
      aria-label="Interactive globe. Drag to rotate and click to add a pointer."
    >
      <canvas ref={canvas3dRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
};

export default ShaderGlobe;
