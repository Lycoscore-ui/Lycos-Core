window.initMesh = function() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get color variables from CSS variables or fallbacks
    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--accent').trim() || '#a3ff33';
    const textSecColor = style.getPropertyValue('--text-secondary').trim() || '#8a9df8';

    // Particle-based 3D sphere settings (scaled down to 800 for high performance)
    const particleCount = 800;
    const particles = [];
    const connections = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle in radians

    // Initialize 3D Sphere Particles (Dual Layer: Outer mesh shell + inner core)
    const outerCount = Math.floor(particleCount * 0.7);
    const innerCount = particleCount - outerCount;

    // Outer Sphere Shell (560 particles)
    for (let i = 0; i < outerCount; i++) {
        const y = 1 - (i / (outerCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Radius with volumetric thickness (radius between 90 and 106)
        const r = 98 + (Math.random() - 0.5) * 16;

        particles.push({
            lx: x * r,
            ly: y * r,
            lz: z * r,
            x: 0, y: 0, z: 0,
            px: 0, py: 0,
            size: 0.65 + Math.random() * 0.85,
            alpha: 0.35 + Math.random() * 0.45,
            seed: Math.random() * 100,
            speed: 0.55 + Math.random() * 0.4,
            isOuter: true
        });
    }

    // Inner Core Sphere (240 particles, smaller, denser, and brighter)
    for (let i = 0; i < innerCount; i++) {
        const y = 1 - (i / (innerCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Core radius between 52 and 62
        const r = 57 + (Math.random() - 0.5) * 10;

        particles.push({
            lx: x * r,
            ly: y * r,
            lz: z * r,
            x: 0, y: 0, z: 0,
            px: 0, py: 0,
            size: 0.85 + Math.random() * 1.0,
            alpha: 0.5 + Math.random() * 0.4,
            seed: Math.random() * 100,
            speed: -(0.75 + Math.random() * 0.45), // rotate opposite direction
            isOuter: false
        });
    }

    // Pre-calculate 3D wireframe connections in local space (only connect within same layer)
    // Distances are scaled up slightly since the density of 800 particles is lower
    const maxOuterDist = 24;
    const maxInnerDist = 18;

    for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        const neighbors = [];
        const maxD = p1.isOuter ? maxOuterDist : maxInnerDist;

        for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            if (p1.isOuter !== p2.isOuter) continue;

            const dx = p1.lx - p2.lx;
            const dy = p1.ly - p2.ly;
            const dz = p1.lz - p2.lz;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < maxD) {
                neighbors.push({ index: j, dist: dist });
            }
        }

        // Sort by distance and limit connections to prevent visual clutter
        neighbors.sort((a, b) => a.dist - b.dist);
        const numConn = Math.min(p1.isOuter ? 2 : 1, neighbors.length);
        for (let k = 0; k < numConn; k++) {
            connections.push({
                i1: i,
                i2: neighbors[k].index
            });
        }
    }

    // Setup interactive mouse-tracking tilt
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        targetRotationY = ((mouseX / canvas.width) - 0.5) * 1.0;  // horizontal tilt
        targetRotationX = -((mouseY / canvas.height) - 0.5) * 1.0; // vertical tilt
    }

    function handleMouseLeave() {
        targetRotationX = 0;
        targetRotationY = 0;
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Setup background plexus nodes
    const nodeCount = 15;
    const nodes = [];
    const ai = { x: 250, y: 250 };

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * 500,
            y: Math.random() * 500,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }

    let animationId;
    function render() {
        ctx.clearRect(0, 0, 500, 500);

        // 1. Draw and update background plexus (normal composite)
        ctx.globalAlpha = 1.0;
        nodes.forEach((n, i) => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > 500) n.vx *= -1;
            if (n.y < 0 || n.y > 500) n.vy *= -1;

            // Lines to the next two nodes
            for (let j = i + 1; j < i + 3; j++) {
                const target = nodes[j % nodeCount];
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = accentColor;
                ctx.globalAlpha = 0.12;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Line to center AI node if close
            const distToAi = Math.hypot(n.x - ai.x, n.y - ai.y);
            if (distToAi < 150) {
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(ai.x, ai.y);
                ctx.strokeStyle = accentColor;
                ctx.globalAlpha = (1 - distToAi / 150) * 0.18;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        });

        // Draw background plexus nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = textSecColor;
            ctx.fill();
        });

        // 2. Update and transform 3D sphere particles
        const time = Date.now() * 0.00045; // rotation speed factor
        const waveTime = Date.now() * 0.0018; // organic waving frequency

        // Smoothly interpolate rotation tilt from mouse input
        rotationX += (targetRotationX - rotationX) * 0.06;
        rotationY += (targetRotationY - rotationY) * 0.06;

        particles.forEach(p => {
            // Apply different rotation parameters for outer vs inner sphere
            let aY, aX, aZ;
            if (p.isOuter) {
                aY = time * 0.5 + rotationY;
                aX = time * 0.25 + rotationX;
                aZ = time * 0.12;
            } else {
                aY = -time * 0.8 - rotationY * 0.8;
                aX = -time * 0.4 - rotationX * 0.8;
                aZ = -time * 0.16;
            }

            const cosY = Math.cos(aY), sinY = Math.sin(aY);
            const cosX = Math.cos(aX), sinX = Math.sin(aX);
            const cosZ = Math.cos(aZ), sinZ = Math.sin(aZ);

            // Apply fluid wave/turbulence to simulate energy flow
            const waveFreq = p.isOuter ? 0.038 : 0.055;
            const waveAmp = p.isOuter ? 6.0 : 4.0;
            const wave = Math.sin(p.lx * waveFreq + waveTime * p.speed) *
                         Math.cos(p.ly * waveFreq + waveTime * p.speed) * waveAmp;

            const length = Math.sqrt(p.lx*p.lx + p.ly*p.ly + p.lz*p.lz);
            const nx = p.lx / length;
            const ny = p.ly / length;
            const nz = p.lz / length;

            const wlx = p.lx + nx * wave;
            const wly = p.ly + ny * wave;
            const wlz = p.lz + nz * wave;

            // 3D Rotations
            // Rotation Y
            let x1 = wlx * cosY - wlz * sinY;
            let z1 = wlx * sinY + wlz * cosY;

            // Rotation X
            let y2 = wly * cosX - z1 * sinX;
            let z2 = wly * sinX + z1 * cosX;

            // Rotation Z
            let x3 = x1 * cosZ - y2 * sinZ;
            let y3 = x1 * sinZ + y2 * cosZ;

            p.x = x3;
            p.y = y3;
            p.z = z2; // depth coordinate (z is positive towards back)

            // Perspective Projection onto 2D canvas
            const cameraDist = 320;
            const scale = cameraDist / (cameraDist + p.z);

            p.px = ai.x + p.x * scale;
            p.py = ai.y + p.y * scale;

            // Depth Cueing (particles at front are larger and brighter, fade at back)
            const maxDepth = p.isOuter ? 114 : 67;
            const depthNorm = (p.z + maxDepth) / (maxDepth * 2); // 0 (front) to 1 (back)

            p.projSize = p.size * (1.35 - depthNorm * 0.75) * scale;
            p.projAlpha = p.alpha * (1.15 - depthNorm * 0.88) * (0.45 + 0.55 * scale);
            if (p.projAlpha < 0) p.projAlpha = 0;
        });

        // 3. Render 3D sphere with additive blending (screen/lighter) for glowing effect
        // NOTE: Shadow blur is removed here to optimize performance and prevent CPU bottlenecks.
        ctx.globalCompositeOperation = 'lighter';

        // Draw 3D wireframe connections
        connections.forEach(c => {
            const p1 = particles[c.i1];
            const p2 = particles[c.i2];

            const avgZ = (p1.z + p2.z) / 2;
            const maxDepth = p1.isOuter ? 114 : 67;
            const depthNorm = (avgZ + maxDepth) / (maxDepth * 2);

            let alpha = (p1.isOuter ? 0.08 : 0.15) * (1.1 - depthNorm * 0.95);
            if (alpha < 0.005) return;

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = (p1.isOuter ? 0.45 : 0.6) * (1.15 - depthNorm * 0.8);
            ctx.stroke();
        });

        // Draw sorted particles back-to-front for proper depth layering
        const sortedParticles = [...particles].sort((a, b) => b.z - a.z);
        sortedParticles.forEach(p => {
            if (p.projAlpha < 0.005) return;

            ctx.beginPath();
            ctx.arc(p.px, p.py, p.projSize, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = p.projAlpha;
            ctx.fill();
        });

        // Reset canvas context states
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;

        animationId = requestAnimationFrame(render);
    }
    render();

    // Clean up event listeners and cancel requestAnimationFrame loop on destroy
    return function() {
        cancelAnimationFrame(animationId);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
};

// Auto-run script when document is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (!window.meshCleanup) {
        window.meshCleanup = window.initMesh();
    }
} else {
    window.addEventListener('load', function() {
        if (!window.meshCleanup) {
            window.meshCleanup = window.initMesh();
        }
    });
}
