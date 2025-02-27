// Array for emails and images
const emailImageMap = {};
let selectedEmail = null;

// Refresh card image
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
    displayImagesForSelectedEmail(); // Display images for selected email
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
    if (emailImageMap[selectedEmail].includes(imageUrl)) {
        showCustomAlert('This image is already saved for this email.');
        return;
    }
    emailImageMap[selectedEmail].push(imageUrl);
    displayImagesForSelectedEmail();
}

// function displayImagesForSelectedEmail() {
//     const imageContainer = document.getElementById('image-collection'); 
//     imageContainer.innerHTML = ''; // Clear previous images

//     if (!emailImageMap[selectedEmail]) return;

//     emailImageMap[selectedEmail].forEach(imageUrl => {
//         const imgElement = document.createElement('img');
//         imgElement.src = imageUrl;
//         imageContainer.appendChild(imgElement);
//     });
// }

// Display images for selected email
function displayImagesForSelectedEmail() {
    const imageContainer = document.getElementById('image-collection');
    imageContainer.innerHTML = '';
    
    if (selectedEmail && emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail].forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.style.margin = '7px';
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
        delete emailImageMap[selectedEmail]; 
        
        // Reset selected email and update UI properly
        selectedEmail = null;
        updateEmailList(); // Refresh email list
        document.getElementById('imageContainer').innerHTML = ''; // Clear images manually
        showCustomAlert('All images for the selected email have been deleted.');
    }
});


// Form submission handler
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let emailInput = form.querySelector("input[type='email']");
        let email = emailInput.value.trim();

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { //strong regex
            showCustomAlert("Please enter a valid email address.");
            return;
        }

        if (!emailImageMap[email]) {
            emailImageMap[email] = [];
        }

        updateEmailList(); // Refresh

        // Auto-select
        selectedEmail = email;
        document.getElementById('emailSelect').value = email;
        displayImagesForSelectedEmail(); // Update displayed images

        emailInput.value = ''; // Clear input field
    });
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
