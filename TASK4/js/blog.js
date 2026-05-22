// ==========================================================
// STORYHUB - BLOG MANAGEMENT MODULE
// Handles Posts, Images, Likes, Discussions, Search, Edit, Delete
// ==========================================================

let editingPostId = null;

// ==========================================================
// INITIALIZE BLOG FEATURES
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
    initializePostForm();
    renderHomePosts();
    renderWorkspacePosts();
    initializeSearch();
    updateWorkspaceStats();
});

// ==========================================================
// GET POSTS
// ==========================================================
function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

// ==========================================================
// SAVE POSTS
// ==========================================================
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// ==========================================================
// IMAGE PREVIEW
// ==========================================================
function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    const fileName = document.getElementById('imageFileName');

    if (!preview || !fileName) return;

    if (!file) {
        preview.style.display = 'none';
        preview.src = '';
        fileName.textContent = 'No image selected';
        return;
    }

    fileName.textContent = file.name;

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };

    reader.readAsDataURL(file);
}

// ==========================================================
// INITIALIZE POST FORM
// ==========================================================
function initializePostForm() {
    const postForm = document.getElementById('postForm');

    if (!postForm) return;

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const currentUser = getCurrentUser();

        if (!currentUser) {
            showToast('Please login to create a story.', 'error');
            window.location.href = 'login.html';
            return;
        }

        const title = document.getElementById('postTitle').value.trim();
        const category = document.getElementById('postCategory').value;
        const content = document.getElementById('postContent').value.trim();
        const imageInput = document.getElementById('postImage');
        const imageFile = imageInput ? imageInput.files[0] : null;

        if (!title || !category || !content) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        // Save after image is processed
        function savePost(imageData = '') {
            const posts = getPosts();

            // ================= EDIT POST =================
            if (editingPostId) {
                const post = posts.find(function (p) {
                    return p.id === editingPostId;
                });

                if (post) {
                    post.title = title;
                    post.category = category;
                    post.content = content;

                    // Replace image only if a new one is selected
                    if (imageData) {
                        post.image = imageData;
                    }

                    post.updatedAt = new Date().toISOString();
                }

                showToast('Story updated successfully!');
                editingPostId = null;
            }

            // ================= CREATE NEW POST =================
            else {
                const newPost = {
                    id: Date.now(),
                    title: title,
                    category: category,
                    content: content,
                    image: imageData,
                    author: currentUser.name,
                    authorId: currentUser.id,
                    likes: 0,
                    likedBy: [],
                    comments: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: null
                };

                // Add to beginning
                posts.unshift(newPost);

                showToast('Story published successfully!');
            }

            // Save posts
            savePosts(posts);

            // Reset form
            resetPostForm();

            // Refresh UI
            renderWorkspacePosts();
            renderHomePosts();
            updateWorkspaceStats();

            // Redirect to home page when creating a new story
            if (!editingPostId) {
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 1200);
            }
        }

        // ================= HANDLE IMAGE =================
        if (imageFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                savePost(event.target.result);
            };

            reader.readAsDataURL(imageFile);
        } else {
            savePost('');
        }
    });
}

// ==========================================================
// RENDER POSTS ON HOME PAGE
// ==========================================================
function renderHomePosts() {
    const container = document.getElementById('postsContainer');

    if (!container) return;

    const posts = getPosts();

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No Stories Yet</h3>
                <p>Be the first to publish an inspiring story.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = posts
        .map(function (post) {
            return createPostHTML(post, false);
        })
        .join('');
}

// ==========================================================
// RENDER USER POSTS ON DASHBOARD
// ==========================================================
function renderWorkspacePosts() {
    const container = document.getElementById('dashboardPosts');

    if (!container) return;

    const currentUser = getCurrentUser();

    if (!currentUser) {
        container.innerHTML = '';
        return;
    }

    const posts = getPosts().filter(function (post) {
        return post.authorId === currentUser.id;
    });

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-feather-alt"></i>
                <h3>No Stories Created</h3>
                <p>Start writing your first story using the form.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = posts
        .map(function (post) {
            return createPostHTML(post, true);
        })
        .join('');
}

