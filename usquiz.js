let gameData = {};
let currentSection = '';
let tempSelectedSection = ''; 
let currentCategory = '';
let tempSelectedCategory = ''; 
let currentQuestionIdx = 0;
let score = 0;
let selectedIdx = null;
let isAnswered = false; // Naya variable: tracks if current question is submitted

// JSON Load karna
fetch('mcq.json')
    .then(res => res.json())
    .then(data => {
        gameData = data;
    })
    .catch(err => console.error("Error loading JSON:", err));

function showScreen(id) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        s.classList.remove('active');
        setTimeout(() => { 
            if(!s.classList.contains('active')) s.style.display = 'none'; 
        }, 400);
    });

    const el = document.getElementById(id);
    el.style.display = 'flex';
    setTimeout(() => el.classList.add('active'), 50);
}

// Section selection
function selectSection(sec, element) {
    tempSelectedSection = sec;
    document.querySelectorAll('.section-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
}

function goToCategory() {
    if (!tempSelectedSection) { alert("Please select an option first!"); return; }
    currentSection = tempSelectedSection;
    renderCategories();
    showScreen('category-select');
}

function renderCategories() {
    const grid = document.getElementById('catGrid');
    const cats = gameData.sections[currentSection].categories;
    tempSelectedCategory = ''; 
    grid.innerHTML = cats.map(c => `
        <div class="category-item" id="cat-${c.id}" onclick="selectCategory('${c.id}')">
            <span>${c.name}</span>
        </div>
    `).join('');
}

function selectCategory(id) {
    tempSelectedCategory = id;
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('selected'));
    document.getElementById(`cat-${id}`).classList.add('selected');
}

function confirmCategory() {
    if (!tempSelectedCategory) { alert("Please select a category first!"); return; }
    startQuiz(tempSelectedCategory);
}

