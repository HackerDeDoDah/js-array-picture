// Array for emails and images
const emailImageMap = {};
let selectedEmail = null;

// refresh card image
document.getElementById('btn1').addEventListener('click', function () {
    const cardImage = document.getElementById('cardImage');
    const newSrc = `https://picsum.photos/600?random=${Date.now()}`;
    cardImage.src = newSrc;
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
    displayImagesForSelectedEmail(); // Update displayed images
});

// Save image to email array
function saveImageToEmail(imageUrl) {
    if (!selectedEmail) {
        showCustomAlert('Nope! You need to add an email before saving an image.');
        return;
    }
    if (!emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail] = [];
    }
    emailImageMap[selectedEmail].push(imageUrl);
    displayImagesForSelectedEmail();
}

// Display images for selected email
function displayImagesForSelectedEmail() {
    const imageContainer = document.getElementById('image-collection');
    imageContainer.innerHTML = '';
    
    if (emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail].forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Saved image';
            img.style.margin = '7px';
            img.style.width = '144px';
            img.style.height = '144px';
            img.style.borderRadius = '4px';
            imageContainer.appendChild(img);
        });
    }
}

// add image to selected email array
document.getElementById('btn3').addEventListener('click', function () {
    const cardImage = document.getElementById('cardImage');
    const imageUrl = cardImage.src;
    saveImageToEmail(imageUrl);
});

// Delete all images for selected email
document.getElementById('btn4').addEventListener('click', function () {
    if (!selectedEmail) {
        showCustomAlert('Please select an email to delete its images.');
        return;
    }
    if (emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail] = [];
        displayImagesForSelectedEmail();
        showCustomAlert(`All images for ${selectedEmail} have gone bye bye.`);
    }
});

// Form event listener
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('emailInput').value.trim();

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput)) {
        event.preventDefault();
        showCustomAlert('Please enter a valid email address.');
        return;
    }

    if (!emailImageMap[emailInput]) {
        emailImageMap[emailInput] = [];
    }

    updateEmailList();
    document.getElementById('emailInput').value = '';
});

// Custom alert function
function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeBtn = document.getElementById("closeAlert");

    // Set the alert message
    alertMessage.textContent = message;
    alertBox.style.display = "flex";

    // Close alert
    closeBtn.onclick = function () {
        alertBox.style.display = "none";
    };

    // hide alert 7 seconds
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 7000);
}
