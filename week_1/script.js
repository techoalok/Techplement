// script.js

// URL of the GET and POST API endpoints
const apiUrlGet = "http://localhost/quote_api/get_quote.php"; // Adjust as per your setup
const apiUrlPost = "http://localhost/quote_api/add_quote.php"; // Adjust as per your setup

// Display Quote Section
document.getElementById("next-button").addEventListener("click", fetchRandomQuote);

function fetchRandomQuote() {
    fetch(apiUrlGet)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                const randomQuote = data.data[Math.floor(Math.random() * data.data.length)];
                document.getElementById("quote-text").textContent = randomQuote.q_text;
                document.getElementById("quote-author").textContent = `- ${randomQuote.q_author ? randomQuote.q_author : "Unknown"}`;
            } else {
                document.getElementById("quote-text").textContent = "No quotes available.";
                document.getElementById("quote-author").textContent = "";
            }
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            document.getElementById("quote-text").textContent = "An error occurred while fetching the quote.";
            document.getElementById("quote-author").textContent = "";
        });
}

// New Quote Submission
document.getElementById("quote-form").addEventListener("submit", submitQuote);

function submitQuote(event) {
    event.preventDefault();

    const q_text = document.getElementById("q_text").value.trim();
    const q_author = document.getElementById("q_author").value.trim();

    if (!q_text || !q_author) {
        alert("Both fields are required!");
        return;
    }

    fetch(apiUrlPost, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ q_text, q_author })
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById("response-message");
        if (data.success) {
            alert("Quote added successfully!");
            messageElement.style.color = "green";
            document.getElementById("quote-form").reset();
        } else {
            messageElement.textContent = "Failed to add quote.";
            messageElement.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error adding quote:", error);
        document.getElementById("response-message").textContent = "Error adding quote.";
        document.getElementById("response-message").style.color = "red";
    });
}

// Call the function to load the initial quote when the page loads
fetchRandomQuote();
