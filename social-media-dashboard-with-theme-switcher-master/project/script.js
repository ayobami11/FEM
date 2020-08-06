let toggleBtn = document.getElementById('toggle');

toggleBtn.addEventListener('change', () => document.body.classList.toggle('dark-mode'));

// Checks if the user is on light or dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleBtn.checked = true;
    document.body.classList.add('dark-mode');
} else {
    toggleBtn.checked = false;
    document.body.classList.remove('dark-mode');
}