// ==========================================================
// CREATE POST HTML
// ==========================================================
function createPostHTML(post, isWorkspace) {
    const currentUser = getCurrentUser();
    const isOwner =
        currentUser && currentUser.id === post.authorId;

    return `
        <article class="post-card">
            <span class="category-badge">
                <i class="fas fa-folder"></i>
                ${escapeHTML(post.category)}
            </span>

            <h3 class="post-title">${escapeHTML(post.title)}</h3>

            ${
                post.image
                    ? `
                <img
                    src="${post.image}"
                    alt="${escapeHTML(post.title)}"
                    class="post-image"
                />
            `
                    : ''
            }

            <div class="post-content">
                ${escapeHTML(post.content)}
            </div>

            <div class="post-info">
                <p>
                    <i class="fas fa-user"></i>
                    ${escapeHTML(post.author)}
                </p>
                <p>
                    <i class="fas fa-calendar"></i>
                    ${formatDate(post.createdAt)}
                </p>
                <p>
                    <i class="fas fa-heart"></i>
                    ${post.likes} Likes
                </p>
                <p>
                    <i class="fas fa-comments"></i>
                    ${post.comments.length} Discussions
                </p>
            </div>

            <div class="form-actions" style="margin-top: 20px;">
                <button
                    class="btn btn-outline"
                    onclick="likePost(${post.id})"
                >
                    <i class="fas fa-heart"></i>
                    Like
                </button>

                <button
                    class="btn btn-outline"
                    onclick="toggleDiscussions(${post.id})"
                >
                    <i class="fas fa-comments"></i>
                    Discussions
                </button>

                ${
                    isWorkspace && isOwner
                        ? `
                    <button
                        class="btn btn-outline"
                        onclick="editPost(${post.id})"
                    >
                        <i class="fas fa-pen"></i>
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deletePost(${post.id})"
                    >
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                `
                        : ''
                }
            </div>

            <div
                id="comments-${post.id}"
                class="comments-section"
                style="display: none; margin-top: 24px;"
            >
                <div class="comment-list">
                    ${
                        post.comments.length > 0
                            ? post.comments
                                  .map(function (comment) {
                                      return `
                                        <div class="post-card" style="padding: 20px; margin-bottom: 16px;">
                                            <strong>${escapeHTML(comment.user)}</strong>
                                            <p style="color: var(--text-secondary); margin-top: 8px;">
                                                ${escapeHTML(comment.text)}
                                            </p>
                                            <small style="color: var(--text-muted);">
                                                ${formatDate(comment.date)}
                                            </small>
                                        </div>
                                    `;
                                  })
                                  .join('')
                            : `
                                <p style="color: var(--text-muted); margin-bottom: 16px;">
                                    No comments yet.
                                </p>
                            `
                    }
                </div>

                <form
                    class="auth-form"
                    onsubmit="addComment(event, ${post.id})"
                >
                    <div class="input-group">
                        <div class="input-wrapper">
                            <i class="fas fa-comment"></i>
                            <textarea
                                placeholder="Write your comment..."
                                required
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i>
                        Post Comment
                    </button>
                </form>
            </div>
        </article>
    `;
}

// ==========================================================
// LIKE POST (ONE LIKE PER USER)
// ==========================================================
function likePost(postId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        showToast('Please login to like stories.', 'error');
        return;
    }

    const posts = getPosts();
    const post = posts.find(function (p) {
        return p.id === postId;
    });

    if (!post) return;

    if (!post.likedBy) {
        post.likedBy = [];
    }

    if (post.likedBy.includes(currentUser.id)) {
        showToast('You have already liked this story.', 'error');
        return;
    }

    post.likes += 1;
    post.likedBy.push(currentUser.id);

    savePosts(posts);

    renderHomePosts();
    renderWorkspacePosts();
    updateWorkspaceStats();

    showToast('You liked this story!');
}

