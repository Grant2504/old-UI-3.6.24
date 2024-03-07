document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send-message').addEventListener('click', function() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return;
        document.getElementById('message-input').value = '';
        var chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';
        fetch('https://vester-on-gpt-4-granthamblen.replit.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            chatOutput.innerHTML += '<div class="chatbot-response" style="text-align: left; color: black;"><strong>Vester:</strong> ' + data.message + '</div>';
            chatOutput.scrollTop = chatOutput.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-message" style="color: red;"><strong>Error:</strong> Could not send message</div>';
        });
    });
    document.querySelectorAll('.example-question').forEach(function(button) {
        button.addEventListener('click', function() {
            var questionText = this.innerText;
            document.getElementById('message-input').value = questionText;
            document.getElementById('send-message').click();
        });
    });
});
function openLink(url) {
    window.open(url, '_blank').focus();
}
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to avoid form submission if it's within a form
        document.getElementById('send-message').click();
    }
});
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to avoid form submission if it's within a form
        document.getElementById('send-message').click();
    }
});
// Function to validate stock symbol input
function isValidStockSymbol(symbol) {
    // Simple regex to check if the symbol only contains letters and is not empty
    return /^[A-Z]+$/i.test(symbol.trim());
}
document.getElementById('send-message').addEventListener('click', function() {
    var userMessage = document.getElementById('message-input').value;
    if (!userMessage.trim()) return; // Check if message is not empty
    // Add a check to see if the message is asking for a stock price
    if (userMessage.toLowerCase().includes("price of")) {
        // Extract the stock symbol from the message
        var symbol = userMessage.split(" ").pop(); // Simplified extraction, adjust as needed
        if (!isValidStockSymbol(symbol)) {
            alert("Please enter a valid stock symbol."); // Alert or handle error more gracefully
            return; // Prevent sending the message
        }
    }
});