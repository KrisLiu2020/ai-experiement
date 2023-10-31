// Get references to HTML elements
const inputText = document.getElementById("inputText");
const analyzeButton = document.getElementById("analyzeButton");
const labelElement = document.getElementById("label");
const scoreElement = document.getElementById("score");

// Define the URL of your server endpoint
const serverEndpoint = "http://localhost:8000"; // Replace with your actual server endpoint URL

// Add an event listener to the analyze button
analyzeButton.addEventListener("click", () => {
    console.log("clicked")
    const statement = inputText.value;
    console.log("statement:", statement) 
    // Create a new XHR object
    const xhr = new XMLHttpRequest();

    // Configure the XHR request
    xhr.open("POST", serverEndpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(){
        console.log(xhr.status)
    }
    // Define a callback function to handle the XHR response
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            labelElement.textContent = response[0].label;
            scoreElement.textContent = response[0].score;
        } else {
            console.error("Error analyzing sentiment: " + xhr.status);
        }
    };

    console.log("hello")
    // Prepare the data to send to the server
    const data = JSON.stringify({ statement });

    // Send the XHR request with the data
    xhr.send(data);
});