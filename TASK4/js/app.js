// ==========================================================
// STORYHUB - COMMON APPLICATION UTILITIES
// Toast Notifications, Scroll-to-Top, Sample Data
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
    initializeScrollTop();
    initializeSampleData();
});

// ==========================================================
// SHOW TOAST NOTIFICATION
// ==========================================================
function showToast(message, type = 'success') {
    // Remove existing toast if present
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = type === 'error' ? 'toast error' : 'toast';

    toast.innerHTML = `
        <i class="fas ${
            type === 'error'
                ? 'fa-circle-exclamation'
                : 'fa-circle-check'
        }"></i>
        <span>${message}</span>
    `;

    // Append to body
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';

        setTimeout(function () {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// ==========================================================
// SCROLL TO TOP BUTTON
// ==========================================================
function initializeScrollTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');

    if (!scrollBtn) return;

    // Show/hide on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================
// INITIAL SAMPLE DATA
// Added only if there are no posts in localStorage
// ==========================================================
function initializeSampleData() {
    const existingPosts = JSON.parse(localStorage.getItem('posts'));

    // If posts already exist, do nothing
    if (existingPosts && existingPosts.length > 0) {
        return;
    }

    const samplePosts = [
        {
            id: 1001,
            title: 'Welcome to StoryHub',
            category: 'Technology',
            content:
                'StoryHub is a modern blogging platform where writers can create stories, upload featured images, receive likes, and interact through meaningful comments.',
            image: '',
            author: 'StoryHub Team',
            authorId: 0,
            likes: 12,
            likedBy: [],
            comments: [
                {
                    user: 'Reader One',
                    text: 'Amazing platform design. Excited to start writing!',
                    date: new Date().toISOString()
                },
                {
                    user: 'Guest Reader',
                    text: 'The UI looks incredibly professional and modern.',
                    date: new Date().toISOString()
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: null
        },
        {
            id: 1002,
            title: 'Why Writing Matters',
            category: 'Motivation',
            content:
                'Writing helps us organize thoughts, share experiences, and inspire others. Every story has the power to create impact.',
            image: '',
            author: 'StoryHub Team',
            authorId: 0,
            likes: 8,
            likedBy: [],
            comments: [
                {
                    user: 'Creative Writer',
                    text: 'This is truly inspiring!',
                    date: new Date().toISOString()
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: null
        }
    ];

    // Save sample posts
    localStorage.setItem('posts', JSON.stringify(samplePosts));
}