// neon-smoke.js
// Blue neon smoke effect that follows the mouse

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let particles = [];

function createParticle(x, y) {
    particles.push({
        x: x,
        y: y,
        alpha: 1,
        size: Math.random() * 20 + 10,
        speedX: (Math.random() - 0.5) * 1,
        speedY: -Math.random() * 2 - 1
    });
}

document.addEventListener('mousemove', e => {
    for(let i = 0; i < 3; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(0, 200, 255, ' + p.alpha + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.01;
    }

    particles = particles.filter(p => p.alpha > 0);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
