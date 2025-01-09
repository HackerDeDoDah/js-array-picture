//
// vars
//

const savedImages = [];

//
// Function to refresh the card image
//
function refreshCardImage() {
    const cardImage = document.getElementById('cardImage');
    const newSrc = `https://picsum.photos/600?random=${Date.now()}`;
    cardImage.src = newSrc; // Update the image source
}

// Attach event listener to the button
document.getElementById('btn1').addEventListener('click', refreshCardImage);


//
// Write image to DOM
//
function writeImage() {
    const cardImage = document.getElementById('cardImage');
    const imageUrl = cardImage.src;

    savedImages.push(imageUrl);

    updateSavedImages();
}



function updateSavedImages() {
    const savedImagesContainer = document.getElementById('image-collection');
    savedImagesContainer.innerHTML = ''; // Clear the container

    savedImages.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Saved image';
        img.style.marginLeft = '5.5px';
        img.style.marginTop = '5px';
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.borderRadius = '3px';

        savedImagesContainer.appendChild(img);
    });
}

document.getElementById('btn3').addEventListener('click', writeImage);




//
// Array to store emails
//
const emailArray = [];

// Form submission event listener
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
    const emailInput = document.getElementById('emailInput').value.trim();

    // Validate email format
    if (/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(emailInput)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Add email to array
    emailArray.push(emailInput);

    // Update the displayed list of emails
    updateEmailList();

    // Clear the input field
    document.getElementById('emailInput').value = '';
});


// Function to update email list display
function updateEmailList() {
    const emailList = document.getElementById('emailList');
    const emailSelect = document.getElementById('emailSelect');
    emailList.innerHTML = ''; // Clear the list
    emailSelect.innerHTML = '<option value="">Select an email</option>';

    emailArray.forEach(email => {
        const listItem = document.createElement('li');
        listItem.textContent = email;
        emailList.appendChild(listItem);

        const option = document.createElement('option');
        option.value = email;
        option.textContent = email;
        emailSelect.appendChild(option);
    });
}




