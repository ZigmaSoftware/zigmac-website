import { useEffect, useRef } from "react";
import { Check, Factory, PackageCheck, Settings, ShoppingCart, Truck } from "lucide-react";
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
const MAX_VISIBLE_BADGES = 3;

const FLOATING_BADGES = [
  {
    id: "machinery-sales",
    lat: 22,
    lng: 78,
    Icon: ShoppingCart,
    title: "Machinery sales",
    subtitle: "MSW plant equipment",
    accent: "#111827",
  },
  {
    id: "equipment-rentals",
    lat: 39,
    lng: -96,
    Icon: Truck,
    title: "Equipment rentals",
    subtitle: "Deployment-ready machines",
    accent: "#16a34a",
  },
  {
    id: "plant-installation",
    lat: 25,
    lng: 45,
    Icon: Settings,
    title: "Plant installation",
    subtitle: "Setup and commissioning",
    accent: "#2563eb",
  },
  {
    id: "fabrication",
    lat: -25,
    lng: 134,
    Icon: Factory,
    title: "Fabrication",
    subtitle: "Heavy-duty assemblies",
    accent: "#f59e0b",
  },
  {
    id: "spares-support",
    lat: 4,
    lng: 21,
    Icon: PackageCheck,
    title: "Spares support",
    subtitle: "Parts, service and uptime",
    accent: "#64748b",
  },
] as const;

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

const latLngToVector = (latDeg: number, lngDeg: number) => {
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180;

  return new THREE.Vector3(
    Math.cos(lat) * Math.sin(lng),
    Math.sin(lat),
    Math.cos(lat) * Math.cos(lng),
  );
};

const ShaderGlobe = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

    const updateBadges = () => {
      const size = wrapper.clientWidth;
      group.updateMatrixWorld(true);

      const badgeStates = FLOATING_BADGES.map((badge) => {
        const badgeEl = badgeRefs.current[badge.id];
        if (!badgeEl) return null;

        const worldPoint = latLngToVector(badge.lat, badge.lng).applyMatrix4(group.matrixWorld);
        const projected = worldPoint.clone().project(camera);
        const opacity = Math.max(0, Math.min(1, (worldPoint.z + 0.16) / 0.36));
        const x = (projected.x + 1) * size * 0.5;
        const y = (1 - projected.y) * size * 0.5;
        // Reference behavior: the label offset is constant (icon on the
        // left, label extending right) regardless of where the badge sits
        // on the globe. It is never flipped to the other side — at the
        // edges the label is simply allowed to run off-canvas.
        const offsetX = -12;
        const offsetY = -20;

        return { badge, badgeEl, opacity, worldPoint, x, y, offsetX, offsetY };
      }).filter((state): state is NonNullable<typeof state> => Boolean(state));

      const visibleBadgeIds = new Set(
        badgeStates
          .filter((state) => state.opacity > 0.16)
          .sort((a, b) => b.opacity - a.opacity)
          .slice(0, MAX_VISIBLE_BADGES)
          .map((state) => state.badge.id),
      );

      badgeStates.forEach(({ badge, badgeEl, opacity, worldPoint, x, y, offsetX, offsetY }) => {
        const visible = visibleBadgeIds.has(badge.id);
        const visibleOpacity = visible ? opacity : 0;
        const baseX = x + offsetX;
        const baseY = y + offsetY;

        badgeEl.style.opacity = visibleOpacity.toFixed(3);
        badgeEl.style.transform = `translate(${baseX}px, ${baseY}px)`;
        badgeEl.style.zIndex = `${Math.round(10 + worldPoint.z * 10)}`;
      });
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
      updateBadges();

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
      <style>{`
        .globe-badge-fade {
          transition: opacity 260ms linear;
        }
      `}</style>
      <canvas ref={canvas3dRef} className="absolute inset-0 block h-full w-full" />
      <div className="pointer-events-none absolute inset-0">
        {FLOATING_BADGES.map((badge) => (
          <div
            key={badge.id}
            ref={(node) => {
              badgeRefs.current[badge.id] = node;
            }}
            className="pointer-events-none absolute left-0 top-0 flex min-w-[220px] items-center opacity-0 globe-badge-fade"
            aria-hidden="true"
          >
            <div className="flex items-center">
              <div
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-[0_12px_26px_rgba(15,23,42,0.16)] ring-[3px] ring-white/80"
                style={{ backgroundColor: badge.accent }}
              >
                <badge.Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div className="-ml-5 flex min-h-[62px] flex-1 items-center justify-between gap-3 rounded-xl bg-white/95 py-3 pl-8 pr-3 shadow-[0_14px_30px_rgba(15,23,42,0.14)] ring-1 ring-slate-900/5 backdrop-blur-md">
                <div>
                  <p className="text-sm font-bold leading-tight text-slate-950">{badge.title}</p>
                  <p className="mt-1 text-xs leading-tight text-slate-600">{badge.subtitle}</p>
                </div>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShaderGlobe;
