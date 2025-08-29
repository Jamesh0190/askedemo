// Three.js Enhanced Background with Interactive Elements
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let isMobile = window.innerWidth < 768;

function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        setTimeout(initThreeJS, 100);
        return;
    }
    
    try {
        // Initialize scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Create renderer with proper settings
        renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        const container = document.getElementById('three-container');
        if (container) {
            // Clear any existing canvas
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(renderer.domElement);
        } else {
            console.error('Three.js container not found');
            return;
        }

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
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 2000;
            
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

        // Create shader material for particles
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0, 0) }
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
                    
                    // Add subtle movement
                    mvPosition.x += sin(time + position.x) * 0.5;
                    mvPosition.y += cos(time + position.y) * 0.5;
                    
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
                    // Create circular points
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    if(length(coord) > 0.5) discard;
                    
                    // Add glow effect
                    float alpha = 1.0 - smoothstep(0.0, 0.5, length(coord));
                    gl_FragColor = vec4(vColor, alpha * 0.6);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 100;

        // Mouse interaction
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('touchmove', onTouchMove, { passive: false });

        // Start animation
        animate();
        
        // Hide loading screen when Three.js is ready
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1000);
    } catch (error) {
        console.error('Error initializing Three.js:', error);
    }
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function onTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = (event.touches[0].pageX - windowHalfX);
        mouseY = (event.touches[0].pageY - windowHalfY);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles && particles.material) {
        // Particle animation
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
        
        // Update time uniform for shader animation
        particles.material.uniforms.time.value = performance.now() * 0.001;
        
        // Mouse influence
        particles.material.uniforms.mouse.value.x = (mouseX / window.innerWidth) * 2;
        particles.material.uniforms.mouse.value.y = -(mouseY / window.innerHeight) * 2;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Handle window resize
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    
    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Check if device type changed
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        // Reinitialize with appropriate particle count
        initThreeJS();
    }
}

// Initialize Three.js when the window loads
window.addEventListener('load', function() {
    // Check if Three.js is already loaded
    if (typeof THREE !== 'undefined') {
        initThreeJS();
    } else {
        // If not loaded yet, wait for it
        const checkThreeJS = setInterval(function() {
            if (typeof THREE !== 'undefined') {
                clearInterval(checkThreeJS);
                initThreeJS();
            }
        }, 100);
    }
    
    window.addEventListener('resize', onWindowResize, false);
});

// Fallback in case Three.js fails to load
setTimeout(function() {
    const threeContainer = document.getElementById('three-container');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (threeContainer && !threeContainer.hasChildNodes()) {
        console.warn('Three.js failed to load, applying CSS fallback');
        threeContainer.style.background = 'radial-gradient(circle at center, #667eea 0%, #764ba2 100%)';
        
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
}, 5000);