// --- 1. HEART TRAIL (Optimized) ---
let lastTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 80) return;
    lastTime = now;

    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: ${Math.random() * 20 + 10}px;
        pointer-events: none;
        z-index: 9999;
        transition: all 1s ease-out;
    `;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translateY(-80px) rotate(${Math.random() * 360}deg) scale(0)`;
        heart.style.opacity = '0';
    }, 50);
    setTimeout(() => heart.remove(), 1000);
});

// --- 2. THE MYSTERY CLICK LOGIC ---
const romanticMessages = [
    "You are my favorite thought. ❤️",
    "Every day with you is a gift.",
    "You've made my world so much brighter, Mishra.",
    "I'm so lucky to have you. ✨",
    "My heart is, and always will be, yours.",
    "You are the reason behind my smile every day. 😊",
    "In your eyes, I found my forever. 💫"
];

function showLove() {
    // Pick a random mystery number 1-4
    const mystery = Math.floor(Math.random() * 4) + 1;
    const container = document.getElementById('love-animation');
if (!container) return;
    
    if (mystery === 1) {
        // EFFECT: Heart Rain
        for (let i = 0; i < 30; i++) {
            createFloatingElement('💖', container);
        }
    } 
    else if (mystery === 2) {
        // EFFECT: Floating Message
        const msg = document.createElement('div');
        msg.className = 'mystery-msg';
        msg.innerText = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    } 
    else if (mystery === 3) {
        // EFFECT: Screen Flash & Petals
        document.body.style.filter = "brightness(1.2)";
        setTimeout(() => document.body.style.filter = "brightness(1)", 200);
        for (let i = 0; i < 40; i++) {
            createFloatingElement('🌸', container);
        }
    }
    else {
        // EFFECT: Zoom & Pulse
        const cta = document.querySelector('.main-cta');
       cta.style.transform = "scale(2)";
        cta.style.opacity = "0";
        setTimeout(() => {
            cta.style.transform = "scale(1)";
            cta.style.opacity = "1";
            createFloatingElement('💘', container);
        }, 500);
    }
}

function createFloatingElement(emoji, container) {
    const el = document.createElement('div');
    el.innerHTML = emoji;
    el.className = 'floating-mystery';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '110vh';
    el.style.fontSize = (Math.random() * 30 + 20) + 'px';
    container.appendChild(el);

    const duration = Math.random() * 3 + 2;
    el.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-120vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'ease-out'
    });

    setTimeout(() => el.remove(), duration * 1000);
}