function startQuiz(id) {
    currentCategory = id;
    currentQuestionIdx = 0;
    score = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

// --- YAHAN SE CHANGES HAIN ---

function loadQuestion() {
    isAnswered = false; // Reset for new question
    const questions = gameData.sections[currentSection].questions[currentCategory];
    const q = questions[currentQuestionIdx];

    document.getElementById('questionText').innerText = q.q;
    document.getElementById('questionCount').innerText = `Question ${currentQuestionIdx + 1} / ${questions.length}`;
    document.getElementById('nextBtn').innerText = "Submit"; // Reset button text
    
    const progress = (currentQuestionIdx / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + "%";

    document.getElementById('optionsContainer').innerHTML = q.options.map((o, i) => `
        <div class="option" onclick="selectOption(this, ${i})">${o}</div>
    `).join('');
    
    selectedIdx = null; 
}

function selectOption(el, i) {
    if (isAnswered) return; // Answer dene ke baad selection lock
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedIdx = i;
}

document.getElementById('nextBtn').onclick = () => {
    const questions = gameData.sections[currentSection].questions[currentCategory];
    const correctIdx = questions[currentQuestionIdx].correct;

    // Phase 1: Answer Check Karna
    if (!isAnswered) {
        if (selectedIdx === null) {
            alert("Please select an answer!");
            return;
        }

        isAnswered = true;
        const options = document.querySelectorAll('.option');

        if (selectedIdx === correctIdx) {
            // Sahi jawab: Green
            options[selectedIdx].classList.add('correct-anim');
            score++;
        } else {
            // Galat jawab: Red and show correct as Green
            options[selectedIdx].classList.add('wrong-anim');
            options[correctIdx].classList.add('correct-anim');
        }

        // Button text update
        if (currentQuestionIdx + 1 >= questions.length) {
            document.getElementById('nextBtn').innerText = "Show Results";
        } else {
            document.getElementById('nextBtn').innerText = "Next Question";
        }
        return;
    }

    // Phase 2: Agle sawal pe jana
    currentQuestionIdx++;
    if (currentQuestionIdx >= questions.length) {
        document.getElementById('progressBar').style.width = "100%";
        setTimeout(showResult, 500);
    } else {
        loadQuestion();
    }
};

function showResult() {
    showScreen('result-screen');
    
    const questions = gameData.sections[currentSection].questions[currentCategory];
    const totalQuestions = questions.length;
    const accuracy = Math.round((score / totalQuestions) * 100);
    
    // Score update
    document.getElementById('finalScore').innerText = score;
    document.getElementById('totalPossible').innerText = `/ ${totalQuestions}`;

    // Random Quotes Array
  const quotes = [
    "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every single day.",
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    "Every love story is beautiful, but ours is my favorite.",
    "To the world, you may be one person, but to one person you are the world.",
    "Distance means so little when someone means so much.",
    "You are my today and all of my tomorrows.",

    "There are moments when I look at you and realize that somehow, in this huge and unpredictable world, I found someone who understands my silence, my chaos, and my heart all at once. And that feeling… it’s something I’ll never take for granted.",

    "I don’t just love you for who you are, I love you for how you make me feel about myself. You make me feel stronger, calmer, happier — like I’m finally becoming the person I was meant to be.",

    "If love had a shape, it would look like all the little things you do for me — the way you listen, the way you care, the way you stay. Because real love isn’t loud, it’s consistent, and you prove that every day.",

    "I never knew that someone could become such an important part of my life so quickly. But with you, it didn’t feel rushed — it felt right, like everything was falling into place exactly how it was supposed to.",

    "When I say I love you, I don’t mean it lightly. I mean I think about you more than I should, I care about you more than I expected, and I need you more than I ever thought I would.",

    "Even if we don’t talk for hours, even if we’re miles apart, there’s this invisible connection between us that never fades. And that’s how I know what we have is real.",

    "I want to be the reason you smile on your bad days, the reason you feel safe when everything feels uncertain, and the reason you never feel alone, no matter what happens.",

    "You didn’t just steal my heart — you made it better. You gave it purpose, warmth, and a reason to believe that love can actually be something beautiful and lasting.",

    "There’s something about you that I can’t fully explain. It’s not just your smile or your voice, it’s the way you exist in my life that makes everything feel a little more meaningful.",

    "I don’t know what the future holds, but I know one thing for sure — I want you in it. Not just for now, not just for the easy days, but for all the days that come after.",

    "Sometimes I catch myself smiling for no reason, and then I realize I was thinking about you. That’s when I know how deeply you’ve become a part of me.",

    "You are the calm in my storm, the light in my darkness, and the hope I didn’t even know I was searching for. And I will always be grateful for that.",

    "If I could give you one thing in life, it would be the ability to see yourself through my eyes. Then you’d understand just how special, how rare, and how deeply loved you truly are.",

    "I don’t just want to love you when it’s easy. I want to love you when it’s hard, when we’re tired, when we don’t understand each other — because that’s what makes love real.",

    "Out of all the people in this world, my heart chose you. And even if I had a thousand chances to choose again, it would still be you every single time.",

    "You are not just someone I think about. You are someone I worry about, care about, dream about, and want to build a future with. That’s how serious my love for you is.",

    "With you, I don’t have to pretend. I don’t have to hide my flaws or act perfect. And that’s what makes this love so different — it’s real, raw, and honest.",

    "I may not say it every second, but every little thing I do carries a piece of my love for you. It’s in the way I check on you, the way I listen, the way I stay.",

    "If life ever gets confusing or difficult, just remember this — no matter what changes around us, my love for you will always remain constant.",

    "You walked into my life like a simple moment, but you became my forever. And that’s something I will cherish for as long as I exist."
];
    // Pick random quote
    const randomIdx = Math.floor(Math.random() * quotes.length);
    document.getElementById('randomQuote').innerText = `"${quotes[randomIdx]}"`;

    // Dynamic Feedback
    let feedback = accuracy === 100 ? "You're a Soulmate! ❤️" : 
                   accuracy >= 70  ? "You know me so well! ✨" : 
                   "Let's make more memories! 😉";
    document.getElementById('result-feedback').innerText = feedback;

    // Circle Animation
    const circle = document.getElementById('scoreCircle');
    if (circle) {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference - (accuracy / 100) * circumference;
    }
}