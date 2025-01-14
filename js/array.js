// Array for emails and images
const emailImageMap = {};
let selectedEmail = null;
let currentStage = 0;
let vaultboyAlertShown = false;

// update instruction stages
function updateStage(stage, liId) {
    if (currentStage === stage - 1) {
        const li = document.getElementById(liId);
        li.style.color = 'red';
        currentStage = stage;
        console.log(`Stage ${stage} completed`);
    }
}


// refresh card image
document.getElementById('btn1').addEventListener('click', function () {
    const cardImage = document.getElementById('cardImage');
    const newSrc = `https://picsum.photos/600?random=${Date.now()}`;
    cardImage.src = newSrc;
    
    updateStage(1, 'li1');
});

// Update email dropdown
function updateEmailList() {
    const emailSelect = document.getElementById('emailSelect');
    emailSelect.innerHTML = '<option value="">Select an email</option>';

    updateStage(2, 'li2');

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
    displayImagesForSelectedEmail(); // display images

    updateStage(3, 'li3');
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


    updateStage(4, 'li4');
});

// Delete all images for selected email
document.getElementById('btn4').addEventListener('click', function () {

    updateStage(5, 'li5');

    if (!selectedEmail) {
        showCustomAlert('Please select an email to delete its images.');
        return;
    }
    if (emailImageMap[selectedEmail]) {
        emailImageMap[selectedEmail] = [];
        displayImagesForSelectedEmail();
        showCustomAlert(`All images for ${selectedEmail} have gone bye bye.`, vaultboyAlert, showAchievement);
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

// Custom alert
function showCustomAlert(message, callback) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeBtn = document.getElementById("closeAlert");

    // alert message
    alertMessage.textContent = message;
    alertBox.style.display = "flex";

    // run callback
    closeBtn.onclick = function () {
        alertBox.style.display = "none";
        if (callback) callback();
    };
}

// Vault Boy image popup
function vaultboyAlert() {
    if (!vaultboyAlertShown) {
        vaultboyAlertShown = true; 

        document.getElementById('vaultboy').style.display = 'block';

        setTimeout(() => {
            document.getElementById('vaultboy').style.display = 'none';

            showAchievement('Achievement Unlocked!', 'Completed the Tutorial');

        }, 3000);
    }
}

function showAchievement(title, description) {
    const popup = document.getElementById('achievement-popup');
    popup.querySelector('.title').textContent = title;
    popup.querySelector('.description').textContent = description;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 7000); // Display for 7 seconds
}
