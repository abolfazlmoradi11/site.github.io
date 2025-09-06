// حالت شب/روز
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeIcon.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// پارالاکس پس‌زمینه
const layers = document.querySelectorAll('.parallax-layer');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    layers.forEach((layer, i) => {
        const move = (i + 1) * 20;
        layer.style.transform = `translate(${(x - 0.5) * move}px, ${(y - 0.5) * move}px)`;
    });
});

// نمایش/مخفی کردن رمز عبور
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
togglePassword.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
});

// نمایش قدرت رمز عبور
const passwordStrength = document.getElementById('passwordStrength');
passwordInput.addEventListener('input', function() {
    const val = passwordInput.value;
    let strength = '';
    let cls = '';
    if (!val) {
        passwordStrength.textContent = '';
        passwordStrength.className = 'password-strength';
        return;
    }
    if (val.length < 5) {
        strength = 'ضعیف'; cls = 'weak';
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.length >= 8) {
        strength = 'قوی'; cls = 'strong';
    } else {
        strength = 'متوسط'; cls = 'medium';
    }
    passwordStrength.textContent = `قدرت رمز: ${strength}`;
    passwordStrength.className = `password-strength ${cls}`;
});

// لیبل شناور
const floatLabels = document.querySelectorAll('.form-group input');
floatLabels.forEach(input => {
    input.addEventListener('focus', function() {
        this.previousElementSibling.classList.add('active');
    });
    input.addEventListener('blur', function() {
        if (!this.value) this.previousElementSibling.classList.remove('active');
    });
});

// لودر و پیام خوش‌آمدگویی
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loader = document.getElementById('loader');
const btnText = document.querySelector('.btn-text');
const welcomeMessage = document.getElementById('welcomeMessage');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = passwordInput.value.trim();
    errorMessage.textContent = '';
    if (!username || !password) {
        errorMessage.textContent = 'لطفاً همه فیلدها را پر کنید.';
        return;
    }
    if (password.length < 5) {
        errorMessage.textContent = 'رمز عبور باید حداقل ۵ کاراکتر باشد.';
        return;
    }
    // نمایش لودر
    loginForm.querySelector('.login-btn').classList.add('loading');
    loader.style.display = 'inline-block';
    btnText.textContent = 'در حال ورود...';
    setTimeout(() => {
        loginForm.querySelector('.login-btn').classList.remove('loading');
        loader.style.display = 'none';
        btnText.textContent = 'ورود';
        loginForm.style.display = 'none';
        welcomeMessage.style.display = 'block';
        welcomeMessage.textContent = `خوش آمدی ${username}! ورود موفقیت‌آمیز بود.`;
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            loginForm.style.display = 'block';
            loginForm.reset();
            passwordStrength.textContent = '';
        }, 3500);
    }, 1800);
});

// دکمه‌های شبکه اجتماعی (دمو)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        errorMessage.textContent = `ورود با ${this.title} (دمو)`;
    });
});

// دکمه فراموشی رمز و ثبت‌نام (دمو)
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    errorMessage.textContent = 'لینک بازیابی رمز عبور به ایمیل شما ارسال خواهد شد (دمو).';
});
document.getElementById('register').addEventListener('click', function(e) {
    e.preventDefault();
    errorMessage.textContent = 'امکان ثبت‌نام به‌زودی فعال می‌شود (دمو).';
});
