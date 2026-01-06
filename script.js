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
let correctPassword = "حبيبتي";

// رسائل مختلفة يمكن اختيارها عشوائياً
const messages = [
    "حبيبتي الغالية،<br><br>كلماتي تقف عاجزة عن وصف ما بداخلي من مشاعر تجاهك. أنت النور الذي يضيء حياتي، والفرحة التي تملأ أيامي. كل لحظة أقضيها معك هي كنز ثمين أحتفظ به في قلبي.<br><br>شكراً لأنك دوماً بجانبي، شكراً لأنك تجعلينني شخصاً أفضل، شكراً لأنك أنت.<br><br>أحبك أكثر مما تستطيع الكلمات التعبير عنه، وأتمنى أن نبقى معاً إلى الأبد.",
    
    "يا قرة عيني،<br><br>لا أعرف كيف أشكر القدر الذي جمعني بك. معك تعلمت معنى الحب الحقيقي، ومعك عرفت أن السعادة ممكنة. أنت هدية الحياة لي، وأعدك بأن أحافظ على هذه الهدية الثمينة طوال عمري.<br><br>حبي لك ينمو كل يوم، وكلما ظننت أنني وصلت إلى أقصى درجات الحب، أجد أن قلبي يتسع للمزيد من المشاعر تجاهك.",
    
    "يا حبيبتي،<br><br>أنت أجمل ما في حياتي، وأنت السبب في ابتسامتي وفرحي. عندما أراك، يختفي كل همي وتتفتح أزهار السعادة في قلبي.<br><br>أتمنى أن أكون عند حسن ظنك بي، وأن أمنحك كل السعادة التي تستحقينها. لأنك تستحقين كل شيء جميل في هذا العالم وأكثر.",
    
    "إلى من سكن قلبي،<br><br>لا يوجد شيء في الدنيا يعادل قيمة وجودك في حياتي. أنت النعمة التي لا أستطيع العيش بدونها، والنور الذي يهديني في الظلام.<br><br>أعدك بأن أظل بجانبك في السراء والضراء، وأن أحبك أكثر كل يوم، حتى يصبح حبنا قصة يرويها الأحفاد."
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
        correctPassword = urlData.password;
        
        if (urlData.name) {
            recipientName.textContent = urlData.name;
        }
        
        if (urlData.message) {
            messageText.innerHTML = urlData.message;
        }
        
        // تحديث عنوان الصفحة
        document.title = `رسالة لـ ${urlData.name || 'حبيبتي'}`;
    } else {
        // إذا لم توجد بيانات، استخدم رسالة عشوائية
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageText.innerHTML = messages[randomIndex];
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
    
    if (userInput === correctPassword) {
        // إذا كانت كلمة السر صحيحة
        passwordScreen.style.display = 'none';
        messageScreen.style.display = 'block';
        startHeartsAnimation();
        
        // إضافة أنيميشن للرسالة
        const messageContent = document.querySelector('.message-content');
        messageContent.classList.remove('message-animation');
        void messageContent.offsetWidth; // إعادة تدفق لإعادة التشغيل
        messageContent.classList.add('message-animation');
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
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // حجم عشوائي للقلب
    const size = Math.random() * 20 + 15;
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