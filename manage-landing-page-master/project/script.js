const hamburger = document.getElementById('hamburger');
const hamburgerSection = document.getElementById('hamburger-section');
// Event listener
hamburger.addEventListener('click', displayMenu);

// Displays the hamburger menu
function displayMenu(e) {
    if (hamburger.src.includes('hamburger')) {
        e.target.src = '../images/icon-close.svg';
    } else {
        e.target.src = '../images/icon-hamburger.svg';
    }
    hamburgerSection.classList.toggle('hide');
}

const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit-btn');
const emailDiv = document.querySelector('.form-email-div')

const isValidEmail = emailInput.checkValidity();
// Event listener
submitBtn.addEventListener('click', checkEmail);

// Validates the form input
function checkEmail() {
    if (!isValidEmail) {
        emailDiv.classList.add('invalid-email');
    } else {
        emailDiv.classList.remove('invalid-email');
    }
}