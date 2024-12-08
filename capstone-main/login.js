// Get modal elements
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

// Get buttons to open modals
const openLogin = document.getElementById("open-login");
const openSignup = document.getElementById("open-signup");

// Get buttons to close modals
const closeLogin = document.getElementById("close-login");
const closeSignup = document.getElementById("close-signup");

// Open login modal
openLogin.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Open sign-up modal
openSignup.addEventListener("click", () => {
    signupModal.style.display = "flex";
});

// Close login modal
closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Close sign-up modal
closeSignup.addEventListener("click", () => {
    signupModal.style.display = "none";
});

// Close modals when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === signupModal) {
        signupModal.style.display = "none";
    }
});

// login and signup
document.getElementById("login-button").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
});

document.getElementById("signup-button").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        alert(`Sign-up successful for user: ${username}`);
        signupModal.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
});