// ==========================================================
// TOGGLE COMMENTS
// ==========================================================
function toggleDiscussions(postId) {
    const section = document.getElementById('comments-' + postId);

    if (!section) return;

    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// ==========================================================
// ADD COMMENT
// ==========================================================
function addComment(event, postId) {
    event.preventDefault();

    const textarea = event.target.querySelector('textarea');
    const text = textarea.value.trim();

    if (!text) return;

    const currentUser = getCurrentUser();
    const commenter = currentUser
        ? currentUser.name
        : 'Guest Reader';

    const posts = getPosts();
    const post = posts.find(function (p) {
        return p.id === postId;
    });

    if (!post) return;

    post.comments.push({
        user: commenter,
        text: text,
        date: new Date().toISOString()
    });

    savePosts(posts);

    textarea.value = '';

    renderHomePosts();
    renderWorkspacePosts();
    updateWorkspaceStats();

    showToast('Comment added successfully!');

    setTimeout(function () {
        toggleDiscussions(postId);
    }, 50);
}

// ==========================================================
// EDIT POST
// ==========================================================
function editPost(postId) {
    const posts = getPosts();
    const post = posts.find(function (p) {
        return p.id === postId;
    });

    if (!post) return;

    editingPostId = postId;

    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postContent').value = post.content;

    document.getElementById('formTitle').innerHTML =
        '<i class="fas fa-pen"></i> Edit Story';

    document.getElementById('submitBtn').innerHTML =
        '<i class="fas fa-save"></i> Update Story';

    document.getElementById('cancelEditBtn').style.display = 'inline-flex';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================================
// CANCEL EDIT
// ==========================================================
function cancelEdit() {
    editingPostId = null;
    resetPostForm();
}

// ==========================================================
// RESET FORM
// ==========================================================
function resetPostForm() {
    const form = document.getElementById('postForm');

    if (form) {
        form.reset();
    }

    const preview = document.getElementById('imagePreview');
    const fileName = document.getElementById('imageFileName');

    if (preview) {
        preview.style.display = 'none';
        preview.src = '';
    }

    if (fileName) {
        fileName.textContent = 'No image selected';
    }

    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');

    if (formTitle) {
        formTitle.innerHTML =
            '<i class="fas fa-feather-alt"></i> Create New Story';
    }

    if (submitBtn) {
        submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Publish Story';
    }

    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }
}

// ==========================================================
// DELETE POST
// ==========================================================
function deletePost(postId) {
    const confirmed = confirm(
        'Are you sure you want to delete this story?'
    );

    if (!confirmed) return;

    const posts = getPosts().filter(function (post) {
        return post.id !== postId;
    });

    savePosts(posts);

    renderWorkspacePosts();
    renderHomePosts();
    updateWorkspaceStats();

    showToast('Story deleted successfully.');
}

// ==========================================================
// SEARCH POSTS
// ==========================================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        const posts = getPosts();

        const filteredPosts = posts.filter(function (post) {
            return (
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query)
            );
        });

        const container = document.getElementById('postsContainer');

        if (filteredPosts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No Results Found</h3>
                    <p>Try searching with different keywords.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredPosts
            .map(function (post) {
                return createPostHTML(post, false);
            })
            .join('');
    });
}

// ==========================================================
// UPDATE DASHBOARD STATS
// ==========================================================
function updateWorkspaceStats() {
    const totalPostsEl = document.getElementById('totalPosts');
    const totalDiscussionsEl = document.getElementById('totalDiscussions');
    const totalLikesEl = document.getElementById('totalLikes');

    if (!totalPostsEl || !totalDiscussionsEl || !totalLikesEl) return;

    const currentUser = getCurrentUser();

    if (!currentUser) return;

    const userPosts = getPosts().filter(function (post) {
        return post.authorId === currentUser.id;
    });

    totalPostsEl.textContent = userPosts.length;

    totalDiscussionsEl.textContent = userPosts.reduce(function (sum, post) {
        return sum + post.comments.length;
    }, 0);

    totalLikesEl.textContent = userPosts.reduce(function (sum, post) {
        return sum + post.likes;
    }, 0);
}

// ==========================================================
// FORMAT DATE
// ==========================================================
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// ==========================================================
// ESCAPE HTML
// ==========================================================
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}