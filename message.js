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


// --- 2. LOVE MESSAGES ---
const romanticMessages = [
    "You are my favorite thought.\n❤️",
    "Every day with you\nis a gift.",
    "You've made my world so much brighter,\nMishra.",
    "I'm so lucky\nto have you. ✨",
    "My heart is,\nand always will be, yours.",
    "You are the reason behind\nmy smile every day. 😊",
    "In your eyes,\nI found my forever. 💫"
];


// --- 3. MAIN CLICK FUNCTION ---
function showLove() {
    const container = document.getElementById('love-animation');
    if (!container) return;

    // 🔥 Better randomness (message more frequent)
    const mystery = Math.floor(Math.random() * 3) + 1;

    // 💖 ALWAYS show message also (fix)
    showMessage();

    if (mystery === 1) {
        // Heart Rain
        for (let i = 0; i < 25; i++) {
            createFloatingElement('💖', container);
        }
    } 
    else if (mystery === 2) {
        // Petals
        for (let i = 0; i < 30; i++) {
            createFloatingElement('🌸', container);
        }
    }
    else {
        // Pulse effect
        const cta = document.querySelector('.main-cta');
        if (cta) {
            cta.style.transform = "scale(1.3)";
            setTimeout(() => {
                cta.style.transform = "scale(1)";
            }, 300);
        }
        createFloatingElement('💘', container);
    }
}


// --- 4. MESSAGE FUNCTION (FIXED) ---
function showMessage() {
    const msg = document.createElement('div');
    msg.className = 'mystery-msg';

    msg.innerText = romanticMessages[
        Math.floor(Math.random() * romanticMessages.length)
    ];

    document.body.appendChild(msg);

    // Smooth fade out
    setTimeout(() => {
        msg.style.opacity = "0";
        msg.style.transform = "translate(-50%, -50%) scale(0.8)";
    }, 2500);

    setTimeout(() => msg.remove(), 3200);
}


// --- 5. FLOATING ELEMENT ---
function createFloatingElement(emoji, container) {
    const el = document.createElement('div');
    el.innerHTML = emoji;

    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '110vh';
    el.style.fontSize = (Math.random() * 30 + 20) + 'px';
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";

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
