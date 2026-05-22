/* ==========================================================
   FOCUSTRACK - AUTHENTICATION WITH LOCAL STORAGE
   Features:
   - Register new users
   - Store users in Local Storage
   - Validate login credentials
   - Redirect on successful login
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    /* ======================================================
       REGISTER PAGE LOGIC
    ====================================================== */
    if (currentPage === 'register.html') {
        const registerForm = document.querySelector('.auth-form');

        if (registerForm) {
            registerForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const name = this.querySelector(
                    'input[name="name"]'
                ).value.trim();

                const email = this.querySelector(
                    'input[name="email"]'
                ).value.trim().toLowerCase();

                const password = this.querySelector(
                    'input[name="password"]'
                ).value;

                const confirmPassword = this.querySelector(
                    'input[name="confirmPassword"]'
                ).value;

                // Validation
                if (!name || !email || !password || !confirmPassword) {
                    alert('Please fill in all fields.');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match.');
                    return;
                }

                // Get existing users
                const users = JSON.parse(
                    localStorage.getItem('focusTrackUsers')
                ) || [];

                // Check if email already exists
                const existingUser = users.find(
                    user => user.email === email
                );

                if (existingUser) {
                    alert('An account with this email already exists.');
                    return;
                }

                // Save new user
                users.push({
                    id: Date.now(),
                    name,
                    email,
                    password
                });

                localStorage.setItem(
                    'focusTrackUsers',
                    JSON.stringify(users)
                );

                alert('Account created successfully!');

                // Redirect to login
                window.location.href = 'login.html';
            });
        }
    }

    /* ======================================================
       LOGIN PAGE LOGIC
    ====================================================== */
    if (currentPage === 'login.html') {
        const loginForm = document.querySelector('.auth-form');

        if (loginForm) {
            loginForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const email = this.querySelector(
                    'input[name="email"]'
                ).value.trim().toLowerCase();

                const password = this.querySelector(
                    'input[name="password"]'
                ).value;

                // Get registered users
                const users = JSON.parse(
                    localStorage.getItem('focusTrackUsers')
                ) || [];

                // Check credentials
                const matchedUser = users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );

                if (!matchedUser) {
                    alert('Invalid email or password.');
                    return;
                }

                // Save currently logged-in user
                localStorage.setItem(
                    'focusTrackCurrentUser',
                    JSON.stringify(matchedUser)
                );

                alert(`Welcome back, ${matchedUser.name}!`);

                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            });
        }
    }
});