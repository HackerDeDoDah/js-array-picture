// switched to seeded images as i couldn't figure out how to do it the other way. got this idea from Jozef and James.

// Global Variables
const picsumSeedUrl = "https://picsum.photos/seed/";
const imageResolution = "/600/600";
const emailImageMap = JSON.parse(localStorage.getItem('emailImageMap')) || {};
let selectedEmail = null;

// Generate a seeded Picsum URL
function generateSeededImageUrl(seed) {
    return `${picsumSeedUrl}${seed}${imageResolution}`;
}

// card image with a new seeded image
document.getElementById('btn1').addEventListener('click', function () {
    const cardImage = document.getElementById('cardImage');
    const seed = Math.floor(Math.random() * 1000000); // unique seed
    cardImage.dataset.seed = seed; // Store seed
    cardImage.src = generateSeededImageUrl(seed);
});

// Update email dropdown
function updateEmailList() {
    const emailSelect = document.getElementById('emailSelect');
    emailSelect.innerHTML = '<option value="">Select an email</option>';

    for (const email in emailImageMap) {
        const option = document.createElement('option');
        option.value = email;
        option.textContent = email;
        emailSelect.appendChild(option);
    }
}

// Handle email selection
document.getElementById('emailSelect').addEventListener('change', function (event) {
    selectedEmail = event.target.value;
    displayImagesForSelectedEmail();
});

// Save image to email array
function saveImageToEmail(seed) {
    if (!selectedEmail) {
        showCustomAlert('Nope! You need to add an email before saving an image.');
        return;
    }
    if (!emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail] = [];
    }
    if (emailImageMap[selectedEmail].includes(seed)) {
        showCustomAlert('Choose another image, you already have that one.');
        return;
    }
    emailImageMap[selectedEmail].push(seed);
    localStorage.setItem('emailImageMap', JSON.stringify(emailImageMap)); // Persist data
    displayImagesForSelectedEmail();
}

// Display images for selected email
function displayImagesForSelectedEmail() {
    const imageContainer = document.getElementById('image-collection');
    imageContainer.innerHTML = '';

    if (selectedEmail && emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail].forEach(seed => {
            const imgElement = document.createElement('img');
            imgElement.src = generateSeededImageUrl(seed);
            imgElement.style.margin = '4px 4px 0 4px';
            imgElement.style.width = '144px';
            imgElement.style.height = '144px';
            imgElement.style.borderRadius = '4px';
            imgElement.alt = 'Saved image';
            imageContainer.appendChild(imgElement);
        });
    }
}

// Add image to selected email array
document.getElementById('btn3').addEventListener('click', function () {
    const cardImage = document.getElementById('cardImage');
    const seed = cardImage.dataset.seed;
    if (seed) {
        saveImageToEmail(seed);
    }
});

// Delete all images for selected email
document.getElementById('btn4').addEventListener('click', function () {
    if (!selectedEmail) {
        showCustomAlert('Please select an email to delete its images.');
        return;
    }
    delete emailImageMap[selectedEmail]; 
    localStorage.setItem('emailImageMap', JSON.stringify(emailImageMap)); // Update storage
    selectedEmail = null;
    updateEmailList();
    document.getElementById('image-collection').innerHTML = ''; // Clear images manually
    showCustomAlert('All images for the selected email have been deleted.');
});

// Form submission handler
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let emailInput = form.querySelector("input[type='email']");
        let email = emailInput.value.trim();

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { // strong regex
            showCustomAlert("Please enter a valid email address.");
            return;
        }

        if (!emailImageMap[email]) {
            emailImageMap[email] = [];
        }
        localStorage.setItem('emailImageMap', JSON.stringify(emailImageMap));
        updateEmailList();
        selectedEmail = email;
        document.getElementById('emailSelect').value = email;
        displayImagesForSelectedEmail();
        emailInput.value = '';
    });
});

// Load stored data on load
window.addEventListener('load', function () {
    updateEmailList();
    const emailKeys = Object.keys(emailImageMap);
    if (emailKeys.length > 0) {
        selectedEmail = emailKeys[0];
        document.getElementById('emailSelect').value = selectedEmail;
        displayImagesForSelectedEmail();
    }
});

// Custom alert function
function showCustomAlert(message, callback) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeBtn = document.getElementById("closeAlert");
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
    closeBtn.onclick = function () {
        alertBox.style.display = "none";
        if (callback) callback();
    };
}
