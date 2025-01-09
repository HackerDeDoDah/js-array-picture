
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
// Array to store emails
//
const emailArray = [];

// Function to update email list display
function updateEmailList() {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = ''; // Clear the list
    emailArray.forEach(email => {
        const listItem = document.createElement('li');
        listItem.textContent = email;
        emailList.appendChild(listItem);
    });
}

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



