// ==========================================================
// STORYHUB - AUTHENTICATION MODULE
// Handles Registration, Login, Logout, Workspace Protection
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
    initializeRegister();
    initializeLogin();
    protectWorkspace();
});

// ==========================================================
// REGISTER USER
// ==========================================================
function initializeRegister() {
    const registerForm = document.getElementById('registerForm');

    if (!registerForm) return;

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword =
            document.getElementById('confirmPassword').value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check for duplicate email
        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            showToast('An account with this email already exists.', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            joinedAt: new Date().toISOString()
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        showToast('Account created successfully!');

        // Redirect to dashboard
        setTimeout(function () {
            window.location.href = 'dashboard.html';
        }, 1200);
    });
}

// ==========================================================
// LOGIN USER
// ==========================================================
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showToast('Please enter email and password.', 'error');
            return;
        }

        // Get users
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find matching user
        const user = users.find(function (u) {
            return u.email === email && u.password === password;
        });

        if (!user) {
            showToast('Invalid email or password.', 'error');
            return;
        }

        // Save logged-in user
        localStorage.setItem('currentUser', JSON.stringify(user));

        showToast('Welcome back, ' + user.name + '!');

        // Redirect to dashboard
        setTimeout(function () {
            window.location.href = 'dashboard.html';
        }, 1200);
    });
}

// ==========================================================
// PROTECT DASHBOARD
// ==========================================================
function protectWorkspace() {
    const isWorkspace = window.location.pathname.includes('dashboard.html');

    if (!isWorkspace) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        showToast('Please login to access the dashboard.', 'error');

        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1200);
    }
}

// ==========================================================
// LOGOUT
// ==========================================================
function logout() {
    localStorage.removeItem('currentUser');

    showToast('Logged out successfully.');

    setTimeout(function () {
        window.location.href = 'index.html';
    }, 1000);
}

// ==========================================================
// GET CURRENT USER
// ==========================================================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// ==========================================================
// PASSWORD VISIBILITY TOGGLE
// ==========================================================
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (!input) return;

    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}