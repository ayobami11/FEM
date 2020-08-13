let hamburger = document.getElementById('hamburger');
let hamburgerSection = document.getElementById('hamburger-section');

hamburger.addEventListener('click', () => {
    if (hamburger.src.includes('hamburger')) {
        hamburger.src = '../images/icon-close.svg';
        hamburgerSection.style.display = 'flex';
    } else {
        hamburger.src = '../images/icon-hamburger.svg';
        hamburgerSection.style.display = 'none';
    }
})