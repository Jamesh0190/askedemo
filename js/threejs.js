// Three.js Enhanced Background with Interactive Elements
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let isMobile = window.innerWidth < 768;

function initThreeJS() {
    // Initialize scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Adjust particle count based on device capability
    const particlesCount = isMobile ? 1000 : 2000;

    // Create enhanced particle system
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const colorPalette = [
        new THREE.Color(0x667eea),
        new THREE.Color(0x764ba2),
        new THREE.Color(0xffffff),
        new THREE.Color(0x00d4ff)
    ];

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;
        
        // Color
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Size
        sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            mouse: { value: new THREE.Vector2() }
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform vec2 mouse;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                // Mouse interaction (reduced on mobile)
                vec2 mouseInfluence = mouse * 0.05;
                mvPosition.xy += mouseInfluence * (1.0 / -mvPosition.z) * 30.0;
                
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float r = length(gl_PointCoord - vec2(0.5, 0.5));
                if (r > 0.5) discard;
                
                float alpha = 1.0 - smoothstep(0.0, 0.5, r);
                gl_FragColor = vec4(vColor, alpha * 0.8);
            }
        `,
        transparent: true,
        vertexColors: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 50;

    // Mouse interaction
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('touchmove', onTouchMove, false);

    // Start animation
    animate();
    
    // Hide loading screen when Three.js is ready
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1000);
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
}

function onTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = (event.touches[0].pageX - windowHalfX) * 0.5;
        mouseY = (event.touches[0].pageY - windowHalfY) * 0.5;
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Particle animation
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    
    // Mouse influence
    particles.material.uniforms.mouse.value.x = mouseX * 0.001;
    particles.material.uniforms.mouse.value.y = mouseY * 0.001;
    particles.material.uniforms.time.value = Date.now() * 0.001;
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Check if device type changed
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        // Reinitialize with appropriate particle count
        document.getElementById('three-container').innerHTML = '';
        initThreeJS();
    }
}

window.addEventListener('resize', onWindowResize, false);