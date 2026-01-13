// عناصر DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const passwordScreen = document.getElementById('passwordScreen');
const messageScreen = document.getElementById('messageScreen');
const enterBtn = document.getElementById('enterBtn');
const submitPasswordBtn = document.getElementById('submitPassword');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const backToWelcomeBtn = document.getElementById('backToWelcome');
const backToPasswordBtn = document.getElementById('backToPassword');
const floatingHearts = document.getElementById('floatingHearts');
const messageText = document.getElementById('messageText');
const recipientName = document.getElementById('recipientName');
const messageTitle = document.getElementById('messageTitle');

// كلمة السر الافتراضية
let correctPassword = "Shahd";

// رسائل مختلفة يمكن اختيارها عشوائياً
const messages = [
    // الرسالة المخصصة لـ "شهد"
    `مس شهد الغالية 🤍✨<br><br>
    مش عارفين نبدأ منين، لأن الكلام مهما طال مش هيكفي حقك. وجودك في حياتنا كان فرق حقيقي، مش بس كمس عربي، لكن كإنسانة قبل أي حاجة 🌸📚. علمتينا إن العربي مش حفظ وخلاص، العربي إحساس، كلمة في وقتها، ومعنى يعيش جوانا ❤️✍️<br><br>
    كنا بنستنى حصتك مش عشان الجدول، لكن عشان الراحة، الضحكة، والطاقة الحلوة اللي بتدخلي بيها الفصل 😊☀️. طريقة شرحك، صبرك علينا، وتشجيعك لينا حتى في أصعب اللحظات… حاجات مش بتتنسي 💖💪<br><br>
    بكرة امتحان عربي، ومش هنشوفك غير في ترم تاني، بس حقيقي إحنا داخلين الامتحان وإحنا حاسين إنك معانا، بكلامك، بنصايحك، وبثقتك فينا 🌷📝. لو طلعنا من السنة دي بحاجة غير المنهج، فهي حبنا للعربي وحبنا ليكي 🤍📖<br><br>
    شكرًا على كل مرة سمعتي، كل مرة شجعتي، وكل مرة خلّيتي الفصل مكان أدفى وألطف 🌈💞. ربنا يجازيكي عننا كل خير، ويخليكي دايمًا سبب فرحة ونجاح لأي طالب يقابلك 🌟🤲<br><br>
    وعد مننا… مهما كبرنا وعدّى الوقت، مس شهد هتفضل اسم جميل في ذاكرتنا ❤️✨<br><br>
    وبنتمنى نشوفك دايمًا بخير ونجاح 🌸🌸🌸<br><br>
    — طلابك اللي عمرهم ما هينسوك 💛😊`,
    
    // رسائل احتياطية (يمكن حذفها إذا أردت)
    "يا شهد، يا أجمل ما في حياتي،<br><br>أنتِ النور الذي يضيء حياتي والفرحة التي تملأ أيامي. كل لحظة معك هي كنز أحتفظ به في قلبي.<br><br>أحبك أكثر مما تستطيع الكلمات التعبير عنه.",
    
    "يا قرة عيني شهد،<br><br>أنتِ هدية الحياة لي، وأعدك بأن أحافظ على هذه الهدية الثمينة طوال عمري.<br><br>حبي لك ينمو كل يوم، وقلبي يتسع دائماً للمزيد من المشاعر تجاهك."
];

// دالة لقراءة البيانات من الرابط
function getDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
        try {
            // فك تشفير البيانات
            const decodedData = decodeURIComponent(atob(dataParam));
            const data = JSON.parse(decodedData);
            return data;
        } catch (error) {
            console.error('خطأ في قراءة البيانات:', error);
            return null;
        }
    }
    return null;
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const urlData = getDataFromURL();
    
    if (urlData) {
        // إذا وجدت بيانات في الرابط، تحديث الرسالة واسم الشخص وكلمة السر
        correctPassword = urlData.password || "Shahd";
        
        if (urlData.name) {
            recipientName.textContent = urlData.name;
        } else {
            recipientName.textContent = "شهد";
        }
        
        if (urlData.message) {
            messageText.innerHTML = urlData.message;
        } else {
            // استخدام الرسالة المخصصة لـ "شهد" (الرسالة الأولى في المصفوفة)
            messageText.innerHTML = messages[0];
        }
        
        // تحديث عنوان الصفحة
        document.title = `رسالة لـ ${urlData.name || 'شهد'}`;
    } else {
        // إذا لم توجد بيانات، استخدام إعدادات افتراضية لشهد
        // استخدام الرسالة المخصصة لـ "شهد"
        messageText.innerHTML = messages[0];
        
        // تعيين الاسم الافتراضي إلى "شهد"
        recipientName.textContent = "شهد";
        
        // تحديث عنوان الصفحة
        document.title = "رسالة لمس شهد الغالية";
    }
});

