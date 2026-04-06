/* ================= ELEMENT SELECTION ================= */
const heart = document.getElementById('heart');
const bpmEl = document.getElementById('bpm');
const loveEl = document.getElementById('loveValue');
const circle = document.getElementById('loveCircle');
const statusEl = document.getElementById('status');
const messages = [
  "I love you 💖",
  "You are my heartbeat 💓",
  "Forever yours 💞",
  "Miss you 💗",
  "My everything ✨",
  "You + Me = ❤️",
  "Stay with me 💫"
];

/* ================= INITIAL VALUES ================= */
let bpm = 74;
let love = 60;
let interval = null;
let relaxing = null;

/* ================= UPDATE CIRCLE PROGRESS ================= */
function updateCircle(){
  const circumference = 213;
  const visualLove = Math.min(love, 100);
  const offset = circumference - (visualLove / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

/* ================= GET CLICK / TOUCH POSITION ================= */
function getTouchPos(e){
  if(e.touches && e.touches.length > 0){
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }

  return {
    x: e.clientX || window.innerWidth / 2,
    y: e.clientY || window.innerHeight / 2
  };
}

/* ================= START PUMP ================= */
function startPump(e){

  if(interval) return;

  clearInterval(relaxing);

  heart.style.animation = 'heartbeat 0.4s infinite';

  statusEl.innerText = "Intense ❤️"; // ✅ ADDED

  interval = setInterval(()=>{

    bpm = Math.min(180, bpm + 2);
    love += 1;

    bpmEl.innerText = bpm;
    loveEl.innerText = Math.floor(love) + '%';

    updateCircle();

    if(love > 100){
      heart.style.filter = 'drop-shadow(0 0 30px #ff4d9d)';
    }

    const pos = getTouchPos(e);

   const msg = messages[Math.floor(Math.random() * messages.length)];

const text = document.createElement('span');
text.className = 'love-popup';
text.innerText = msg;

text.style.position = 'fixed';
text.style.left = pos.x + 'px';
text.style.top = pos.y + 'px';
text.style.pointerEvents = 'none';

document.body.appendChild(text);

setTimeout(() => text.remove(), 1600);

  },120);
}

/* ================= STOP PUMP ================= */
function stopPump(){

  clearInterval(interval);
  interval = null;

  heart.style.animation = 'heartbeat 2s infinite';

  relaxing = setInterval(()=>{

    if(bpm > 74) bpm--;
    if(love > 60) love--;

    bpmEl.innerText = bpm;
    loveEl.innerText = Math.floor(love) + '%';

    updateCircle();

    if(love <= 100){
      heart.style.filter = 'none';
    }

    /* ✅ SYNC STATUS LOGIC ADDED */
    if(love > 120){
      statusEl.innerText = "Overloaded 💖";
    }
    else if(love > 80){
      statusEl.innerText = "Passionate 🔥";
    }
    else{
      statusEl.innerText = "Harmonious 💗";
    }

    if(bpm === 74 && love === 60){
      clearInterval(relaxing);
    }

  },50);
}

/* ================= EVENT LISTENERS ================= */
heart.addEventListener('mousedown', startPump);
heart.addEventListener('mouseup', stopPump);
heart.addEventListener('mouseleave', stopPump);

heart.addEventListener('touchstart', startPump);
heart.addEventListener('touchend', stopPump);