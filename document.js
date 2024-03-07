// Toggles the visibility of collapsible sections
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.classList.toggle('hidden'); // Toggles a class that hides or shows the section
}

// Sends the user's message to the backend and appends it to the chat output
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var chatOutput = document.getElementById('chat-output');
    var userMessage = messageInput.value.trim();

    if (userMessage) {
        // Append user message to the chat output
        chatOutput.innerHTML += `<div class="user-message">${userMessage}</div>`;
        messageInput.value = ""; // Clear the input after sending

        // TODO: Replace with your actual backend API URL
        var backendUrl = 'https://vester-on-gpt-4-granthamblen.replit.app/api/chat';

        // Send the user message to the backend
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            // Append the GPT response to the chat output
            chatOutput.innerHTML += `<div class="gpt-response">${data.message}</div>`;
            chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom of the chat output
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }
}

// Sends the selected file to the backend for upload
function uploadFile() {
    var fileInput = document.getElementById('financial-doc-upload');
    var file = fileInput.files[0];

    if (file) {
        // TODO: Replace with your actual backend file upload API URL
        var uploadUrl = 'https://vester-on-gpt-4-granthamblen.replit.app/api/upload';

        var formData = new FormData();
        formData.append('file', file);

        // Send the file to the backend using a POST request with FormData
        fetch(uploadUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            // Handle successful upload here
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    } else {
        alert('Please select a file to upload.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the send message button
    document.getElementById('send-message').addEventListener('click', sendMessage);

    // Event listener for the Enter key within the message input
    document.getElementById('message-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            sendMessage();
        }
    });

    // Event listener for the file upload button
    document.getElementById('upload-button').addEventListener('click', uploadFile);

    // Initial setup to hide collapsible sections
    document.querySelectorAll('.collapsible-section').forEach(section => {
        section.classList.add('hidden');
    });
});

// Utility function to toggle the 'hidden' class
function toggleHidden(element) {
    element.classList.toggle('hidden');
}