// الانتقال من شاشة الترحيب إلى شاشة كلمة السر
enterBtn.addEventListener('click', function() {
    welcomeScreen.style.display = 'none';
    passwordScreen.style.display = 'block';
    passwordInput.focus();
});

// العودة من شاشة كلمة السر إلى شاشة الترحيب
backToWelcomeBtn.addEventListener('click', function() {
    passwordScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
    passwordInput.value = '';
    errorMessage.classList.remove('show-error');
});

// العودة من شاشة الرسالة إلى شاشة كلمة السر
backToPasswordBtn.addEventListener('click', function() {
    messageScreen.style.display = 'none';
    passwordScreen.style.display = 'block';
    passwordInput.value = '';
    errorMessage.classList.remove('show-error');
    stopHeartsAnimation();
});

// التحقق من كلمة السر
submitPasswordBtn.addEventListener('click', function() {
    const userInput = passwordInput.value.trim();
    
    // تقبل كلمة السر بحالتين: "Shahd" أو "شهد" أو "مس شهد"
    if (userInput === correctPassword || userInput === "شهد" || userInput === "مس شهد" || userInput === "مس شهد الغالية") {
        // إذا كانت كلمة السر صحيحة
        passwordScreen.style.display = 'none';
        messageScreen.style.display = 'block';
        startHeartsAnimation();
        
        // إضافة أنيميشن للرسالة
        const messageContent = document.querySelector('.message-content');
        if (messageContent) {
            messageContent.classList.remove('message-animation');
            void messageContent.offsetWidth; // إعادة تدفق لإعادة التشغيل
            messageContent.classList.add('message-animation');
        }
    } else {
        // إذا كانت كلمة السر خاطئة
        errorMessage.classList.add('show-error');
        passwordInput.style.borderColor = '#d63031';
        passwordInput.style.boxShadow = '0 0 0 3px rgba(214, 48, 49, 0.2)';
        
        // إرجاع اللون الأصلي بعد ثانيتين
        setTimeout(() => {
            passwordInput.style.borderColor = '#dfe6e9';
            passwordInput.style.boxShadow = 'none';
        }, 2000);
    }
});

// السماح بإدخال كلمة السر بالضغط على Enter
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitPasswordBtn.click();
    }
});

// دالة لإنشاء قلوب متحركة في شاشة الرسالة
function startHeartsAnimation() {
    // تنظيف أي قلوب سابقة
    floatingHearts.innerHTML = '';
    
    // إنشاء 15 قلب تتحرك
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(i);
    }
}

function createFloatingHeart(index) {
    const heart = document.createElement('div');
    heart.classList.add('animated-heart');
    
    // استخدام الرموز التعبيرية للقلوب بدلاً من أيقونة Font Awesome
    const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '🤍', '💜', '🧡', '💛', '💚', '💙'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    heart.textContent = randomHeart;
    
    // حجم عشوائي للقلب
    const size = Math.random() * 25 + 20;
    heart.style.fontSize = `${size}px`;
    
    // موقع بداية عشوائي
    const startPosition = Math.random() * 100;
    heart.style.left = `${startPosition}%`;
    
    // تأخير عشوائي لبدء الحركة
    const delay = Math.random() * 5;
    
    // مدة الحركة
    const duration = Math.random() * 10 + 10;
    
    // تطبيق الأنيميشن
    heart.style.animation = `floatHearts ${duration}s linear ${delay}s infinite`;
    
    // إضافة القلب إلى الحاوية
    floatingHearts.appendChild(heart);
    
    // إزالة القلب بعد انتهاء الأنيميشن وإضافة واحد جديد
    setTimeout(() => {
        if (floatingHearts.contains(heart)) {
            heart.remove();
            createFloatingHeart(index);
        }
    }, (duration + delay) * 1000);
}

// إيقاف أنيميشن القلوب
function stopHeartsAnimation() {
    floatingHearts.innerHTML = '';
}

// إضافة تأثيرات للقلوب عند النقر على زر الدخول
enterBtn.addEventListener('click', function() {
    // إضافة تأثير اهتزاز بسيط
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// إضافة تأثير للقلب في شاشة الترحيب
function animateWelcomeHeart() {
    const heart = document.querySelector('.heart-icon');
    if (heart) {
        setInterval(() => {
            heart.style.transform = 'scale(1.1)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

// تشغيل تأثير القلب عند تحميل الصفحة
window.addEventListener('load', animateWelcomeHeart);