// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const fetchBtn = document.getElementById("fetch-alerts");
const stateInput = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

fetchBtn.addEventListener("click", () => {
    const stateCode = stateInput.value.trim().toUpperCase();

    // Clear previous results & errors
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    fetch(`${weatherApi}${stateCode}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // Show summary with title + number of alerts
            const numAlerts = data.features.length;
            const summary = document.createElement("h2");
            summary.textContent = `${data.title}: ${numAlerts}`;
            alertsDisplay.appendChild(summary);

            // Show each alert headline
            if (numAlerts > 0) {
                const ul = document.createElement("ul");
                data.features.forEach((alert) => {
                    const li = document.createElement("li");
                    li.textContent = alert.properties.headline;
                    ul.appendChild(li);
                });
                alertsDisplay.appendChild(ul);
            }

            // Clear input after success
            stateInput.value = "";
        })
        .catch((error) => {
            displayError(error.message);
        });
});

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}