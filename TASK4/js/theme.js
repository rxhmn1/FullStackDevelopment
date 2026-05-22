// ==========================================================
// STORYHUB - THEME TOGGLE
// Dark / Light Mode with Local Storage
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeThemeToggle();
});

// ==========================================================
// INITIALIZE THEME
// ==========================================================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    updateThemeIcon();
}

// ==========================================================
// THEME TOGGLE BUTTON
// ==========================================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) return;

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');

        const currentTheme = document.body.classList.contains('light-theme')
            ? 'light'
            : 'dark';

        localStorage.setItem('theme', currentTheme);

        updateThemeIcon();
    });
}

// ==========================================================
// UPDATE THEME ICON
// ==========================================================
function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    if (!icon) return;

    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to Dark Mode';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to Light Mode';
    }
}