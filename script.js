// عناصر DOM
const welcomeScreen = document.querySelector('.welcome-screen');
const passwordScreen = document.querySelector('.password-screen');
const messageScreen = document.querySelector('.message-screen');
const enterBtn = document.getElementById('enterBtn');
const submitPasswordBtn = document.getElementById('submitPassword');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const backToWelcomeBtn = document.getElementById('backToWelcome');
const backToPasswordBtn = document.getElementById('backToPassword');
const floatingHearts = document.getElementById('floatingHearts');
const messageText = document.getElementById('messageText');
const recipientName = document.getElementById('recipientName');

// كلمة السر
let correctPassword = "Shahd";

// الرسالة الخاصة
const messages = [
    `مس شهد الغالية 🤍✨<br><br>
    مش عارفين نبدأ منين، لأن الكلام مهما طال مش هيكفي حقك. وجودك في حياتنا كان فرق حقيقي، مش بس كمس عربي، لكن كإنسانة قبل أي حاجة 🌸📚. علمتينا إن العربي مش حفظ وخلاص، العربي إحساس، كلمة في وقتها، ومعنى يعيش جوانا ❤️✍️<br><br>
    كنا بنستنى حصتك مش عشان الجدول، لكن عشان الراحة، الضحكة، والطاقة الحلوة اللي بتدخلي بيها الفصل 😊☀️. طريقة شرحك، صبرك علينا، وتشجيعك لينا حتى في أصعب اللحظات… حاجات مش بتتنسي 💖💪<br><br>
    بكرة امتحان عربي، ومش هنشوفك غير في ترم تاني، بس حقيقي إحنا داخلين الامتحان وإحنا حاسين إنك معانا، بكلامك، بنصايحك، وبثقتك فينا 🌷📝. لو طلعنا من السنة دي بحاجة غير المنهج، فهي حبنا للعربي وحبنا ليكي 🤍📖<br><br>
    شكرًا على كل مرة سمعتي، كل مرة شجعتي، وكل مرة خلّيتي الفصل مكان أدفى وألطف 🌈💞. ربنا يجازيكي عننا كل خير، ويخليكي دايمًا سبب فرحة ونجاح لأي طالب يقابلك 🌟🤲<br><br>
    وعد مننا… مهما كبرنا وعدّى الوقت، مس شهد هتفضل اسم جميل في ذاكرتنا ❤️✨<br><br>
    وبنتمنى نشوفك دايمًا بخير ونجاح 🌸🌸🌸<br><br>
    — طلابك اللي عمرهم ما هينسوك 💛😊`
];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    messageText.innerHTML = messages[0];
    recipientName.textContent = "مس شهد";
    document.title = "رسالة خاصة";
});

// أحداث الأزرار
enterBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    passwordScreen.style.display = 'block';
    passwordInput.focus();
});

backToWelcomeBtn.addEventListener('click', () => {
    passwordScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
    passwordInput.value = '';
    errorMessage.classList.remove('show-error');
});

backToPasswordBtn.addEventListener('click', () => {
    messageScreen.style.display = 'none';
    passwordScreen.style.display = 'block';
    passwordInput.value = '';
    errorMessage.classList.remove('show-error');
    floatingHearts.innerHTML = '';
});

// التحقق من كلمة السر
submitPasswordBtn.addEventListener('click', () => {
    const userInput = passwordInput.value.trim();
    
    if (userInput === correctPassword || userInput === "شهد" || userInput === "مس شهد") {
        passwordScreen.style.display = 'none';
        messageScreen.style.display = 'block';
        startHearts();
    } else {
        errorMessage.classList.add('show-error');
        passwordInput.style.borderColor = '#d63031';
        setTimeout(() => {
            passwordInput.style.borderColor = '#dfe6e9';
        }, 2000);
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitPasswordBtn.click();
});

// قلوب متحركة
function startHearts() {
    floatingHearts.innerHTML = '';
    for (let i = 0; i < 12; i++) createHeart(i);
}

function createHeart(index) {
    const heart = document.createElement('div');
    heart.classList.add('animated-heart');
    heart.innerHTML = '❤️';
    heart.style.fontSize = `${Math.random() * 25 + 20}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.color = ['#e84393', '#fd79a8', '#ff7675'][Math.floor(Math.random() * 3)];
    heart.style.animation = `floatHearts ${Math.random() * 10 + 10}s linear ${Math.random() * 5}s infinite`;
    floatingHearts.appendChild(heart);
}