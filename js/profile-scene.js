import * as THREE from 'three';

const canvas = document.getElementById('profile-scene');
const frame = document.getElementById('scene-frame');

if (canvas && frame) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0, 5.7);

    scene.add(new THREE.AmbientLight(0xd8d0bd, 1.1));
    const keyLight = new THREE.PointLight(0xa9b9a6, 25, 12, 2);
    keyLight.position.set(-2.2, 2.4, 3.4);
    scene.add(keyLight);
    const violetLight = new THREE.PointLight(0xafa0a5, 27, 13, 2);
    violetLight.position.set(2.7, -1.4, 2.7);
    scene.add(violetLight);
    const warmLight = new THREE.PointLight(0xd4bd92, 22, 10, 2);
    warmLight.position.set(0.5, 3, -2);
    scene.add(warmLight);

    const world = new THREE.Group();
    scene.add(world);

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb48a56,
      metalness: 0.72,
      roughness: 0.3,
      clearcoat: 0.82,
      clearcoatRoughness: 0.22,
      emissive: 0x33271b,
      emissiveIntensity: 0.1,
      envMapIntensity: 1.15,
    });
    const tealMaterial = new THREE.MeshStandardMaterial({ color: 0x91afa0, metalness: 0.28, roughness: 0.34, emissive: 0x26372f, emissiveIntensity: 0.2 });
    const violetMaterial = new THREE.MeshStandardMaterial({ color: 0xa69da8, metalness: 0.24, roughness: 0.36, emissive: 0x37313a, emissiveIntensity: 0.18 });
    const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x9eabb2, metalness: 0.24, roughness: 0.38, emissive: 0x303a3c, emissiveIntensity: 0.16 });
    const roseMaterial = new THREE.MeshStandardMaterial({ color: 0xb68f8d, metalness: 0.26, roughness: 0.35, emissive: 0x3c2928, emissiveIntensity: 0.18 });

    const bangleGroup = new THREE.Group();
    world.add(bangleGroup);
    const bangle = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.16, 28, 160), goldMaterial);
    bangle.rotation.set(0.56, -0.26, -0.12);
    bangleGroup.add(bangle);

    const innerThread = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.018, 10, 180),
      new THREE.MeshStandardMaterial({ color: 0x9bb4a2, metalness: 0.28, roughness: 0.34, emissive: 0x27382e, emissiveIntensity: 0.2 }),
    );
    innerThread.rotation.copy(bangle.rotation);
    innerThread.scale.setScalar(0.89);
    bangleGroup.add(innerThread);

    const orbitGroup = new THREE.Group();
    world.add(orbitGroup);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xb5aa92, transparent: true, opacity: 0.24 });
    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(1.69, 0.006, 8, 180), orbitMaterial);
    orbitA.rotation.set(0.92, 0.35, 0.12);
    orbitGroup.add(orbitA);
    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(1.87, 0.005, 8, 180), new THREE.MeshBasicMaterial({ color: 0xa3b3a4, transparent: true, opacity: 0.18 }));
    orbitB.rotation.set(0.25, 1.08, -0.25);
    orbitGroup.add(orbitB);

    const center = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.28, 2),
      new THREE.MeshPhysicalMaterial({ color: 0x303b36, metalness: 0.32, roughness: 0.28, clearcoat: 0.8, emissive: 0x283329, emissiveIntensity: 0.22 }),
    );
    center.position.z = 0.08;
    world.add(center);
    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.43, 1),
      new THREE.MeshBasicMaterial({ color: 0xb4b9a5, wireframe: true, transparent: true, opacity: 0.2 }),
    );
    coreWire.position.copy(center.position);
    world.add(coreWire);

    const palette = [tealMaterial, violetMaterial, blueMaterial, roseMaterial, new THREE.MeshStandardMaterial({ color: 0xc8aa78, metalness: 0.34, roughness: 0.32, emissive: 0x423520, emissiveIntensity: 0.18 })];
    const orbitNodes = [];
    const nodeCount = 5;
    for (let index = 0; index < nodeCount; index += 1) {
      const angle = (index / nodeCount) * Math.PI * 2 - Math.PI / 2;
      const node = new THREE.Group();
      const radius = 1.72 + (index % 2) * 0.15;
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, (index % 2 ? 0.38 : -0.28));
      const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.075 + (index % 2) * 0.012, 1), palette[index]);
      node.add(gem);
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.125, 0.004, 7, 48),
        new THREE.MeshBasicMaterial({ color: palette[index].color, transparent: true, opacity: 0.52 }),
      );
      halo.rotation.x = 0.92;
      halo.rotation.y = index * 0.45;
      node.add(halo);
      node.userData.phase = index * 1.31;
      node.userData.baseY = node.position.y;
      node.userData.gem = gem;
      world.add(node);
      orbitNodes.push(node);
    }

    const starsCount = 420;
    const starPositions = new Float32Array(starsCount * 3);
    let seed = 0x5eeda11;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let index = 0; index < starsCount; index += 1) {
      const i3 = index * 3;
      starPositions[i3] = (random() - 0.5) * 5.8;
      starPositions[i3 + 1] = (random() - 0.5) * 4.2;
      starPositions[i3 + 2] = (random() - 0.5) * 2.2 - 0.75;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0xc6bda8, size: 0.012, transparent: true, opacity: 0.4, sizeAttenuation: true }));
    world.add(stars);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    canvas.addEventListener('pointermove', (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    }, { passive: true });
    canvas.addEventListener('pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; }, { passive: true });

    const resize = () => {
      const bounds = frame.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 6.25 : 5.7;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      world.rotation.y += ((reducedMotion ? 0 : time * 0.075) + pointer.x * 0.24 - world.rotation.y) * 0.035;
      world.rotation.x += (-0.12 + pointer.y * 0.18 - world.rotation.x) * 0.035;
      bangleGroup.rotation.z = reducedMotion ? -0.08 : Math.sin(time * 0.26) * 0.11 - 0.08;
      orbitGroup.rotation.z = reducedMotion ? 0.05 : time * 0.045 + 0.05;
      center.rotation.y = reducedMotion ? 0.1 : time * 0.23;
      center.rotation.x = reducedMotion ? 0.08 : Math.sin(time * 0.34) * 0.18;
      coreWire.rotation.copy(center.rotation);
      stars.rotation.y = pointer.x * 0.035;

      for (const node of orbitNodes) {
        const phase = node.userData.phase;
        node.position.y = node.userData.baseY + (reducedMotion ? 0 : Math.sin(time * 1.15 + phase) * 0.045);
        node.userData.gem.rotation.x += reducedMotion ? 0 : 0.004;
        node.userData.gem.rotation.y += reducedMotion ? 0 : 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();
  } catch (error) {
    frame.classList.add('no-webgl');
  }
}
